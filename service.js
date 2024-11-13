// service.js
import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async function () {
  // 이벤트 리스너 등록
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );
  TrackPlayer.addEventListener(Event.RemoteSeek, event =>
    TrackPlayer.seekTo(event.position),
  );

  // m3u8 스트리밍을 위한 추가 설정
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async event => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error on PlaybackQueueEnded:', error);
    }
  });
};
