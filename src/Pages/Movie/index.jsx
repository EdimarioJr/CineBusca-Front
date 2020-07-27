import React, { useState, useEffect } from "react";
import MovieData from "../../services/movieApi";
import { Gallery } from "./style";
import { Container } from "../../commonStyle";
import MovieDetail from "../../Components/MovieDetail";
import Header from "../../Components/Header";
import PropTypes from "prop-types";
import Carousel from "../../Components/Carousel";
import Cast from "./Cast";
import Recommendations from "./Recommendations";
import Loading from "../../Components/Loading";

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await MovieData.getMovie(id).then((response) => {
        setMovie(response);
        setIsLoading(false);
      });
    })();
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        {!isLoading ? (
          movie ? (
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
          )
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

Movie.propTypes = {
  id: PropTypes.string,
};

export default Movie;
