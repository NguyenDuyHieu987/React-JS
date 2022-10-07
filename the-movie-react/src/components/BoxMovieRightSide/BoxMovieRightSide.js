/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import {
  faAngleRight,
  faAngleLeft,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getMovieById,
  getMovieSeriesById,
  getPoster,
  handleWatchList,
  removeItemList,
} from '../../Services/MovieService';
import styles from './BoxMovieRightSide.module.scss';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ContentLoader from 'react-content-loader';

const cx = classNames.bind(styles);

function BoxMovieRightSide({ item, type, index }) {
  const [isRemoveFollow, setIsRemoveFollow] = useState(false);
  const [isRemoveWatchList, setIsRemoveWatchList] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnLoad = () => {
    setLoading(true);
  };
  return (type === 'follow' && isRemoveWatchList === false) ||
    (type === 'history' && isRemoveFollow === false) ||
    type === 'rank' ? (
    <div
      className={cx(
        'rightside-box-movie',
        type === 'rank' && index === 0 ? 'top1' : null
      )}
    >
      <Link
        className={cx('rightside-thumbnail')}
        to={`/Info/${item?.id}/${
          item?.name
            ? item?.name?.replace(/\s/g, '-').toLowerCase()
            : item?.title?.replace(/\s/g, '-').toLowerCase()
        }/`}
      >
        {type === 'rank' ? (
          <p
            className={cx('txt-rank')}
            style={
              index === 0
                ? { color: 'red' }
                : index === 1
                ? { color: 'green' }
                : index === 2
                ? { color: 'yellow' }
                : null
            }
          >
            {index + 1 < 10 ? '0' + (index + 1) : index + 1}
          </p>
        ) : null}
        <div className={cx('rightside-box-img')}>
          {!loading && (
            <ContentLoader
              width={'100%'}
              height={'100%'}
              backgroundColor={'#161616'}
              foregroundColor={'#222222'}
              speed={2}
              interval={0.1}
              style={{ position: 'absolute' }}
            >
              <rect x="0" y="0" width="100%" height="100%" />
            </ContentLoader>
          )}

          <LazyLoadImage
            className={cx('poster-mnovie')}
            src={
              type === 'rank' && index === 0
                ? getPoster(item?.backdrop_path)
                : getPoster(item?.poster_path)
            }
            alt={item?.name ? item?.name : item?.title}
            title={item?.name ? item?.name : item?.title}
            delayTime={250}
            effect="opacity"
            onLoad={handleOnLoad}
          />
        </div>

        <div className={cx('rightside-info-movie')}>
          <div className={cx('title-container')}>
            {!loading && (
              <ContentLoader
                width={'100%'}
                height={'39.75'}
                backgroundColor={'#161616'}
                foregroundColor={'#222222'}
                speed={2}
                interval={0.1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="100%" height="19.87" />
                <rect x="0" y="22" rx="4" ry="4" width="100%" height="19.87" />
              </ContentLoader>
            )}
            {loading && <p>{item?.name ? item?.name : item?.title}</p>}

            {loading && (
              <p>
                {item?.original_title
                  ? item?.original_title
                  : item?.original_name}
              </p>
            )}
          </div>

          {type === 'follow' ? (
            <p
              className={cx('remove-history')}
              onClick={(e) => {
                e.preventDefault();

                if (isRemoveWatchList === false) {
                  // axios.post(
                  //   'https://api.themoviedb.org/3/account/14271386/watchlist?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                  //   {
                  //     media_type: 'movie',
                  //     media_id: +item?.id,
                  //     watchlist: false,
                  //   }
                  // );
                  handleWatchList({
                    media_id: +item?.id,
                    watchlist: false,
                  });
                  setIsRemoveWatchList(true);
                }
              }}
            >
              <i className="material-icons-outlined x-mark"> close</i>
              Xóa
            </p>
          ) : type === 'history' ? (
            <p
              className={cx('remove-follow')}
              onClick={(e) => {
                e.preventDefault();
                if (isRemoveFollow === false) {
                  // axios.post(
                  //   'https://api.themoviedb.org/3/list/8215569/remove_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                  //   {
                  //     media_id: +item?.id,
                  //   }
                  // );
                  removeItemList({
                    media_id: +item?.id,
                  });
                  setIsRemoveFollow(true);
                }
              }}
            >
              <i class="material-icons-outlined x-mark"> close</i>
              Bỏ theo dõi
            </p>
          ) : null}
          {type === 'rank' && index !== 0 ? (
            <>
              {!loading && (
                <ContentLoader
                  width={'100%'}
                  height={17.03}
                  backgroundColor={'#161616'}
                  foregroundColor={'#222222'}
                  speed={5}
                  className={cx('total-views')}
                >
                  <rect x="0" y="0" width="60%" height="100%" />
                </ContentLoader>
              )}
              {loading && (
                <p className={cx('total-views')}>
                  {item?.popularity
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'}
                </p>
              )}
            </>
          ) : null}
        </div>
        {type === 'rank' && index === 0 ? (
          <>
            {loading && (
              <p className={cx('total-views')}>
                {item?.popularity
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'}
              </p>
            )}
          </>
        ) : null}
      </Link>
    </div>
  ) : null;
}

export default BoxMovieRightSide;
