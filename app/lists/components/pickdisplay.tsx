"use client";
import React, { useState, useEffect } from "react";
import Pick from "../../../components/pick";
import PickInfo from "../../../components/pick";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { picksData } from "../data/pickdata";
import { slugToNoSpace, getPickData, getPickDataIndex } from "@/lib/utils";
import { toast } from "sonner";
import path from 'path';


interface Item {
  name: string;
  url: string;
}

interface Campaign {
  category: string;
  subcategory: string;
  campaignName: string;
  items: Item[];
}

interface Props {
  lists: Item[];
}

export default function PicksDisplay( { lists }: Props) {
  const initialPicks = lists;
  const [picks, setPicks] = useState(initialPicks.slice(0, 2));
  const [shownIndices, setShownIndices] = useState([0, 1]);
  const [allPicksShown, setAllPicksShown] = useState(false);
  const [finalClickedIndex, setFinalClickedIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (clickedIndex: number) => {
    const notClickedIndex = clickedIndex === 0 ? 1 : 0;
    setFinalClickedIndex(clickedIndex);

    let nextIndex = (Math.max(...shownIndices) + 1) % initialPicks.length;

    // If all picks have been shown, show an empty pick
    if (shownIndices.length === initialPicks.length) {
      setPicks((prevPicks) => {
        const newPicks = [...prevPicks];
        newPicks[notClickedIndex] = { name:"", url: "" };
        return newPicks;
      });
      setAllPicksShown(true);
      return;
    }

    // If the next index has already been shown, find the next one that hasn't
    while (shownIndices.includes(nextIndex)) {
      nextIndex = (nextIndex + 1) % initialPicks.length;
    }

    setShownIndices((prevIndices) => [...prevIndices, nextIndex]);

    setPicks((prevPicks) => {
      const newPicks = [...prevPicks];
      newPicks[notClickedIndex] = initialPicks[nextIndex];
      return newPicks;
    });
  };

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (allPicksShown) {
      toast("Your Top Pick", {
        description: "All of your picks are now displayed.",
      });
    }
  }, [allPicksShown]);

  return (
    <div className="flex flex-row gap-4">
      {picks.map((pick, index) => (
        <div key={pick.url} onClick={() => handleImageClick(index)}>
          {(index === finalClickedIndex || !allPicksShown) && (
            <Pick imageSrc={pick.url} />
          )}
        </div>
      ))}
      {allPicksShown && <Confetti width={width} height={height} />}
    </div>
  );
}
