import React, { useState, useEffect } from "react";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import { ReviewContainer, AddReview, CancelReview } from "./style";

const ReviewInput = ({ id, director, title , isReview}) => {
  const [review, setReview] = useState("");

  useEffect(() => {
    (async () => {
      if (auth.isAuthenticated()) {
        dbAPI.get("/reviews").then((response) => {
          const reviews = response.data;
          reviews.forEach((review) => {
            if (review.idMovie === id) setReview(review.review);
          });
        });
      }
    })();
  }, [id]);

  async function handleAddReview() {
    if (auth.isAuthenticated()) {
      await dbAPI
        .post("/reviews", { idMovie: id, review })
        .then((response) => { console.log(response)
            alert(response.data.message)});
    } else alert("Do the login to perform this operation!");
  }

  function handleCancelReview() {
    isReview(false);
    setReview("");
  }
  return (
    <ReviewContainer>
      <h1>
        {title} <span id="director">by {director}</span>
      </h1>
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

export default ReviewInput;
