import React, { useState, useEffect } from "react";
import { DivCarousel } from "./style";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import MovieData from "../../services/movieApi";
import PropTypes from "prop-types";

const CineCarousel = ({ idMovie }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      idMovie
        ? await MovieData.getMovieImages(idMovie).then((response) => {
            setMovies(response.backdrops);
          })
        : await MovieData.getPopularMovies().then((response) => {
            setMovies(response.results);
          });
    }
    fetchData();
  }, [idMovie]);
  return (
    <>
      <DivCarousel>
        <Carousel
          slidesToShow={idMovie ? 1 : 4}
          swiping={true}
          defaultControlsConfig={{
            pagingDotsStyle: {
              fill: "white",
            },
          }}
        >
          {idMovie
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

CineCarousel.propTypes = {
  idMovie: PropTypes.string,
};

export default CineCarousel;
