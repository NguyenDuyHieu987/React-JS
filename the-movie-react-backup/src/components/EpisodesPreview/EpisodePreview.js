import classNames from 'classnames/bind';
import { faPlay, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './EpisodesPreview.module.scss';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { memo } from 'react';

const cx = classNames.bind(styles);

function EpisodesPreview({ data, lastestEpisode, numberOfEpisodes }) {
  return (
    <div className={cx('lastest-episodes')}>
      <span>Tập mới nhất:</span>
      <ul>
        {Array.from({ length: lastestEpisode }, (_, i) => i + 1)
          .reverse()
          .slice(0, 6)
          .map((item, index) => (
            <li key={index.toString()}>
              {item === numberOfEpisodes ? (
                <Link
                  to={`/Play/${data?.id}/${
                    data?.name
                      ? data?.name?.replace(/\s/g, '-').toLowerCase()
                      : data?.title?.replace(/\s/g, '-').toLowerCase()
                  }/tap=${item}`}
                >
                  {'Tập ' + item + '-End'}
                </Link>
              ) : (
                <Link
                  to={`/Play/${data?.id}/${
                    data?.name
                      ? data?.name?.replace(/\s/g, '-').toLowerCase()
                      : data?.title?.replace(/\s/g, '-').toLowerCase()
                  }/tap=${item}`}
                >
                  {'Tập ' + item}
                </Link>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default memo(EpisodesPreview);
