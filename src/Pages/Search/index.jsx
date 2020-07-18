import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import { Container } from "../../commonStyle";
import movieApi from "../../config/movieApi";
import MovieCard from "../../Components/MovieCard";
import { CommonButton } from "../../commonStyle";

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

const LoadMore = styled(CommonButton)`
  width: 100%;
  margin: 30px 0;
  padding: 30px 0;
  font-weight: 700;
  font-size: 24px;
`;

const SearchResults = (props) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setActualPage(1);
    setMovies([])
  }, [location.search]);

  useEffect(() => {
    const query = location.search.replace("?", "").trim();
    (async () => {
      movieApi
        .get(
          `search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${query}&page=${actualPage}`
        )
        .then((response) => {
          console.log(response.data);
          if (actualPage === 1) {
            setTotalPages(response.data.total_pages);
            setMovies(response.data.results);
          } else {
            const newMovies = [...movies, ...response.data.results];
            setMovies(newMovies);
          }
        });
    })();
    //eslint-disable-next-line
  }, [location.search, actualPage]);

  return (
    <>
      <Header />
      <Container>
        <SearchContainer>
          <h1>Search Results</h1>
          <div className="grid">
            {movies.length ? (
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
              <h1>No Movies Found!</h1>
            )}
          </div>
        </SearchContainer>
        {actualPage >= totalPages ? (
          ""
        ) : (
          <LoadMore onClick={() => setActualPage(actualPage + 1)}>
            Load More Search Results
          </LoadMore>
        )}
      </Container>
    </>
  );
};

export default SearchResults;
