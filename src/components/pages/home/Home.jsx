import React, { useEffect, useState } from "react";
import axios from "axios";
import CardMovie from "../../common/cardMovie/CardMovie";

import styles from "./Home.module.css";
import Header from "../../common/header/Header";

import confetti from "canvas-confetti"

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [dispatchLike, setDispatchLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));

      setDispatchLike(false)
  }, [dispatchLike]);

  const handleLike = (movie) => {

    if( !movie.isLiked ){
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0
        }
      })
    }

    axios
      .patch(`http://localhost:5000/movies/${movie.id}`, {
        isLiked: !movie.isLiked,
      })
      .then( res => setDispatchLike(true))
      .catch(err => console.log(err))
  };

  const moviesFiltered = movies.filter( movie => movie.isLiked)

  return (
    <>
    <Header setFavorite={setFavorite} />
      <div className={styles.containerCards}>

        {
          !favorite ? (
            movies.map((movie) => {
              return (
                <CardMovie movie={movie} key={movie.id} handleLike={handleLike} />
              );
            })  
          ) : (
            moviesFiltered.map((movie) => {
              return (
                <CardMovie movie={movie} key={movie.id} handleLike={handleLike} />
              );
            })  
          )
        }
      </div>
    </>
  );
};

export default Home;
