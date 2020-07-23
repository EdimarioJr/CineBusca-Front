import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import { Container, LoadMore } from "../../commonStyle";
import MovieCard from "../../Components/MovieCard";
import { SearchContainer } from "./style";
import MovieData from "../../services/movieApi";

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
      await MovieData.searchMovie(query,actualPage)
        .then((response) => {
          if (actualPage === 1) {
            setTotalPages(response.total_pages);
            setMovies(response.results);
          } else {
            const newMovies = [...movies, ...response.results];
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
