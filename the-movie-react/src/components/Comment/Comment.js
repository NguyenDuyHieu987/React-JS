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

function Comment({ currentURL }) {
  const btnPost = document.getElementsByClassName(cx('post-comment'));
  const handleOnChangeTextComment = (text) => {
    if (text.length === 0) {
      btnPost[0].disabled = true;
    } else {
      btnPost[0].disabled = false;
    }
  };

  const initFacebookSDK = () => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    // window.fbAsyncInit = function () {
    //   window.FB.init({
    //     appId: 820070179113499,
    //     cookie: true, // enable cookies to allow the server to access
    //     // the session
    //     xfbml: true, // parse social plugins on this page
    //     version: 'v2.5', // use version 2.1
    //   });
    // };
    // // Load the SDK asynchronously
    // (function (d, s, id) {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = `//connect.facebook.net/vi_VN/sdk.js`;
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, 'script', 'facebook-jssdk');

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '820070179113499',
        cookie: true,
        xfbml: true,
        version: 'v15.0',
      });
      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  useEffect(() => {
    initFacebookSDK();
  });
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
    <div
      class="fb-comments"
      data-href={currentURL}
      data-width="100%"
      data-numposts="10"
    ></div>
  );
}

export default Comment;
