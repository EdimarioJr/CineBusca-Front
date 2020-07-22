import React, { useState, useEffect } from "react";
import { WatchlistContainer, RemoveButton } from "./style";
import MovieCard from "../../Components/MovieCard";
import authentication from "../../services/auth";
import { useHistory } from "react-router-dom";
import dbAPI from "../../services/dbAPI";
import movieApi from "../../services/movieApi";
import Header from "../../Components/Header";
import { Container } from "../../commonStyle";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  async function handleRemove(event) {
    if (authentication.isAuthenticated()) {
      const idMovie = event.target.id;
      await dbAPI.delete("/watchlist", { params: { idMovie } });
      const newMovies = movies.filter((movie) => {
        return movie.id !== Number(idMovie);
      });
      setMovies(newMovies);
    } else {
      alert("Você não tem permissão para fazer essa operação!");
      history.push("/");
    }
  }

  useEffect(() => {
    (async () => {
      dbAPI.get("/watchlist").then(async (response) => {
        let { watchlist, auth, message } = response.data;
        if (auth) {
          let moviesWatchlist = await Promise.all(
            watchlist.map(async (current) => {
              let aux = await movieApi.get(
                `movie/${current}?api_key=${process.env.REACT_APP_MOVIE_API}`
              );
              return aux.data;
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
      <Header  watchlist />
      <Container>
        <WatchlistContainer>
          <section className="grid">
            {movies.length ? (
              movies.map((movie, index) => {
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
              })
            ) : (
              <h2>No movies yet</h2>
            )}
          </section>
        </WatchlistContainer>
      </Container>
    </>
  );
};

export default Watchlist;
