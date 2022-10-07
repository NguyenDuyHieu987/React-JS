import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDaTaSearch } from '../../../../Services/MovieService';
import ItemSearch from '../../../SearchRender/ItemSearch';
import SearchRender from '../../../SearchRender/SearchRender';
import { useNavigate } from 'react-router-dom';
import SingIn from './../../../SigIn/SigIn';

const cx = classNames.bind(styles);

function Header() {
  const [valueInput, setValueInput] = useState('');
  const [isFoucusSearch, setIsFocuSearch] = useState(false);
  const [isChangeInput, setIsChangeInput] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [pageSearch, setPageSearch] = useState(1);
  const [isOpenFormSigIn, setIsOpenFormSigIn] = useState(false);
  const [isActiveSigInContent, setIsActiveSigInContent] = useState(false);
  const [isActiveSigUpContent, setIsActiveSigUpContent] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isChangeInput) {
  //       setValueInput(null);
  //     setIsFocuSearch(false);
  //   }
  // }, [isChangeInput]);

  const handleOnChangeTextSearch = async (text) => {
    setValueInput(text);

    if (text.length === 0) {
      setDataSearch([]);
      setIsFocuSearch(false);
      setIsChangeInput(false);
    } else if (text.length >= 1) {
      setIsFocuSearch(true);
      setIsChangeInput(true);
      await axios
        .get(
          // `https://api.themoviedb.org/3/search/multi?api_key=fe1b70d9265fdb22caa86dca918116eb&query=${text}`
          `https://the-movie-node.onrender.com/search/multi?api=hieu987&query=${text}`
        )
        .then((searchMovieResponse) => {
          setDataSearch(searchMovieResponse.data.results);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });

      const xMark = document.getElementsByClassName(cx('x-mark'));
      xMark[0].addEventListener('mousedown', (e) => {
        e.preventDefault();
        setValueInput('');
        setIsFocuSearch(false);
        setIsChangeInput(false);
      });

      window.onkeydown = (e) => {
        if (text !== '') {
          if (e.key === 'Enter') {
            setIsChangeInput(false);
            navigate(`/Searh/${text.replace(/\s/g, '-')}/`);
          }
        }
      };
    }
  };

  // const handleOnClickXmark = () => {
  //     setValueInput('');
  //   setIsFocuSearch(true);
  //   setIsChangeInput(false);
  // };

  const getData = () => {
    getDaTaSearch(valueInput, pageSearch).then((movieRespone) => {
      setDataSearch(dataSearch.concat(movieRespone.data.results));
    });
  };

  useEffect(() => {
    // document
    //   .querySelector('.' + cx('textbox-SearchFilm'))
    //   .addEventListener('blur', () => {
    //     setIsChangeInput(false);
    //   });

    window.addEventListener('click', () => {
      setIsChangeInput(false);
    });
    document
      .querySelector('.' + cx('textbox-SearchFilm'))
      .addEventListener('click', (e) => {
        e.stopPropagation();
      });

    const btn_signIn = document.querySelector('.' + cx('btn-signIn'));

    btn_signIn.onclick = function () {
      // signIn_content.classList.toggle('active');
      // form_sign.classList.toggle('active');
      // model_sign.classList.toggle('active');
      setIsOpenFormSigIn(true);
      setIsActiveSigInContent(true);
    };

    // SignUp
    const btn_signUp = document.querySelector('.' + cx('btn-signUp'));

    btn_signUp.onclick = function () {
      // signUp_content.classList.toggle('active');
      // form_sign.classList.toggle('active');
      // model_sign.classList.toggle('active');
      setIsOpenFormSigIn(true);
      setIsActiveSigUpContent(true);
    };
  }, []);

  const handleOnClickBtnSearch = (e) => {
    if (valueInput !== '') {
      setIsChangeInput(false);
      navigate(`/Searh/${valueInput.replace(/\s/g, '-')}/`);
    }
  };

  return (
    <>
      <header className={cx('header')} id="header">
        <div className={cx('container')} id="start-point">
          <div className={cx('owl-items-header')}>
            <div className={cx('header-brand')}>
              <h1 className={cx('logo')} title="Trang chủ">
                <Link to="/">PhimHay247</Link>
              </h1>
            </div>

            {/* <div className={cx('btn-toggle-navbar')}>
                  <input type="checkbox" className={cx('nav-btn')} id="nav-btn" />
                  <label for="nav-btn" className={cx('nav-icon')}>
                    <span className={cx('nav-icon-main')}></span>
                  </label>
                </div> */}

            <form className={cx('search-bar')} action="" method="GET">
              <input
                className={cx('textbox-SearchFilm')}
                id="textbox-SearchFilm"
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={valueInput}
                onChange={(e) => handleOnChangeTextSearch(e.target.value)}
              />

              <label
                htmlFor="textbox-SearchFilm"
                className={cx('search-label')}
              >
                {!isFoucusSearch ? 'Nhập tên phim...' : ''}
              </label>

              {isFoucusSearch ? (
                <FontAwesomeIcon
                  className={cx('x-mark')}
                  icon={faXmark}
                  // onClick={handleOnClickXmark}
                />
              ) : null}

              <button
                type="submit"
                className={cx('btn-SearchFilm')}
                title="Tìm kiếm"
                onMouseDown={handleOnClickBtnSearch}
              >
                <FontAwesomeIcon icon={faSearch} className={cx('fa-search')} />
              </button>

              {isChangeInput ? (
                <SearchRender
                  dataSearch={dataSearch}
                  setIsChangeInput={setIsChangeInput}
                />
              ) : null}
            </form>

            <div className={cx('sign')}>
              <div className={cx('wrapper-sign-in')}>
                <Link className={cx('btn-signIn')} to={'/'}>
                  Đăng nhập
                </Link>
              </div>
              <div className={cx('wrapper-sign-up')}>
                <Link className={cx('btn-signUp')} to={'/'}>
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SingIn
        isOpenFormSigIn={isOpenFormSigIn}
        isActiveSigInContent={isActiveSigInContent}
        isActiveSigUpContent={isActiveSigUpContent}
        setIsOpenFormSigIn={setIsOpenFormSigIn}
        setIsActiveSigInContent={setIsActiveSigInContent}
        setIsActiveSigUpContent={setIsActiveSigUpContent}
      />
    </>
  );
}

export default Header;
