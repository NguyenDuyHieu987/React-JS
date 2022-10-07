import classNames from 'classnames/bind';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification() {
  return (
    <div className={cx('notify')}>
      <div className={cx('icon-notify')}>
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className={cx('fa-circle-exclamation')}
        ></FontAwesomeIcon>
      </div>
      <div className={cx('notify-content')}>
        <strong>Nguyễn Duy Hiếu</strong>
      </div>
    </div>
  );
}

export default Notification;
