import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'YOUR_TMDB_API_KEY'
  }
});
export { tmdbApi };
