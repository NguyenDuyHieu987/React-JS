import classNames from 'classnames/bind';
import {
  faPlay,
  faAdd,
  faBookmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  getYear,
  removeItemList,
} from '../../Services/MovieService';
import styles from './PrevPlayMovie.module.scss';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Interaction from '../../components/Interaction/Interaction';
import Comment from '../../components/Comment/Comment';
import SlideShow from './../../components/SlideShow/';
import OwlCarousel from 'react-owl-carousel2';
// import OwlCarousel from 'react-owl-carousel';
import CastCard from '../../components/CastCard';
import EpisodesPreview from '../../components/EpisodesPreview/EpisodePreview';
import { memo } from 'react';
import ContentLoader from 'react-content-loader';

const cx = classNames.bind(styles);

function PrevPlayMovie() {
  const { movieid, movieName } = useParams();
  const [data, setData] = useState({});
  const [dataCredits, setDataCredits] = useState({});
  const [dataRecommend, setDataRecommend] = useState([]);
  const [dataSimilar, setDataSimilar] = useState([]);
  const [isClickBtnTrailer, setIsClickBtnTrailer] = useState(false);
  const [isClickBtnBookMark, setIsClickBtnBookMark] = useState(false);
  const [isClickContent, setIsClickContent] = useState(false);
  const [voteAverage, setVoteAverage] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [isEpisodes, setIsEpisodes] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClickBtnBookMark(false);
    getData();
    setVoteAverage(data?.vote_average);
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
        if (axios.isCancel(e)) return;
      });
  };

  useEffect(() => {
    getMovieByCredit(isEpisodes ? 'tv' : 'movie', movieid)
      .then((movieResponed) => {
        setDataCredits(movieResponed?.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    // getMovieBySimilar(isEpisodes ? 'tv' : 'movie', movieid, 1)
    //   .then((movieResponed) => {
    //     setDataSimilar(movieResponed?.data.similar.results);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });

    // getMovieByRecommend(isEpisodes ? 'tv' : 'movie', movieid, 1)
    //   .then((movieResponed) => {
    //     setDataRecommend(movieResponed?.data.recommendations.results);
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

  useEffect(() => {
    dataList.map((item) => {
      if (item?.id === +movieid) {
        setIsClickBtnBookMark(true);
      }
    });
  }, [dataList || data]);

  if (!dataCredits.credits?.cast) return null;

  const options = {
    loop: false,
    margin: 0,
    dots: false,
    nav: false,
    items: 1,
    responsive: {
      0: {
        items: 3,
      },
      590: {
        items: 4,
      },
      750: {
        items: 4,
      },
      850: {
        items: 5,
      },
      1000: {
        items: 5,
      },
      1175: {
        items: 7,
      },
    },
  };

  const handleOnClickBtnTrailer = () => {
    setIsClickBtnTrailer(!isClickBtnTrailer);
  };

  const handleOnClickBookMark = () => {
    if (isClickBtnBookMark === false) {
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
      setIsClickBtnBookMark(true);
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
      setIsClickBtnBookMark(false);
    }
  };

  const handleOnlickToggleContent = () => {
    setIsClickContent(!isClickContent);
  };

  const handleOnLoad = () => {
    setLoading(true);
  };

  return (
    <div className={cx('movie-detail')}>
      <div className={cx('movie-detail-container')}>
        <div className={cx('movie-introduce')}>
          <div className={cx('movie-detail-img')}>
            {!loading && (
              <ContentLoader
                width={'100%'}
                height={550}
                backgroundColor={'#161616'}
                foregroundColor={'#222222'}
                speed={2}
                style={{ position: 'absolute' }}
              >
                <rect x="0" y="0" width="100%" height="100%" />
              </ContentLoader>
            )}
            <img
              src={getPoster(data?.backdrop_path)}
              // src={
              //   data?.backdrop_path === undefined
              //     ? {}
              //     : require(`../../constants/poster_backdrop${data?.backdrop_path}`)
              // }
              alt={data?.title ? data?.title : data?.name}
              className={cx('box-img')}
              onLoad={handleOnLoad}
            />
            <Link
              to={`/Play/${data?.id}/${
                data?.name
                  ? data?.name?.replace(/\s/g, '-').toLowerCase()
                  : data?.title?.replace(/\s/g, '-').toLowerCase()
              }/`}
            >
              <div className={cx('icon-play-wrapper')}>
                <FontAwesomeIcon icon={faPlay} className={cx('fa-play')} />
              </div>
            </Link>
          </div>
          <div className={cx('movie-detail-title')}>
            {!loading && (
              <ContentLoader
                width={'100%'}
                height={483}
                backgroundColor={'#161616'}
                foregroundColor={'#222222'}
                speed={2}
              >
                <rect x="0" y="0" rx="4" ry="4" width="70%" height="30" />
                <rect x="0" y="35" rx="4" ry="4" width="60%" height="20" />
                <rect x="0" y="65" rx="4" ry="4" width="80%" height="40" />
                <rect x="0" y="116" rx="4" ry="4" width="50%" height="20" />
                <rect x="0" y="143" rx="4" ry="4" width="50%" height="20" />
                <rect x="0" y="170" rx="4" ry="4" width="50%" height="20" />
                <rect x="0" y="197" rx="4" ry="4" width="50%" height="20" />
                <rect x="0" y="224" rx="4" ry="4" width="50%" height="20" />
                <rect x="0" y="251" rx="4" ry="4" width="50%" height="20" />
                <rect x="0" y="278" rx="4" ry="4" width="50%" height="20" />
                <rect x="0" y="310" rx="4" ry="4" width="40%" height="26" />
                <rect x="0" y="345" rx="4" ry="4" width="55%" height="40" />
                {isEpisodes && (
                  <rect x="0" y="395" rx="4" ry="4" width="100%" height="70" />
                )}
              </ContentLoader>
            )}

            {loading && (
              <>
                <h2>{data?.name ? data?.name : data?.title}</h2>
                <strong>
                  {data?.original_title
                    ? data?.original_title
                    : data?.original_name}
                  {isEpisodes
                    ? `  (${
                        data?.last_air_date?.slice(0, 4)
                          ? data?.last_air_date?.slice(0, 4)
                          : data?.last_episode_to_air?.air_date?.slice(0, 4)
                        // year?.slice(0, 4)
                      })`
                    : `  (${data?.release_date?.slice(0, 4)})`}
                </strong>
                <strong
                  id="number-of-seasons"
                  className={cx('number-of-seasons')}
                >
                  {isEpisodes
                    ? ' - Season ' + data?.last_episode_to_air?.season_number
                    : null}
                </strong>
                <div className={cx('watch-movie')}>
                  <Link
                    to={`/Play/${data?.id}/${
                      data?.name
                        ? data?.name?.replace(/\s/g, '-').toLowerCase()
                        : data?.title?.replace(/\s/g, '-').toLowerCase()
                    }/`}
                  >
                    <FontAwesomeIcon icon={faPlay} className={cx('fa-play')} />
                    Play now
                  </Link>
                  <a
                    href="#trailer"
                    className={cx('btn-trailer')}
                    onClick={handleOnClickBtnTrailer}
                  >
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className={cx('fa-youtube')}
                    />
                    Trailer
                  </a>
                  <a
                    href="#watch-movie"
                    onClick={handleOnClickBookMark}
                    className={cx({ active: isClickBtnBookMark })}
                  >
                    <FontAwesomeIcon
                      icon={!isClickBtnBookMark ? faBookmark : faCheck}
                      className={cx('fa-bookmark', {
                        active: isClickBtnBookMark,
                      })}
                    />
                    {isClickBtnBookMark ? 'Followed' : 'Follow'}
                  </a>
                </div>
                <div className={cx('info-movie')}>
                  <p>
                    <label>Đang phát: </label>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      HD VietSub
                    </span>
                  </p>
                  <p>
                    <label>Ngày Phát Hành: </label>
                    <Link
                      to={`/Years/${
                        data?.last_air_date?.slice(0, 4)
                          ? data?.last_air_date?.slice(0, 4)
                          : data?.release_date?.slice(0, 4)
                      }/`}
                    >
                      {data?.last_air_date?.slice(0, 4)
                        ? data?.last_air_date?.slice(0, 4)
                        : data?.release_date?.slice(0, 4)}
                    </Link>
                    {data?.last_air_date?.slice(4, 10)
                      ? data?.last_air_date?.slice(4, 10)
                      : data?.release_date?.slice(4, data?.release_date.length)}
                  </p>
                  <p>
                    <label>Quốc gia: </label>
                    {data?.production_countries
                      ? data?.production_countries[0]?.name
                      : null}
                  </p>
                  <p>
                    <label>Thể loại: </label>
                    {data?.genres?.map((item, index) => (
                      <Link to={`/Genres/${item.name}/`} key={index.toString()}>
                        {index !== data.genres.length - 1
                          ? item.name + ', '
                          : item.name}
                      </Link>
                    ))}
                  </p>
                  <p>
                    <label>Diểm IMDb: </label>
                    <span style={{ color: 'yellow', fontWeight: 'bold' }}>
                      {data?.vote_average?.toFixed(2)}
                    </span>
                  </p>
                  {data?.number_of_episodes !== undefined ? (
                    <p>
                      <label>Số lượng tập: </label>
                      {data?.seasons?.find((item) =>
                        item.season_number ===
                        data?.last_episode_to_air?.season_number
                          ? item
                          : null
                      ).episode_count + ' tập'}
                    </p>
                  ) : null}
                  <p>
                    <label>
                      {data?.episode_run_time === undefined
                        ? 'Thời lượng: '
                        : 'Thờ lượng trên tập: '}
                    </label>
                    {data?.episode_run_time === undefined
                      ? data?.runtime + ' phút'
                      : data?.episode_run_time[0] + ' phút'}
                  </p>

                  <p>
                    <label>Trạng thái: </label>
                    {data?.status}
                  </p>
                </div>
                <Interaction
                  isEpisodes={isEpisodes}
                  movieid={movieid}
                  voteAverage={data?.vote_average}
                  voteCount={data?.vote_count}
                />
                {
                  // episodes.length !== 0
                  isEpisodes !== false ? (
                    <EpisodesPreview
                      data={data}
                      lastestEpisode={data?.last_episode_to_air?.episode_number}
                      numberOfEpisodes={
                        data?.seasons?.find((item) =>
                          item.season_number ===
                          data?.last_episode_to_air?.season_number
                            ? item
                            : null
                        ).episode_count
                      }
                    />
                  ) : null
                }
              </>
            )}
          </div>
        </div>

        <div className={cx('describe-film')}>
          <h3 className={cx('describe-film-title')}>Nội dung phim</h3>
          {!loading && (
            <ContentLoader
              width={'100%'}
              height={106}
              backgroundColor={'#161616'}
              foregroundColor={'#222222'}
              speed={2}
            >
              <rect x="0" y="10" rx="4" ry="4" width="100%" height="25" />
              <rect x="0" y="40" rx="4" ry="4" width="100%" height="25" />
              <rect x="0" y="70" rx="4" ry="4" width="60%" height="25" />
            </ContentLoader>
          )}
          {loading && (
            <div className={cx('describe-film-content')}>
              <p
                className={cx('describe-content-text', {
                  short: isClickContent,
                })}
              >
                {data?.overview}
              </p>

              <b
                className={cx('toggle-content')}
                id="toggle-content"
                onClick={handleOnlickToggleContent}
              >
                {!isClickContent ? 'Xem thêm >' : '< Ẩn'}
              </b>
            </div>
          )}
        </div>

        <div
          className={cx('trailer', {
            active: isClickBtnTrailer,
          })}
          id="trailer"
        >
          <h3 className={cx('trailer-title')}>Trailer</h3>
          <iframe
            height="650px"
            width="100%"
            src={
              data?.videos?.results?.length !== 0
                ? `https://www.youtube.com/embed/${
                    data?.videos?.results[
                      Math.floor(Math.random() * data?.videos.results.length)
                    ]?.key
                  }`
                : 'https://www.youtube.com/embed/ndl1W4ltcmg'
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder={0}
          ></iframe>
        </div>
        <div className={cx('cast') + ' cast'}>
          <h3 className={cx('cast-title')}>Diễn viên</h3>
          <div className={cx('cast-container-img')}>
            <div className={cx('owl-carousel', 'owl-theme')}>
              <OwlCarousel options={options}>
                {dataCredits.credits?.cast?.map((item, index) => (
                  <CastCard item={item} key={index.toString()} />
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>

        <Comment />

        {dataRecommend.length !== 0 ? (
          <section className={cx('recommend-movies')}>
            <SlideShow dataSlide={dataRecommend} title="CÓ THỂ BẠN QUAN TÂM" />
          </section>
        ) : null}
        {dataSimilar.length !== 0 ? (
          <section className={cx('similar-movies')}>
            <SlideShow dataSlide={dataSimilar} title="PHIM TƯƠNG TỰ" />
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default memo(PrevPlayMovie);
