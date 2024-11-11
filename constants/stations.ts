export interface RadioStation {
  id: string;
  name: string;
  streamUrl: string;
  color: string;
}

// KBS 방송국
export const KBS_STATIONS: RadioStation[] = [
  {
    id: 'kbs1',
    name: 'KBS 1라디오',
    streamUrl: '?stn=kbs&ch=1radio',
    color: '#FF6B6B',
  },
  {
    id: 'kbs2',
    name: 'KBS 2라디오',
    streamUrl: '?stn=kbs&ch=2radio',
    color: '#4ECDC4',
  },
  {
    id: 'kbs3',
    name: 'KBS 3라디오',
    streamUrl: '?stn=kbs&ch=3radio',
    color: '#45B7D1',
  },
  {
    id: 'kbs1fm',
    name: 'KBS 1FM',
    streamUrl: '?stn=kbs&ch=1fm',
    color: '#FF6B6B',
  },
  {
    id: 'kbs2fm',
    name: 'KBS 2FM',
    streamUrl: '?stn=kbs&ch=2fm',
    color: '#4ECDC4',
  },
  {
    id: 'kbshanminjok',
    name: 'KBS 한민족방송',
    streamUrl: '?stn=kbs&ch=hanminjok',
    color: '#45B7D1',
  },
];

// MBC 방송국
export const MBC_STATIONS: RadioStation[] = [
  {
    id: 'mbcsfm',
    name: 'MBC 표준FM',
    streamUrl: '?stn=mbc&ch=sfm',
    color: '#FF6B6B',
  },
  {
    id: 'mbcfm4u',
    name: 'MBC FM4U',
    streamUrl: '?stn=mbc&ch=fm4u',
    color: '#4ECDC4',
  },
  {
    id: 'mbcchm',
    name: 'MBC mini 올댓뮤직',
    streamUrl: '?stn=mbc&ch=chm',
    color: '#45B7D1',
  },
];

// SBS 방송국
export const SBS_STATIONS: RadioStation[] = [
  {
    id: 'sbslovefm',
    name: 'SBS 러브FM',
    streamUrl: '?stn=sbs&ch=lovefm',
    color: '#FF6B6B',
  },
  {
    id: 'sbspowerfm',
    name: 'SBS 파워FM',
    streamUrl: '?stn=sbs&ch=powerfm',
    color: '#4ECDC4',
  },
  {
    id: 'sbsdmb',
    name: 'SBS 고릴라디오M',
    streamUrl: '?stn=sbs&ch=dmb',
    color: '#45B7D1',
  },
];

// EBS
export const EBS_STATIONS: RadioStation[] = [
  {
    id: 'ebsfm',
    name: 'EBS FM',
    streamUrl: '?stn=ebs',
    color: '#FF6B6B',
  },
];

// 지역 방송
export const LOCAL_STATIONS: RadioStation[] = [
  {
    id: 'obs',
    name: 'OBS 라디오',
    streamUrl: '?stn=obs',
    color: '#4ECDC4',
  },
  {
    id: 'ifm',
    name: 'iFM 경인방송',
    streamUrl: '?stn=ifm',
    color: '#45B7D1',
  },
];

// YTN
export const YTN_STATIONS: RadioStation[] = [
  {
    id: 'ytn',
    name: 'YTN 라디오',
    streamUrl: '?stn=ytn',
    color: '#FF6B6B',
  },
];

// TBS
export const TBS_STATIONS: RadioStation[] = [
  {
    id: 'tbsfm',
    name: 'TBS FM',
    streamUrl: '?stn=tbs&ch=fm',
    color: '#4ECDC4',
  },
  {
    id: 'tbsefm',
    name: 'TBS eFM',
    streamUrl: '?stn=tbs&ch=efm',
    color: '#45B7D1',
  },
];

// TBN
export const TBN_STATIONS: RadioStation[] = [
  {
    id: 'tbn',
    name: 'TBN 경인교통방송',
    streamUrl: '?stn=tbn',
    color: '#FF6B6B',
  },
];

// CBS
export const CBS_STATIONS: RadioStation[] = [
  {
    id: 'cbssfm',
    name: 'CBS 표준FM',
    streamUrl: '?stn=cbs&ch=sfm',
    color: '#4ECDC4',
  },
  {
    id: 'cbsmfm',
    name: 'CBS 음악FM',
    streamUrl: '?stn=cbs&ch=mfm',
    color: '#45B7D1',
  },
  {
    id: 'cbsjoy4u',
    name: 'CBS JOY4U',
    streamUrl: '?stn=cbs&ch=joy4u',
    color: '#FF6B6B',
  },
];

// 종교방송
export const RELIGIOUS_STATIONS: RadioStation[] = [
  {
    id: 'febc',
    name: 'FEBC 서울극동방송',
    streamUrl: '?stn=febc',
    color: '#4ECDC4',
  },
  {
    id: 'bbs',
    name: 'BBS 서울불교방송',
    streamUrl: '?stn=bbs',
    color: '#45B7D1',
  },
  {
    id: 'cpbc',
    name: 'CPBC 가톨릭평화방송',
    streamUrl: '?stn=cpbc',
    color: '#FF6B6B',
  },
  {
    id: 'wbs',
    name: 'WBS 서울원음방송',
    streamUrl: '?stn=wbs',
    color: '#4ECDC4',
  },
];

// 특수방송
export const SPECIAL_STATIONS: RadioStation[] = [
  {
    id: 'kookbang',
    name: '국방FM',
    streamUrl: '?stn=kookbang',
    color: '#45B7D1',
  },
  {
    id: 'kugak',
    name: '국악방송',
    streamUrl: '?stn=kugak',
    color: '#FF6B6B',
  },
  {
    id: 'afn',
    name: 'AFN FM Humphreys',
    streamUrl: '?stn=afn&city=humphreys',
    color: '#4ECDC4',
  },
];

export const ALL_STATIONS = [...KBS_STATIONS, ...MBC_STATIONS, ...SBS_STATIONS, ...EBS_STATIONS, ...LOCAL_STATIONS, ...YTN_STATIONS, ...TBS_STATIONS, ...TBN_STATIONS, ...CBS_STATIONS, ...RELIGIOUS_STATIONS, ...SPECIAL_STATIONS];  