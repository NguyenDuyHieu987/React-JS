import classNames from 'classnames/bind';
import {
  faAngleRight,
  faAngleLeft,
  faClockRotateLeft,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { getList } from '../../Services/MovieService';
import styles from './RightSideRank.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import BoxMovieRightSide from '../BoxMovieRightSide/BoxMovieRightSide';

const cx = classNames.bind(styles);

function RightSideRank({ data, type, setPageRank, page }) {
  useEffect(() => {
    const tabRank = document.querySelectorAll(
      '.' + cx('rightside-movies-container')
    );
    const tab = document.querySelectorAll('.' + cx('tab'));
    for (let i = 0; i < tab.length; i++) {
      tab[i].addEventListener('click', () => {
        for (let j = 0; j < tabRank.length; j++) {
          tab[j].classList.remove(cx('active'));
          tabRank[j].classList.remove(cx('active'));
        }
        tab[i].classList.add(cx('active'));
        tabRank[i].classList.add(cx('active'));
        setPageRank(i + 1);
      });
    }
  }, []);
  return (
    <section
      className={cx('rank-side-content', page === 'rank' ? 'rank' : null)}
    >
      <div className={cx('rightside-movies')}>
        <h3 className={`${cx('main-movies-title')} main-movies-title`}>
          <FontAwesomeIcon icon={faStar} className={cx('fa-star')} />
          <strong>XEM NHIỀU NHẤT</strong>
        </h3>

        <ul className={cx('filter-day')}>
          <li className={cx('tab', 'active')}>
            <a href="#day" className={cx('day')}>
              Ngày
            </a>
          </li>

          <li className={cx('tab')}>
            <a href="#week" className={cx('week')}>
              Tuần
            </a>
          </li>

          <li className={cx('tab')}>
            <a href="#month" className={cx('month')}>
              Tháng
            </a>
          </li>

          <li className={cx('tab')}>
            <a href="#all" className={cx('all')}>
              Tất Cả
            </a>
          </li>
        </ul>

        <div className={cx('tab-content')}>
          <div className={cx('rightside-movies-container', 'day', 'active')}>
            {data?.map((item, index) => (
              <BoxMovieRightSide
                item={item}
                key={index.toString()}
                type={type}
                index={index}
              />
            ))}
          </div>
          <div className={cx('rightside-movies-container', 'week')}>
            {data?.map((item, index) => (
              <BoxMovieRightSide
                item={item}
                key={index.toString()}
                type={type}
                index={index}
              />
            ))}
          </div>
          <div className={cx('rightside-movies-container', 'month')}>
            {data?.map((item, index) => (
              <BoxMovieRightSide
                item={item}
                key={index.toString()}
                type={type}
                index={index}
              />
            ))}
          </div>

          <div className={cx('rightside-movies-container', 'all')}>
            {data?.map((item, index) => (
              <BoxMovieRightSide
                item={item}
                key={index.toString()}
                type={type}
                index={index}
              />
            ))}
          </div>
          {/* <!-- day  -->
            <?php include '../Rank/rank-day.php' ?>

            <!-- week  -->
            <?php include '../Rank/rank-week.php' ?>

            <!-- month  -->
            <?php include '../Rank/rank-month.php' ?>

            <!-- all  -->
            <?php include '../Rank/rank-all.php' ?> */}
        </div>
      </div>
    </section>
  );
}

export default memo(RightSideRank);
