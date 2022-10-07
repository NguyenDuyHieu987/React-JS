import classNames from 'classnames/bind';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './DefaultPage.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function ControlPage({ page1, setPage, setSearchParams }) {
  useEffect(() => {
    const btnNumberPage = document.querySelectorAll('.' + cx('page-number'));
    for (let i = 0; i < btnNumberPage.length; i++) {
      btnNumberPage[i].classList.remove(cx('active'));
    }

    for (let i = 0; i < btnNumberPage.length; i++) {
      btnNumberPage[i].addEventListener('click', () => {
        for (let i = 0; i < btnNumberPage.length; i++) {
          btnNumberPage[i].classList.remove(cx('active'));
        }
        btnNumberPage[i].classList.add(cx('active'));
        setPage(+btnNumberPage[i].innerHTML);
        setSearchParams({ page: +btnNumberPage[i].innerHTML });
      });
    }

    if (page1 <= 5) {
      btnNumberPage[0].innerHTML = 1;
    } else {
      if ((page1 - 1) % 5 !== 0)
        btnNumberPage[0].innerHTML = page1 - ((page1 - 1) % 5);
      else btnNumberPage[0].innerHTML = page1;
    }

    if ((page1 - 1) % 5 !== 0) {
      btnNumberPage[(page1 - 1) % 5].classList.add(cx('active'));
    }

    if ((page1 - 1) % 5 === 0) {
      btnNumberPage[0].innerHTML = page1;
      btnNumberPage[0].classList.add(cx('active'));
    }

    for (let i = 1; i < btnNumberPage.length; i++) {
      btnNumberPage[i].innerHTML = +btnNumberPage[0].innerHTML + i;
    }
  }, [page1]);

  return (
    <div className={cx('control-page')}>
      <div className={cx('prev-page')}>
        <button
          className={cx('prev-button', page1 === 1 ? 'disabled' : null)}
          onClick={(e) => {
            if (page1 === 1) {
              // document.querySelector('.' + cx('prev-button')).disabled = true;
              e.preventDefault();
            } else if (page1 > 1) {
              // document.querySelector(
              //   '.' + cx('prev-button')
              // ).disabled = false;
              setPage(page1 - 1);

              // searchParams.set('page', page1 - 1);
              // setSearchParams(searchParams);
              setSearchParams({ page: page1 - 1 });
              // getData();
            }
          }}
        >
          <FontAwesomeIcon
            className={cx('fa-angles-left')}
            icon={faAngleLeft}
          />
          Prev Page
        </button>
      </div>
      <span className={cx('page-number')}></span>
      <span className={cx('page-number')}></span>
      <span className={cx('page-number')}></span>
      <span className={cx('page-number')}></span>
      <span className={cx('page-number')}></span>
      <div className={cx('next-page')}>
        <button
          className={cx('next-button')}
          onClick={() => {
            setPage(page1 + 1);
            //   searchParams.set('page', page1 + 1);
            //   setSearchParams(searchParams);
            setSearchParams({ page: page1 + 1 });
            // getData();
          }}
        >
          Next Page
          <FontAwesomeIcon
            className={cx('fa-angles-right')}
            icon={faAngleRight}
          />
        </button>
      </div>
    </div>
  );
}

export default memo(ControlPage);
