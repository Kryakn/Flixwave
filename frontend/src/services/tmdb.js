import axios from 'axios';

const TMDB_API_KEYS = [
  'c8dea14dc917687ac631a52620e4f7ad',
  '3cb41ecea3bf606c56552db3d17adefd'
];

let currentKeyIndex = 0;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const getApiKey = () => TMDB_API_KEYS[currentKeyIndex];

const rotateApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % TMDB_API_KEYS.length;
  return getApiKey();
};

const tmdbRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: getApiKey(),
        ...params
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      // Rate limited, try with next key
      const nextKey = rotateApiKey();
      const retryResponse = await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
          api_key: nextKey,
          ...params
        }
      });
      return retryResponse.data;
    }
    throw error;
  }
};

export const tmdbService = {
  getTrending: () => tmdbRequest('/trending/all/week'),
  
  getNetflixOriginals: () => tmdbRequest('/discover/tv', {
    with_networks: 213
  }),
  
  getTopRated: () => tmdbRequest('/movie/top_rated'),
  
  getActionMovies: () => tmdbRequest('/discover/movie', {
    with_genres: 28
  }),
  
  getComedyMovies: () => tmdbRequest('/discover/movie', {
    with_genres: 35
  }),
  
  getHorrorMovies: () => tmdbRequest('/discover/movie', {
    with_genres: 27
  }),
  
  getRomanceMovies: () => tmdbRequest('/discover/movie', {
    with_genres: 10749
  }),
  
  getDocumentaries: () => tmdbRequest('/discover/movie', {
    with_genres: 99
  }),
  
  getMovieDetails: (movieId) => tmdbRequest(`/movie/${movieId}`, {
    append_to_response: 'videos'
  }),
  
  getTVDetails: (tvId) => tmdbRequest(`/tv/${tvId}`, {
    append_to_response: 'videos'
  }),
  
  searchMulti: (query) => tmdbRequest('/search/multi', { query }),
  
  getImageUrl: (path, size = 'original') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
  
  getYouTubeTrailer: (videos) => {
    if (!videos || !videos.results) return null;
    const trailer = videos.results.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  }
};
