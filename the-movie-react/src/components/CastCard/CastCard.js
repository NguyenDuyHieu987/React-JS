import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getPoster, getPosterCast } from '../../Services/MovieService';
import styles from './CastCard.module.scss';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ContentLoader from 'react-content-loader';

const cx = classNames.bind(styles);

function CastCard({ item }) {
  const [loading, setLoading] = useState(false);
  const handleOnLoad = () => {
    setLoading(true);
  };
  return (
    <div className={cx('box-cast')}>
      <div className={cx('box-cast-img')}>
        {!loading && (
          <ContentLoader
            width={'190'}
            height={'200'}
            backgroundColor={'#161616'}
            foregroundColor={'#222222'}
            speed={2}
            style={{ position: 'absolute' }}
          >
            <rect x="0" y="0" width="100%" height="100%" />
          </ContentLoader>
        )}
        <LazyLoadImage
          // src={
          //   item?.profile_path
          //     ? getPoster(item?.profile_path)
          //     : require('../../constants/Images/no-image.png')
          // }
          effect="opacity"
          src={getPosterCast(item?.profile_path)}
          alt={item?.name}
          onLoad={handleOnLoad}
        />
      </div>
      {!loading && (
        <ContentLoader
          width={'100%'}
          height={33.2}
          backgroundColor={'#161616'}
          foregroundColor={'#222222'}
          speed={2}
          className={cx('trailer-item-info')}
        >
          <rect x="0" y="10" rx="4" ry="4" width="100%" height="33.2" />
        </ContentLoader>
      )}
      {loading && <p className={cx('cast-name')}>{item?.name}</p>}
    </div>
  );
}

export default CastCard;
