"use server";

import { z } from 'zod';
import fs from 'fs';
import path from 'path';

interface FormValues {
  category: string;
  subcategory: string;
  campaignName: string;
  items: { name: string; url: string }[];
}

const schema = z.object({
  category: z.string(),
  subcategory: z.string(),
  campaignName: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export default async function createList(formData: FormValues) {
  const validatedFields = schema.safeParse(formData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Write the validated data to a file
  const filePath = path.join(process.cwd(), 'data', 'lists.json');

// Read the existing data from the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    // Parse the existing data into a JavaScript array
    let existingData = JSON.parse(data || '[]');
  
    // Append the new data to the existing data
    existingData.push(validatedFields.data);
  
    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Data written to file');
    });
  });
}