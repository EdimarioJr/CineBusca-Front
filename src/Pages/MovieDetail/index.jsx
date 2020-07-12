import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CommonButton } from "../../commonStyle";

const MovieContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #383d48;

  img {
    height: 100%;
    width: 40%;
  }
`;

const MovieInfo = styled.div`
  color: white;

  .info {
    margin: 20px 0;
    h1 {
      margin-bottom: 10px;
    }

    .description {
      margin: 10px 0;
    }

    .genres {
      display: flex;
      flex-direction: row;

      margin: 10px 0;

      p {
        margin-right: 5px;
      }
    }
  }

  .footer {
    width: 100%;
    background-color: #2c2f38;
    padding: 10px 15px;

    aside {
      margin-right: 20px;

      p {
        margin-right: 5px;
      }
    }
  }
`;

const WatchButton = styled(CommonButton)`
  color: black;
  background-color: #02bea7;
  margin-bottom: 10px;
`;

const MovieDetail = (props) => {
  const {
    poster,
    title,
    score,
    genres,
    budget,
    duration,
    description,
    release,
  } = props;
  return (
    <>
      <MovieContainer>
        <img src={poster} alt={title} />
        <MovieInfo>
          <section className="info">
            <h1>{title}</h1>
            <WatchButton />
            <h2>{score}</h2>
            <p className="description">{description}</p>
            <div className="genres">
              <p>Genres:</p>
              <p>{genres}</p>
            </div>
          </section>
          <div className="footer">
            <aside>
              <p>Budget:</p>
              <p>{budget}</p>
            </aside>
            <aside>
              <p>Duration:</p>
              <p>{duration}</p>
            </aside>
            <aside>
              <p>Release date:</p>
              <p>{release}</p>
            </aside>
          </div>
        </MovieInfo>
      </MovieContainer>
    </>
  );
};

MovieDetail.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string,
  score: PropTypes.number,
  description: PropTypes.string,
  genres: PropTypes.array,
  budget: PropTypes.number,
  duration: PropTypes.string,
  release: PropTypes.string,
};

export default MovieDetail;
