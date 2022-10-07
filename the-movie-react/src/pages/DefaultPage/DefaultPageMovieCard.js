import classNames from 'classnames/bind';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  getAllGenresById,
  getLanguage,
  getMovieById,
  getMoviesByGenres,
  getMovieSeriesById,
  getPoster,
  getYear,
} from '../../Services/MovieService';
import styles from './DefaultPage.module.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import ContentLoader from 'react-content-loader';

const cx = classNames.bind(styles);

function DefaultPageMovieCard({ item }) {
  const [data, setData] = useState({});
  const [isEpisodes, setIsEpisodes] = useState(false);
  const [genresName, setGenresName] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovieSeriesById(item?.id)
      .then((movieResponed) => {
        // setEpisodes(movieResponed?.data);

        if (movieResponed?.data === null)
          getMovieById(item?.id)
            .then((movieResponed) => {
              setIsEpisodes(false);
              setData(movieResponed?.data);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });
        else {
          setIsEpisodes(true);
          setData(movieResponed?.data);
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    getGenresName();
  }, [item]);

  const getGenresName = async () => {
    setGenresName(
      await getAllGenresById(item?.genre_ids ? item.genre_ids : data.genres)
    );
  };
  const handleOnLoad = () => {
    setLoading(true);
  };
  return (
    <div className={cx('box-movie')}>
      <Link
        to={`/Info/${item?.id}/${
          item?.name
            ? item?.name?.replace(/\s/g, '-').toLowerCase()
            : item?.title?.replace(/\s/g, '-').toLowerCase()
        }/`}
        className={cx('thumbnail')}
      >
        {!loading && (
          <ContentLoader
            width={'100%'}
            height={'100%'}
            backgroundColor={'#161616'}
            foregroundColor={'#222222'}
            speed={2}
            interval={0.15}
            style={{ position: 'absolute' }}
          >
            <rect x="0" y="0" width="100%" height="100%" />
          </ContentLoader>
        )}
        <div className={cx('img-container')}>
          <LazyLoadImage
            threshold={100}
            delayTime={500}
            effect="opacity"
            className={cx('poster-mnovie')}
            src={getPoster(item?.backdrop_path)}
            // src={
            //   item?.backdrop_path === null
            //     ? {}
            //     : require(`../../constants/poster_backdrop${item?.backdrop_path}`)
            // }
            alt={item?.name ? item?.name : item?.title}
            title={item?.name ? item?.name : item?.title}
            onLoad={handleOnLoad}
          />
        </div>

        <div className={cx('icon-play-wrapper')}>
          {/* //   style="font-size: 27px" */}
          <FontAwesomeIcon icon={faPlay} className={cx('fa-play')} />
        </div>

        <div className={cx('item-info')}>
          {!loading && (
            <ContentLoader
              width={'100%'}
              height={'55.28'}
              backgroundColor={'#161616'}
              foregroundColor={'#222222'}
              speed={2}
            >
              <rect x="0" y="3" rx="4" ry="4" width="65%" height="26" />
              <rect x="0" y="34" rx="4" ry="4" width="100%" height="22" />
            </ContentLoader>
          )}

          {loading && (
            <h3 className={cx('title-film')}>
              {item?.name ? item?.name : item?.title}
            </h3>
          )}

          {loading && (
            <p className={cx('release-year')}>
              {isEpisodes
                ? data?.first_air_date?.slice(0, 4) +
                  ' | ' +
                  genresName?.join(', ')
                : item?.release_date?.slice(0, 4) +
                  ' | ' +
                  genresName?.join(', ')}
            </p>
          )}

          <p className={cx('resolution')}>
            {'HD - ' + getLanguage(item.original_language).english_name}
          </p>
          <p className={cx('duration')}>
            {isEpisodes
              ? data?.number_of_episodes + '-Tập'
              : data?.runtime + ' min'}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default memo(DefaultPageMovieCard);
