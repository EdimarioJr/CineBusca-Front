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
import { opacityAnimation } from "../../commonStyle";
import Loading from "../../Components/Loading";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  async function handleRemove(event) {
    if (authentication.isAuthenticated()) {
      const idMovie = event.target.id;
      const response = await dbAPI.delete("/watchlist", {
        params: { idMovie },
      });
      if (response.data.watchlist) {
        // if the delete op was successful, it will update the local movies watchlist state
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
    let isMounted = true(async () => {
      setIsLoading(true);
      dbAPI.get("/watchlist").then(async (response) => {
        let { watchlist, message } = response.data;
        if (watchlist) {
          if (watchlist.length > 0 && isMounted) {
            // getting each movie info from the movie api
            let moviesWatchlist = await Promise.all(
              watchlist.map(async (current) => {
                if (current) {
                  let aux = await MovieData.getMovie(current);
                  return aux;
                }
              })
            );
            setMovies(moviesWatchlist);
          }
          setIsLoading(false);
        } else {
          alert(message);
          authentication.logout();
          history.push("/");
        }
      });
    })();

    return () => {
      isMounted = false;
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Header watchlist />
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <WatchlistContainer>
            {movies.length !== 0 ? (
              <section className="grid">
                {movies.map((movie, index) => {
                  return (
                    <motion.div
                      initial="initial"
                      animate="final"
                      variants={opacityAnimation}
                      className="card"
                      key={index}
                    >
                      <MovieCard
                        idMovie={movie.id}
                        title={movie.original_title}
                        score={movie.vote_average}
                        poster={movie.poster_path}
                      />
                      <RemoveButton id={movie.id} onClick={handleRemove}>
                        Remove from watchlist
                      </RemoveButton>
                    </motion.div>
                  );
                })}
              </section>
            ) : (
              <h1>No movies</h1>
            )}
          </WatchlistContainer>
        )}
      </Container>
    </>
  );
};

export default Watchlist;
