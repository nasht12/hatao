"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { playlists } from "./data/playlists";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";
import { fetchAllListFromDb, fetchTopics } from '@/app/actions';

interface Item {
  name: string;
  url: string;
}

interface List {
  category: string;
  topic: string;
  campaignName: string;
  campaignUrl: string;
  items: Item[];
}

export default function ExplorePage() {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    fetch("/api/lists")
      .then((response) => response.json())
      .then((response) => {
        const lists: List[] = response.data.map((item: List) => ({
          category: item.category,
          topic: item.topic,
          campaignName: item.campaignName,
          campaignUrl: item.campaignUrl,
          items: item.items,
        }));
  
        setLists(lists);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="md:block">
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          General
                        </TabsTrigger>
                        <TabsTrigger value="custom">Custom</TabsTrigger>
                        {/* <TabsTrigger value="live">
                          Earn
                        </TabsTrigger> */}
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <Link href="create">
                            <div className="flex items-center">
                              <PlusCircledIcon className="mr-2 h-4 w-4" />
                              Add List
                            </div>
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Topics
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Trending topics in last 24hrs.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea >
                          <div className="flex space-x-4 pb-4">
                            {lists.map((list) => (
                              <Link
                                key={list.campaignName}
                                href={`/lists/${generateSlug(
                                  list.campaignName
                                )}`}
                              >
                                {" "}
                                <AlbumArtwork
                                  key={list.campaignName}
                                  album={{
                                    name: list.campaignName,
                                    artist: list.topic,
                                    cover: list.campaignUrl,
                                  }}
                                  className="w-[250px]"
                                  aspectRatio="portrait"
                                  width={300}
                                  height={300}
                                />
                              </Link>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      {/* <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Made for You
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your personal playlists. Updated daily.
                        </p>
                      </div> */}
                      <Separator className="my-4" />
                      {/* <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {lists.map((album) => (
                              <AlbumArtwork
                                key={album.campaignName}
                                album={album}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div> */}
                    </TabsContent>
                    <TabsContent
                      value="custom"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
