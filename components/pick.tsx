import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BadgesCard from "../components/badgescard";

interface PickProps {
  imageSrc: string;
  keywords: { [keyword: string]: string };
}

export default function Pick({ imageSrc, keywords }: PickProps) {
  return (
    <div className="p-2 bg-gray-200 rounded-lg shadow-xl flex flex-col md:flex-row w-full md:w-120 h-180">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.2 }}
      >
        <Image src={imageSrc} width={300} height={400} alt="Image" className="rounded-md image-fixed" />
      </motion.div>
      {/* <BadgesCard className="border-0" keywords={keywords} /> */}
    </div>
  );
}
