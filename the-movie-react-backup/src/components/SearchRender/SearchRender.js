import styles from './SearchRender.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemSearch from './ItemSearch';

const cx = classNames.bind(styles);

function SearchRender({ dataSearch, setIsChangeInput }) {
  return (
    <div className={cx('search-render-container')}>
      <p className={cx('number-of-results-search')}>
        Number of results: {dataSearch?.length}
      </p>
      <div className={cx('search-render')}>
        {dataSearch?.map((item, index) => (
          <ItemSearch
            item={item}
            key={index.toString()}
            setIsChangeInput={setIsChangeInput}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchRender;
