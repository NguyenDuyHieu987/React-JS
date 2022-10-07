import React, { memo, useEffect, useRef, useState } from 'react';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BannerSlideItem from './BannerSlideItem';
import MovieCard from '../../components/MovieCard/MovieCard';
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getTrending,
  getUpComing,
} from '../../Services/MovieService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
// import OwlCarousel from 'react-owl-carousel';
import TrailerItem from '../../components/TrailerItem/TrailerItem';
import TrailerModel from '../../components/TrailerModel/TrailerModel';
import SlideShow from '../../components/SlideShow';
import MovieContainer from '../../components/MovieContainer/MovieContainer';
import TrailerContainer from '../../components/TrailerContainer/TrailerContainer';
import axios from 'axios';

const cx = classNames.bind(styles);

const Home = () => {
  const [dataBanner, setDataBanner] = useState([]);
  const [dataSlide, setDataSlide] = useState([]);
  const [pageNowPlaying, setPageNowPlaying] = useState(1);
  const [dataUpComing, setDataUpComing] = useState([]);
  const [pageUpComing, setPageUpComing] = useState(1);
  const [dataPopular, setDataPopular] = useState([]);
  const [pagePopular, setPagePopular] = useState(1);
  const [dataTopRated, setDataTopRated] = useState([]);
  const [pageTopRated, setPageTopRated] = useState(1);
  const [dataModelTrailer, setDataModelTrailer] = useState({});
  const [isOpenModelTrailer, setIsOpenModelTrailer] = useState(false);
  const [isClearInterval, setIsClearInterval] = useState(false);

  useEffect(() => {
    GetData();
  }, []);

  let i = useRef(0).current;
  let autoplaysilde = useRef(11);

  const bannerItems = document.getElementsByClassName(cx('banner-item'));
  const bannerItemsInfo = document.getElementsByClassName(
    cx('banner-item-info')
  );

  bannerItems[0]?.classList.add(cx('active'));
  bannerItemsInfo[0]?.classList.add(cx('active'));

  useEffect(() => {
    autoplaysilde.current = setInterval(() => {
      // if (isClearInterval) {
      //   clearInterval(autoplaysilde.current);
      // }
      for (let i = 0; i < bannerItems.length; i++) {
        bannerItems[i].classList.remove(cx('active'));
      }
      for (let i = 0; i < bannerItemsInfo.length; i++) {
        bannerItemsInfo[i].classList.remove(cx('active'));
      }

      i++;
      if (i > bannerItems.length - 1) {
        i = 0;
      }
      bannerItems[i]?.classList.add(cx('active'));
      bannerItemsInfo[i]?.classList.add(cx('active'));
    }, 10000);

    const banner_slide = document.querySelector('.' + cx('banner-slide'));
    //Stop slide when hover
    banner_slide.addEventListener('mouseover', function () {
      clearInterval(autoplaysilde.current);
      setIsClearInterval(true);
    });
    banner_slide.addEventListener('mouseout', function () {
      setIsClearInterval(false);
    });
    return () => clearInterval(autoplaysilde.current);
  }, [isClearInterval]);

  const GetData = () => {
    Promise.all([
      getTrending(1),
      getNowPlaying(pageNowPlaying),
      getUpComing(pageUpComing),
      getPopular(pagePopular),
      getTopRated(pageTopRated),
    ])
      .then((res) => {
        setDataBanner(res[0].data.results.slice(0, 10));
        setDataSlide(res[1].data.results);
        setDataUpComing(res[2].data.results.slice(0, 12));
        setDataPopular(res[3].data.results.slice(0, 13));
        setDataTopRated(res[4].data.results.slice(0, 12));
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    // getTrending(1)
    //   .then((movieRespone) => {
    //     setDataBanner(movieRespone.data.results.slice(0, 10));
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
    // getNowPlaying(pageNowPlaying)
    //   .then((movieRespone) => {
    //     setDataSlide(movieRespone.data.results);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
    // getUpComing(pageUpComing)
    //   .then((movieRespone) => {
    //     setDataUpComing(movieRespone.data.results.slice(0, 12));
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
    // getPopular(pagePopular)
    //   .then((movieRespone) => {
    //     setDataPopular(movieRespone.data.results.slice(0, 13));
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });

    // getTopRated(pageTopRated)
    //   .then((movieRespone) => {
    //     setDataTopRated(movieRespone.data.results.slice(0, 12));
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
  };

  const handleOnClickNextBanner = () => {
    for (let i = 0; i < bannerItems.length; i++) {
      bannerItems[i].classList.remove(cx('active'));
    }
    for (let i = 0; i < bannerItemsInfo.length; i++) {
      bannerItemsInfo[i].classList.remove(cx('active'));
    }

    i++;
    if (i > bannerItems.length - 1) {
      i = 0;
    }
    bannerItems[i]?.classList.add(cx('active'));
    bannerItemsInfo[i]?.classList.add(cx('active'));
  };

  const handleOnClickPrevBanner = () => {
    for (let i = 0; i < bannerItems.length; i++) {
      bannerItems[i].classList.remove(cx('active'));
    }
    for (let i = 0; i < bannerItemsInfo.length; i++) {
      bannerItemsInfo[i].classList.remove(cx('active'));
    }

    i--;
    if (i < 0) {
      i = bannerItems.length - 1;
    }

    bannerItems[i].classList.add(cx('active'));
    bannerItemsInfo[i].classList.add(cx('active'));
  };

  return (
    <>
      {isOpenModelTrailer ? (
        <TrailerModel
          dataModelTrailer={dataModelTrailer}
          isOpenModelTrailer={isOpenModelTrailer}
          setIsOpenModelTrailer={setIsOpenModelTrailer}
        />
      ) : null}

      <div className={cx('home-content')}>
        <div className={cx('home-content-container')}>
          <section className={cx('banner-slide')}>
            <div className={cx('banner-slide-container')}>
              <div>
                {dataBanner.map((item, index) => (
                  <BannerSlideItem item={item} key={index.toString()} />
                ))}
              </div>
              <div className={cx('control-banner-slide')}>
                <div
                  className={cx('next-banner-item')}
                  onClick={handleOnClickNextBanner}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={cx('fa-chevron-right')}
                  />
                </div>
                <div
                  className={cx('prev-banner-item')}
                  onClick={handleOnClickPrevBanner}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={cx('fa-chevron-left')}
                  />
                </div>
              </div>
            </div>
          </section>

          <SlideShow dataSlide={dataSlide} title="PHIM NỔI BẬT" />

          <MovieContainer
            data={dataUpComing}
            title="PHIM MỚI CẬP NHẬT"
            type="box-movie"
          />

          <TrailerContainer
            data={dataPopular}
            title="TRAILER"
            setIsOpenModelTrailer={setIsOpenModelTrailer}
            setDataModelTrailer={setDataModelTrailer}
          />
          {/* <section className={cx('trailer-content')}>
            <h3 className={cx('trailer-content-title')}>
              <strong>TRAILER</strong>
            </h3>
            <div className={cx('trailer-content-items')}>
              {dataPopular.map((item, index) => (
                <TrailerItem
                  item={item}
                  index={index}
                  key={index.toString()}
                  setIsOpenModelTrailer={setIsOpenModelTrailer}
                  setDataModelTrailer={setDataModelTrailer}
                />
              ))}
            </div>
          </section> */}

          <MovieContainer
            data={dataTopRated}
            title="PHIM CHIẾU RẠP MỚI"
            type="box-movie"
          />
        </div>
      </div>
    </>
  );
};

export default memo(Home);
