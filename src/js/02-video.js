import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer - current - time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const videoplayerCurrentTime = function (time) {
  localStorage.setItem(STORAGE_KEY, time.seconds);
};

player.on('timeupdate', throttle(videoplayerCurrentTime, 1000));

player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
