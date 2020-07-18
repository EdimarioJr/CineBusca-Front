import React, { useState, useEffect } from "react";
import styled from "styled-components";
import movieApi from "../../config/movieApi";
import Carousel from "nuka-carousel";

import { Link } from "react-router-dom";

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

const CineCarousel = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      props.idMovie
        ? await movieApi
            .get(
              `movie/${props.idMovie}/images?api_key=${process.env.REACT_APP_MOVIE_API}`
            )
            .then((response) => {
              setMovies(response.data.backdrops);
            })
        : await movieApi
            .get(
              `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&sort_by=popularity.desc`
            )
            .then((response) => {
              setMovies(response.data.results);
            });
    }
    fetchData();
    //eslint-disable-next-line
  }, [props.idMovie]);
  return (
    <>
      <DivCarousel>
        <Carousel
          slidesToShow={props.idMovie ? 1 : 4}
          swiping={true}
          defaultControlsConfig={{
            pagingDotsStyle: {
              fill: "white",
            },
          }}
        >
          {props.idMovie
            ? movies.map((movie, index) => {
                return (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.file_path}`}
                    alt={"gallery"}
                    key={index}
                  />
                );
              })
            : movies.map((movie, index) => {
                return (
                  <Link
                    to={`/Movie/${movie.id}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w342/${
                        movie.poster_path
                          ? movie.poster_path
                          : movie.backdrop_path
                      }`}
                      alt={movie.original_title}
                    />
                  </Link>
                );
              })}
        </Carousel>
      </DivCarousel>
    </>
  );
};

export default CineCarousel;
