import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import { Container, LoadMore } from "../../commonStyle";
import movieApi from "../../services/movieApi";
import MovieCard from "../../Components/MovieCard";
import { SearchContainer } from "./style";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setActualPage(1);
    setMovies([]);
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
