import React, { useState, useEffect } from "react";
import { DivCarousel } from "./style";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import MovieData from "../../services/movieApi";
import PropTypes from "prop-types";
import Loading from "../Loading";

const CineCarousel = ({ idMovie }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mount = true;
    async function fetchData() {
      setIsLoading(true);
      idMovie
        ? await MovieData.getMovieImages(idMovie).then((response) => {
            if (mount) {
              setMovies(response.backdrops);
              setIsLoading(false);
            }
          })
        : await MovieData.getPopularMovies().then((response) => {
            if (mount) {
              setMovies(response.results);
              setIsLoading(false);
            }
          });
    }
    fetchData();
    return () => {
      mount = false;
    };
  }, [idMovie]);
  return (
    <>
      <DivCarousel>
        {isLoading ? (
          <Loading />
        ) : (
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
        )}
      </DivCarousel>
    </>
  );
};

CineCarousel.propTypes = {
  idMovie: PropTypes.string,
};

export default CineCarousel;
