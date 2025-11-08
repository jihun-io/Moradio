import { ImageSourcePropType } from "react-native";

import { stationImages } from "@/constants/stationsLogo";

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
    id: "kbs1",
    name: "KBS 1라디오",
    streamUrl: "?stn=kbs&ch=1radio",
    logo: stationImages.kbs1Logo,
  },
  {
    id: "kbs2",
    name: "KBS 2라디오",
    streamUrl: "?stn=kbs&ch=2radio",
    logo: stationImages.kbs2Logo,
  },
  {
    id: "kbs3",
    name: "KBS 3라디오",
    streamUrl: "?stn=kbs&ch=3radio",
    logo: stationImages.kbs3Logo,
  },
  {
    id: "kbs1fm",
    name: "KBS 1FM",
    streamUrl: "?stn=kbs&ch=1fm",
    logo: stationImages.kbs1fmLogo,
  },
  {
    id: "kbs2fm",
    name: "KBS 2FM",
    streamUrl: "?stn=kbs&ch=2fm",
    logo: stationImages.kbs2fmLogo,
  },
  {
    id: "kbshanminjok",
    name: "KBS 한민족방송",
    streamUrl: "?stn=kbs&ch=hanminjok",
    logo: stationImages.kbshanminjokLogo,
  },
];

// MBC 방송국
export const MBC_STATIONS: RadioStation[] = [
  {
    id: "mbcsfm",
    name: "MBC 표준FM",
    streamUrl: "?stn=mbc&ch=sfm",
    logo: stationImages.mbcsfmLogo,
  },
  {
    id: "mbcfm4u",
    name: "MBC FM4U",
    streamUrl: "?stn=mbc&ch=fm4u",
    logo: stationImages.mbcfm4uLogo,
  },
];

// SBS 방송국
export const SBS_STATIONS: RadioStation[] = [
  {
    id: "sbslovefm",
    name: "SBS 러브FM",
    streamUrl: "?stn=sbs&ch=lovefm",
    logo: stationImages.sbslovefmLogo,
  },
  {
    id: "sbspowerfm",
    name: "SBS 파워FM",
    streamUrl: "?stn=sbs&ch=powerfm",
    logo: stationImages.sbspowerfmLogo,
  },
];

// EBS
export const EBS_STATIONS: RadioStation[] = [
  {
    id: "ebsfm",
    name: "EBS FM",
    streamUrl: "?stn=ebs",
    logo: stationImages.ebsLogo,
  },
];

// 지역 방송
export const LOCAL_STATIONS: RadioStation[] = [
  {
    id: "obs",
    name: "OBS 라디오",
    streamUrl: "?stn=obs",
    logo: stationImages.obsLogo,
  },
  {
    id: "ifm",
    name: "iFM 경인방송",
    streamUrl: "?stn=ifm",
    logo: stationImages.ifmLogo,
  },
];

// YTN
export const YTN_STATIONS: RadioStation[] = [
  {
    id: "ytn",
    name: "YTN 라디오",
    streamUrl: "?stn=ytn",
    logo: stationImages.ytnLogo,
  },
];

// TBS
export const TBS_STATIONS: RadioStation[] = [
  {
    id: "tbsfm",
    name: "TBS FM",
    streamUrl: "?stn=tbs&ch=fm",
    logo: stationImages.tbsfmLogo,
  },
  {
    id: "tbsefm",
    name: "TBS eFM",
    streamUrl: "?stn=tbs&ch=efm",
    logo: stationImages.tbsefmLogo,
  },
];

// TBN
export const TBN_STATIONS: RadioStation[] = [
  {
    id: "tbn",
    name: "TBN 경인교통방송",
    streamUrl: "?stn=tbn",
    logo: stationImages.tbnLogo,
  },
];

// CBS
export const CBS_STATIONS: RadioStation[] = [
  {
    id: "cbssfm",
    name: "CBS 표준FM",
    streamUrl: "?stn=cbs&ch=sfm",
    logo: stationImages.cbsLogo,
  },
  {
    id: "cbsmfm",
    name: "CBS 음악FM",
    streamUrl: "?stn=cbs&ch=mfm",
    logo: stationImages.cbsLogo,
  },
  {
    id: "cbsjoy4u",
    name: "CBS JOY4U",
    streamUrl: "?stn=cbs&ch=joy4u",
    logo: stationImages.cbsLogo,
  },
];

// 종교방송
export const RELIGIOUS_STATIONS: RadioStation[] = [
  {
    id: "febc",
    name: "FEBC 서울극동방송",
    streamUrl: "?stn=febc",
    logo: stationImages.febcLogo,
  },
  {
    id: "bbs",
    name: "BBS 서울불교방송",
    streamUrl: "?stn=bbs",
    logo: stationImages.bbsLogo,
  },
  {
    id: "cpbc",
    name: "CPBC 가톨릭평화방송",
    streamUrl: "?stn=cpbc",
    logo: stationImages.cpbcLogo,
  },
  {
    id: "wbs",
    name: "WBS 서울원음방송",
    streamUrl: "?stn=wbs",
    logo: stationImages.wbsLogo,
  },
];

// 특수방송
export const SPECIAL_STATIONS: RadioStation[] = [
  {
    id: "kookbang",
    name: "국방FM",
    streamUrl: "?stn=kookbang",
    logo: stationImages.kookbangLogo,
  },
  {
    id: "kugak",
    name: "국악방송",
    streamUrl: "?stn=kugak",
    logo: stationImages.kugakLogo,
  },
  {
    id: "afn",
    name: "AFN FM Humphreys",
    streamUrl: "?stn=afn&city=humphreys",
    logo: stationImages.afnLogo,
  },
];

export const ALL_STATIONS = [
  ...KBS_STATIONS,
  ...MBC_STATIONS,
  ...SBS_STATIONS,
  ...EBS_STATIONS,
  ...LOCAL_STATIONS,
  ...YTN_STATIONS,
  ...TBS_STATIONS,
  ...TBN_STATIONS,
  ...CBS_STATIONS,
  ...RELIGIOUS_STATIONS,
  ...SPECIAL_STATIONS,
];
