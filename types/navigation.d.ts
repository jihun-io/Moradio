import '@react-navigation/native';

// Theme 타입 확장
declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      systemGray: string;
    };
  };

  export function useTheme(): ExtendedTheme;
}
