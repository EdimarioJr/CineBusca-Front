import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import ReviewCard from "../../Components/ReviewCard";
import { Container } from "../../commonStyle";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import { useHistory } from "react-router-dom";
import {ReviewsContainer} from './style'

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (auth.isAuthenticated())
        await dbAPI.get("/reviews").then((response) => {
          const { reviews, message } = response.data;
          if (reviews) setReviews(reviews);
          else {
            auth.logout();
            alert(message);
            history.push("/");
          }
        });
    })();
    //eslint-disable-next-line
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
                  date={review.date}
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
