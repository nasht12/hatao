"use client";
import React, { useState } from "react";
import Pick from "./pick";
import PickInfo from "./pick";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

interface PickInfo {
  imageSrc: string;
  keywords: { [keyword: string]: string };
}

const initialPicks: PickInfo[] = [
  {
    imageSrc: "/content/italian.jpg",
    keywords: {
      cuisine: "Italian",
      location: "Downtown",
      price: "Moderate",
      hours: "10am - 9pm",
      rating: "4.5",
      delivery: "Yes",
      takeout: "Yes",
      reservations: "Yes",
      parking: "Street",
      alcohol: "Full Bar",
    },
  },
  {
    imageSrc: "/content/chinese.jpg",
    keywords: {
      cuisine: "Chinese",
      location: "Uptown",
      price: "Cheap",
      hours: "11am - 10pm",
      rating: "4.0",
      delivery: "No",
      takeout: "Yes",
      reservations: "No",
      parking: "Lot",
      alcohol: "Beer and Wine",
    },
  },
  {
    imageSrc: "/content/mexican.jpg",
    keywords: {
      cuisine: "Mexican",
      location: "Midtown",
      price: "Expensive",
      hours: "9am - 11pm",
      rating: "4.2",
      delivery: "Yes",
      takeout: "No",
      reservations: "Yes",
      parking: "Garage",
      alcohol: "Full Bar",
    },
  },
  {
    imageSrc: "/content/thai.jpg",
    keywords: {
      cuisine: "Thai",
      location: "Downtown",
      price: "Moderate",
      hours: "9am - 11pm",
      rating: "4.2",
      delivery: "Yes",
      takeout: "No",
      reservations: "Yes",
      parking: "Garage",
      alcohol: "Full Bar",
    },
  },
  {
    imageSrc: "/content/indian.jpg",
    keywords: {
      cuisine: "Indian",
      location: "Uptown",
      price: "Cheap",
      hours: "11am - 10pm",
      rating: "4.0",
      delivery: "No",
      takeout: "Yes",
      reservations: "No",
      parking: "Lot",
      alcohol: "Beer and Wine",
    },
  },
  {
    imageSrc: "/content/japanese.jpg",
    keywords: {
      cuisine: "Japanese",
      location: "Midtown",
      price: "Expensive",
      hours: "11am - 10pm",
      rating: "4.0",
      delivery: "No",
      takeout: "Yes",
      reservations: "No",
      parking: "Lot",
      alcohol: "Beer and Wine",
    },
  },
  {
    imageSrc: "/content/french.jpg",
    keywords: {
      cuisine: "French",
      location: "Downtown",
      price: "Moderate",
      hours: "11am - 10pm",
      rating: "4.0",
      delivery: "No",
      takeout: "Yes",
      reservations: "No",
      parking: "Lot",
      alcohol: "Beer and Wine",
    },
  },
  {
    imageSrc: "/content/greek.jpg",
    keywords: {
      cuisine: "Greek",
      location: "Uptown",
      price: "Cheap",
      hours: "11am - 10pm",
      rating: "4.0",
      delivery: "No",
      takeout: "Yes",
      reservations: "No",
      parking: "Lot",
      alcohol: "Beer and Wine",
    },
  },
  {
    imageSrc: "/content/american.jpg",
    keywords: {
      cuisine: "American",
      location: "Midtown",
      price: "Expensive",
      hours: "11am - 10pm",
      rating: "4.0",
      delivery: "No",
      takeout: "Yes",
      reservations: "No",
      parking: "Lot",
      alcohol: "Beer and Wine",
    },
  },
  {
    imageSrc: "/content/spanish.jpg",
    keywords: {
      cuisine: "Spanish",
      location: "Downtown",
      price: "Moderate",
      hours: "11am - 10pm",
      rating: "4.0",
      delivery: "No",
      takeout: "Yes",
      reservations: "No",
      parking: "Lot",
      alcohol: "Beer and Wine",
    },
  },
];

export default function PicksDisplay() {
  const [picks, setPicks] = useState(initialPicks.slice(0, 2));
  const [shownIndices, setShownIndices] = useState([0, 1]);
  const [allPicksShown, setAllPicksShown] = useState(false);
  const [finalClickedIndex, setFinalClickedIndex] = useState<number | null>(null);

  const handleImageClick = (clickedIndex: number) => {

    const notClickedIndex = clickedIndex === 0 ? 1 : 0;
    setFinalClickedIndex(clickedIndex);

    let nextIndex = (Math.max(...shownIndices) + 1) % initialPicks.length;

    // If all picks have been shown, show an empty pick
    if (shownIndices.length === initialPicks.length) {
      setPicks((prevPicks) => {
        const newPicks = [...prevPicks];
        newPicks[notClickedIndex] = { imageSrc: "", keywords: {} };
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


  return (
    <div className="flex flex-row gap-4">
      {picks.map((pick, index) => (
        <div key={pick.imageSrc} onClick={() => handleImageClick(index)}>
          {(index === finalClickedIndex || !allPicksShown) && <Pick imageSrc={pick.imageSrc} keywords={pick.keywords} />}
        </div>
      ))}
      {allPicksShown && <Confetti width={width} height={height} />}
    </div>
  );
}
