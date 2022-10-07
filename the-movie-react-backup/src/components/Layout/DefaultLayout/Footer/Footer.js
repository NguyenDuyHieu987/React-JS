import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container', 'footer-container')}>
        <div className={cx('banner-logo-wrapper')}>
          <div className={cx('banner-logo')}>
            <Link to="/">
              <img
                src={require('../../../../constants/Images/film-reel(large).png')}
                alt=""
              />
            </Link>
            <h1 className={cx('logo')}>
              <Link to="/">Phimhay247</Link>
            </h1>
          </div>

          <div className={cx('about-website')}>
            <div className={cx('introduce-support')}>
              <div className={cx('introduce-website')}>
                <h3>Giới thiệu</h3>
                <span>
                  Phimhay247.com - Xem phim Online Hoàn Toàn Miễn Phí - Nơi Thỏa
                  Mãn Đam Mê. Cập nhật các bộ phim hay, mới nhất, nhanh nhất để
                  phục vụ khán giả, hỗ trợ trên mọi thiết bị.
                </span>
              </div>

              <div className={cx('support-website')}>
                <h3>Hỗ Trợ</h3>
                <span>
                  Mọi thông tin, hình ảnh, video trên website đều được sưu tầm
                  trên Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất
                  kỳ thông tin nào trên web này. Nếu làm ảnh hưởng đến cá nhân
                  hay tổ chức nào, khi được yêu cầu, chúng tôi sẽ xem xét và gỡ
                  bỏ ngay lập tức.
                </span>
              </div>
            </div>

            <div className={cx('feedback')}>
              <h3>Feedback</h3>
              <p>
                Nếu có thắc mắc hoặc nhu cầu quảng cáo vui lòng liên hệ với
                chúng tôi qua SĐT: 0993434514 hoặc Email: vaicut6941@gmail.com.
              </p>
              <span>
                Trong quá trình sử dụng website nếu gặp sự cố vui lòng điền vào
                đây: <strong className={cx('btn-feedback')}>[Góp ý]</strong>.
                Chúng tôi sẽ khắc phục sự cố sớm nhất có thể. Trân thành cảm ơn!
              </span>
            </div>
          </div>
        </div>

        <div className={cx('contact')}>
          <div className={cx('social-media')}>
            <h2>Social media</h2>
            <div className={cx('social-contact')}>
              <a
                id="facebook"
                href="https://www.facebook.com/nguyen.d.hieu.355"
              >
                <img
                  src={require('../../../../constants/Images/social-img/facebook.png')}
                  alt=""
                />
                Facebook
              </a>

              <a id="instagram" href="https://www.instagram.com/hieu987gh/">
                <img
                  src={require('../../../../constants/Images/social-img/instagram.png')}
                  alt=""
                />
                Instagram
              </a>

              <a id="twitter" href="https://twitter.com/Hieu-987">
                <img
                  src={require('../../../../constants/Images/social-img/twitter.png')}
                  alt=""
                />
                Twitter
              </a>
            </div>
          </div>

          <div className={cx('contact-me')}>
            <h2>Contact To Me</h2>
            <div className={cx('contact-items')}>
              <a
                href="mailto:vaicut6941@gmail.com"
                className={cx('gmail-address')}
                target="-blank"
              >
                <img
                  src={require('../../../../constants/Images/social-img/gmail.png')}
                  alt=""
                />
                <p>vaicut6941@gmail.com</p>
              </a>
              <span className={cx('phone-number')}>
                <img
                  src={require('../../../../constants/Images/social-img/phone.png')}
                  alt=""
                />
                0993434514
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('copyright')}>
        <div className={cx('footer-container')}>
          <span>© Copyright by 2022 Phimhay247</span>
          <span>All Right Reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
