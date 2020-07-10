import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MovieContainer = styled.div`
  background-color: #383d48;
  color: white;
  width: 100%;
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
      margin-bottom: 10px;
      text-overflow: ellipsis;
    }
  }
`;

const MovieCard = (props) => {
  return (
    <MovieContainer>
      <img src={props.poster} alt={props.title} />
      <div className="legend">
        <h3>{props.score}</h3>
        <p>{props.title}</p>
      </div>
    </MovieContainer>
  );
};

MovieCard.propTypes = {
  poster: PropTypes.string,
  score: PropTypes.number,
  title: PropTypes.string,
};

export default MovieCard;
