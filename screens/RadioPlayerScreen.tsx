import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // MaterialIcons import
import TrackPlayer, {
  Capability,
  Event,
  useTrackPlayerEvents,
  State,
} from 'react-native-track-player';

import {usePlayer} from '../contexts/RadioContext';

export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      android: {
        // 안드로이드 설정
      },
    });
    console.log('Player setup complete');
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

type RootStackParamList = {
  RadioPlayer: {
    stationName: string;
    streamUrl: string;
  };
};

type RadioPlayerScreenRouteProp = RouteProp<RootStackParamList, 'RadioPlayer'>;

type Props = {
  route: RadioPlayerScreenRouteProp;
};

function RadioPlayerScreen({route}: Props): JSX.Element {
  const {isPlaying, setIsPlaying} = usePlayer();
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayPress = () => {
    if (isPlaying) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const {stationName, streamUrl} = (() => {
    if (!route.params) {
      console.log(usePlayer);
      return {stationName: '재생 중이 아님', streamUrl: ''};
    } else {
      return route.params;
    }
  })();

  // 트랙 플레이어 이벤트 리스너 등록
  useTrackPlayerEvents(
    [
      Event.PlaybackState,
      Event.PlaybackError,
      Event.PlaybackTrackChanged,
      Event.PlaybackActiveTrackChanged,
      Event.PlaybackPlayWhenReadyChanged,
    ],
    async event => {
      if (event.type === Event.PlaybackError) {
        console.log('An error occurred', event.message);
      }
      if (event.type === Event.PlaybackState) {
        console.log('Playback state changed:', event.state);
        // Ready 또는 Playing 상태가 되면 로딩 완료
        if (event.state === State.Ready || event.state === State.Playing) {
          setIsLoading(false);
        }
        // Buffer, Connecting 상태면 로딩 중
        if (
          event.state === State.Buffering ||
          event.state === State.Connecting
        ) {
          setIsLoading(true);
        }
      }
      // 필요한 경우 다른 이벤트도 처리
    },
  );

  useEffect(() => {
    // 방송국이 변경될 때마다 실행
    const loadStation = async () => {
      try {
        // 현재 재생 상태 확인
        setIsPlaying(false);
        console.log('isLoading', isPlaying);
        const state = await TrackPlayer.getState();

        // 재생 중이면 일단 멈춤
        if (state !== State.None) {
          await TrackPlayer.stop();
        }

        // 트랙 리스트 초기화
        await TrackPlayer.reset();

        // 새 트랙 추가
        await TrackPlayer.add({
          url: `https://radio.ztqckg569b.workers.dev/stream/${streamUrl}`,
          title: stationName,
          artist: 'Moradio',
        });

        // 재생 시작
        await TrackPlayer.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Error loading station:', error);
      }
    };

    loadStation();
  }, [stationName, streamUrl]); // 방송국이나 스트림 URL이 변경될 때만 실행

  useEffect(() => {
    const loadCurrentState = async () => {
      const currentState = await TrackPlayer.getProgress();
      console.log('Current state:', currentState);
    };
    loadCurrentState();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{stationName}</Text>
        {/* <Text style={styles.liveIndicator}>LIVE</Text> */}
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{
              marginVertical: 20, // 위아래 여백 추가
            }}
          />
        ) : null}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={40}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 60,
  },
  stationInfo: {
    alignItems: 'center',
  },
  stationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  liveIndicator: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
  },
  programInfo: {
    alignItems: 'center',
  },
  currentTime: {
    color: '#999',
    fontSize: 14,
    marginBottom: 8,
  },
  programTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  djName: {
    color: '#999',
    fontSize: 16,
  },
  hiddenVideo: {
    width: 0,
    height: 0,
  },
  controls: {
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RadioPlayerScreen;
