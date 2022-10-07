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
import { getPoster, ratingMovie, ratingTV } from '../../Services/MovieService';
import {
  FacebookIcon,
  FacebookShareCount,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const cx = classNames.bind(styles);

function Interaction({
  voteAverage,
  voteCount,
  movieid,
  isEpisodes,
  currentURL,
  data,
}) {
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

  const initFacebookSDK = () => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

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

    document.getElementById('fb-share-button').onclick = function (e) {
      window.FB.ui(
        {
          method: 'share_open_graph',
          action_type: 'og.shares',
          display: 'popup',
          name: 'This is the content of the "name" field.',
          link: currentURL,
          href: currentURL,
          picture: getPoster(data.backdrop_path),
          caption: 'Top 3 reasons why you should care about your finance',
          description:
            "What happens when you don't take care of your finances? Just look at our country -- you spend irresponsibly, get in debt up to your eyeballs, and stress about how you're going to make ends meet. The difference is that you don't have a glut of taxpayers…",
          message: '',
        },
        function (response) {}
      );
    };
  });

  return (
    <>
      <div className={cx('interaction')}>
        {/* <div className={cx('like-share')}>
          <button
            className={cx('like')}
            // onclick={handleOnClickLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} className={cx('fa-thumbs-up')} />
            Like
          </button>

          <button className={cx('share')}>
            <FontAwesomeIcon
              icon={faShareNodes}
              className={cx('fa-share-nodes')}
            />
            Share
          </button>
        </div> */}

        <div className={cx('fb-share-btn')}>
          <div
            id="fb-share-button"
            class="fb-like"
            data-href={currentURL}
            data-width=""
            data-layout="button_count"
            data-action="like"
            data-size="small"
            data-share="true"
          ></div>

          {/* <div
            id="fb-share-button"
            class="fb-share-button"
            data-href={currentURL}
            data-layout="button_count"
            data-size="small"
          >
            <a
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
              class="fb-xfbml-parse-ignore"
            >
              Chia sẻ
            </a>
          </div> */}
        </div>

        <div className={cx('share-btns')}>
          <FacebookShareButton url={currentURL}>
            <FacebookIcon size={40} round={true} />
            <FacebookShareCount url={currentURL}>
              {(shareCount) => (
                <span className="myShareCountWrapper">{shareCount}</span>
              )}
            </FacebookShareCount>
          </FacebookShareButton>
          <TwitterShareButton url={currentURL}>
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
        </div>

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
