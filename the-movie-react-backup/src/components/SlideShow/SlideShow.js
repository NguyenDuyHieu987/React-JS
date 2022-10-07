import React, { memo, useEffect, useRef, useState } from 'react';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MovieCard from '../MovieCard';
import classNames from 'classnames/bind';
import styles from './SlideShow.module.scss';
import $ from 'jquery';
// import Slider from 'react-slick';
// import Carousel from 'nuka-carousel';
import OwlCarousel from 'react-owl-carousel2';
// import OwlCarousel from 'react-owl-carousel';
import './owl-carrousel.scss';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const cx = classNames.bind(styles);

function SlideShow({ dataSlide, title }) {
  const options = {
    lazyLoadEager: 5,
    loop: false,
    margin: 0,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa-solid fa-chevron-left "></i>',
      '<i class="fa-solid fa-chevron-right "></i>',
    ],
    rewind: true,
    autoplay: true,
    smartSpeed: 550,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    items: 1,
    responsive: {
      0: {
        items: 2,
      },
      590: {
        items: 2,
      },
      750: {
        items: 3,
      },
      830: {
        items: 3,
      },
      1000: {
        items: 5,
      },
      1175: {
        items: 5,
      },
    },
  };
  return (
    <section className={cx('slide-show')}>
      <h3 className={cx('slide-show-title')}>
        <strong>{title.toUpperCase()}</strong>
      </h3>
      <div className={cx('slide-show-movies')}>
        <div className={cx('slide-show-container')}>
          <div className="owl-carousel ơwl-theme">
            <OwlCarousel
              options={options}
              // responsive={{
              //   0: {
              //     items: 2,
              //   },
              //   590: {
              //     items: 2,
              //   },
              //   750: {
              //     items: 3,
              //   },
              //   830: {
              //     items: 3,
              //   },
              //   1000: {
              //     items: 5,
              //   },
              //   1175: {
              //     items: 5,
              //   },
              // }}
              // loop={false}
              // margin={0}
              // dots={false}
              // nav={false}
              // rewind={true}
              // autoplay={true}
              // smartSpeed={550}
              // autoplayTimeout={4000}
              // autoplayHoverPause={true}
              // items={1}
            >
              {dataSlide?.map((item, index) => (
                <MovieCard
                  item={item}
                  key={index.toString()}
                  index={index}
                  type="slide"
                />
              ))}
            </OwlCarousel>
          </div>
          {/* <button className={cx('prev')}>
            <FontAwesomeIcon
              className={cx('fa-angle-left')}
              icon={faAngleLeft}
            />
          </button>

          <button className={cx('next')}>
            <FontAwesomeIcon
              className={cx('fa-angle-right')}
              icon={faAngleRight}
            />
          </button> */}
        </div>
      </div>
    </section>
  );
}

export default memo(SlideShow);
