"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const MoviePosterSearch = () => {
  const [title, setTitle] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const searchMovie = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_ACCESS_KEY}&t=${encodeURIComponent(title)}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      setPosterUrl(data.Poster);
    } else {
      alert(data.Error);
    }
  };

  return (
    <div>
      <div className="flex m-2 p-2 gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <Button onClick={searchMovie}>Search</Button>
      </div>
      {posterUrl && (
        <Image
          src={posterUrl}
          alt="Movie Poster"
          width="0"
          height="0"
          sizes="100vw"
          className="w-32 h-auto"
        />
      )}
      <p>{posterUrl}</p>
    </div>
  );
};

export default MoviePosterSearch;
