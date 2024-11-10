import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // MaterialIcons import

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
  const [isPlaying, setIsPlaying] = useState(true);
  const {stationName} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{stationName}</Text>
        <Text style={styles.liveIndicator}>LIVE</Text>
      </View>

      {/* <View style={styles.programInfo}>
        <Text style={styles.currentTime}>11:00 - 12:00</Text>
        <Text style={styles.programTitle}>오늘의 라디오</Text>
        <Text style={styles.djName}>홍길동</Text>
      </View> */}

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}>
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
