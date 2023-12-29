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
      `http://www.omdbapi.com/?apikey=70c381f9&t=${encodeURIComponent(title)}`
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
        <Image src={posterUrl} alt="Movie Poster" width={300} height={300} />
      )}
      <p>{posterUrl}</p>
    </div>
  );
};

export default MoviePosterSearch;
