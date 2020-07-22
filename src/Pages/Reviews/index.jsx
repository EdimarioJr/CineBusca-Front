import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../Components/Header";
import ReviewCard from "../../Components/ReviewCard";
import { Container } from "../../commonStyle";
import dbAPI from "../../services/dbAPI";

const ReviewsContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  color: white;
`;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      await dbAPI.get("/reviews").then((response) => setReviews(response.data));
    })();
  }, []);

  function handleDeleteReview(id) {
    const newReviews = reviews.filter((current) => {
      return current.idMovie !== id;
    });
    setReviews(newReviews);
  }

  return (
    <>
      <Header review />
      <Container>
        <ReviewsContainer>
          {reviews.length !== 0 ? (
            reviews.map((review, index) => {
              return (
                <ReviewCard
                  idMovie={review.idMovie}
                  review={review.review}
                  deleteReview={handleDeleteReview}
                  key={index}
                />
              );
            })
          ) : (
            <h1>No reviews</h1>
          )}
        </ReviewsContainer>
      </Container>
    </>
  );
};

export default Reviews;
