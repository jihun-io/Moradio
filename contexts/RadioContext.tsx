import React, {createContext, useContext, useState} from 'react';

interface CurrentStation {
  stationId: string;
  stationName: string;
  streamUrl: string;
  stationLogo?: any;
  stationColor?: string;
}

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: any;
  showMiniPlayer: boolean;
  currentStation: CurrentStation | null;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: any) => void;
  setShowMiniPlayer: (show: boolean) => void;
  setCurrentStation: (station: CurrentStation | null) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({children}: {children: React.ReactNode}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [currentStation, setCurrentStation] = useState<CurrentStation | null>(null);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        showMiniPlayer,
        currentStation,
        setIsPlaying,
        setCurrentTrack,
        setShowMiniPlayer,
        setCurrentStation,
      }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
