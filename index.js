import 'expo-router/entry';
import TrackPlayer from 'react-native-track-player';

// Register the playback service
TrackPlayer.registerPlaybackService(() => require('./services/trackPlayer').default);
