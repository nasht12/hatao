import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BadgesCard from "../components/badgescard";
import { cn } from "@/lib/utils";

interface PickProps {
  imageSrc: string;
  // keywords: { [keyword: string]: string };
}

export default function Pick({ imageSrc }: PickProps) {
  return (
    <div className="p-2 bg-gray-200 rounded-lg overflow-hidden shadow-xl flex flex-col md:flex-row w-full md:w-120">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={imageSrc}
          width={300}
          height={300}
          alt="Image"
          className={cn(
            "h-96 w-auto rounded-md object-cover transition-all hover:scale-102",
            "aspect-[3/4]"
          )}
        />
      </motion.div>
      {/* <BadgesCard className="border-0" keywords={keywords} /> */}
    </div>
  );
}
