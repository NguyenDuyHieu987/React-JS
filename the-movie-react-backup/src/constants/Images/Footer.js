import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDaTaSearch } from '../../../../Services/MovieService';
import ItemSearch from './ItemSearch';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer class="footer">
      <div class="container">
        <div class="banner_logo_wrapper">
          <div class="banner_logo">
            <a href="../Home/home.php">
              <img src="../images/film-reel(large).png" alt="" />
            </a>
            <h1 class="logo">
              <a href="../Home/home.php">Phimhay247</a>
            </h1>
          </div>

          <div class="about_website">
            <div class="introduce_support">
              <div class="introduce_website">
                <h3>Giới thiệu</h3>
                <span>
                  Phimhay247.com - Xem phim Online Hoàn Toàn Miễn Phí - Nơi Thỏa
                  Mãn Đam Mê. Cập nhật các bộ phim hay, mới nhất, nhanh nhất để
                  phục vụ khán giả, hỗ trợ trên mọi thiết bị.
                </span>
              </div>

              <div class="support_website">
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

            <div class="feedback">
              <h3>Feedback</h3>
              <p>
                Nếu có thắc mắc hoặc nhu cầu quảng cáo vui lòng liên hệ với
                chúng tôi qua SĐT: 0993434514 hoặc Email: vaicut6941@gmail.com.
              </p>
              <span>
                Trong quá trình sử dụng website nếu gặp sự cố vui lòng điền vào
                đây: <strong class="btn_feedback">[Góp ý]</strong>. Chúng tôi sẽ
                khắc phục sự cố sớm nhất có thể. Trân thành cảm ơn!
              </span>
            </div>
          </div>
        </div>

        <div class="contact">
          <div class="social_media">
            <h2>Social media</h2>
            <div class="social_contact">
              <a
                id="facebook"
                href="https://www.facebook.com/nguyen.d.hieu.355"
              >
                <img src="../images/social_img/facebook.png" alt="" />
                Facebook
              </a>

              <a id="instagram" href="https://www.instagram.com/hieu987gh/">
                <img src="../images/social_img/instagram.png" alt="" />
                Instagram
              </a>

              <a id="twitter" href="https://twitter.com/Hieu_987">
                <img src="../images/social_img/twitter.png" alt="" />
                Twitter
              </a>
            </div>
          </div>

          <div class="contact_me">
            <h2>Contact To Me</h2>
            <div class="contact_items">
              <a
                href="mailto:vaicut6941@gmail.com"
                class="gmail_address"
                target="_blank"
              >
                <img src="../images/social_img/gmail.png" alt="" />
                <p>vaicut6941@gmail.com</p>
              </a>
              <span class="phone_number">
                <img src="../images/social_img/phone.png" alt="" />
                0993434514
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="copyright">
        <div class="container">
          <span>© Copyright by 2022 Phimhay247</span>
          <span>All Right Reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
