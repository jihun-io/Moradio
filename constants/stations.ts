import { ImageSourcePropType } from 'react-native';

import bbsLogo from '../assets/images/stations/bbs.png';
import cbsLogo from '../assets/images/stations/cbs.png';
import cpbcLogo from '../assets/images/stations/cpbc.png';
import ebsLogo from '../assets/images/stations/ebsfm.png';
import febcLogo from '../assets/images/stations/febc.png';
import kbs1Logo from '../assets/images/stations/kbs1.png';
import kbs2Logo from '../assets/images/stations/kbs2.png';
import kbs3Logo from '../assets/images/stations/kbs3.png';
import kbs1fmLogo from '../assets/images/stations/kbs1fm.png';
import kbs2fmLogo from '../assets/images/stations/kbs2fm.png';
import kbshanminjokLogo from '../assets/images/stations/kbshanminjok.png';
import kookbangLogo from '../assets/images/stations/kookbang.png';
import kugakLogo from '../assets/images/stations/kugak.png';
import mbcfm4uLogo from '../assets/images/stations/mbcfm4u.png';
import mbcsfmLogo from '../assets/images/stations/mbcsfm.png';
import sbslovefmLogo from '../assets/images/stations/sbslovefm.png';
import sbspowerfmLogo from '../assets/images/stations/sbspowerfm.png';
import tbsefmLogo from '../assets/images/stations/tbsefm.png';
import tbsfmLogo from '../assets/images/stations/tbsfm.png';
import ytnLogo from '../assets/images/stations/ytn.png';
import tbnLogo from '../assets/images/stations/tbn.png';
import obsLogo from '../assets/images/stations/obs.png';
import ifmLogo from '../assets/images/stations/ifm.png';
import afnLogo from '../assets/images/stations/afn.png';
import wbsLogo from '../assets/images/stations/wbs.png';

export interface RadioStation {
  id: string;
  name: string;
  streamUrl: string;
  color?: string;
  logo?: ImageSourcePropType;
}

// KBS 방송국
export const KBS_STATIONS: RadioStation[] = [
  {
    id: 'kbs1',
    name: 'KBS 1라디오',
    streamUrl: '?stn=kbs&ch=1radio',
    logo: kbs1Logo,
  },
  {
    id: 'kbs2',
    name: 'KBS 2라디오',
    streamUrl: '?stn=kbs&ch=2radio',
    logo: kbs2Logo,
  },
  {
    id: 'kbs3',
    name: 'KBS 3라디오',
    streamUrl: '?stn=kbs&ch=3radio',
    logo: kbs3Logo,
  },
  {
    id: 'kbs1fm',
    name: 'KBS 1FM',
    streamUrl: '?stn=kbs&ch=1fm',
    logo: kbs1fmLogo,
  },
  {
    id: 'kbs2fm',
    name: 'KBS 2FM',
    streamUrl: '?stn=kbs&ch=2fm',
    logo: kbs2fmLogo,
  },
  {
    id: 'kbshanminjok',
    name: 'KBS 한민족방송',
    streamUrl: '?stn=kbs&ch=hanminjok',
    logo: kbshanminjokLogo,
  },
];

// MBC 방송국
export const MBC_STATIONS: RadioStation[] = [
  {
    id: 'mbcsfm',
    name: 'MBC 표준FM',
    streamUrl: '?stn=mbc&ch=sfm',
    logo: mbcsfmLogo,
  },
  {
    id: 'mbcfm4u',
    name: 'MBC FM4U',
    streamUrl: '?stn=mbc&ch=fm4u',
    logo: mbcfm4uLogo,
  },
];

// SBS 방송국
export const SBS_STATIONS: RadioStation[] = [
  {
    id: 'sbslovefm',
    name: 'SBS 러브FM',
    streamUrl: '?stn=sbs&ch=lovefm',
    logo: sbslovefmLogo,
  },
  {
    id: 'sbspowerfm',
    name: 'SBS 파워FM',
    streamUrl: '?stn=sbs&ch=powerfm',
    logo: sbspowerfmLogo,
  },
];

// EBS
export const EBS_STATIONS: RadioStation[] = [
  {
    id: 'ebsfm',
    name: 'EBS FM',
    streamUrl: '?stn=ebs',
    logo: ebsLogo,
  },
];

// 지역 방송
export const LOCAL_STATIONS: RadioStation[] = [
  {
    id: 'obs',
    name: 'OBS 라디오',
    streamUrl: '?stn=obs',
    logo: obsLogo,
  },
  {
    id: 'ifm',
    name: 'iFM 경인방송',
    streamUrl: '?stn=ifm',
    logo: ifmLogo,
  },
];

// YTN
export const YTN_STATIONS: RadioStation[] = [
  {
    id: 'ytn',
    name: 'YTN 라디오',
    streamUrl: '?stn=ytn',
    logo: ytnLogo,
  },
];

// TBS
export const TBS_STATIONS: RadioStation[] = [
  {
    id: 'tbsfm',
    name: 'TBS FM',
    streamUrl: '?stn=tbs&ch=fm',
    logo: tbsfmLogo,
  },
  {
    id: 'tbsefm',
    name: 'TBS eFM',
    streamUrl: '?stn=tbs&ch=efm',
    logo: tbsefmLogo,
  },
];

// TBN
export const TBN_STATIONS: RadioStation[] = [
  {
    id: 'tbn',
    name: 'TBN 경인교통방송',
    streamUrl: '?stn=tbn',
    logo: tbnLogo,
  },
];

// CBS
export const CBS_STATIONS: RadioStation[] = [
  {
    id: 'cbssfm',
    name: 'CBS 표준FM',
    streamUrl: '?stn=cbs&ch=sfm',
    logo: cbsLogo,
  },
  {
    id: 'cbsmfm',
    name: 'CBS 음악FM',
    streamUrl: '?stn=cbs&ch=mfm',
    logo: cbsLogo,
  },
  {
    id: 'cbsjoy4u',
    name: 'CBS JOY4U',
    streamUrl: '?stn=cbs&ch=joy4u',
    logo: cbsLogo,
  },
];

// 종교방송
export const RELIGIOUS_STATIONS: RadioStation[] = [
  {
    id: 'febc',
    name: 'FEBC 서울극동방송',
    streamUrl: '?stn=febc',
    logo: febcLogo,
  },
  {
    id: 'bbs',
    name: 'BBS 서울불교방송',
    streamUrl: '?stn=bbs',
    logo: bbsLogo,
  },
  {
    id: 'cpbc',
    name: 'CPBC 가톨릭평화방송',
    streamUrl: '?stn=cpbc',
    logo: cpbcLogo,
  },
  {
    id: 'wbs',
    name: 'WBS 서울원음방송',
    streamUrl: '?stn=wbs',
    logo: wbsLogo,
  },
];

// 특수방송
export const SPECIAL_STATIONS: RadioStation[] = [
  {
    id: 'kookbang',
    name: '국방FM',
    streamUrl: '?stn=kookbang',
    logo: kookbangLogo,
  },
  {
    id: 'kugak',
    name: '국악방송',
    streamUrl: '?stn=kugak',
    logo: kugakLogo,
  },
  {
    id: 'afn',
    name: 'AFN FM Humphreys',
    streamUrl: '?stn=afn&city=humphreys',
    logo: afnLogo,
  },
];

export const ALL_STATIONS = [...KBS_STATIONS, ...MBC_STATIONS, ...SBS_STATIONS, ...EBS_STATIONS, ...LOCAL_STATIONS, ...YTN_STATIONS, ...TBS_STATIONS, ...TBN_STATIONS, ...CBS_STATIONS, ...RELIGIOUS_STATIONS, ...SPECIAL_STATIONS];
