import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "../../Components/MovieCard";
import jwtDecode from "jwt-decode";
import auth from "../../config/auth";
import { useHistory, Link } from "react-router-dom";
import dbAPI from "../../config/dbAPI";
import NoImage from "../../assets/no-image.jpg";
import Header from "../../Components/Header";
import { Container } from "../../commonStyle";

const WatchlistContainer = styled.main`
  width: 100%;

  h1 {
    color: white;
    margin-bottom: 30px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(1, 4fr);
    grid-gap: 20px;
  }
`;

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      dbAPI.get("/watchlist").then((response) => {
        const { watchlist, auth, message } = response.data;
        if (auth) {
          setMovies(watchlist);
        } else {
          alert(message);
          auth.logout();
          history.push("/");
        }
      });
    })();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <WatchlistContainer>
          <h1>My Watchlist</h1>
          <section className="grid">
          {console.log(movies)}
            {movies.length ? (
              movies.map((movie, index) => {
                return (
                  <Link
                    to={`/Movie/${movie.id}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <MovieCard
                      title={movie.original_title}
                      score={movie.vote_average}
                      poster={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                          : NoImage
                      }
                    />
                  </Link>
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
