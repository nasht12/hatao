import React from "react";
import Image from "next/image";
import BadgesCard from "../components/badgescard";

interface PickProps {
  imageSrc: string;
  keywords: { [keyword: string]: string };
}
export default function Pick({ imageSrc, keywords }: PickProps) {

  return (
    <div className="m-2 p-4 rounded-lg shadow-xl flex flex-col md:flex-row w-120 h-180">
      <Image src={imageSrc} width={300} height={400} alt="Image" className="rounded-md image-fixed" />
      <BadgesCard className="border-0" keywords={keywords} />
    </div>
  );
}
