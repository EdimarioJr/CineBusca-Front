import React, { useState, useEffect } from "react";
import movieApi from "../../services/movieApi";
import { Gallery } from "./style";
import { Container } from "../../commonStyle";
import MovieDetail from "../../Components/MovieDetail";
import Header from "../../Components/Header";
import PropTypes from "prop-types";
import Carousel from "../../Components/Carousel";
import Cast from "./Cast";
import Recommendations from "./Recommendations";

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      movieApi
        .get(`movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}`)
        .then((response) => {
          setMovie(response.data);
        });
    })();
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        {movie ? (
          <>
            <MovieDetail movieInfo={{ ...movie, director }} />
            <Cast putDirector={setDirector} id={id} />
            <Gallery>
              <Carousel idMovie={id} />
            </Gallery>
            <Recommendations id={id} movieTitle={movie.original_title} />
          </>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

Movie.propTypes = {
  id: PropTypes.string,
};

export default Movie;
