"use server";

import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { slugToNoSpace } from '@/lib/utils';
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache'

interface FormValues {
  category: string;
  topic: string;
  campaignName: string;
  campaignUrl: string;
  items: { name: string; url: string }[];
}

interface Item {
    name: string;
    url: string;
  }
// Use FormValues interface instead of defining a new Campaign interface
type Campaign = FormValues;

const schema = z.object({
  category: z.string(),
  topic: z.string(),
  campaignName: z.string(),
  campaignUrl: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});


export default async function createListFromDb(formData: FormValues) {
    const { category, topic, campaignName, campaignUrl, items } = formData;
  
    try {
      // Check if the "lists" table exists, and if not, create it
      await sql`
        CREATE TABLE IF NOT EXISTS lists (
          id SERIAL PRIMARY KEY,
          category VARCHAR(255),
          topic VARCHAR(255),
          campaign_name VARCHAR(255),
          campaign_url VARCHAR(255),
          items JSONB
        );
      `;
  
      // Insert the form data into the "lists" table
      const result = await sql`
        INSERT INTO lists (category, topic, campaign_name, campaign_url, items)
        VALUES (${category}, ${topic}, ${campaignName}, ${campaignUrl}, ${JSON.stringify(items)})
        RETURNING *;
      `;
      revalidatePath('/')
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

export async function fetchAllListFromDb() {
  try {
    const result = await sql`SELECT * FROM lists;`;
    console.log('result55q', result.rows.length);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchTopics(){
  try {
    const topics = [
      'Movies',
      'TV Shows',
      'Music',
      'Football',
      'Basketball',
      'Cities',
      'Cuisines',
      'Mobile Apps',
      'Novels',
      'Paintings',
      'Animals'
    ];
    const topicsString = topics.map(topic => `'${topic}'`).join(', ');
    const result = await sql`SELECT * FROM lists WHERE topic = ANY (SELECT topic FROM lists)`;
    console.log("result res", result);
    return result.rows;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchListFromDb(campaignName: string): Promise<Item[]> {
  try {
    const result = await sql`
        SELECT * FROM lists
        WHERE campaign_name = ${campaignName};
      `;

    return result.rows.flatMap((row) => row.items);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchTopicsFromDb() {
  const { rows } = await sql`SELECT topic FROM lists;`;
  console.log('rows', rows);
  return rows;
}

export async function fetchCampaignNamesFromDb() {
    const { rows } = await sql`SELECT DISTINCT campaign_name FROM lists;`;
    return rows;
  }

// export default async function createList(formData: FormValues) {
//   const validatedFields = schema.safeParse(formData);

//   // Return early if the form data is invalid
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // Write the validated data to a file
//   const filePath = path.join(process.cwd(), "data", "lists.json");

//   // Read the existing data from the file
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return;
//     }

//     // Parse the existing data into a JavaScript array
//     let existingData = JSON.parse(data || "[]");

//     // Append the new data to the existing data
//     existingData.push(validatedFields.data);

//     // Write the updated data back to the file
//     fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
//       if (err) {
//         console.error("Error writing file:", err);
//         return;
//       }
//       console.log("Data written to file");
//     });
//   });
// }

// export async function fetchList(campaignName: string): Promise<Item[]> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.resolve("./data/lists.json"), "utf8", (err, data) => {
//       if (err) {
//         console.error("Error reading file:", err);
//         reject(err);
//         return;
//       }

//       // Parse the data into a JavaScript array
//       let existingData: Campaign[] = JSON.parse(data || "[]");

//       // Find the campaign with the matching campaignName
//       const campaign = existingData.find(
//         (campaign) => slugToNoSpace(campaign.campaignName) === campaignName
//       );

//       if (campaign) {
//         // If a matching campaign is found, resolve the promise with the items array
//         resolve(campaign.items);
//       } else {
//         // If no matching campaign is found, resolve the promise with an empty array
//         resolve([]);
//       }
//     });
//   });
// }

// export async function fetchAllLists(): Promise<FormValues[]> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.resolve("./data/lists.json"), "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         let lists: FormValues[] = JSON.parse(data || "[]");
//         resolve(lists);
//       }
//     });
//   });
// }
