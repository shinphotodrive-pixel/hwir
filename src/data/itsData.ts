import { ProductItem, ProcurementItem, YoutubeItem, WavelengthMetric, ChecklistItem } from '../types';

export const PRODUCT_DATA: ProductItem[] = [
  {
    id: 'hik-tl3000b',
    name: 'Hikvision DS-TL3000B-I',
    vendor: 'Hikvision',
    lightSource: 'Hyman 크세논 튜브 + IR / 백색 듀얼 LED',
    type: 'xenon',
    form: '원형 실린더 대형 하우징 (Ø 305 mm)',
    power: '200 J (플래시 에너지)',
    powerVal: 200,
    protocol: 'TTL 고속 트리거 / 카메라 전용 RS-485',
    range: '16 ~ 30 m (10° 좁은 빔)',
    rangeVal: 30,
    aperture: 'Ø 305 mm',
    beamAngle: '10°',
    keyFeatures: [
      '초고에너지 크세논 플래시 + 지속형 IR 보조광 결합',
      '고속도로 위반 차량 번호판 및 전면 틴팅 유리 투과',
      '하이크비전 스마트 ITS 카메라 직결 제어 프로토콜 지원'
    ]
  },
  {
    id: 'dahua-italf',
    name: 'Dahua ITALF-300AG-GL',
    vendor: 'Dahua Technology',
    lightSource: '백색 HID + 850nm IR + 웜화이트 3000K LED',
    type: 'xenon',
    form: '방열 핀 일체형 사각 섀시 + 대구경 원형 발광창',
    power: '최대 5,500 W (순간 피크 전류 25A)',
    powerVal: 5500,
    protocol: 'RS-485 (웹 UI 제어 및 다중 장비 캐스케이딩)',
    range: '16 ~ 26 m (10° × 10° 정밀 집광)',
    rangeVal: 26,
    aperture: 'Ø 180 mm 상당',
    beamAngle: '10° × 10°',
    keyFeatures: [
      '4개 모드(스트로브/플래시/지속/하이브리드) 올인원 전환',
      '차종·외장색(VMMR) 및 안전벨트 미착용 고화질 컬러 입증',
      '극초단 펄스 방전으로 도심 빛공해 및 운전자 시각 교란 차단'
    ]
  },
  {
    id: 'lidlight-lm48',
    name: 'LIDLight LM48 Law Enforcement',
    vendor: 'LIDLight',
    lightSource: '850nm 고출력 IR + 5000K 순백색 LED',
    type: 'led',
    form: '컴팩트 완전 원형 링(Ring) 일루미네이터',
    power: '48 W (저전력 고효율 펄스 구동)',
    powerVal: 48,
    protocol: 'RS-485 양방향 통신 / TTL 동기화',
    range: '최대 70 m (10° ~ 40° 가변 CVA 광학)',
    rangeVal: 70,
    aperture: 'Ø 160 mm 원형 링',
    beamAngle: '10° ~ 40° 가변 (CVA)',
    keyFeatures: [
      '연속 각도 가변(Continuous Variable Angle, CVA) 렌즈',
      '경찰 순찰차 탑재 및 이동식 삼각대 단속 장비 겸용',
      'IP68 방수방진 및 가혹 환경용 알루미늄 다이캐스팅'
    ]
  },
  {
    id: 'raytec-pulsestar',
    name: 'Raytec Pulsestar VTR6',
    vendor: 'Raytec',
    lightSource: '850nm IR 또는 백색 LED (324개 고출력 어레이)',
    type: 'led',
    form: '산업용 고밀도 사각 하우징 + 원형 빔스폿 렌즈',
    power: '4.5 kW (4,500 W 순간 펄스 파워)',
    powerVal: 4500,
    protocol: 'Ethernet (TCP/IP GUI 기반 원격 웹 파라미터)',
    range: '최대 150 m+ (교체형 원형/타원 렌즈)',
    rangeVal: 150,
    aperture: 'Ø 200 mm 빔 투사 광학',
    beamAngle: '10°, 20°, 35° 교체형',
    keyFeatures: [
      '1ms 이하 극초단 펄스 인가로 시속 320km/h 무잔상 모션 정지',
      'PoE+ 또는 DC 구동, 이더넷 웹 콘솔을 통한 마이크로초 펄스 제어',
      'Active LED 수명 보호 서미스터 피드백 루프 내장'
    ]
  },
  {
    id: 'raytec-vario2',
    name: 'Raytec VARIO2 IP PoE Hybrid (HY16-1)',
    vendor: 'Raytec',
    lightSource: '24개 IR + 24개 White 플래티넘 LED 듀얼 어레이',
    type: 'led',
    form: '2-in-1 대형 섀시 (HRT 홀로그래픽 렌즈 내장)',
    power: '90 W (PoE+ 고효율 지속/스트로브 겸용)',
    powerVal: 90,
    protocol: 'PoE+ / IP Web API / VMS (Milestone, Genetec 연동)',
    range: 'IR 450 m / White 195 m (초장거리)',
    rangeVal: 450,
    aperture: 'Ø 170 mm 듀얼 광학',
    beamAngle: '10° × 10° ~ 120° 교체형',
    keyFeatures: [
      'HRT(Hot-spot Reduction Tech) 홀로그래픽 디퓨저 내장',
      '평상시 IR 감시 -> VMS 알람/트리거 발생 시 가시 백색광 투사',
      '16:9 직사각형 도로 화각에 부합하는 타원형 광학 빔 형성'
    ]
  },
  {
    id: 'komoto-cw7s',
    name: 'Komoto CW7S / C Series',
    vendor: 'Komoto',
    lightSource: '4000K 뉴트럴 화이트 또는 850nm IR LED',
    type: 'led',
    form: '슬림 컴팩트 사각 하우징 + 듀얼 정밀 광학 렌즈',
    power: '60 W 고성능 스트로브',
    powerVal: 60,
    protocol: 'RS-485 / 광절연 디지털 I/O',
    range: '15 ~ 30 m (10°, 20°, 30° 옵션)',
    rangeVal: 30,
    aperture: 'Ø 150 mm 대응 광학',
    beamAngle: '10°, 20°, 30°',
    keyFeatures: [
      '스마트 교차로 꼬리물기 및 신호위반 감시용 경제적 솔루션',
      '카메라 전자식 셔터 펄스와 1:1 완벽 정밀 동기화',
      '도심 설치 최적화된 저중량 알루미늄 마운트'
    ]
  }
];

export const PROCUREMENT_LINKS: ProcurementItem[] = [
  {
    id: 'proc-hik',
    vendor: 'Hikvision 공식',
    model: 'DS-TL3000B-I',
    desc: '200J 대형 크세논 방전관 + LED 하이브리드 스트로브 공식 카탈로그 및 사양서',
    url: 'https://www.hikvision.com/en/products/ITS-Products/supplement-lights/flash-supplement-lights/ds-tl3000b-i/',
    badge: '제조사 공식',
    specs: '200J · Ø 305mm · 10° · IP65'
  },
  {
    id: 'proc-dahua',
    vendor: 'Dahua Technology',
    model: 'ITALF-300AG-GL',
    desc: '5500W 피크 파워 4대 모드 통합 스마트 트래픽 하이브리드 보조광 공식 페이지',
    url: 'https://www.dahuasecurity.com/products/intelligent-traffic/intelligent-traffic-products/supplement-lights/flash-light/italf-300ag-gl',
    badge: '글로벌 엔지니어링',
    specs: '5.5kW Peak · 4-in-1 Mode · RS-485'
  },
  {
    id: 'proc-raytec-bh',
    vendor: 'B&H Photo Video (미국 공식 조달)',
    model: 'Raytec VARIO2 HY16-1 IP PoE',
    desc: 'B&H Photo Video 글로벌 공식 공급 - 450m IR / 195m White IP 하이브리드 투광기',
    url: 'https://www.bhphotovideo.com/c/product/1831866-REG/raytec_var2_ippoe_hy16_1_vario2_ip_hybrid_network.html',
    badge: '글로벌 납품처',
    specs: 'PoE+ · IR 450m / White 195m · VMS'
  },
  {
    id: 'proc-raytec-vtr',
    vendor: 'Raytec UK 본사',
    model: 'Pulsestar VTR Series',
    desc: '4.5kW 순간 펄스 고속도로 초고속 단속 전용 조명 기술 백서 및 규격서',
    url: 'https://www.raytecled.com/products/pulsestar-vtr/',
    badge: '고속도로 특화',
    specs: '4.5kW Pulse · 150m · Ethernet TCP/IP'
  },
  {
    id: 'proc-lidlight',
    vendor: 'LIDLight Inc.',
    model: 'LM48 Law Enforcement',
    desc: '도로교통공단 및 경찰청 단속 순찰차/이동식 장비용 48W CVA 원형 일루미네이터',
    url: 'https://www.lidlight.com/48w-law-enforcement-anpr-alpr-illuminator/',
    badge: '법 집행 특화',
    specs: '48W CVA 10°~40° · Ø 160mm · IP68'
  },
  {
    id: 'proc-komoto',
    vendor: 'Komoto Optical',
    model: 'CW7S / C Series',
    desc: 'ITS 카메라 직결형 컴팩트 교차로 단속 조명 모듈 규격 및 렌즈 화각 옵션',
    url: 'https://komoto.com/products/C_Series/CW7S',
    badge: '도시 교차로',
    specs: '60W Strobe · RS-485 · 15~30m'
  }
];

export const YOUTUBE_VIDEOS: YoutubeItem[] = [
  {
    id: 'yt-freeze',
    title: '스트로보스코프 효과(Motion Freeze) 물리 메커니즘',
    desc: '초고속 점멸 펄스가 고속 질주하는 물체를 잔상 없이 정지된 상태로 포착하는 셔터 동기화 원리 시연',
    url: 'https://www.youtube.com/watch?v=4TG-8UdpIBU',
    duration: '04:12',
    tag: '물리 & 광학 원리',
    embedId: '4TG-8UdpIBU'
  },
  {
    id: 'yt-dahua-wiring',
    title: 'Dahua ANPR 카메라 & IR 플래시 현장 배선 및 셋업 교육',
    desc: '엔지니어링 현장에서 ANPR 카메라, 광절연 TTL 트리거 라인, RS-485 제어선 결선 및 트리거 동기화 시연',
    url: 'https://www.youtube.com/watch?v=egZ8wKWWRw4',
    duration: '08:45',
    tag: '현장 배선 실무',
    embedId: 'egZ8wKWWRw4'
  },
  {
    id: 'yt-dual-light',
    title: 'Dahua Smart Dual Light 기술 작동 원리 시연',
    desc: '평상시 무가시 IR 감시를 유지하다가 객체 위반 감지 시 백색광 전환으로 빛공해 차단 및 풀컬러 캡처',
    url: 'https://www.youtube.com/watch?v=JNf1m5kZWUg',
    duration: '03:30',
    tag: '하이브리드 전환',
    embedId: 'JNf1m5kZWUg'
  },
  {
    id: 'yt-raytec-hrt',
    title: 'Raytec VARIO2 Hybrid HRT 렌즈 및 알람 전환 시연',
    desc: '가혹한 야간 폭우 속에서 핫스팟 감소 기술(HRT) 타원형 빔 투사 및 백색광 경고 전환 실제 촬영 영상',
    url: 'https://www.youtube.com/watch?v=uo27BXMA1_w',
    duration: '05:18',
    tag: 'HRT 빔포밍',
    embedId: 'uo27BXMA1_w'
  },
  {
    id: 'yt-hikvision-its',
    title: 'Hikvision Traffic Solutions 스마트 시티 단속 작동 소개',
    desc: '레이더 및 듀얼 센서 카메라 기반 과속/신호위반 단속 프로세스 3D 애니메이션 및 고속도로 실사',
    url: 'https://www.youtube.com/watch?v=amYUQqLvxSU',
    duration: '06:02',
    tag: '스마트 시티 ITS',
    embedId: 'amYUQqLvxSU'
  },
  {
    id: 'yt-strobe-warning',
    title: 'Dark Knight Strobe Light Duo 시각 경고 효과',
    desc: '유럽 ECE R65 인증 듀얼 조명의 백색/적색 교차 고속 발광을 통한 강력한 시각적 위압감 및 경각심 시연',
    url: 'https://www.youtube.com/watch?v=i95e_yDe_a4',
    duration: '02:50',
    tag: '시각 경고 효과',
    embedId: 'i95e_yDe_a4'
  }
];

export const WAVELENGTH_METRICS: WavelengthMetric[] = [
  {
    wavelength: '850nm',
    label: '850 nm IR (산업 표준 광원)',
    cmosEfficiency: 92,
    invisibility: 85,
    plateContrast: 96,
    vmmrColor: 12,
    effectiveDistance: 95,
    color: '#3b82f6',
    description: 'CMOS 실리콘 센서 흡수율이 탁월하여 150m~450m 초장거리 단속에 최적. 광원을 직접 응시할 때 은은한 "적색 암점(Faint Red Glow)"이 드러나 운전자에게 무의식적인 정속 유도 심리 효과를 부여합니다.',
    role: '평상시 24시간 스텔스 번호판 흑백 포착 주력'
  },
  {
    wavelength: '740nm',
    label: '740 nm IR (컬러 번호판 특화)',
    cmosEfficiency: 98,
    invisibility: 65,
    plateContrast: 90,
    vmmrColor: 25,
    effectiveDistance: 90,
    color: '#8b5cf6',
    description: 'CMOS 감도가 매우 높으며, 노란색이나 파란색 등 유색 바탕 번호판을 채택한 국가에서 850nm 조사 시 발생하는 반사율 저하 및 백화 현상을 중화시키는 특수 파장대입니다.',
    role: '유색 특수 번호판 전용 맞춤형 감시'
  },
  {
    wavelength: '940nm',
    label: '940 nm IR (완전 스텔스 암행)',
    cmosEfficiency: 42,
    invisibility: 100,
    plateContrast: 68,
    vmmrColor: 8,
    effectiveDistance: 48,
    color: '#64748b',
    description: '인간 망막에 가시광 자극이 0%로 완벽한 무가시 상태입니다. 그러나 실리콘 센서 양자 효율이 850nm 대비 절반 이하로 급감하여 동일 전력 기준 유효 거리가 반토막 납니다.',
    role: '군사 보안 및 VIP 요인 보호 전용'
  },
  {
    wavelength: 'white',
    label: '백색 / 웜화이트 가시광 (Dual Flash)',
    cmosEfficiency: 82,
    invisibility: 8,
    plateContrast: 84,
    vmmrColor: 100,
    effectiveDistance: 78,
    color: '#f59e0b',
    description: '차량의 실제 도장 색상, 차종(VMMR), 탑승자 안전벨트 착용 여부 판별에 필수적입니다. 평상시 소등 상태를 유지하다가 위반 찰나에만 0.1~1ms 인가하여 빛공해를 완벽 통제합니다.',
    role: '위반 순간 단속 법적 증거 풀컬러 확보'
  }
];

export const DEPLOYMENT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: '광학 & 렌즈',
    title: '150mm 이상 대구경 광학창 또는 콜리메이터 배열 확인',
    description: '빛의 중심 핫스팟 집중에 따른 번호판 백화(Plate Blowout)를 방지하고, 4.5kW급 펄스 방열을 위한 기구적 체적을 확보해야 합니다.',
    checked: true,
    mandatory: true
  },
  {
    id: 'chk-2',
    category: '광학 & 렌즈',
    title: 'HRT(Hot-spot Reduction Tech) 타원형 빔 디퓨저 채택',
    description: '원형 빔 대신 16:9 가로 도로 화각에 부합하는 타원형(예: 35°×10°) 배광 패턴 렌즈를 장착하여 차선 외 영역으로의 불필요한 누설 광을 차단합니다.',
    checked: true,
    mandatory: true
  },
  {
    id: 'chk-3',
    category: '전원 & 열역학',
    title: 'PWM 듀티 사이클 6% 이하 하드웨어 제한 로직 구성',
    description: '고주파 연사 환경에서 LED 접합부(Junction) 온도가 정격을 초과하지 않도록 듀티 사이클(Pulse Duration / Period)을 6% 이내로 엄격히 통제합니다.',
    checked: true,
    mandatory: true
  },
  {
    id: 'chk-4',
    category: '전원 & 열역학',
    title: '순간 피크 전류 25A 대응 전원 라인 및 방전 커패시터 점검',
    description: '5kW급 순간 발광 시 전압 강하(Voltage Drop)가 발생하지 않도록 조명 컨트롤러 내 고신뢰성 울트라 커패시터 뱅크 정상 충전을 확인합니다.',
    checked: false,
    mandatory: true
  },
  {
    id: 'chk-5',
    category: '통신 & 동기화',
    title: '광절연 TTL(3.3V~24V) 카메라 셔터 동기화 지연시간 < 20µs',
    description: '외부 전기 노이즈에 오발광되지 않도록 포토커플러 광절연 입력단을 사용하고 지연 시간이 20마이크로초 이내인지 오실로스코프로 측정합니다.',
    checked: false,
    mandatory: true
  },
  {
    id: 'chk-6',
    category: '통신 & 동기화',
    title: 'RS-485 원격 파라미터 제어 및 실시간 서미스터 온도 모니터링',
    description: '현장 방문 없이 관제 서버에서 조명 밝기, 펄스 폭을 조절하고 내부 온도 경보를 수신할 수 있도록 데이지 체인 ID 및 통신 속도를 세팅합니다.',
    checked: false,
    mandatory: false
  },
  {
    id: 'chk-7',
    category: '법적 & 안전규격',
    title: 'IEC 62471 / EN 62471 광생물학적 망막 안전 Exempt Group 인증',
    description: '운전자 및 보행자의 각막/망막에 비가역적 손상을 주지 않도록 공인 기관의 광생물학적 위험성 평가 0등급(Exempt) 시험 성적서를 비치합니다.',
    checked: true,
    mandatory: true
  },
  {
    id: 'chk-8',
    category: '법적 & 안전규격',
    title: '인공조명에 의한 빛공해 방지법 및 조명환경관리구역 기준 부합',
    description: '야간 주거지 창면 조도 기준(예: 10 Lux 이하)을 충족하기 위해 위반 감지 시에만 극초단 백색 스트로브를 방아쇠 발광하도록 로직을 검증합니다.',
    checked: true,
    mandatory: true
  }
];
