// src/declarations.d.ts 또는 프로젝트 루트의 declarations.d.ts
declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';
  const content: ImageSourcePropType;
  export default content;
}