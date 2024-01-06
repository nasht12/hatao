"use client";
import React, { useEffect, useState } from 'react';
import { sql } from '@vercel/postgres';
import  {fetchAllListFromDb}  from '../actions';

interface ListItem {
    category: string;
    topic: string;
    campaignName: string;
    campaignUrl: string;
    items: { name: string; url: string }[];
  }
  

const Page: React.FC = () => {
  const [listItems, setListItems] = useState<ListItem[]>([]);

  useEffect(() => {
    // Fetch topics from the database
    const fetchLists = async () => {
        try {
          const data = await fetchAllListFromDb();
          console.log("data", data);
          setListItems(
            data.map((row) => ({
              category: row.category,
              topic: row.topic,
              campaignName: row.campaignName,
              campaignUrl: row.campaignUrl,
              items: row.items,
            }))
          );
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
    };

    fetchLists();
}, []);

  return (
    <div>
      <h1>List Page</h1>
    {listItems.length > 0 ? (
        <ul>
            {listItems.map((item, index) => (
                <li key={index}>{item.campaignName}</li>
            ))}
        </ul>
    ) : (
        <p>No items available</p>
    )}
    </div>
  );
};

export default Page;