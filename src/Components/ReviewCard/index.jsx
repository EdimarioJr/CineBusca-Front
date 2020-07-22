import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import movieApi from "../../services/movieApi";
import dbAPI from "../../services/dbAPI";
import { CommonButton } from "../../commonStyle";

const ReviewContainer = styled.section`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;

  img {
    height: inherit;
    width: 100%;
  }

  .movieInfo {

    overflow: auto;
    color: white;
    padding-right: 15px;
    padding-left: 10px;
    background-color: #383d48;

    h3 {
      margin-top: 20px;
      margin-bottom: 5px;
    }

    h4 {
      font-weight: 300;
    }

    p {
      height: calc(100% - 130px);
      font-weight: 500;
    }
  }
`;

const ReviewCard = (props) => {
  const [movie, setMovie] = useState("");

  useEffect(() => {
    (async () => {
      await movieApi
        .get(
          `movie/${props.idMovie}?api_key=${process.env.REACT_APP_MOVIE_API}`
        )
        .then((response) => setMovie(response.data));
    })();
  }, [props.idMovie]);

  async function handleDelete() {
    await dbAPI.delete("/reviews", {
      params: {
        idMovie: props.idMovie,
      },
    });
    props.deleteReview(props.idMovie);
  }

  return (
    <>
      <ReviewContainer>
        <img
          src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt="movie poster"
        />
        <div className="movieInfo">
          <h3>{movie.original_title}</h3>
          <h4>{props.date.slice(0, 9).replaceAll("-", "/")}</h4>
          <p>{props.review}</p>
          <CommonButton onClick={handleDelete}>Delete review</CommonButton>
        </div>
      </ReviewContainer>
    </>
  );
};

ReviewCard.propTypes = {
  idMovie: PropTypes.number,
  review: PropTypes.string,
  deleteReview: PropTypes.func,
  date: PropTypes.string,
};

export default ReviewCard;
