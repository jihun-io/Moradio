import TrackPlayer, { Capability, AppKilledPlaybackBehavior, IOSCategory, IOSCategoryMode } from 'react-native-track-player';

export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({
      waitForBuffer: true,
      // iOS Audio Session 설정
      iosCategory: IOSCategory.Playback,
      iosCategoryMode: IOSCategoryMode.SpokenAudio,
    });

    await TrackPlayer.updateOptions({
      // Android의 앱 종료 시 동작
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      // 플레이어 컨트롤 기능
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      // 작은 알림에 표시할 컨트롤
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      // 알림 설정
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
    });

    console.log('Player setup complete');
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

export default async function() {
  // 백그라운드 서비스 - 원격 제어 이벤트 처리
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
}
