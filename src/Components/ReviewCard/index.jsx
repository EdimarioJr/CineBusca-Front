import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MovieData from "../../services/movieApi";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import { CommonButton } from "../../commonStyle";
import { useHistory } from "react-router-dom";
import { ReviewContainer } from "./style";

const ReviewCard = ({ idMovie, date, review, deleteReview }) => {
  const [movie, setMovie] = useState("");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await MovieData.getMovie(idMovie).then((response) => setMovie(response));
    })();
  }, [idMovie]);

  async function handleDelete() {
    if (auth.isAuthenticated()) {
     const response =  await dbAPI.delete("/reviews", {
        params: {
          idMovie,
        },
      });
      if(response.data.review) 
        deleteReview(idMovie);
      else {
        alert(response.data.message)
        auth.logout()
        history.push("/")
      }
    } else {
      alert("You don't have the permission to do this!");
      history.push("/login");
    }
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
          <h4>{date.slice(0, 9).replaceAll("-", "/")}</h4>
          <p>{review}</p>
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
