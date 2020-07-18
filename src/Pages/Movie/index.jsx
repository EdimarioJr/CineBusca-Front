import React, { useState, useEffect } from "react";
import movieApi from "../../config/movieApi";
import styled from "styled-components";
import { Container } from "../../commonStyle";
import MovieDetail from "../../Components/MovieDetail";
import Header from "../../Components/Header";
import NoImage from "../../assets/no-image.jpg";
import MovieCard from "../../Components/MovieCard";
import Carousel from "../../Components/Carousel";

const CastContainer = styled.section`
  background-color: black;
  width: 100%;
  padding: 30px;

  h1 {
    color: white;
    margin-top: 1 0px;
    margin-bottom: 20px;
  }
`;
const Cast = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;

  .actorCard {
    margin-right: 30px;
    height: 350px;
    width: 200px;
    background-color: #c4c4c4;

    img {
      width: 200px;
      height: 250px;
    }

    p {
      padding: 5px 10px;
    }
  }
`;

const Gallery = styled.section`
  width: 100%;
  height: 600px;
  margin: 20px 0;
  background-color: black;
`;

const RecommendationsContainer = styled.section`
  width: 100%;
  margin: 30px 0;

  h1 {
    margin-bottom: 20px;
    color: white;
  }

  span {
    color: #107ee5;
  }

  .recommendation-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }
`;

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
