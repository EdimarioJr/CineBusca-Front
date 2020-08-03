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
  date = date.slice(0, 10).replaceAll("-", "/");

  useEffect(() => {
    (async () => {
      await MovieData.getMovie(idMovie).then((response) => setMovie(response));
    })();
  }, [idMovie]);

  async function handleDelete() {
    if (auth.isAuthenticated()) {
      const response = await dbAPI.delete("/reviews", {
        params: {
          idMovie,
        },
      });
      if (response.data.review) deleteReview(idMovie);
      else {
        // if the token expires will enter in this else
        alert(response.data.message);
        auth.logout();
        history.push("/");
      }
    } else {
      // if there is no token in the sessionStorage
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
          <h4>{date}</h4>
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
