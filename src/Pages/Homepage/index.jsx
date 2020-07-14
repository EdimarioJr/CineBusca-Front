import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../commonStyle";
import Header from "../../Components/Header";
import CineCarousel from "../../Components/Carousel";
import MovieCard from "../../Components/MovieCard";
import movieApi from "../../config/movieApi";
import NoImage from "../../assets/no-image.jpg";
import { CommonButton } from "../../commonStyle";
import { Link } from "react-router-dom";

const Main = styled.section`
  width: 100%;

  h1 {
    color: white;
    margin: 30px 0;
    font-size: 36px;
  }

  .grid-movies {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    transition: all 0.5s;
  }
`;

const LoadMore = styled(CommonButton)`
  width: 100%;
  margin: 30px 0;
  padding: 30px 0;
  font-weight: 700;
  font-size: 24px;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    (async () => {
      await movieApi
        .get(
          `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&sort_by=popularity.desc&page=${page}`
        )
        .then((response) => {
          if (page === 2) setMovies(response.data.results);
          else {
            const newMovies = [...movies, ...response.data.results];
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
            })}
          </section>
          <LoadMore
            onClick={() => {
              const newPage = page + 1;
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
