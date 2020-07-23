import React, { useEffect, useState } from "react";
import { Main } from "./style";
import { Container } from "../../commonStyle";
import Header from "../../Components/Header";
import CineCarousel from "../../Components/Carousel";
import MovieCard from "../../Components/MovieCard";
import MovieData from "../../services/movieApi";
import { LoadMore } from "../../commonStyle";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    (async () => {
      await MovieData.getPopularMovies(page)
        .then((response) => {
          if (page === 2) setMovies(response.results);
          else {
            const newMovies = [...movies, ...response.results];
            setMovies(newMovies);
          }
        });
    })();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <Header />
      <CineCarousel />
      <Container>
        <Main>
          <h1>Popular Movies</h1>
          <section className="grid-movies">
            {movies.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  idMovie={movie.id}
                  title={movie.original_title}
                  score={movie.vote_average}
                  poster={movie.poster_path}
                />
              );
            })}
          </section>
          <LoadMore
            onClick={() => {
              let newPage = page + 1;
              setPage(newPage);
            }}
          >
            LOAD MORE!
          </LoadMore>
        </Main>
      </Container>
    </>
  );
}

export default App;
