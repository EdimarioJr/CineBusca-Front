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
`;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      await dbAPI.get("/reviews").then((response) => setReviews(response.data));
    })();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1>My Reviews</h1>
        <ReviewsContainer>
          {reviews.map((review, index) => {
            return (
              <ReviewCard
                idMovie={review.idMovie}
                review={review.review}
                key={index}
              />
            );
          })}
        </ReviewsContainer>
      </Container>
    </>
  );
};

export default Reviews;
