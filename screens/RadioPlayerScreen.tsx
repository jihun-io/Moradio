import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // MaterialIcons import
import TrackPlayer, {
  Capability,
  Event,
  useTrackPlayerEvents,
  State,
  TrackType,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider'; // Slider import
import AsyncStorage from '@react-native-async-storage/async-storage';

import {API_URL} from '@env';

import {usePlayer} from '../contexts/RadioContext';

import {stationImages} from '../constants/stationsLogo';

// 볼륨 값 저장 함수
const saveVolume = async (volume: number) => {
  try {
    await AsyncStorage.setItem('@radio_volume', volume.toString());
  } catch (error) {
    console.error('볼륨 저장 실패:', error);
  }
};

// 저장된 볼륨 값 불러오기 함수
const loadVolume = async () => {
  try {
    const savedVolume = await AsyncStorage.getItem('@radio_volume');
    return savedVolume ? parseFloat(savedVolume) : 0.5; // 기본값 0.5
  } catch (error) {
    console.error('볼륨 불러오기 실패:', error);
    return 0.5; // 에러 시 기본값 반환
  }
};

export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({
      // HLS 스트리밍을 위한 설정 추가
      waitForBuffer: true,
    });
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    });
    console.log('Player setup complete');
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

type RootStackParamList = {
  RadioPlayer: {
    stationId: string;
    stationName: string;
    streamUrl: string;
    stationLogo: string;
    stationColor: string;
  };
};

type RadioPlayerScreenRouteProp = RouteProp<RootStackParamList, 'RadioPlayer'>;

type Props = {
  route?: any;
};

function RadioPlayerScreen({route}: Props): JSX.Element {
  const {isPlaying, setIsPlaying} = usePlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.5); // 0.0 ~ 1.0 사이 값

  useEffect(() => {
    // 컴포넌트 마운트 시 저장된 볼륨 불러오기
    const initVolume = async () => {
      const savedVolume = await loadVolume();
      setVolume(savedVolume);
      await TrackPlayer.setVolume(savedVolume);
    };

    initVolume();
  }, []);

  const handlePlayPress = () => {
    if (isPlaying) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    await TrackPlayer.setVolume(value);
    await saveVolume(value);
  };

  const {stationId, stationName, streamUrl, stationLogo, stationColor} =
    (() => {
      if (!route.params) {
        console.log(usePlayer);
        return {
          stationName: '재생 중이 아님',
          streamUrl: '',
          stationLogo: null,
          stationColor: '',
          stationId: '',
        };
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
          url: `${API_URL}/stream/${streamUrl}`,
          title: stationName,
          artist: 'Moradio',
          artwork: stationLogo ? stationLogo : null,
          // HLS 스트리밍을 위한 추가 설정
          type: TrackType.HLS, // 스트림 타입을 명시적으로 지정
          isLive: true, // 라이브 스트리밍임을 명시
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
        {stationName === '재생 중이 아님' ? null : (
          <Text style={styles.stationName}>{stationName}</Text>
        )}
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.programInfo}>
          {isLoading && stationName !== '재생 중이 아님' ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : stationName !== '재생 중이 아님' ? (
            <Image
              source={stationImages[stationId]}
              style={styles.stationLogo}
            />
          ) : (
            <Text style={{fontSize: 24, color: '#fff'}}>{stationName}</Text>
          )}
        </View>
      </View>

      <View style={styles.controls}>
        {stationName !== '재생 중이 아님' ? (
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            <MaterialIcons
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={40}
              color="#FFF"
            />
          </TouchableOpacity>
        ) : null}

        <Slider
          style={{width: '80%', height: 40}}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          step={0.01}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
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
  stationLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  liveIndicator: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
  },
  programInfo: {
    width: '100%',
    aspectRatio: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#DC2E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RadioPlayerScreen;
