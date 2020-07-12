import React, { useState, useEffect } from "react";
import movieApi from "../../config/movieApi";
import styled from "styled-components";
import { Container } from "../../commonStyle";
import MovieDetail from "../../Components/MovieDetail";
import Header from "../../Components/Header";
import NoImage from "../../assets/no-image.jpg";

const CastContainer = styled.section`
  background-color: black;
  width: 100%;
  padding: 30px;
`;
const Cast = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;

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
      text-overflow: ellipsis;
      overflow: hide;
    }
  }
`;

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [id, setId] = useState(props.match.params.id);

  useEffect(() => {
    (async () => {
      movieApi
        .get(`movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}`)
        .then((response) => {
          console.log(response.data);
          setMovie(response.data);
          movieApi
            .get(
              `movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API}`
            )
            .then((response) => {
              setActors(response.data.cast);
              console.log(response.data);
            });
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
              <h1>Actors</h1>
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
                        {actor.name} as {actor.character}
                      </p>
                    </div>
                  );
                })}
              </Cast>
            </CastContainer>
          </>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default Movie;
