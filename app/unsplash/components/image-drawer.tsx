import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { createApi } from "unsplash-js";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type Photo = {
  id: string;
  urls: {
    regular: string;
  };
};

const api = createApi({
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY || "",
});

export function DrawerDemo() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<{
    response: { results: Photo[] };
    errors?: string[];
  } | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const searchPhotos = () => {
    api.search
      .getPhotos({ query, orientation: "portrait", perPage: 6 })
      .then((result) => {
        if (result.type === "success") {
          setData(result);
        } else {
          console.log("something went wrong!", result.errors);
        }
      });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {" "}
          {selectedImageUrl ? "set" : "Add Image URL"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Image Search</DrawerTitle>
            <DrawerDescription>
              Search for images from Unsplash.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mb-4"
            />
            <Button onClick={searchPhotos}>Search</Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {data?.response.results.map((photo) => (
              <Image
                key={photo.id}
                src={photo.urls.regular}
                width="120"
                height="120"
                alt=""
                className={`w-full h-auto ${
                  selectedImageId === photo.id ? "border-4 border-black" : ""
                }`}
                onClick={() => {
                  setSelectedImageUrl(photo.urls.regular);
                  setSelectedImageId(photo.id);
                }}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
