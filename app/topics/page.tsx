"use client";
import React, { useEffect, useState } from 'react';
import { fetchTopicsFromDb } from '../actions';

interface Topic {
    topic: string;
  }

const Page = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        // Fetch topics from the database
        const fetchTopics = async () => {
            try {
              const data = await fetchTopicsFromDb();
              console.log("data", data);
              setTopics(data.map((row) => ({ topic: row.topic })));
            } catch (error) {
              console.error("Error fetching topics:", error);
            }
        };

        fetchTopics();
    }, []);

    console.log('topics', topics);

    return (
        <div>
            <h1>Topics</h1>
            <ul>
                {topics.map((topic, index) => (
                    <li key={index}>{topic.topic}</li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
