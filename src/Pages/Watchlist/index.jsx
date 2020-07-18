import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "../../Components/MovieCard";
import authentication from "../../config/auth";
import { useHistory } from "react-router-dom";
import dbAPI from "../../config/dbAPI";
import movieApi from "../../config/movieApi";
import Header from "../../Components/Header";
import { Container, CommonButton } from "../../commonStyle";

const WatchlistContainer = styled.main`
  width: 100%;

  h1 {
    color: white;
    margin-bottom: 30px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const RemoveButton = styled(CommonButton)`
  width: 100%;
  margin-top: 5px;
  background-color: #fc0349;
  border-radius: 7px;
`;

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
      <Header />
      <Container>
        <WatchlistContainer>
          <h1>My Watchlist</h1>
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
