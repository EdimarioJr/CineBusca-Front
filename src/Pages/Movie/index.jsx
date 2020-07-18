import React, { useState, useEffect } from "react";
import movieApi from "../../services/movieApi";
import {
  CastContainer,
  RecommendationsContainer,
  Gallery,
  Cast,
} from "./style";
import { Container } from "../../commonStyle";
import MovieDetail from "../../Components/MovieDetail";
import Header from "../../Components/Header";
import NoImage from "../../assets/no-image.jpg";
import MovieCard from "../../Components/MovieCard";
import Carousel from "../../Components/Carousel";

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      movieApi
        .get(`movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}`)
        .then((response) => {
          setMovie(response.data);
        });
      movieApi
        .get(`movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API}`)
        .then((response) => {
          setActors(response.data.cast);
        });
      movieApi
        .get(
          `movie/${id}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API}`
        )
        .then((response) => {
          setRecommendations(response.data.results);
        });
    })();
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        {movie ? (
          <>
            <MovieDetail movieInfo={movie} />
            <CastContainer>
              <h1>Cast</h1>
              <Cast>
                {actors.map((actor, index) => {
                  return (
                    <div className="actorCard" key={index}>
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
                            : NoImage
                        }
                        alt={actor.name}
                      />
                      <p>
                        <b>{actor.name}</b> as <b>{actor.character}</b>
                      </p>
                    </div>
                  );
                })}
              </Cast>
            </CastContainer>
            <Gallery>
              <Carousel idMovie={id} />
            </Gallery>
            <RecommendationsContainer>
              <h1>
                If you like <span>{movie.original_title}</span>, you would like
                these...
              </h1>
              <div className="recommendation-grid">
                {recommendations.slice(0, 8).map((movie, index) => {
                  return (
                    <MovieCard
                      idMovie={movie.id}
                      title={movie.original_title}
                      score={movie.vote_average}
                      poster={movie.poster_path}
                      key={index}
                    />
                  );
                })}
              </div>
            </RecommendationsContainer>
          </>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default Movie;
