// src/components/MiniPlayer.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';

export function MiniPlayer({style}: {style?: any}) {
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View style={style}>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          현재 재생 중: KBS 1라디오
        </Text>
      </View>
      <TouchableOpacity onPress={togglePlayback}>
        <MaterialIcons
          name={isPlaying ? 'pause' : 'play-arrow'}
          size={24}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
