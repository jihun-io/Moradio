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
import {API_URL} from '../constants/env';
import {useTheme} from '@react-navigation/native';
import {stationImages} from '../constants/stationsLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioStation} from '../constants/stations';
import {useRegionsStore} from '../stores/useRegionsStore';

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

const CARD_WIDTH = Dimensions.get('window').width * 0.4;

const StationsList: React.FC<StationsListProps> = ({
  onStationSelect,
  setRecentStationList,
  recentScrollViewRef,
}) => {
  const {selectedRegions} = useRegionsStore();
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {colors} = useTheme();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          `${API_URL}/stations?region=korea,${selectedRegions.join(',')}`,
        );
        const data = await response.json();
        setStations(data);
      } catch (err) {
        setError('방송국 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [selectedRegions]);

  if (loading) {
    return <ActivityIndicator size="large" style={{paddingVertical: 30}} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const groupedStations = stations.reduce((acc, station) => {
    let category = station.category || station.name;

    if (category === 'religion') {
      category = '종교 방송';
    } else if (category === 'local') {
      category = '지역 방송';
    } else if (category === 'traffic') {
      category = 'TBN';
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

      setRecentStationList(updatedStations);
      recentScrollViewRef.current?.scrollTo({x: 0});

      await onStationSelect(station);
    } catch (error) {
      console.error('최근 방송국 저장 실패:', error);
    }
  };

  return (
    <>
      {Object.entries(groupedStations).map(([category, stationList]) => (
        <View key={category} style={styles.section}>
          <Text style={{...styles.categoryTitle, color: colors.text}}>
            {category}
          </Text>
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
                      />
                      <Text style={{...styles.stationName, color: colors.text}}>
                        {`${localChannel.name} ${channel.name}`}
                      </Text>
                    </TouchableOpacity>
                  )),
                );
              } else {
                return station.stations.map(channel => (
                  <TouchableOpacity
                    key={channel.name}
                    style={styles.stationCard}
                    onPress={() =>
                      handleStationPress({
                        id: station.id,
                        streamUrl: `?stn=${station.id.toLowerCase()}${
                          channel.city === 'korea' || channel.city === 'seoul'
                            ? ''
                            : `&city=${channel.city}`
                        }`,
                        name: channel.name,
                        logo: `/assets/images/stations/${station.id.toLowerCase()}.png`,
                      })
                    }>
                    <Image
                      style={styles.stationLogo}
                      source={stationImages[station.id]}
                    />
                    <Text style={{...styles.stationName, color: colors.text}}>
                      {channel.name}
                    </Text>
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
