import classNames from 'classnames/bind';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getList,
  getNowPlaying,
  getTheMostVoteCount,
  getWatchList,
} from '../../Services/MovieService';
import styles from './Rank.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import RightSideFollow from '../../components/RightSideFollow/RightSideFollow';
import RightSideRank from '../../components/RightSideRank/RightSideRank';
import MovieCard from '../../components/MovieCard';
import axios from 'axios';
const cx = classNames.bind(styles);

function Rank() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [dataHistory, setDataHistory] = useState([]);
  const [dataRank, setDataRank] = useState([]);
  const [pageRank, setPageRank] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getNowPlaying(page).then((movieRespose) => {
      setData(movieRespose.data.results);
    });
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

  return (
    <div className={cx('rank')}>
      <section className={cx('rank-main-content')}>
        <div className={cx('main-movies')}>
          <h3 className={cx('main-movies-title') + ' main-movies-title'}>
            <strong>PHIM HOT NHẤT</strong>
          </h3>

          <div className={cx('main-movies-container')}>
            {data.map((item, index) => (
              <MovieCard item={item} key={index.toString()} type="box-movie" />
            ))}
          </div>
        </div>
      </section>

      <RightSideRank
        data={dataRank}
        type="rank"
        setPageRank={setPageRank}
        page="rank"
      />
    </div>
  );
}

export default Rank;
