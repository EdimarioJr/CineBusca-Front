import React from "react";
import { MovieContainer } from "./style";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoImage from "../../assets/no-image.jpg";

const MovieCard = (props) => {
  return (
    <Link to={`/Movie/${props.idMovie}`} style={{ textDecoration: "none" }}>
      <MovieContainer>
        <img
          src={
            props.poster
              ? `https://image.tmdb.org/t/p/w342/${props.poster}`
              : NoImage
          }
          alt={props.title}
        />
        <div className="legend">
          <h3>{props.score}</h3>
          <p>{props.title}</p>
        </div>
      </MovieContainer>
    </Link>
  );
};

MovieCard.propTypes = {
  id: PropTypes.string,
  poster: PropTypes.string,
  score: PropTypes.number,
  title: PropTypes.string,
};

export default MovieCard;
