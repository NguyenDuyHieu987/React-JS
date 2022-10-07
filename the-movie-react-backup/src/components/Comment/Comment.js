import classNames from 'classnames/bind';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAllGenresById,
  getIdGenresByName,
  getMoviesByGenres,
  getMoviesByYear,
  getPoster,
  getYear,
} from '../../Services/MovieService';
import styles from './Comment.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function Comment() {
  const btnPost = document.getElementsByClassName(cx('post-comment'));
  const handleOnChangeTextComment = (text) => {
    if (text.length === 0) {
      btnPost[0].disabled = true;
    } else {
      btnPost[0].disabled = false;
    }
  };

  return (
    // <div className={cx('comments')}>
    //   <div className={cx('comment-title')}>
    //     <h4 className={cx('comment-amount')}>Bình luận</h4>
    //     <div className={cx('sort-comment')}>
    //       <span>Sắp xếp theo:</span>
    //       <select name="" className={cx('select-sort')}>
    //         <option value="sort-comment">Mới nhất</option>
    //         <option value="sort-comment">Cũ nhất</option>
    //       </select>
    //     </div>
    //   </div>

    //   <div className={cx('conmments-container')}>
    //     <img src={require('../../constants/Images/user.png')} alt="" />
    //     <textarea
    //       className={cx('text-comment')}
    //       id="text-comment"
    //       name=""
    //       cols="30"
    //       rows="3"
    //       placeholder="Viết bình luận..."
    //       onChange={(e) => handleOnChangeTextComment(e.target.value)}
    //     ></textarea>
    //     <button
    //       className={cx('post-comment')}
    //       id="post-comment"
    //       type="submit"
    //       disabled
    //     >
    //       Đăng
    //     </button>
    //   </div>
    // </div>
    <div className="container">
      <div
        className="fb-comments"
        data-href="https://phimmoichills.net/info/than-sam-4-tinh-yeu-va-sam-set-pm9831"
        data-width="100%"
        data-numposts="5"
      ></div>
    </div>
  );
}

export default Comment;
