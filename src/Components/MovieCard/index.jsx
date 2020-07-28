import React from "react";
import { MovieContainer } from "./style";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoImage from "../../assets/no-image.jpg";

const MovieCard = ({ title, poster, score, idMovie }) => {
  return (
    <Link to={`/Movie/${idMovie}`} style={{ textDecoration: "none" }}>
      <MovieContainer>
        <img
          src={poster ? `https://image.tmdb.org/t/p/w342/${poster}` : NoImage}
          alt={title}
        />
        <div className="legend">
          <h3>{score}</h3>
          <p>{title}</p>
        </div>
      </MovieContainer>
    </Link>
  );
};

MovieCard.propTypes = {
  idMovie: PropTypes.number,
  poster: PropTypes.string,
  score: PropTypes.number,
  title: PropTypes.string,
};

export default MovieCard;
