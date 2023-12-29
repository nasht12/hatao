"use client";
import { useState, useEffect } from 'react';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "@/components/announcement";

export default function Home() {
  const words = ['Create', 'Rank', 'Share']; 
  const colors = ['text-red-200', 'text-green-200', 'text-blue-200']; 
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord(prevWord => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
      setCurrentColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 1000); // Change word and color every half second

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row gap-4">
        {/* <PicksDisplay /> */}
        <PageHeader>
          {/* <Announcement /> */}
          <PageHeaderHeading className="overflow-hidden flex text-sm">
            <div
              className={`underline transition-opacity duration-500 ease-in-out ${currentColor}`}
            >
              {currentWord}
            </div>
            {/* <div className='text-sm'>Lists</div> */}
          </PageHeaderHeading>
          <PageHeaderDescription>
            Trying to pick your favourite movie, or the best restaurants around?
            Or comparing different products, we makes it easy.
          </PageHeaderDescription>
          <PageActions>
            <Link href="/explore" className={cn(buttonVariants())}>
              Explore
            </Link>
            <Link href="/create" className={cn(buttonVariants())}>
              Create a List
            </Link>
          </PageActions>
          <Announcement />
        </PageHeader>
      </div>
    </main>
  );
}
