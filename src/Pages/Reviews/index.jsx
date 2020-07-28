import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import ReviewCard from "../../Components/ReviewCard";
import { Container } from "../../commonStyle";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import { useHistory } from "react-router-dom";
import { ReviewsContainer } from "./style";
import { opacityAnimation } from "../../commonStyle";
import Loading from "../../Components/Loading";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (auth.isAuthenticated()) {
        setIsLoading(true);
        await dbAPI.get("/reviews").then((response) => {
          const { reviews, message } = response.data;
          if (reviews) {
            if (isMounted) {
              setReviews(reviews);
              setIsLoading(false);
            }
          } else {
            auth.logout();
            alert(message);
            history.push("/");
          }
        });
      }
    })();

    return () => (isMounted = false);
  }, [history]);

  // updating the reviews state after a delete
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
        <ReviewsContainer
          initial="initial"
          animate="final"
          variants={opacityAnimation}
        >
          {!isLoading ? (
            reviews.length !== 0 ? (
              reviews.map((review, index) => {
                return (
                  <ReviewCard
                    exit={{ opacity: 0 }}
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
            )
          ) : (
            <Loading />
          )}
        </ReviewsContainer>
      </Container>
    </>
  );
};

export default Reviews;
