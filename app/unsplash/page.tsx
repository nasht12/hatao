"use client";

import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { DrawerDemo } from './components/image-drawer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define the types for the photo and user objects
interface User {
  username: string;
  name: string;
}

interface Urls {
  regular: string;
}

interface Photo {
  id: string;
  urls: Urls;
  user: User;
}

// Initialize the Unsplash API
const api = createApi({
    accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY || "",
});

const PhotoComp: React.FC<{ photo: Photo }> = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <Fragment>
      <Image alt="img" width="100" height="100" className="img" src={urls.regular} />
    </Fragment>
  );
};

const Body: React.FC = () => {
    const [data, setData] = useState<{ response: { results: Photo[]; }, errors?: string[] } | null>(null);
    const [query, setQuery] = useState('dog');

  useEffect(() => {
    api.search
      .getPhotos({ query: '', orientation: 'portrait', perPage: 5 })
      .then((result) => {
        if (result.type === 'success') {
          setData(result);
        } else {
          console.log('something went wrong!', result.errors);
        }
      })
      .catch(() => {
        console.log('something went wrong!');
      });
  }, []);

  const searchPhotos = () => {
    api.search
      .getPhotos({ query, orientation: 'portrait', perPage: 5 })
      .then((result) => {
        if (result.type === 'success') {
          setData(result);
        } else {
          console.log('something went wrong!', result.errors);
        }
      })
  };

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="feed">
        <DrawerDemo />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={searchPhotos}>Search</Button>
        <ul className="columnUl">
          {data.response.results.map((photo) => (
            <li key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

const Home: React.FC = () => {
  return (
    <main className="root">
      <Body />
    </main>
  );
};

export default Home;
