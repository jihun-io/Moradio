import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TrackPlayer, {
  Capability,
  Event,
  useTrackPlayerEvents,
  State,
  TrackType,
} from "react-native-track-player";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constants/env";
import { usePlayer } from "../../contexts/RadioContext";
import { stationImages } from "../../constants/stationsLogo";

const saveVolume = async (volume: number) => {
  try {
    await AsyncStorage.setItem("@radio_volume", volume.toString());
  } catch (error) {
    console.error("볼륨 저장 실패:", error);
  }
};

const loadVolume = async () => {
  try {
    const savedVolume = await AsyncStorage.getItem("@radio_volume");
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  } catch (error) {
    console.error("볼륨 불러오기 실패:", error);
    return 0.5;
  }
};

export default function RadioPlayerScreen() {
  const params = useLocalSearchParams();
  const { isPlaying, setIsPlaying, currentStation, setCurrentStation } = usePlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.5);

  // params가 있으면 currentStation 업데이트
  useEffect(() => {
    if (params.stationId) {
      setCurrentStation({
        stationId: params.stationId as string,
        stationName: params.stationName as string,
        streamUrl: params.streamUrl as string,
        stationLogo: params.stationLogo,
        stationColor: params.stationColor as string,
      });
    }
  }, [params.stationId]);

  // currentStation 또는 params에서 방송국 정보 가져오기
  const { stationId, stationName, streamUrl, stationLogo, stationColor } =
    (() => {
      if (params.stationId) {
        return {
          stationId: params.stationId as string,
          stationName: params.stationName as string,
          streamUrl: params.streamUrl as string,
          stationLogo: params.stationLogo,
          stationColor: params.stationColor as string,
        };
      } else if (currentStation) {
        return currentStation;
      } else {
        return {
          stationName: "재생 중이 아님",
          streamUrl: "",
          stationLogo: null,
          stationColor: "",
          stationId: "",
        };
      }
    })();

  useEffect(() => {
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

  useTrackPlayerEvents(
    [
      Event.PlaybackState,
      Event.PlaybackError,
      Event.PlaybackTrackChanged,
      Event.PlaybackActiveTrackChanged,
      Event.PlaybackPlayWhenReadyChanged,
      Event.RemotePause,
      Event.RemotePlay,
      Event.PlaybackQueueEnded,
      Event.RemoteStop,
      Event.RemoteDuck,
    ],
    async (event) => {
      console.log("Track player event:", event.type);

      if (event.type === Event.PlaybackError) {
        console.log("An error occurred", event.message);
        setIsPlaying(false);
      }
      if (event.type === Event.PlaybackState) {
        console.log("Playback state changed:", event.state);
        if (event.state === State.Ready || event.state === State.Playing) {
          setIsLoading(false);
          setIsPlaying(true);
        }
        if (
          event.state === State.Buffering ||
          event.state === State.Connecting
        ) {
          setIsLoading(true);
        }
        if (
          event.state === State.Paused ||
          event.state === State.Stopped ||
          event.state === State.None
        ) {
          setIsPlaying(false);
        }
      }
      if (event.type === Event.RemotePause) {
        setIsPlaying(false);
      }
      if (event.type === Event.RemotePlay) {
        setIsPlaying(true);
      }
      if (event.type === Event.RemoteStop) {
        console.log("Remote stop event");
        setIsPlaying(false);
      }
      if (event.type === Event.RemoteDuck) {
        console.log("Remote duck event:", event.paused, event.permanent);
        if (event.paused === true) {
          setIsPlaying(false);
        }
      }
      if (event.type === Event.PlaybackQueueEnded) {
        console.log("Playback queue ended");
        setIsPlaying(false);
      }
    },
  );

  useEffect(() => {
    const loadStation = async () => {
      try {
        setIsPlaying(false);
        console.log("isLoading", isPlaying);
        const state = await TrackPlayer.getState();

        if (state !== State.None) {
          await TrackPlayer.stop();
        }

        await TrackPlayer.reset();

        await TrackPlayer.add({
          url: `${API_URL}/stream/${streamUrl}`,
          title: stationName,
          artist: "Moradio",
          artwork: stationImages[stationId]
            ? stationImages[stationId]
            : undefined,
          type: TrackType.HLS,
          isLive: true,
        });

        await TrackPlayer.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Error loading station:", error);
      }
    };

    if (stationName !== "재생 중이 아님") {
      loadStation();
    }
  }, [stationName, streamUrl]);

  return (
    <View style={styles.container}>
      <View style={styles.stationInfo}>
        {stationName === "재생 중이 아님" ? null : (
          <Text style={styles.stationName}>{stationName}</Text>
        )}
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.programInfo}>
          {isLoading && stationName !== "재생 중이 아님" ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : stationName !== "재생 중이 아님" ? (
            <Image
              source={stationImages[stationId]}
              style={styles.stationLogo}
            />
          ) : (
            <Text style={{ fontSize: 24, color: "#fff" }}>{stationName}</Text>
          )}
        </View>
      </View>

      <View style={styles.controls}>
        {stationName !== "재생 중이 아님" ? (
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            <MaterialIcons
              name={isPlaying ? "pause" : "play-arrow"}
              size={40}
              color="#FFF"
            />
          </TouchableOpacity>
        ) : null}

        <Slider
          style={{ width: "80%", height: 40 }}
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
    backgroundColor: "#000",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingTop: 120,
    paddingBottom: 120,
  },
  stationInfo: {
    alignItems: "center",
  },
  stationName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  stationLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "contain",
  },
  liveIndicator: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "600",
  },
  programInfo: {
    width: "100%",
    aspectRatio: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  currentTime: {
    color: "#999",
    fontSize: 14,
    marginBottom: 8,
  },
  programTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  djName: {
    color: "#999",
    fontSize: 16,
  },
  hiddenVideo: {
    width: 0,
    height: 0,
  },
  controls: {
    alignItems: "center",
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DC2E2E",
    justifyContent: "center",
    alignItems: "center",
  },
});
