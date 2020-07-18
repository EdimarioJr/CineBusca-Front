import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoImage from "../../assets/no-image.jpg";

const MovieContainer = styled.div`
  background-color: #383d48;
  color: white;
  width: 275px;
  height: 460px;
  border-radius: 7px;

  &:hover {
    cursor: pointer;
    border: 1px solid #107ee5;
    position: relative;
    top: -20px;
    transition: all 0.5s;
  }

  img {
    height: 80%;
    width: 100%;
    border-radius: 7px;
  }

  .legend {
    width: 100%;
    padding: 10px 0;
    padding-left: 15px;
    padding-right: 10px;

    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

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
