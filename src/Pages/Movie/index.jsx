import React, { useState, useEffect } from "react";
import MovieData from "../../services/movieApi";
import { Gallery } from "./style";
import { ContainerPages } from "../../commonStyle";
import MovieDetail from "../../Components/MovieDetail";
import Header from "../../Components/Header";
import PropTypes from "prop-types";
import Carousel from "../../Components/Carousel";
import Cast from "./Cast";
import Recommendations from "./Recommendations";
import Loading from "../../Components/Loading";
import Footer from '../../Components/Footer'

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const idMovie = props.match.params.id;

  useEffect(() => {
    (async () => {
      // everytimes the movie is changed , will scroll to the top,fetch the data from the new movie and render the
      // loading component
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await MovieData.getMovie(idMovie).then((response) => {
        setMovie(response);
        setIsLoading(false);
      });
    })();
  }, [idMovie]);

  return (
    <>
      <Header />
      <ContainerPages>
        {!isLoading ? (
          movie ? (
            <>
              <MovieDetail movieInfo={{ ...movie, director }} />
              <Cast putDirector={setDirector} idMovie={idMovie} />
              <Gallery>
                <Carousel idMovie={idMovie} />
              </Gallery>
              <Recommendations
                idMovie={idMovie}
                movieTitle={movie.original_title}
              />
            </>
          ) : (
            ""
          )
        ) : (
          <Loading />
        )}
      </ContainerPages>
      <Footer/>
    </>
  );
};

Movie.propTypes = {
  id: PropTypes.string,
};

export default Movie;
