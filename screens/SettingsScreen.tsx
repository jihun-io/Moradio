import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Check} from 'lucide-react-native';

import {REGIONS} from '../constants/regions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsListItemProps {
  title: string;
  selected: boolean | undefined;
  onPress: () => void;
}

async function loadRegions() {
  try {
    const selectedRegions = await AsyncStorage.getItem('selectedRegions');

    if (!selectedRegions) {
      const init = ['capital'];
      await AsyncStorage.setItem('selectedRegions', JSON.stringify(init));
      return init;
    }

    return JSON.parse(selectedRegions);
  } catch (error) {
    console.error('Error loading regions:', error);
    return ['capital']; // 오류 발생 시 기본값 반환
  }
}

async function setRegions(id: string) {
  try {
    const selectedRegions = await loadRegions();

    if (selectedRegions.includes(id)) {
      const updatedRegions = selectedRegions.filter(
        (region: string) => region !== id,
      );
      await AsyncStorage.setItem(
        'selectedRegions',
        JSON.stringify(updatedRegions),
      );
      return updatedRegions;
    } else {
      const updatedRegions = [...selectedRegions, id];
      await AsyncStorage.setItem(
        'selectedRegions',
        JSON.stringify(updatedRegions),
      );
      return updatedRegions;
    }
  } catch (error) {
    console.error('Error setting regions:', error);
    return;
  }
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  title,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.itemsContainer}
      onPress={onPress}
      activeOpacity={0.6}>
      <View style={styles.leftContent}>
        <View style={styles.checkContainer}>
          {selected ? <Check size={20} color="#007AFF" /> : null}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Settings() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['capital']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regions = await loadRegions();
        setSelectedRegions(regions);
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleRegionSelect = async (id: string) => {
    try {
      const updatedRegions = await setRegions(id);
      if (updatedRegions) {
        setSelectedRegions(updatedRegions);
      }
    } catch (error) {
      console.error('Error updating regions:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={{paddingHorizontal: 16, paddingBottom: 7}}>지역 선택</Text>
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionContainer}>
            {REGIONS.map((region, index) => (
              <React.Fragment key={region.id}>
                <SettingsListItem
                  key={region.id}
                  title={region.name}
                  selected={selectedRegions.includes(region.id)}
                  onPress={() => handleRegionSelect(region.id)}
                />
                {index < REGIONS.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionWrapper: {
    // paddingHorizontal: 16,
    // paddingTop: 20,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 11,
    paddingHorizontal: 16,
    minHeight: 44,
    borderRadius: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  title: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#C6C6C8',
    marginLeft: 16,
  },
  checkContainer: {
    width: 22,
    marginRight: 8,
  },
});
