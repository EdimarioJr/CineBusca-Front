import React, { useState, useEffect } from "react";
import { WatchlistContainer, RemoveButton } from "./style";
import MovieCard from "../../Components/MovieCard";
import authentication from "../../services/auth";
import { useHistory } from "react-router-dom";
import dbAPI from "../../services/dbAPI";
import MovieData from "../../services/movieApi";
import Header from "../../Components/Header";
import { Container } from "../../commonStyle";
import { motion } from "framer-motion";
import {opacityAnimation} from '../../commonStyle'

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  async function handleRemove(event) {
    if (authentication.isAuthenticated()) {
      const idMovie = event.target.id;
      const response = await dbAPI.delete("/watchlist", {
        params: { idMovie },
      });
      if (response.data.watchlist) {
        let newMovies = [];
        movies.forEach((movie) => {
          if (movie) if (movie.id !== Number(idMovie)) newMovies.push(movie);
        });
        setMovies(newMovies);
      } else {
        alert(response.data.message);
        authentication.logout();
        history.push("/");
      }
    } else {
      alert("You don't have the permission to do this!");
      history.push("/login");
    }
  }

  useEffect(() => {
    (async () => {
      dbAPI.get("/watchlist").then(async (response) => {
        let { watchlist, message } = response.data;
        if (watchlist) {
          let moviesWatchlist = await Promise.all(
            watchlist.map(async (current) => {
              if (current) {
                let aux = await MovieData.getMovie(current);
                return aux;
              }
            })
          );
          setMovies(moviesWatchlist);
        } else {
          alert(message);
          authentication.logout();
          history.push("/");
        }
      });
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Header watchlist />
      <Container>
        <motion.div initial="initial" animate="final" variants={opacityAnimation}>
          <WatchlistContainer>
            <section className="grid">
              {movies.length ? (
                movies.map((movie, index) => {
                  if (movie) {
                    return (
                      <div className="card" key={index}>
                        <MovieCard
                          idMovie={movie.id}
                          title={movie.original_title}
                          score={movie.vote_average}
                          poster={movie.poster_path}
                        />
                        <RemoveButton id={movie.id} onClick={handleRemove}>
                          Remove from watchlist
                        </RemoveButton>
                      </div>
                    );
                  } else return movie;
                })
              ) : (
                <h2>No movies yet</h2>
              )}
            </section>
          </WatchlistContainer>
        </motion.div>
      </Container>
    </>
  );
};

export default Watchlist;
