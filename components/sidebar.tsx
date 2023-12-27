"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/data/categories";
import { BsList } from "react-icons/bs";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
}

export function Sidebar({ className, categories }: SidebarProps) {
  const [isListClicked, setIsListClicked] = useState(false);

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <BsList className="cursor-pointer" onClick={() => setIsListClicked(!isListClicked)} />
          {/* <div className="space-y-1"></div> */}
        </div>
        {isListClicked && (
          <>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Trending
              </h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  Best Christmas Movie
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <circle cx="8" cy="18" r="4" />
                    <path d="M12 18V2l7 4" />
                  </svg>
                  Best Christmas Song
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Best City for Food
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="m16 6 4 14" />
                    <path d="M12 6v14" />
                    <path d="M8 8v12" />
                    <path d="M4 4v16" />
                  </svg>
                  Best Football Player
                </Button>
              </div>
            </div>
            <div className="py-2">
              <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                Category
              </h2>
              <ScrollArea className="h-[300px] px-1">
                <div className="space-y-1 p-2">
                  {categories?.map((category, i) => (
                    <Button
                      key={`${category}-${i}`}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M21 15V6" />
                        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M12 12H3" />
                        <path d="M16 6H3" />
                        <path d="M12 18H3" />
                      </svg>
                      {category}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="px-3 py-2 flex items-center">
              <Link href="/create">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /> {/* Plus icon */}
                  </svg>
                  <span>Create</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
