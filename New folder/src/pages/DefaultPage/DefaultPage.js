import classNames from 'classnames/bind';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  getMovieByCountry,
  getMoviesByGenres,
  getMoviesByYear,
  getMoviesByYearBeFore2000,
  getTopRated,
  getUpComing,
  getCountry,
  getTrending,
  getMovieSeries,
  getPopular,
  getMovies,
} from '../../Services/MovieService';
import styles from './DefaultPage.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import DefaultPageMovieCard from './DefaultPageMovieCard';
import axios from 'axios';
import ControlPage from './ControlPage';
import { FilterContext } from '../../Store/FilterContext';

const cx = classNames.bind(styles);

function DefaultPage() {
  var { genresName, year, list, country, movieName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page1, setPage] = useState(
    searchParams.get('page') != null ? +searchParams.get('page') : 1
  );
  const [title, setTitle] = useState('');
  const [isVisibleControlPageNumber, setIsVisibleControlPageNumber] =
    useState(true);

  const {
    dataFilter,
    isClickFilter,
    pageFilter,
    setPageFilter,
    getDataFiter,
    setIsClickFilter,
  } = useContext(FilterContext);

  const getData = async () => {
    if (isClickFilter === false) {
      if (genresName) {
        getMoviesByGenres(genresName, page1)
          .then((movieResponse) => {
            setData(movieResponse.data.results);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        setTitle(genresName?.toUpperCase());
      }

      if (year) {
        if (year !== 'truoc-nam-2000') {
          getMoviesByYear(year, page1)
            .then((movieResponse) => {
              setData(movieResponse.data.results);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });
          setTitle(year?.toUpperCase());
        } else {
          getMoviesByYearBeFore2000('2000', page1)
            .then((movieResponse) => {
              setData(movieResponse.data.results);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });
          setTitle('TRƯỚC NĂM 2000');
        }
      }

      if (country) {
        getMovieByCountry(country, page1)
          .then((movieResponse) => {
            setData(movieResponse.data.results);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        const countryName = await getCountry(country);
        setTitle(countryName.name.toUpperCase());
      }

      if (movieName) {
        await axios
          .get(
            // `https://api.themoviedb.org/3/search/multi?api_key=fe1b70d9265fdb22caa86dca918116eb&query=${movieName.replace(
            //   '-',
            //   ' '
            // )}`

            `http://localhost:3001/search/multi?api=hieu987&query=${movieName.replace(
              '-',
              ' '
            )}&page=${page1}`
          )
          .then((searchMovieResponse) => {
            setData(searchMovieResponse.data.results);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        setTitle('KẾT QUẢ TÌM kIẾM CHO: ' + movieName.replace('-', ' '));
      }

      if (list) {
        switch (list) {
          case 'phim-moi-cap-nhat':
            getUpComing(page1)
              .then((movieResponse) => {
                setData(movieResponse.data.results);
              })
              .catch((e) => {
                if (axios.isCancel(e)) return;
              });
            setTitle('PHIM MỚI CẬP NHẬT');
            break;
          case 'phim-chieu-rap-moi':
            getTopRated(page1)
              .then((movieResponse) => {
                setData(movieResponse.data.results);
              })
              .catch((e) => {
                if (axios.isCancel(e)) return;
              });
            setTitle('PHIM CHIẾU RẠP MỚI');
            break;
          case 'phim-le':
            getMovies(page1)
              .then((movieResponse) => {
                setData(movieResponse.data.results);
              })
              .catch((e) => {
                if (axios.isCancel(e)) return;
              });
            setTitle('PHIM LẺ');
            break;
          case 'phim-bo':
            getMovieSeries(page1)
              .then((movieResponse) => {
                setData(movieResponse.data.results);
              })
              .catch((e) => {
                if (axios.isCancel(e)) return;
              });
            setTitle('PHIM BỘ');
            break;
          default:
            break;
        }
      }
    } else {
      setTitle('DANH SÁCH PHIM ĐÃ LỌC');
      // getDataFiter();
      setData(dataFilter);
    }
  };
  useEffect(() => {
    if (data.length < 1) {
      setIsVisibleControlPageNumber(false);
    } else {
      setIsVisibleControlPageNumber(true);
    }
  }, [data]);

  useEffect(() => {
    // getDataFiter();
    if (dataFilter.length > 0) {
      setTitle('DANH SÁCH PHIM ĐÃ LỌC');
      setData(dataFilter);
    }
  }, [dataFilter]);

  useEffect(() => {
    if (dataFilter.length > 0) {
      getDataFiter();
      setData(dataFilter);
    }
  }, [pageFilter]);

  useEffect(() => {
    setPage(searchParams.get('page') != null ? +searchParams.get('page') : 1);
  }, [searchParams.get('page')]);

  useEffect(() => {
    getData();
  }, [page1]);

  useEffect(() => {
    getData();
  }, [genresName]);

  useEffect(() => {
    getData();
  }, [year]);

  useEffect(() => {
    getData();
  }, [country]);

  useEffect(() => {
    getData();
  }, [list]);

  useEffect(() => {
    getData();
  }, [movieName]);
  return (
    <>
      <section className={cx('feature-film')} key={genresName}>
        <div className={cx('main-movies')}>
          <h3 className={cx('main-movies-title')} style={{ fontSize: '25px' }}>
            <strong>{title}</strong>
          </h3>
          <div className={cx('main-movies-container')}>
            {data.map((item, index) => (
              <DefaultPageMovieCard item={item} key={index.toString()} />
            ))}
          </div>
        </div>
      </section>

      {isVisibleControlPageNumber === true ? (
        <ControlPage
          page1={isClickFilter === false ? page1 : pageFilter}
          setPage={isClickFilter === false ? setPage : setPageFilter}
          setSearchParams={setSearchParams}
        />
      ) : null}
    </>
  );
}

export default DefaultPage;
