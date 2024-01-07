"use client";
import React, { useEffect, useState } from 'react';
import { sql } from '@vercel/postgres';
import  {fetchTopics}  from '../actions';

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
    const fetchListsDb = async () => {
        try {
          const data = await fetchTopics();
          console.log("data", data);
          setListItems(
            data.map((row) => ({
              category: row.category,
              topic: row.topic,
              campaignName: row.campaign_name,
              campaignUrl: row.campaign_url,
              items: row.items,
            }))
          );
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
    };

    fetchListsDb();
}, []);

  return (
    <div>
      <h1>List Page</h1>
      {listItems && (
        <ul>
          {listItems.map((item, index) => (
            <li key={index}>{item.campaignName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;