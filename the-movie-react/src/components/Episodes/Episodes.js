import classNames from 'classnames/bind';
import {
  faPlay,
  faBookmark,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  getMovieByCredit,
  getMovieById,
  getMovieByRecommend,
  getMovieBySimilar,
  getMoviesBySeason,
  getPoster,
} from '../../Services/MovieService';
import styles from './Episodes.scss';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Episodes({
  data,
  tap,
  numberOfEpisodes,
  lastestEpisode,
  currentSeason,
}) {
  const [dataSeason, setDataSeason] = useState({});
  const [activeSeason, setActiveSeason] = useState(currentSeason);
  useEffect(() => {
    getMoviesBySeason(data?.id, activeSeason)
      .then((episodesRespones) => {
        setDataSeason(episodesRespones?.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    document.querySelector('select').value = activeSeason;
  }, [activeSeason]);

  const handleOnchangeSeason = (value) => {
    setActiveSeason(value);
  };
  return (
    <div className="episodes">
      <div className="list-seasons-episodes">
        <h3 className="title-list-episodes">Danh sách tập</h3>
        <select onChange={(e) => handleOnchangeSeason(e.target.value)}>
          {data?.seasons.map((item, index) => (
            <option value={item.season_number} key={index.toString()}>
              {item.name.split(' ')[0] === 'Season' || item.name === 'Specials'
                ? item.name
                : 'Season ' + item.season_number + ' - ' + item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="episodes-wrapper">
        <ul className="episodes-list">
          {
            // Array.from({ length: lastestEpisode }, (_, i) => i + 1)

            dataSeason?.episodes?.map((item, index) => (
              <li
                className={'episode' + (index === tap - 1 ? ' active' : '')}
                key={index.toString()}
              >
                {item?.episode_number === dataSeason?.episodes?.length ? (
                  <Link
                    to={`/Play/${data?.id}/${
                      data?.name
                        ? data?.name?.replace(/\s/g, '-').toLowerCase()
                        : data?.title?.replace(/\s/g, '-').toLowerCase()
                    }/tap=${item?.episode_number}`}
                  >
                    {item?.episode_number < 10
                      ? '0' + item?.episode_number + '-End'
                      : item?.episode_number + '-End'}
                  </Link>
                ) : (
                  <Link
                    to={`/Play/${data?.id}/${
                      data?.name
                        ? data?.name?.replace(/\s/g, '-').toLowerCase()
                        : data?.title?.replace(/\s/g, '-').toLowerCase()
                    }/tap=${item?.episode_number}`}
                  >
                    {item?.episode_number < 10
                      ? '0' + item?.episode_number
                      : item?.episode_number}
                  </Link>
                )}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default memo(Episodes);
