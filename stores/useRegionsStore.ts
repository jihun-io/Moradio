// src/stores/useRegionsStore.ts
import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegionsState {
  selectedRegions: string[];
  setRegions: (regions: string[]) => void;
  toggleRegion: (id: string) => Promise<void>;
  initRegions: () => Promise<void>;
}

export const useRegionsStore = create<RegionsState>(set => ({
  selectedRegions: ['capital'],

  setRegions: regions => set({selectedRegions: regions}),

  toggleRegion: async id => {
    set(state => {
      const currentRegions = state.selectedRegions;
      let newRegions: string[];

      if (currentRegions.includes(id)) {
        // 하나의 지역은 항상 선택되어 있어야 함
        if (currentRegions.length === 1) {
          return state;
        }
        newRegions = currentRegions.filter(region => region !== id);
      } else {
        newRegions = [...currentRegions, id];
      }

      // AsyncStorage 업데이트
      AsyncStorage.setItem('selectedRegions', JSON.stringify(newRegions));
      return {selectedRegions: newRegions};
    });
  },

  initRegions: async () => {
    try {
      const stored = await AsyncStorage.getItem('selectedRegions');
      if (stored) {
        set({selectedRegions: JSON.parse(stored)});
      }
    } catch (error) {
      console.error('Failed to load regions:', error);
    }
  },
}));
