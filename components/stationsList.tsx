import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {stationImages} from '../constants/stationsLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioStation} from '../constants/stations';

type StationsListProps = {
  onStationSelect: (station: RadioStation) => Promise<void>;
  setRecentStationList: React.Dispatch<React.SetStateAction<RadioStation[]>>;
  recentScrollViewRef: React.RefObject<ScrollView>;
};

type Station = {
  category: string;
  id: string;
  name: string;
  type: string;
  stations: {
    city: string;
    name: string;
  }[];
  channels?: {
    id: string;
    name: string;
  }[];
};

type RootStackParamList = {
  RadioPlayer: {
    stationId: string;
    stationName: string;
    streamUrl: string;
    stationLogo: string;
    stationColor?: string;
  };
  // 다른 화면들도 여기에 추가
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CARD_WIDTH = Dimensions.get('window').width * 0.4; // 화면 너비의 40%

const StationsList: React.FC<StationsListProps> = ({
  onStationSelect,
  setRecentStationList,
  recentScrollViewRef,
}) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          `${API_URL}/stations?region=korea,capital`,
        );
        const data = await response.json();
        setStations(data);
      } catch (err) {
        console.error('Failed to fetch stations:', err);
        setError('방송국 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{paddingVertical: 30}} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const groupedStations = stations.reduce((acc, station) => {
    // category가 없는 경우 방송사 이름을 카테고리로 사용
    let category = station.category || station.name;

    if (category === 'religion') {
      category = '종교 방송';
    } else if (category === 'local') {
      category = '지역 방송';
    } else if (category === 'extra') {
      category = '기타';
    }

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(station);
    return acc;
  }, {} as Record<string, Station[]>);

  const handleStationPress = async (station: any) => {
    try {
      const recentStations = await AsyncStorage.getItem('@recent_stations');
      const parsedStations: RadioStation[] = recentStations
        ? JSON.parse(recentStations)
        : [];

      const filteredStations = parsedStations.filter(s => s.id !== station.id);
      const updatedStations = [...filteredStations, station];

      await AsyncStorage.setItem(
        '@recent_stations',
        JSON.stringify(updatedStations),
      );

      // 상태 즉시 반영을 위해 직접 업데이트
      setRecentStationList(updatedStations);

      // 최근 재생 목록의 스크롤을 맨 앞으로 이동
      recentScrollViewRef.current?.scrollTo({x: 0});

      navigation.navigate('RadioPlayer', {
        stationId: station.id,
        stationName: station.name,
        streamUrl: station.streamUrl,
        stationLogo: station.logo,
        stationColor: station.color,
      });
    } catch (error) {
      console.error('최근 방송국 저장 실패:', error);
    }
  };

  return (
    <>
      {Object.entries(groupedStations).map(([category, stationList]) => (
        <View key={category} style={styles.section}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stationList.map(station => {
              if (station.channels) {
                return station.stations.map(localChannel =>
                  station.channels!.map(channel => (
                    <TouchableOpacity
                      key={`${station.id}-${channel.name}`}
                      style={styles.stationCard}
                      onPress={() =>
                        handleStationPress({
                          id: `${station.id.toLowerCase()}${channel.id.toLowerCase()}`,
                          streamUrl: `?stn=${station.id.toLowerCase()}&ch=${
                            channel.id
                          }${
                            localChannel.city === 'korea' ||
                            localChannel.city === 'seoul'
                              ? ''
                              : `&city=${localChannel.city}`
                          }`,
                          name: `${localChannel.name} ${channel.name}`,
                          logo: `${station.id.toLowerCase()}${channel.id.toLowerCase()}`,
                        })
                      }>
                      <Image
                        style={styles.stationLogo}
                        source={
                          stationImages[
                            `${station.id.toLowerCase()}${channel.id.toLowerCase()}`
                          ]
                        }
                        defaultSource={require('../assets/images/stations/default.png')}
                      />
                      <Text style={styles.stationName}>
                        {`${localChannel.name} ${channel.name}`}
                      </Text>
                    </TouchableOpacity>
                  )),
                );
              } else {
                return station.stations.map(channel => (
                  <TouchableOpacity
                    key={station.id}
                    style={styles.stationCard}
                    onPress={() =>
                      handleStationPress({
                        id: station.id,
                        streamUrl: `?stn=${station.id.toLowerCase()}`,
                        name: channel.name,
                        logo: `/assets/images/stations/${station.id}.png`,
                      })
                    }>
                    <Image
                      style={styles.stationLogo}
                      source={stationImages[station.id]}
                      defaultSource={require('../assets/images/stations/default.png')}
                    />
                    <Text style={styles.stationName}>{channel.name}</Text>
                  </TouchableOpacity>
                ));
              }
            })}
          </ScrollView>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stationCard: {
    marginRight: 15,
  },
  stationLogo: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 12,
    marginBottom: 8,
  },
  stationName: {
    fontSize: 14,
    textAlign: 'left',
  },
});

export default StationsList;
