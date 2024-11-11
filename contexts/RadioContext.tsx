// src/contexts/PlayerContext.tsx
import React, {createContext, useContext, useState} from 'react';

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: any;
  showMiniPlayer: boolean;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: any) => void;
  setShowMiniPlayer: (show: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({children}: {children: React.ReactNode}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        showMiniPlayer,
        setIsPlaying,
        setCurrentTrack,
        setShowMiniPlayer,
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
