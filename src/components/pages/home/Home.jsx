import React, { useEffect, useState } from "react";
import axios from "axios";
import CardMovie from "../../common/cardMovie/CardMovie";

import styles from "./Home.module.css";
import Header from "../../common/header/Header";

import confetti from "canvas-confetti";
import { Button } from "@mui/material";
import CreateMovieModal from "../../common/createMovieModal/CreateMovieModal";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [dispatchLike, setDispatchLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMovieCreate, setIsMovieCreate] = useState(false)
  const [isMovieDelete, setIsMovieDelete] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));

    setDispatchLike(false);
    setIsMovieCreate(false)
    setIsMovieDelete(false)
  }, [dispatchLike, isMovieCreate, isMovieDelete]);

  const handleLike = (movie) => {
    if (!movie.isLiked) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }

    axios
      .patch(`http://localhost:5000/movies/${movie.id}`, {
        isLiked: !movie.isLiked,
      })
      .then((res) => setDispatchLike(true))
      .catch((err) => console.log(err));
  };

  const moviesFiltered = movies.filter((movie) => movie.isLiked);

  const deleteMovieById = (id)=>{
    // console.log("este es el id: ", id)

    axios.delete(`http://localhost:5000/movies/${id}`)
      .then(res =>setIsMovieDelete(true))
      .catch(err => console.log(err))
  }

  return (
    <>
      <Header setFavorite={setFavorite} />
      <Button onClick={handleOpen}>Agregar pelicula</Button>
      <CreateMovieModal open={open}  handleClose={ handleClose } setIsMovieCreate={setIsMovieCreate} />
      <div className={styles.containerCards}>
        {!favorite
          ? movies.map((movie) => {
              return (
                <CardMovie
                  movie={movie}
                  key={movie.id}
                  handleLike={handleLike}
                  deleteMovieById={deleteMovieById}
                />
              );
            })
          : moviesFiltered.map((movie) => {
              return (
                <CardMovie
                  movie={movie}
                  key={movie.id}
                  handleLike={handleLike}
                  deleteMovieById={deleteMovieById}
                />
              );
            })}
      </div>
    </>
  );
};

export default Home;

// Create(post) Read(get) Update(put o patch) Delete(delete) ---> CRUD --- ABM ( ALTA BAJA Y MODIFICACION )
