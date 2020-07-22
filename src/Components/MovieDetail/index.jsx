import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  MovieContainer,
  BackgroundFilter,
  MovieInfo,
  WatchButton,
  ReviewButton,
  ReviewContainer,
  AddReview,
  CancelReview,
} from "./style";
import { CommonButton } from "../../commonStyle";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";

const MovieDetail = (props) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [modeReview, setModeReview] = useState(false);
  const [review, setReview] = useState("");
  const {
    id,
    poster_path,
    title,
    vote_average,
    genres,
    budget,
    runtime,
    overview,
    release_date,
    director,
  } = props.movieInfo;

  useEffect(() => {
    (async () => {
      dbAPI.get("/watchlist").then((response) => {
        const { watchlist } = response.data;
        if (watchlist) {
          if (watchlist.includes(String(id))) {
            setInWatchlist(true);
          } else setInWatchlist(false);
        }
      });
      if (auth.isAuthenticated()) {
        dbAPI.get("/reviews").then((response) => {
          const reviews = response.data;
          console.log(reviews);
          reviews.forEach((review) => {
            if (review.idMovie === id) setReview(review.review);
          });
        });
      }
    })();

    setModeReview(false);
    //eslint-disable-next-line
  }, [props.movieInfo]);

  async function handleAddWatchlist() {
    if (auth.isAuthenticated()) {
      if (inWatchlist) {
        await dbAPI.delete("/watchlist", { params: { idMovie: id } });
        setInWatchlist(false);
      } else {
        await dbAPI
          .post("/watchlist", { idMovie: id })
          .then((response) => console.log(response.data));
        setInWatchlist(true);
      }
    } else alert("Do the login to perform this operation!");
  }

  async function handleAddReview() {
    if (auth.isAuthenticated()) {
      await dbAPI
        .post("/reviews", { idMovie: id, review })
        .then((response) => alert(response.data.message));
    } else alert("Do the login to perform this operation!");
  }

  function handleCancelReview() {
    setModeReview(false);
    setReview("");
  }

  return (
    <>
      <MovieContainer>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          id="poster"
        />

        <MovieInfo>
          <BackgroundFilter
            back={`https://image.tmdb.org/t/p/w185/${poster_path}`}
          />
          {modeReview ? (
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
          ) : (
            <>
              <section className="info">
                <h1>
                  {title} <span id="director">by {director}</span>
                </h1>
                {auth.getToken() ? (
                  <nav className="rowButtons">
                    <WatchButton onClick={handleAddWatchlist}>
                      {inWatchlist
                        ? "Remove from Watchlist"
                        : "Add to your Watchlist"}
                    </WatchButton>
                    <ReviewButton onClick={() => setModeReview(true)}>
                      Review
                    </ReviewButton>
                  </nav>
                ) : (
                  ""
                )}

                <h2>{vote_average}</h2>
                <p className="description">{overview}</p>
                <div className="genres">
                  <p>Genres :</p>
                  {genres.map((genre, index) => (
                    <CommonButton style={{ marginRight: "10px" }} key={index}>
                      {genre.name}
                    </CommonButton>
                  ))}
                </div>
              </section>
              <div className="footer">
                <aside>
                  <p>Budget:</p>
                  <p>{budget}</p>
                </aside>
                <aside>
                  <p>Duration:</p>
                  <p>{runtime} min</p>
                </aside>
                <aside>
                  <p>Release date:</p>
                  <p>{release_date}</p>
                </aside>
              </div>
            </>
          )}
        </MovieInfo>
      </MovieContainer>
    </>
  );
};

MovieDetail.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  vote_average: PropTypes.number,
  overview: PropTypes.string,
  genres: PropTypes.array,
  budget: PropTypes.number,
  runtime: PropTypes.number,
  release_date: PropTypes.string,
};

export default MovieDetail;
