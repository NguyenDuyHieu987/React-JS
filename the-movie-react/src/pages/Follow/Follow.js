import classNames from 'classnames/bind';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getList,
  getTheMostVoteCount,
  getWatchList,
  handleWatchList,
  removeItemList,
} from '../../Services/MovieService';
import styles from './Follow.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import RightSideFollow from '../../components/RightSideFollow/RightSideFollow';
import RightSideRank from '../../components/RightSideRank/RightSideRank';
import MovieCard from '../../components/MovieCard';
import axios from 'axios';
const cx = classNames.bind(styles);

function Follow() {
  const [data, setData] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [dataRank, setDataRank] = useState([]);
  const [pageRank, setPageRank] = useState(1);
  const [titleMain, setTitleMain] = useState('');
  const [titleSide, setTitleSide] = useState('');
  const [isReverse, setReverse] = useState(false);
  const [type, setType] = useState('follow');
  const [isRemoveAll, setIsRemoveAll] = useState(false);

  useEffect(() => {
    getData();
  }, [isReverse || isRemoveAll]);

  const getData = () => {
    if (isReverse === false) {
      setTitleMain('PHIM ĐANG THEO DÕI');
      setTitleSide('LỊCH SỬ XEM PHIM');
      setType('follow');
      getList()
        .then((movieRespone) => {
          setData(movieRespone.data.items);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
      getWatchList(1)
        .then((movieRespone) => {
          setDataHistory(movieRespone.data.results);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    } else {
      setTitleMain('LỊCH SỬ XEM PHIM');
      setTitleSide('PHIM ĐANG THEO DÕI');
      setType('history');
      // getList()
      //   .then((movieRespone) => {
      //     setDataHistory(movieRespone.data.items);
      //   })
      //   .catch((e) => {
      //     if (axios.isCancel(e)) return;
      //   });
      // getWatchList(1)
      //   .then((movieRespone) => {
      //     setData(movieRespone.data.results);
      //   })
      //   .catch((e) => {
      //     if (axios.isCancel(e)) return;
      //   });
    }
  };

  useEffect(() => {
    getDataTheMostVoteCount();
  }, [pageRank]);

  const getDataTheMostVoteCount = useCallback(() => {
    getTheMostVoteCount(pageRank)
      .then((movieRespone) => {
        setDataRank(movieRespone.data.results);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }, [pageRank]);

  const handleOnClickRemoveAll = () => {
    if (isReverse === false && data.length !== 0) {
      data.map((item) => {
        // axios.post(
        //   'https://api.themoviedb.org/3/list/8215569/remove_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
        //   {
        //     media_id: +item?.id,
        //   }
        // );
        removeItemList({
          media_id: +item?.id,
        });
      });
      setIsRemoveAll(true);
      setData([]);
    } else if (isReverse === true && dataHistory.length !== 0) {
      dataHistory.map((item) => {
        // axios.post(
        //   'https://api.themoviedb.org/3/account/14271386/watchlist?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
        //   {
        //     media_type: 'movie',
        //     media_id: +item?.id,
        //     watchlist: false,
        //   }
        // );

        handleWatchList({
          media_id: +item?.id,
          watchlist: false,
        });
      });
      setIsRemoveAll(true);
      setDataHistory([]);
    }
  };

  return (
    <div className={cx('following')}>
      <section className={cx('following-main-content')}>
        <div className={cx('main-movies')}>
          <h3 className={cx('main-movies-title') + ' main-movies-title'}>
            <strong>{titleMain}</strong>
            <div className={cx('remove-all')} onClick={handleOnClickRemoveAll}>
              <span>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className={cx('fa-trash-can')}
                />
                Remove All
              </span>
            </div>
          </h3>

          <div className={cx('main-movies-container')}>
            {isReverse === false
              ? data.map((item, index) => (
                  <MovieCard
                    item={item}
                    key={index.toString()}
                    type={type}
                    isRemoveAll={isRemoveAll}
                  />
                ))
              : dataHistory.map((item, index) => (
                  <MovieCard
                    item={item}
                    key={index.toString()}
                    type={type}
                    isRemoveAll={isRemoveAll}
                  />
                ))}
          </div>
        </div>
      </section>

      <div className={cx('history-watched')}>
        <div className={cx('history-watched-container')}>
          <RightSideFollow
            data={isReverse === false ? dataHistory : data}
            type={type}
            titleSide={titleSide}
            isReverse={isReverse}
            setReverse={setReverse}
            getData={getData}
          />

          <RightSideRank
            data={dataRank}
            type="rank"
            setPageRank={setPageRank}
          />
        </div>
      </div>
    </div>
  );
}

export default Follow;
