import { useState, useEffect } from "react";
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
import { CheckIcon } from '@radix-ui/react-icons'


type Photo = {
  id: string;
  urls: {
    regular: string;
  };
};

interface DrawerDemoProps {
  inputText: string;
  onUrlSelect: (url: string) => void;
}

const api = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
});

export const DrawerDemo: React.FC<DrawerDemoProps> = ({ inputText, onUrlSelect }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<{
    response: { results: Photo[] };
    errors?: string[];
  } | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleUrlSelect = (url: string) => {
    // ...existing code...
    onUrlSelect(url);
  };

  const searchPhotos = () => {
    api.search
      .getPhotos({ query: inputText || "abstract", orientation: "portrait", perPage: 6 })
      .then((result) => {
        if (result.type === "success") {
          setData(result);
        } else {
          console.log("something went wrong!", result.errors);
        }
      });
  };

  useEffect(() => {
    searchPhotos();
  }, [inputText]);

  console.log('inputText', inputText);


  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {" "}
          {selectedImageUrl ? <CheckIcon /> : "Add Image URL"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{inputText ? `Results for "${inputText}"` : "No results"}</DrawerTitle>
            <DrawerDescription>
              
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex">
            {/* <Input
              type="text"
              value={inputText}
              onChange={(e) => {setQuery(e.target.value), setSearchText(e.target.value)}}
              className="mr-4"
            />
            <Button onClick={searchPhotos}>Search</Button> */}
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
                  handleUrlSelect(photo.urls.regular);
                  setSelectedImageId(photo.id);
                }}
              />
            ))}
          </div>
          <div className="h-8"></div> 
        </div>
      </DrawerContent>
    </Drawer>
  );
}
