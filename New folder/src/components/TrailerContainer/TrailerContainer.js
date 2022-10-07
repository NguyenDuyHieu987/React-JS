import React, { memo, useEffect, useRef, useState } from 'react';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MovieCard from '../../components/MovieCard/MovieCard';
import classNames from 'classnames/bind';
import styles from './TrailerContainer.module.scss';
import TrailerItem from '../TrailerItem';

const cx = classNames.bind(styles);

function TrailerContainer({
  data,
  title,
  setIsOpenModelTrailer,
  setDataModelTrailer,
}) {
  return (
    <section className={cx('trailer-content')}>
      <h3 className={cx('trailer-content-title')}>
        <strong>{title?.toUpperCase()}</strong>
      </h3>
      <div className={cx('trailer-content-items')}>
        {data?.map((item, index) => (
          <TrailerItem
            item={item}
            index={index}
            key={index.toString()}
            setIsOpenModelTrailer={setIsOpenModelTrailer}
            setDataModelTrailer={setDataModelTrailer}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(TrailerContainer);
