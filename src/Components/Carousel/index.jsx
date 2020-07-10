import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import movieApi from "../../config/movieApi";

const DivCarousel = styled.div`
  width: 100%;
  height: 600px;
  backdrop-filter: blur(2px);

  h1 {
    margin: 20px 0;
  }

  img {
    height: 600px;
  }
`;

const CineCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await movieApi
        .get(
          `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&sort_by=popularity.desc`
        )
        .then((response) => {
          setMovies(response.data.results);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <DivCarousel>
        <Carousel
          slidesToShow={4}
          swiping={true}
          defaultControlsConfig={{
            pagingDotsStyle: {
              fill: "white",
            },
          }}
        >
          {movies.map((movie, index) => {
            return (
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  movie.poster_path ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.original_title}
                key={index}
              />
            );
          })}
        </Carousel>
      </DivCarousel>
    </>
  );
};

export default CineCarousel;
