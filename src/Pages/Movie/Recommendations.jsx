import React, { useState, useEffect } from "react";
import MovieData from "../../services/movieApi";
import { RecommendationsContainer } from "./style";
import PropTypes from "prop-types";
import MovieCard from "../../Components/MovieCard";

const Recommendations = ({ idMovie, movieTitle }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await MovieData.getMovieRecommendations(idMovie).then((response) => {
        if (isMounted) setRecommendations(response.results);
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [idMovie]);

  return (
    <RecommendationsContainer>
      <h1>
        If you like <span>{movieTitle}</span>, you would like these...
      </h1>
      <div className="recommendation-grid">
        {recommendations.slice(0, 8).map((movie, index) => {
          const { id, original_title, vote_average, poster_path } = movie;
          return (
            <MovieCard
              idMovie={id}
              title={original_title}
              score={vote_average}
              poster={poster_path}
              key={index}
            />
          );
        })}
      </div>
    </RecommendationsContainer>
  );
};

Recommendations.propTypes = {
  idMovie: PropTypes.string,
  movieTitle: PropTypes.string,
};

export default Recommendations;
