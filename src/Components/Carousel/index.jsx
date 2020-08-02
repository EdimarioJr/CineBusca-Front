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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // fetch the movies Images.
  useEffect(() => {
    // prevent memory leaks, the component will only set the State if its mounted
    let isMounted = true;
    // getting the window size
    window.addEventListener("resize", handleResize);
    setIsLoading(true);
    async function fetchData() {
      idMovie && isMounted
        ? await MovieData.getMovieImages(idMovie).then((response) => {
            setMovies(response.backdrops);
            setIsLoading(false);
          })
        : await MovieData.getPopularMovies().then((response) => {
            setMovies(response.results);
            setIsLoading(false);
          });
    }
    fetchData();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [idMovie]);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }
  // the number in the slides shown in the carousel depends on the screen width
  function numberOfSlides() {
    if (idMovie) {
      return 1;
    } else {
      if (windowWidth <= 768) {
        return 2;
      }
      if (windowWidth > 768 && windowWidth <= 1152) {
        return 3;
      }
      return 4;
    }
  }

  return (
    <>
      <DivCarousel>
        {isLoading ? (
          <Loading />
        ) : (
          <Carousel
            slidesToShow={numberOfSlides()}
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
