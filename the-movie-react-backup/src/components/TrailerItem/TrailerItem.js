import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import {
  getMovieById,
  getMovieSeriesById,
  getPoster,
} from '../../Services/MovieService';
import styles from './TrailerItem.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './TrailerItem.scss';
import axios from 'axios';
import ContentLoader from 'react-content-loader';

const cx = classNames.bind(styles);

function TrailerItem({
  item,
  index,
  setIsOpenModelTrailer,
  setDataModelTrailer,
}) {
  const [data, setData] = useState({});
  const [isEpisodes, setIsEpisodes] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovieSeriesById(item?.id)
      .then((tvResponed) => {
        // setEpisodes(movieResponed?.data);
        if (tvResponed?.data === null)
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
          setData(tvResponed?.data);
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }, [item]);

  const handleOnLoad = () => {
    setLoading(true);
  };

  return (
    <div
      className={
        cx('trailer-item', index === 0 ? 'large' : null) + ' trailer-item'
      }
      onClick={() => {
        setDataModelTrailer(data);
        setIsOpenModelTrailer(true);
      }}
    >
      <a className={cx('trailer-thumbnail')}>
        {!loading && (
          <ContentLoader
            width={'100%'}
            height={'100%'}
            backgroundColor={'#161616'}
            foregroundColor={'#222222'}
            speed={2}
            style={{ position: 'absolute' }}
          >
            <rect x="0" y="0" width="100%" height="100%" />
          </ContentLoader>
        )}
        <LazyLoadImage
          delayTime={250}
          effect="opacity"
          className={cx('trailer-poster')}
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

        <div className={cx('img-play')}>
          <img src={require('../../constants/Images/play.png')} alt="" />
        </div>

        {!loading && (
          <ContentLoader
            width={'100%'}
            height={40.57}
            backgroundColor={'#161616'}
            foregroundColor={'#222222'}
            speed={2}
            className={cx('trailer-item-info')}
          >
            <rect x="0" y="0" rx="4" ry="4" width="70%" height="26.58" />
          </ContentLoader>
        )}

        {loading && (
          <div className={cx('trailer-item-info')}>
            <h3 className={cx('title-film')}>
              {item?.name ? item?.name : item?.title}
            </h3>
          </div>
        )}
      </a>
    </div>
  );
}

export default TrailerItem;
