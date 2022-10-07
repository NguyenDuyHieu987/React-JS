import classNames from 'classnames/bind';
import {
  faAngleRight,
  faAngleLeft,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getList } from '../../Services/MovieService';
import styles from './RightSideFollow.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import BoxMovieRightSide from '../BoxMovieRightSide/BoxMovieRightSide';

const cx = classNames.bind(styles);

function RightSideFollow({
  data,
  type,
  titleSide,
  isReverse,
  setReverse,
  getData,
}) {
  return (
    <section className={cx('history-watched-main-movies')}>
      <h3 className={`${cx('main-movies-title')} main-movies-title`}>
        <div>
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            className={cx('fa-clock-rotate-left')}
          ></FontAwesomeIcon>

          <strong>{titleSide}</strong>
        </div>

        <span
          className={cx('view-all')}
          onMouseDown={() => {
            setReverse(!isReverse);
            // getData();
          }}
        >
          <a>Tất cả</a>
        </span>
      </h3>

      <div className={cx('history-watched-body')}>
        {data.map((item, index) => (
          <BoxMovieRightSide
            item={item}
            key={index.toString()}
            type={type}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default RightSideFollow;
