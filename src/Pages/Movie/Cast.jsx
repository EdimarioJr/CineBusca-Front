import React, { useState, useEffect } from "react";
import { CastContainer, CastCards } from "./style";
import movieApi from "../../services/movieApi";
import NoImage from "../../assets/no-image.jpg";
import PropTypes from "prop-types";

const Cast = ({ id, putDirector }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    (async () => {
      movieApi
        .get(`movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API}`)
        .then((response) => {
          setCast(response.data.cast);
          response.data.crew.forEach((current) => {
            if (current.job === "Director") putDirector(current.name);
          });
        });
    })();
    // eslint-disable-next-line
  }, [id]);

  return (
    <CastContainer>
      <h1>Cast</h1>
      <CastCards>
        {cast.map((actor, index) => {
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
      </CastCards>
    </CastContainer>
  );
};

Cast.propTypes = {
  id: PropTypes.string,
  putDirector: PropTypes.func,
};

export default Cast;
