import styles from './SearchRender.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getPoster } from '../../Services/MovieService';
import axios from 'axios';

const cx = classNames.bind(styles);
function ItemSearch({ item, setIsChangeInput }) {
  return (
    <Link
      to={`/Info/${item?.id}/${
        item?.name
          ? item?.name?.replace(/\s/g, '-').toLowerCase()
          : item?.title?.replace(/\s/g, '-').toLowerCase()
      }/`}
      className={cx('search-render-item')}
      onClick={() => {
        setIsChangeInput(false);
      }}
    >
      <img
        src={getPoster(
          item?.poster_path ? item?.poster_path : item?.backdrop_path
        )}
        // alt={item?.name ? item?.name : item?.title}
        alt=""
        title={item?.name ? item?.name : item?.title}
        className={cx('img-item-search')}
      />
      <div className={cx('info-item-search')}>
        <p>{item?.name ? item?.name : item?.title}</p>
        <p>
          {item?.original_name ? item?.original_name : item?.original_title}
        </p>
        <p>{item?.release_date ? item?.release_date : item?.first_air_date}</p>
      </div>
    </Link>
  );
}

export default ItemSearch;
