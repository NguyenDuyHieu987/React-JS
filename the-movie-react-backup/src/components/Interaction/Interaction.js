import classNames from 'classnames/bind';
import {
  faThumbsUp,
  faStar,
  faShareNodes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Interaction.module.scss';
import ReactDom from 'react-dom';
import axios from 'axios';
import { ratingMovie, ratingTV } from '../../Services/MovieService';

const cx = classNames.bind(styles);

function Interaction({ voteAverage, voteCount, movieid, isEpisodes }) {
  useEffect(() => {
    const stars = document.querySelectorAll('.' + cx('fa-star'));
    const rating = document.querySelector('.' + cx('rating'));
    const hint_rate = document.querySelector('.' + cx('hint-rate'));
    const interaction = document.querySelector('.' + cx('interaction'));

    let temp = Math.round(voteAverage) - 1;
    for (let i = 0; i < stars.length; ++i) {
      stars[i].classList.remove(cx('active'));
    }
    for (let i = 0; i < Math.round(voteAverage); ++i) {
      stars[i].classList.add(cx('active'));
    }
    for (let i = 0; i < stars.length; ++i) {
      stars[i].addEventListener('mouseenter', () => {
        for (let j = 0; j <= i; j++) {
          stars[j].classList.add(cx('active'));
          // stars[j].style.color = 'yellow';
        }
        for (let k = i + 1; k < stars.length; k++) {
          stars[k].classList.remove(cx('active'));
          // stars[k].style.color = 'white';
        }
        // eslint-disable-next-line default-case
        switch (i) {
          case 0:
            hint_rate.innerHTML = 'Dở tệ';
            break;
          case 1:
            hint_rate.innerHTML = 'Dở';
            break;
          case 2:
            hint_rate.innerHTML = 'Không hay';
            break;
          case 3:
            hint_rate.innerHTML = 'Không hay lắm';
            break;
          case 4:
            hint_rate.innerHTML = 'Bình thường';
            break;
          case 5:
            hint_rate.innerHTML = 'Xem được';
            break;
          case 6:
            hint_rate.innerHTML = 'Có vẻ hay';
            break;
          case 7:
            hint_rate.innerHTML = 'Hay';
            break;
          case 8:
            hint_rate.innerHTML = 'Rất hay';
            break;
          case 9:
            hint_rate.innerHTML = 'Tuyệt hay';
            break;
        }
      });

      // eslint-disable-next-line no-loop-func
      stars[i].onclick = function () {
        // axios.post(
        //   `https://api.themoviedb.org/3/movie/${movieid}/rating?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d`,
        //   {
        //     value: i + 1,
        //   }
        // );
        if (isEpisodes) {
          ratingTV(movieid, { value: i + 1 });
        } else {
          ratingMovie(movieid, { value: i + 1 });
        }

        temp = i;

        for (let j = 0; j <= temp; j++) {
          stars[j].classList.add(cx('active'));
        }

        for (let k = temp + 1; k < stars.length; k++) {
          stars[k].classList.remove(cx('active'));
        }

        //active rate success
        if (!document.querySelector('.' + cx('rate-success'))) {
          const rate_success = document.createElement('div');
          rate_success.className = cx('rate-success');
          const span = document.createElement('span');
          span.innerHTML = 'Cảm ơn bạn đã đánh giá';
          // const icon = document.createElement(FontAwesomeIcon);
          const icon = React.createElement(FontAwesomeIcon, {
            icon: faCheck,
          });
          ReactDom.render(icon, rate_success);
          // icon.setAttribute('icon', faCheck);

          // rate_success.appendChild(icon);
          rate_success.appendChild(span);
          interaction.appendChild(rate_success);

          setTimeout(function () {
            rate_success.classList.add(cx('active'));
          }, 500);
          setTimeout(function () {
            rate_success.classList.remove(cx('active'));
          }, 3000);
          setTimeout(function () {
            rate_success.remove();
          }, 3500);
        }
      };
    }

    rating.addEventListener('mouseleave', () => {
      for (let j = temp + 1; j < stars.length; j++) {
        stars[j].classList.remove(cx('active'));
      }
      for (let k = 0; k <= temp; k++) {
        stars[k].classList.add(cx('active'));
      }
      hint_rate.innerHTML = '';
    });
  }, [voteAverage]);

  return (
    <>
      <div className={cx('interaction')}>
        <div className={cx('like-share')}>
          <button
            className={cx('like')}
            type="submit"
            // onclick={handleOnClickLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} className={cx('fa-thumbs-up')} />
            Like
          </button>

          <button className={cx('share')} type="submit">
            <FontAwesomeIcon
              icon={faShareNodes}
              className={cx('fa-share-nodes')}
            />
            Share
          </button>
        </div>

        {/* 
            <div
               class="fb-like"
               data-href="https://phimmoichills.net/"
               data-width="100"
               data-layout="standard"
               data-action="like"
               data-size="small"
               data-share="true"
            ></div>
            <div
               class="fb-share-button"
               data-href="https://phimmoichills.net/info/ba-ngan-nam-khao-khat-pm11538"
               data-layout="button_count"
               data-size="small"
            >
               <a
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphimmoichills.net%2Finfo%2Fba-ngan-nam-khao-khat-pm11538&amp;src=sdkpreparse"
                  class="fb-xfbml-parse-ignore"
               >
                  Chia sẻ
               </a>
            </div> */}

        <div className={cx('rating')}>
          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Dở tệ"
          />

          <FontAwesomeIcon icon={faStar} className={cx('fa-star')} title="Dở" />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Không hay"
          />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Không hay lắm"
          />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Bình thường"
          />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Xem được"
          />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Có vẻ hay"
          />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Hay"
          />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Rất hay"
          />

          <FontAwesomeIcon
            icon={faStar}
            className={cx('fa-star')}
            title="Tuyệt hay"
          />
          <span className={cx('hint-rate')}></span>
          <p>{`(${voteAverage?.toFixed(2)} điểm / ${voteCount} lượt)`}</p>
        </div>
      </div>
    </>
  );
}

export default Interaction;
