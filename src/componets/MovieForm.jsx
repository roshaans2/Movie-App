import React, { useState, useEffect } from "react";
import "./MovieForm.css"

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState({});
  const [isInput,setIsInput] = useState(false)

  useEffect(() => {
    if (title.trim() !== "") {
      searchMovie(title);
      setIsInput(false)
    }
  }, [isInput]);


  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsInput(true)
  };

  const searchMovie = async (title) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=61f9147&t=${title}`
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Error fetching movie data");
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <div className="container">
    <div className="details">
      <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)} />
      <button onClick={handleSubmit}>Search</button>
        {isLoading && <p>Loading...</p>}
      {data.Plot && (
        <div className="movie-details">
          <h2>{data.Title} ({data.Year})</h2>
          <p><strong>Genre:</strong> {data.Genre}</p>
          <p><strong>Director:</strong> {data.Director}</p>
          <p><strong>Actors:</strong> {data.Actors}</p>
          <p><strong>Plot:</strong> {data.Plot}</p>
          <p><strong>IMDb Rating:</strong> {data.imdbRating}</p>
          <p><strong>Released:</strong> {data.Released}</p>
        </div>
      )}
    </div>

    {data.Plot && (
      <div className="image-container">
        <img src={data.Poster} alt="Movie Poster" className="poster" />
      </div>
    )}
  </div>
  );
};

export default MovieForm;
