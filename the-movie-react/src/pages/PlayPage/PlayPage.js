/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import {
  faPlay,
  faBookmark,
  faPowerOff,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  addItemList,
  getList,
  getMovieByCredit,
  getMovieById,
  getMovieByRecommend,
  getMovieBySimilar,
  getMovieSeriesById,
  getPoster,
  getTrending,
  removeItemList,
} from '../../Services/MovieService';
import styles from './PlayPage.module.scss';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Interaction from '../../components/Interaction/Interaction';
import Comment from '../../components/Comment/Comment';
import SlideShow from './../../components/SlideShow/';
import OwlCarousel from 'react-owl-carousel2';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Episodes from '../../components/Episodes/Episodes';
import { useContext } from 'react';

// import OwlCarousel from 'react-owl-carousel';

const cx = classNames.bind(styles);

function PlayPage() {
  const { movieid, movieName } = useParams();
  const [data, setData] = useState({});
  const [dataRecommend, setDataRecommend] = useState([]);
  const [dataSimilar, setDataSimilar] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [isEpisodes, setIsEpisodes] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [URL, setURL] = useState(window.location.href);

  var { tap } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // const [episode, setEpisode] = useState(
  //   searchParams.get('tap') != null ? +searchParams.get('tap') : 1
  // );

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
    setURL(URL);
  }, [movieid || movieName]);

  const getData = () => {
    getMovieSeriesById(movieid)
      .then((tvResponed) => {
        // setEpisodes(movieResponed?.data);
        if (tvResponed?.data === null)
          getMovieById(movieid)
            .then((movieResponed) => {
              setIsEpisodes(false);
              setData(movieResponed?.data);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });
        else {
          setIsEpisodes(true);
          setData(tvResponed?.data);
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    getList()
      .then((movieRespone) => {
        setDataList(movieRespone.data.items);
      })
      .catch((e) => {
        setDataRecommend([]);
        if (axios.isCancel(e)) return;
      });
  };

  useEffect(() => {
    dataList.map((item) => {
      if (item?.id === +movieid) {
        setIsFollow(true);
      }
    });
  }, [dataList || data]);

  useEffect(() => {
    // getMovieByRecommend(isEpisodes ? 'tv' : 'movie', movieid, 1)
    //   .then((movieResponed) => {
    //     setDataRecommend(movieResponed?.data.recommendations.results);
    //   })
    //   .catch((e) => {
    //     setDataRecommend([]);
    //     if (axios.isCancel(e)) return;
    //   });
    // getMovieBySimilar(isEpisodes ? 'tv' : 'movie', movieid, 1)
    //   .then((movieResponed) => {
    //     setDataSimilar(movieResponed?.data.similar.results);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
  }, [isEpisodes || movieid || movieName]);

  useEffect(() => {
    if (data?.genres !== undefined) {
      getMovieBySimilar(isEpisodes ? 'tv' : 'movie', data?.genres[0], 1)
        .then((movieResponed) => {
          setDataSimilar(movieResponed?.data.results);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });

      getTrending(1)
        .then((movieResponed) => {
          setDataRecommend(movieResponed?.data.results);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }
  }, [data.genres]);

  // useEffect(() => {
  if (isEpisodes) {
    const episode = document.querySelectorAll('.episodes-list .episode');
    const btn_autoNetx_episode = document.querySelector(
      '.' + cx('btn-autoNetx-episode')
    );

    const mainVideo = document.querySelector('#main-video');
    const video_player = document.querySelector('#video-player');
    const play_pause = video_player.querySelector('.controls-left .play-pause');
    const play_pause_large = video_player.querySelector(
      '.play-video .play-pause'
    );

    for (let i = 0; i < episode.length; ++i) {
      if (episode[i].classList.contains('active')) {
        mainVideo
          .querySelector('source')
          .setAttribute(
            'src',
            require(`../../constants/Videos/televisons_film/The_Witcher_S1_Ep${
              i + 1
            }.mp4`)
          );
        mainVideo.load();
        pauseVideo();
      }

      episode[i].onclick = function () {
        episode.forEach(function (item) {
          item.classList.remove('active');
        });
        episode[i].classList.add('active');
        selectVideo_reloadVideo(episode[i], i);
      };
    }

    function selectVideo_reloadVideo(episode, i) {
      if (episode.classList.contains('active')) {
        mainVideo
          .querySelector('source')
          .setAttribute(
            'src',
            require(`../../constants/Videos/televisons_film/The_Witcher_S1_Ep${
              i < 8 ? i + 1 : 8
            }.mp4`)
          );
        mainVideo.load();
        pauseVideo();
      }
    }

    function pauseVideo() {
      play_pause.innerHTML = 'play_arrow';
      play_pause_large.innerHTML = 'play_arrow';
      play_pause.title = 'play';
      video_player.classList.add('paused');
      mainVideo.pause();
    }

    var videoDuration = 0;
    mainVideo.onloadeddata = function (e) {
      videoDuration = e.target.duration;
    };

    mainVideo.ontimeupdate = function (e) {
      let currentVideoTime = e.target.currentTime;
      if (
        btn_autoNetx_episode.classList.contains(cx('active')) &&
        currentVideoTime === videoDuration
      ) {
        for (let i = 0; i < episode.length; ++i) {
          if (
            episode[i].classList.contains('active') &&
            i !== episode.length - 1
          ) {
            episode[i].classList.remove('active');
            episode[i + 1].classList.add('active');
            selectVideo_reloadVideo(episode[i + 1], i + 1);
            break;
          }
        }
      }
    };
  }
  // }, [tap || isEpisodes]);

  useEffect(() => {
    // Active button light off and auto next episode

    const btn_toggle_light = document.querySelector(
      '.' + cx('btn-toggle-light')
    );
    const btn_autoNetx_episode = document.querySelector(
      '.' + cx('btn-autoNetx-episode')
    );
    const background_movie_light_off = document.querySelector(
      '.' + cx('background-movie-light-off')
    );

    btn_autoNetx_episode.onclick = function () {
      btn_autoNetx_episode.classList.toggle(cx('active'));
    };

    btn_toggle_light.onclick = function () {
      btn_toggle_light.classList.toggle(cx('active'));
      if (btn_toggle_light.classList.contains(cx('active'))) {
        btn_toggle_light.previousElementSibling.innerHTML = 'Bật đèn';
        background_movie_light_off.classList.add(cx('active'));
      } else {
        background_movie_light_off.classList.remove(cx('active'));
        btn_toggle_light.previousElementSibling.innerHTML = 'Tắt đèn';
      }
    };

    // active current server

    const server = document.querySelectorAll('.' + cx('server'));
    server[0].classList.add(cx('active'));
    for (let i = 0; i < server.length; ++i) {
      server[i].onclick = function (e) {
        server.forEach(function (item) {
          item.classList.remove(cx('active'));
        });
        server[i].classList.toggle(cx('active'));
      };
    }
  }, []);

  const handleOnClickFollow = () => {
    if (isFollow === false) {
      // axios.post(
      //   'https://api.themoviedb.org/3/list/8215569/add_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
      //   {
      //     media_id: +movieid,
      //   }
      // );

      addItemList({
        media_type: isEpisodes ? 'tv' : 'movie',
        media_id: +movieid,
      });
      setIsFollow(true);
    } else {
      // axios.post(
      //   'https://api.themoviedb.org/3/list/8215569/remove_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
      //   {
      //     media_id: +movieid,
      //   }
      // );
      removeItemList({
        media_id: +movieid,
      });
      setIsFollow(false);
    }
  };
  return (
    <>
      <div className={cx('background-movie-light-off')}></div>
      <div className={cx('player-movie')}>
        <div className={cx('player-movie-container')}>
          <VideoPlayer
            data={data}
            movieid={movieid}
            tap={tap ? +tap.replace('tap=', '') : 1}
            isEpisodes={isEpisodes}
          />

          <div className={cx('player-movie-widget')}>
            <div className={cx('player-movie-widget-wrapper')}>
              <ul className={cx('tools')}>
                <li className={cx('toggle-light')}>
                  <span>Tắt đèn</span>
                  <div className={cx('btn-toggle-light')}>
                    <FontAwesomeIcon
                      className={cx('fa-power-off')}
                      icon={faPowerOff}
                    />
                  </div>
                </li>

                <li className={cx('autoNext-episode')}>
                  <span>Tự chuyển tập</span>
                  <div className={cx('btn-autoNetx-episode')}></div>
                </li>
              </ul>
            </div>

            <div className={cx('swap-server')}>
              <span>Server: </span>
              <ul className={cx('server-list')}>
                <li className={cx('server')}>
                  <a href="#server">Server #1</a>
                </li>

                <li className={cx('server')}>
                  <a href="#server">Server #2</a>
                </li>

                <li className={cx('server')}>
                  <a href="#server">Server #3</a>
                </li>
              </ul>
            </div>
            {isEpisodes ? (
              <Episodes
                tap={tap ? tap.replace('tap=', '') : 1}
                data={data}
                lastestEpisode={data?.last_episode_to_air?.episode_number}
                numberOfEpisodes={
                  data?.seasons.find((item) =>
                    item.season_number ===
                    data?.last_episode_to_air?.season_number
                      ? item
                      : null
                  ).episode_count
                }
                currentSeason={data?.last_episode_to_air?.season_number}
              />
            ) : null}
          </div>

          <div className={cx('movie-summary')}>
            <div className={cx('download-movie')}>
              <i className={cx('material-icons-outlined')}>file_download</i>
              <h3> Download Movie: </h3>
              <ul className={cx('download-list')}>
                <li className={cx('download')}>
                  <a
                    href="../../constants/Video/The_Witcher_S1_Ep1.mov"
                    download
                  >
                    480p
                  </a>
                </li>

                <li className={cx('download')}>
                  <a
                    href="../../constants/Video/The_Witcher_S1_Ep1.mov"
                    download
                  >
                    720p
                  </a>
                </li>

                <li className={cx('download')}>
                  <a
                    href="../../constants/Video/The_Witcher_S1_Ep1.mov"
                    download
                  >
                    1080p
                  </a>
                </li>
              </ul>
            </div>

            <div className={cx('rate-movie')}>
              <h3>Đánh giá phim </h3>
            </div>

            <Interaction
              isEpisodes={isEpisodes}
              movieid={movieid}
              voteAverage={data?.vote_average}
              voteCount={data?.vote_count}
              currentURL={URL}
              data={data}
            />
            <div>
              <a
                className={cx('follow-movie', {
                  active: isFollow,
                })}
                onClick={handleOnClickFollow}
              >
                <i className="material-icons">
                  {isFollow ? 'done' : 'bookmark'}
                </i>
                {isFollow ? 'Đã lưu' : 'Lưu phim'}
              </a>
            </div>
            <div className={cx('movie-summary-content')}>
              <h2>
                {data?.title ? data?.title : data?.name}
                {`  (${
                  data?.last_air_date?.slice(0, 4)
                    ? data?.last_air_date?.slice(0, 4)
                    : data?.release_date?.slice(0, 4)
                })`}
              </h2>
              <p>
                {data?.overview}
                <span>
                  [
                  <Link
                    to={`/Info/${data?.id}/${
                      data?.name?.replace(/\s/g, '-')
                        ? data?.name?.replace(/\s/g, '-')
                        : data?.title?.replace(/\s/g, '-')
                    }`}
                  >
                    Chi tiết
                  </Link>
                  ]
                </span>
              </p>
            </div>
          </div>

          <Comment currentURL={URL} />

          {dataRecommend.length !== 0 ? (
            <section className={cx('recommend-movies')}>
              <SlideShow
                dataSlide={dataRecommend}
                title="CÓ THỂ BẠN QUAN TÂM"
              />
            </section>
          ) : null}
          {dataSimilar.length !== 0 ? (
            <section className={cx('similar-movies')}>
              <SlideShow dataSlide={dataSimilar} title="PHIM TƯƠNG TỰ" />
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default memo(PlayPage);
