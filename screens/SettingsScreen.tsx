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
import {useRegionsStore} from '../stores/useRegionsStore';

interface SettingsListItemProps {
  title: string;
  selected: boolean | undefined;
  onPress: () => void;
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
  const {selectedRegions, toggleRegion} = useRegionsStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await useRegionsStore.getState().initRegions();
      setIsLoading(false);
    };
    init();
  }, []);

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
                  onPress={() => toggleRegion(region.id)}
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
