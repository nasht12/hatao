"use client"
import React, { useEffect, useState } from 'react';

const TopicPage: React.FC = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetch('/api/topics')
            .then(response => response.json())
            .then(data => setTopics(data))
            .catch(error => console.error(error));
    }, []);

    console.log('topics', topics);
    return (
        <div>
            <h1>Topic Page</h1>
            <ul>
                Topics
            </ul>
        </div>
    );
};

export default TopicPage;
