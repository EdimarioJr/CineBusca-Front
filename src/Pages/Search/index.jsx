import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import { Container } from "../../commonStyle";
import movieApi from "../../config/movieApi";
import MovieCard from "../../Components/MovieCard";

const SearchContainer = styled.main`
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
`;

const SearchResults = (props) => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = location.search.replace("?", "").trim();
    (async () => {
      movieApi
        .get(
          `search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${query}&page=1`
        )
        .then((response) => {
          setMovies(response.data.results);
        });
    })();
  }, [location]);

  return (
    <>
      <Header />
      <Container>
        <SearchContainer>
          <h1>Search Results</h1>
          <div className="grid">
            {movies ? (
              movies.map((movie, index) => {
                return (
                  <MovieCard
                    key={index}
                    idMovie={movie.id}
                    poster={movie.poster_path}
                    title={movie.original_title}
                    score={movie.vote_average}
                  />
                );
              })
            ) : (
              <h1>Searching...</h1>
            )}
          </div>
        </SearchContainer>
      </Container>
    </>
  );
};

export default SearchResults;
