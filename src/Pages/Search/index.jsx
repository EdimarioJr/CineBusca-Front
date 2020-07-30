import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import { ContainerPages, LoadMore } from "../../commonStyle";
import MovieCard from "../../Components/MovieCard";
import { SearchContainer } from "./style";
import MovieData from "../../services/movieApi";
import { motion } from "framer-motion";
import { opacityAnimation } from "../../commonStyle";
import Footer from "../../Components/Footer";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  // the actual page always begin in 1
  const [actualPage, setActualPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    // reset the states after a new search
    setActualPage(1);
    setMovies([]);
  }, [location.search]);

  useEffect(() => {
    // getting the search query from the location and formatting
    const query = location.search.replace("?", "").trim();
    let isMounted = true;
    (async () => {
      await MovieData.searchMovie(query, actualPage).then((response) => {
        if (isMounted) {
          // same logic behind the Homepage pagination
          if (actualPage === 1) {
            setTotalPages(response.total_pages);
            setMovies(response.results);
          } else {
            setMovies((oldMovies) => [...oldMovies, ...response.results]);
          }
        }
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [location.search, actualPage]);

  return (
    <>
      <Header />
      <ContainerPages>
        <SearchContainer>
          <h1>Search Results</h1>
          {movies.length !== 0 ? (
            <motion.div className="grid">
              {movies.map((movie, index) => {
                return (
                  <motion.div
                    variants={opacityAnimation}
                    initial="initial"
                    animate="final"
                    key={index}
                  >
                    <MovieCard
                      idMovie={movie.id}
                      poster={movie.poster_path}
                      title={movie.original_title}
                      score={movie.vote_average}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <h1>No Movies Found!</h1>
          )}
        </SearchContainer>

        {actualPage >= totalPages ? (
          ""
        ) : (
          <LoadMore onClick={() => setActualPage(actualPage + 1)}>
            Load More Search Results
          </LoadMore>
        )}
      </ContainerPages>
      <Footer />
    </>
  );
};

export default SearchResults;
