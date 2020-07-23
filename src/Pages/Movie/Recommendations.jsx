import React, { useState, useEffect } from "react";
import movieApi from "../../services/movieApi";
import { RecommendationsContainer } from "./style";
import PropTypes from "prop-types";
import MovieCard from "../../Components/MovieCard";

const Recommendations = ({ id, movieTitle }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    (async () => {
      movieApi
        .get(
          `movie/${id}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API}`
        )
        .then((response) => {
          setRecommendations(response.data.results);
        });
    })();
  }, [id]);

  return (
    <RecommendationsContainer>
      <h1>
        If you like <span>{movieTitle}</span>, you would like these...
      </h1>
      <div className="recommendation-grid">
        {recommendations.slice(0, 8).map((movie, index) => {
          return (
            <MovieCard
              idMovie={movie.id}
              title={movie.original_title}
              score={movie.vote_average}
              poster={movie.poster_path}
              key={index}
            />
          );
        })}
      </div>
    </RecommendationsContainer>
  );
};

Recommendations.propTypes = {
  id: PropTypes.string,
  movieTitle: PropTypes.string,
};

export default Recommendations;
