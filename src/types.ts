export type TabType = 'summary' | 'optics' | 'control' | 'products' | 'media' | 'design';

export interface ProductItem {
  id: string;
  name: string;
  vendor: string;
  lightSource: string;
  type: 'xenon' | 'led';
  form: string;
  power: string;
  powerVal: number; // Watt or Joule relative score
  protocol: string;
  range: string;
  rangeVal: number; // Meters
  aperture: string;
  beamAngle: string;
  keyFeatures: string[];
}

export interface ProcurementItem {
  id: string;
  vendor: string;
  model: string;
  desc: string;
  url: string;
  badge: string;
  specs: string;
}

export interface YoutubeItem {
  id: string;
  title: string;
  desc: string;
  url: string;
  duration?: string;
  tag: string;
  embedId?: string;
}

export interface WavelengthMetric {
  wavelength: string;
  label: string;
  cmosEfficiency: number; // 0 - 100
  invisibility: number; // 0 - 100
  plateContrast: number; // 0 - 100
  vmmrColor: number; // 0 - 100
  effectiveDistance: number; // 0 - 100
  color: string;
  description: string;
  role: string;
}

export interface PwmCalculationResult {
  speedKmH: number;
  speedMS: number;
  speedMmPerMicroSec: number;
  blurLimitMm: number;
  triggerFreqHz: number;
  pulseDurationMs: number;
  pulseDurationMicroSec: number;
  periodMs: number;
  dutyCycle: number;
  isHazardous: boolean;
  recommendation: string;
}

export interface ChecklistItem {
  id: string;
  category: '광학 & 렌즈' | '전원 & 열역학' | '통신 & 동기화' | '법적 & 안전규격';
  title: string;
  description: string;
  checked: boolean;
  mandatory: boolean;
}

export type SearchCategory = 'all' | 'products' | 'optics' | 'control' | 'guides' | 'media';

export interface SearchItem {
  id: string;
  category: '제품' | '광학 스펙' | '전자 제어' | '설계 가이드' | '구매 & 영상';
  categoryKey: 'products' | 'optics' | 'control' | 'guides' | 'media';
  title: string;
  subtitle: string;
  tags: string[];
  tab: TabType;
  targetId?: string;
  badge?: string;
  highlightText?: string;
}
