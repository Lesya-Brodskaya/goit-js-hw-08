import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const videoplayerCurrentTime = function(time) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(time.seconds));
    const timeKey = Number(localStorage.getItem("videoplayer-current-time"));
    console.log(timeKey);
}
  
player.on('timeupdate', videoplayerCurrentTime);

player.setCurrentTime(30.456).then(function(seconds) {}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

// player.getVideoTitle().then(function(title) {
//     console.log('title:', title);
// });