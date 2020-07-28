import axios from "axios";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

// centralizing all the api requests
const MovieData = {
  getPopularMovies: async (page) => {
    if (page) {
      const response = await movieApi.get(
        `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&sort_by=popularity.desc&page=${page}`
      );
      return response.data;
    } else {
      const response = await movieApi.get(
        `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&sort_by=popularity.desc`
      );
      return response.data;
    }
  },

  getMovie: async (idMovie) => {
    const response = await movieApi.get(
      `movie/${idMovie}?api_key=${process.env.REACT_APP_MOVIE_API}`
    );

    return response.data;
  },

  getMovieCast: async (idMovie) => {
    const response = await movieApi.get(
      `movie/${idMovie}/credits?api_key=${process.env.REACT_APP_MOVIE_API}`
    );

    return response.data;
  },

  getMovieRecommendations: async (idMovie) => {
    const response = await movieApi.get(
      `movie/${idMovie}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API}`
    );

    return response.data;
  },

  getMovieImages: async (idMovie) => {
    const response = await movieApi.get(
      `movie/${idMovie}/images?api_key=${process.env.REACT_APP_MOVIE_API}`
    );
    return response.data;
  },

  searchMovie: async (query, page) => {
    const response = await movieApi.get(
      `search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${query}&page=${page}`
    );
    return response.data;
  },
};

export default MovieData;
