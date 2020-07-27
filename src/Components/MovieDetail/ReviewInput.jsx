import React, { useState, useEffect } from "react";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import { ReviewContainer, AddReview, CancelReview } from "./style";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const reviewVariants = {
  initial: { opacity: 0, y: -20 },
  final: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ReviewInput = ({ id, isReview }) => {
  const [review, setReview] = useState("");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (auth.isAuthenticated()) {
        dbAPI.get("/reviews").then((response) => {
          const { reviews, message } = response.data;
          if (reviews) {
            reviews.forEach((review) => {
              if (review.idMovie === id) setReview(review.review);
            });
          } else {
            alert(message);
            auth.logout();
            history.push("/");
          }
        });
      }
    })();
  }, [id, history]);

  async function handleAddReview() {
    if (auth.isAuthenticated()) {
      await dbAPI.post("/reviews", { idMovie: id, review }).then((response) => {
        alert(response.data.message);
        if (!response.data.review) history.push("/");
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
      <motion.div initial="initial" animate="final" variants={reviewVariants}>
        <textarea
          placeholder="Add a review..."
          onChange={(event) => setReview(event.target.value)}
          value={review}
        ></textarea>
        <div className="rowButtons">
          <AddReview onClick={handleAddReview}>Add Review</AddReview>
          <CancelReview onClick={handleCancelReview}>Cancel</CancelReview>
        </div>
      </motion.div>
    </ReviewContainer>
  );
};

export default ReviewInput;
