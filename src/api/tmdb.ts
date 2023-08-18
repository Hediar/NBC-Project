import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TRENT_MOIVE_URL}`,
  params: {
    api_key: `${process.env.NEXT_PUBLIC_TMDB_API}`,
    language: 'ko-KR'
  }
});
const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH}`
  }
};
export { tmdbApi, tmdbOptions };
