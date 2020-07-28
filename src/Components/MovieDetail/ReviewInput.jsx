import React, { useState, useEffect } from "react";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import { ReviewContainer, AddReview, CancelReview } from "./style";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const ReviewInput = ({ idMovie, isReview }) => {
  const [review, setReview] = useState("");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (auth.isAuthenticated()) {
        dbAPI.get("/reviews").then((response) => {
          const { reviews, message } = response.data;
          // if reviews!== true, it means that the auth in the DB have failed (this happens when the token expires)
          // if there is no review, the DB will return an empty Array
          if (reviews) {
            if (reviews.length !== 0)
              reviews.forEach((review) => {
                if (review.idMovie === idMovie) setReview(review.review);
              });
          } else {
            alert(message);
            auth.logout();
            history.push("/");
          }
        });
      }
    })();
  }, [idMovie, history]);

  async function handleAddReview() {
    if (auth.isAuthenticated()) {
      await dbAPI.post("/reviews", { idMovie, review }).then((response) => {
        const { message, review } = response.data;
        alert(message);
        // if the operation was not succesful, will redirect to the homepage
        if (!review) history.push("/");
      });
    } else {
      alert("Login to perform this operation!");
      history.push("/");
    }
  }

  function handleCancelReview() {
    isReview(false);
    setReview("");
  }
  return (
    <ReviewContainer>
      <textarea
        placeholder="Add a review..."
        onChange={(event) => setReview(event.target.value)}
        value={review}
      ></textarea>
      <div className="rowButtons">
        <AddReview onClick={handleAddReview}>Add Review</AddReview>
        <CancelReview onClick={handleCancelReview}>Cancel</CancelReview>
      </div>
    </ReviewContainer>
  );
};

ReviewInput.propTypes = {
  idMovie: PropTypes.number,
  idReview: PropTypes.string,
};

export default ReviewInput;
