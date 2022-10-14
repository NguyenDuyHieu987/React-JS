import genreResponse from '../constants/genres';
import LANGUAGES from '../constants/Languages';
import Country from '../constants/Country';

const axios = require('axios').default;

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch';

// const URL_API = 'https://the-movie-node.onrender.com';
const URL_API = 'http://localhost:3001';

const getYear = async (id) =>
  await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=fe1b70d9265fdb22caa86dca918116eb`
  );

// const getTrending = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );
const getTrending = async (page) =>
  await axios.get(`${URL_API}/trending/all?api=hieu987&page=${page}`);

// const getNowPlaying = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/movie/now_playing?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );
const getNowPlaying = async (page) =>
  await axios.get(`${URL_API}/movie/nowplaying?api=hieu987&page=${page}`);

// const getUpComing = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/movie/upcoming?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );
const getUpComing = async (page) =>
  await axios.get(`${URL_API}/movie/upcoming?api=hieu987&page=${page}`);

// const getPopular = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/movie/popular?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );
const getPopular = async (page) =>
  await axios.get(`${URL_API}/movie/popular?api=hieu987&page=${page}`);

// const getTopRated = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/movie/top_rated?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );
const getTopRated = async (page) =>
  await axios.get(`${URL_API}/movie/toprated?api=hieu987&page=${page}`);

// const getDaTaSearch = async (text) => {
//   await axios.get(
//     `https://api.themoviedb.org/3/search/multi?api_key=fe1b70d9265fdb22caa86dca918116eb&query=${text}`
//   );
// };

const getDaTaSearch = async (text, page) => {
  await axios.get(
    `${URL_API}/search/multi?api=hieu987&query=${text}&page=${page}`
  );
};

const getDataTopSearch = async (pageTopSearch) => {
  await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_watch_monetization_types=flatrate&page=${pageTopSearch}`
  );
};

// const getMovieById = async (movieId) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/movie/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=videos`
//   );

const getMovieById = async (movieId) =>
  await axios.get(`${URL_API}/movie/${movieId}?api=hieu987`);

// const getMoviesByGenres = async (genres_name, page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_genres=${
//       getIdGenresByName(genres_name).id
//     }&page=${page}`
//   );
const getMoviesByGenres = async (genres_name, page) => {
  const genresName = await getIdGenresByName(genres_name);

  const genreStr = !genres_name.includes('&')
    ? `${genresName.id},${genresName.name}`
    : `${genresName.id},${genresName.name.replace('&', '%26')}`;

  return await axios.get(
    !genres_name.includes('&')
      ? `${URL_API}/discover/all?api=hieu987&with_genres=${genreStr}&page=${page}`
      : `${URL_API}/discover/all?api=hieu987&with_genres=${genreStr}&page=${page}`
  );
};

// const getMoviesByYear = async (year, page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&primary_release_date.lte=${year}-12-30&primary_release_date.gte=${year}-01-01&page=${page}`
//   );
const getMoviesByYear = async (year, page) =>
  await axios.get(
    `${URL_API}/discover/all?api=hieu987&primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}`
  );

// const getMoviesByYearBeFore2000 = async (year, page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&primary_release_date.lte=${year}-01-01&page=${page}`
//   );

const getMoviesByYearBeFore2000 = async (year, page) =>
  await axios.get(
    `${URL_API}/discover/all?api=hieu987&primary_release_date_lte=${year}-01-01&page=${page}`
  );

// const getMovieByCredit = async (type, movieId) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=credits`
//   );

const getMovieByCredit = async (type, movieId) =>
  await axios.get(
    `${URL_API}/${type}/${movieId}?api=hieu987&append_to_response=credits`
  );

const getMovieByRecommend = async (type, movieId, page) =>
  await axios.get(
    `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=recommendations&page=${page}`
  );

// const getMovieBySimilar = async (type, movieId, page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=similar&page=${page}`
//   );

const getMovieBySimilar = async (type, genres_name, page) => {
  return await axios.get(
    !genres_name.name.includes('&')
      ? `${URL_API}/discover/${type}?api=hieu987&with_genres=${genres_name.id},${genres_name.name}&page=${page}`
      : `${URL_API}/discover/${type}?api=hieu987&with_genres=${
          genres_name.id
        },${genres_name.name.replace('&', '%26')}&page=${page}`
  );
};

// const getMovieByCountry = async (country_name, page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_original_language=${
//       getCountry(country_name).iso_639_1
//     }&page=${page}`
//   );

const getMovieByCountry = async (country_name, page) => {
  const countriName = await getCountry(country_name);
  return await axios.get(
    `${URL_API}/discover/all?api=hieu987&with_original_language=${countriName.iso_639_1}&page=${page}`
  );
};

// const getList = async () =>
//   await axios.get(
//     `https://api.themoviedb.org/3/list/8215569?api_key=fe1b70d9265fdb22caa86dca918116eb`
//   );

const getList = async () =>
  await axios.get(`${URL_API}/list/8215569?api=hieu987`);

// const getWatchList = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/account/14271386/watchlist/movies?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d&sort_by=created_at.asc&page=${page}`
//   );

const getWatchList = async (page) =>
  await axios.get(`${URL_API}/watchlist/5831457/all?api=hieu987&page=${page}`);

// const getTheMostVoteCount = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&sort_by=vote_count.desc&page=${page}`
//   );

const getTheMostVoteCount = async (page) =>
  await axios.get(
    `${URL_API}/discover/all?api=hieu987&sort_by=popularity_desc&page=${page}`
  );

// const FilterDataMovie = async (sortby, genre, country, year, page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&sort_by=${sortby}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-30&with_genres=${genre}&with_original_language=${country}&page=${page}`
//   );

// const FilterDataMovie = async (type, sortby, genre, country, year, page) =>
//   year !== 'truoc-nam-2000'
//     ? await axios.get(
//         `https://api.themoviedb.org/3/discover/${type}?api_key=fe1b70d9265fdb22caa86dca918116eb&sort_by=${sortby}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-30&with_genres=${genre}&with_original_language=${country}&page=${page}`
//       )
//     : await axios.get(
//         `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&sort_by=${sortby}&primary_release_date.lte=2000-01-01&with_genres=${genre}&with_original_language=${country}&page=${page}`
//       );

const FilterDataMovie = async (type, sortby, genre, country, year, page) => {
  const yearLte = year === '' ? '' : year + '-12-30';
  const yearGte =
    year === ''
      ? ''
      : year === 'truoc-nam-2000'
      ? '2000-01-01'
      : year + '-01-01';

  const genresName = await getIdGenresByName(genre);

  const genreStr =
    genre !== ''
      ? !genre.includes('&')
        ? `${genresName.id},${genresName.name}`
        : `${genresName.id},${genresName.name.replace('&', '%26')}`
      : '';

  return year !== 'truoc-nam-2000'
    ? await axios.get(
        genre !== ''
          ? `${URL_API}/discover/${type}?api=hieu987&sort_by=${sortby}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${genreStr}&with_original_language=${country}&page=${page}`
          : `${URL_API}/discover/${type}?api=hieu987&sort_by=${sortby}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=&with_original_language=${country}&page=${page}`
      )
    : await axios.get(
        genre !== ''
          ? `${URL_API}/discover/${type}?api=hieu987&sort_by=${sortby}&primary_release_date_lte=${yearGte}&with_genres=${genreStr}&with_original_language=${country}&page=${page}`
          : `${URL_API}/discover/${type}?api=hieu987&sort_by=${sortby}&primary_release_date_lte=${yearGte}&with_genres=&with_original_language=${country}&page=${page}`
      );
};

const getMovies = async (page) =>
  await axios.get(`${URL_API}/movie/phimle?api=hieu987&page=${page}`);
// const getMovieSeries = async (page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/tv/airing_today?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );
const getMovieSeries = async (page) =>
  await axios.get(`${URL_API}/tv/phimbo?api=hieu987&page=${page}`);

// const getMovieSeriesById = async (movieid) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/tv/${movieid}?api_key=fe1b70d9265fdb22caa86dca918116eb`
//   );

const getMovieSeriesById = async (movieid) =>
  await axios.get(`${URL_API}/tv/${movieid}?api=hieu987`);

// const getMoviesBySeason = async (movieid, season) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/tv/${movieid}/season/${season}}?api_key=fe1b70d9265fdb22caa86dca918116eb`
//   );
const getMoviesBySeason = async (movieid, season) =>
  await axios.get(`${URL_API}/tv/${movieid}/season/${season}?api=hieu987`);

const addItemList = async (params) =>
  await axios.post(`${URL_API}/list/8215569/add_item?api=hieu987`, params);

const removeItemList = async (params) =>
  await axios.post(`${URL_API}/list/8215569/remove_item?api=hieu987`, params);

const handleWatchList = async (params) =>
  await axios.post(`${URL_API}/watchlist/5831457?api=hieu987`, params);

const ratingMovie = async (moveid, params) => {
  await axios.post(`${URL_API}/movie/${moveid}/rating?api=hieu987`, params);
};
const ratingTV = async (moveid, params) => {
  await axios.post(`${URL_API}/tv/${moveid}/rating?api=hieu987`, params);
};

const getAllGenre = async () =>
  await axios.get(`${URL_API}/genre/all?api=hieu987`);

const getAllYear = async () =>
  await axios.get(`${URL_API}/year/all?api=hieu987`);

const getAllNational = async () =>
  await axios.get(`${URL_API}/country/all?api=hieu987`);

const getAllCountry = () => {
  var countryList = [];

  Country?.map((item) => {
    countryList.push(item);
  });
  return countryList;
};

const getIdGenresByName = async (genres_name) =>
  // genreResponse.genres.find((gen) => (gen.name === genres_name ? gen : null));
  {
    const genres = await getAllGenre().then((res) => {
      return res.data;
    });
    return genres.find((gen) => (gen.name === genres_name ? gen : null));
  };

const getGenresNameById = (genreId) =>
  genreResponse.genres.find((gen) => (gen.id === genreId ? gen : null));

const getAllGenresById = async (genres) => {
  var genresArray = [];
  const Allgenres = await getAllGenre().then((res) => {
    return res.data;
  });

  genres?.map((item) => {
    Allgenres.find((gen) => {
      if (gen.id === (item.id !== undefined ? item.id : item)) {
        genresArray.push(gen.name);
      }
    });
  });

  // genres?.map((item) => {
  //   genreResponse.genres.find((gen) => {
  //     if (gen.id === (item.id !== undefined ? item.id : item)) {
  //       genresArray.push(gen.name);
  //     }
  //   });
  // });
  return genresArray;
};

const getCountry = async (country_name) =>
  // Country.find((country) => country.name2 === country_name);
  {
    const countries = await getAllNational().then((res) => {
      return res.data;
    });
    return countries.find((country) => country.name2 === country_name);
  };

// const getCountry = async (country_name) => {
//   const county = await axios
//     .get(`${URL_API}/country/${country_name}?api=hieu987`)
//     .then((res) => {
//       return res.data;
//     });
//   return county;
// };

const getCountry2 = (country_name) =>
  Country.find((country) => country.name === country_name);

const getLanguage = (language_iso) =>
  LANGUAGES.find((language) => language.iso_639_1 === language_iso);

// const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;
const getPosterCast = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getPoster = (path) => {
  return path === null || path === undefined
    ? ''
    : `${URL_API}/image${path}?api=hieu987`;
};
export {
  getPoster,
  getYear,
  getIdGenresByName,
  getAllGenresById,
  getTrending,
  getNowPlaying,
  getUpComing,
  getPopular,
  getTopRated,
  getLanguage,
  getDaTaSearch,
  getDataTopSearch,
  getMovieById,
  getMoviesByGenres,
  getMoviesByYear,
  getMoviesByYearBeFore2000,
  getMovieByCredit,
  getMovieBySimilar,
  getMovieByRecommend,
  getAllCountry,
  getMovieByCountry,
  getCountry,
  getCountry2,
  getList,
  getTheMostVoteCount,
  getWatchList,
  FilterDataMovie,
  getMovieSeries,
  getMovieSeriesById,
  getMoviesBySeason,
  getAllGenre,
  getAllNational,
  getAllYear,
  addItemList,
  removeItemList,
  handleWatchList,
  getPosterCast,
  getMovies,
  ratingMovie,
  ratingTV,
};
