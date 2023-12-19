import React from "react";
import Image from "next/image";
import BadgesCard from "../components/badgescard";

export default function Pick() {
  return (
    <div className="m-2 p-4 rounded-lg shadow-xl flex flex-col md:flex-row">
      <Image src="/content/elip.jpg" width={300} height={400} alt="Image" className="rounded-md" />
      <BadgesCard className="border-0" />
    </div>
  );
}
