import React, { useState, useMemo } from 'react';
import { PwmCalculationResult } from '../../types';
import { Calculator, AlertOctagon, CheckCircle2, Copy, RotateCcw, Cpu, Network, Zap } from 'lucide-react';

export const ControlTab: React.FC = () => {
  const [speedKmH, setSpeedKmH] = useState<number>(180);
  const [blurLimitMm, setBlurLimitMm] = useState<number>(1.5);
  const [triggerFreqHz, setTriggerFreqHz] = useState<number>(20);
  const [copied, setCopied] = useState<boolean>(false);

  // Speed Presets
  const presets = [
    { label: '스쿨존', speed: 30 },
    { label: '도심 간선', speed: 60 },
    { label: '고속도로', speed: 110 },
    { label: '과속 단속', speed: 180 },
    { label: '초고속 차량', speed: 250 },
    { label: '한계 속도', speed: 320 },
  ];

  // Calculations
  const calcResult: PwmCalculationResult = useMemo(() => {
    const speedMS = speedKmH / 3.6;
    const speedMmPerMicroSec = speedMS / 1000;
    const pulseDurationMicroSec = blurLimitMm / speedMmPerMicroSec;
    const pulseDurationMs = pulseDurationMicroSec / 1000;
    const periodMs = 1000 / triggerFreqHz;
    const dutyCycle = (pulseDurationMs / periodMs) * 100;
    const isHazardous = dutyCycle > 6.0;

    const recommendation = isHazardous
      ? `설정된 주파수(${triggerFreqHz}Hz) 및 펄스 폭(${pulseDurationMs.toFixed(3)}ms)에서 듀티 사이클이 ${dutyCycle.toFixed(2)}%로 안전 임계치(6.0%)를 초과했습니다. LED 접합부 열 폭주(Thermal Runaway)를 막기 위해 펄스 폭을 줄이거나 연사 주파수를 낮추어야 합니다.`
      : `계산된 듀티 사이클이 ${dutyCycle.toFixed(2)}%로 안전 한계(6.0%) 이내입니다. LED 소자 발열 평형이 유지되며 최대 50,000시간 이상의 신뢰성 있는 연속 수명이 보장됩니다.`;

    return {
      speedKmH,
      speedMS,
      speedMmPerMicroSec,
      blurLimitMm,
      triggerFreqHz,
      pulseDurationMs,
      pulseDurationMicroSec,
      periodMs,
      dutyCycle,
      isHazardous,
      recommendation,
    };
  }, [speedKmH, blurLimitMm, triggerFreqHz]);

  const handleCopyParams = () => {
    const text = `[ITS 단속 조명 PWM 파라미터 계산 결과]
- 대상 차량 속도: ${calcResult.speedKmH} km/h (${calcResult.speedMS.toFixed(2)} m/s)
- 허용 모션 블러: ${calcResult.blurLimitMm} mm
- 카메라 연사 주파수: ${calcResult.triggerFreqHz} Hz
- 권장 최대 펄스 폭: ${calcResult.pulseDurationMs.toFixed(3)} ms (${calcResult.pulseDurationMicroSec.toFixed(1)} µs)
- 프레임 주기(Period): ${calcResult.periodMs.toFixed(1)} ms
- 듀티 사이클: ${calcResult.dutyCycle.toFixed(2)} %
- 상태: ${calcResult.isHazardous ? '위험 (Duty > 6%)' : '안전 (Duty <= 6%)'}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setSpeedKmH(180);
    setBlurLimitMm(1.5);
    setTriggerFreqHz(20);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
          <span>⏱️</span>
          <span>섹션 안내: 전자 제어, 하드웨어 트리거 및 PWM 인터랙티브 계산기</span>
        </h2>
        <p className="text-xs sm:text-sm text-blue-900/80 mt-1.5 leading-relaxed">
          시속 100km~320km 초고속 질주 차량을 잔상(Motion Blur) 없이 정지 포착하려면 <strong>마이크로초(µs) 단위의 펄스 폭 변조(PWM)</strong> 및 TTL 광절연 트리거 신호 동기화가 필수적입니다. 차량 속도에 따른 최적 펄스 폭과 LED 발열 보호(Duty Cycle) 한계를 계산해 보세요.
        </p>
      </div>

      {/* Main Calculator Box */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <span>초고속 단속 모션 블러 & PWM 펄스 폭 실시간 계산기</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              차량 속도와 번호판 허용 이동량으로 최적 발광 지속 시간(Pulse Duration)을 유도합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>초기화</span>
            </button>
            <button
              onClick={handleCopyParams}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? '복사 완료!' : '결과 복사'}</span>
            </button>
          </div>
        </div>

        {/* Speed Presets Buttons */}
        <div className="mb-6">
          <span className="text-xs font-bold text-slate-600 block mb-2">원클릭 주행 속도 프리셋:</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.speed}
                onClick={() => setSpeedKmH(p.speed)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  speedKmH === p.speed
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {p.label} ({p.speed}km/h)
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  단속 차량 주행 속도 (Velocity)
                </label>
                <span className="text-sm font-mono font-black text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {speedKmH} km/h
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="320"
                step="5"
                value={speedKmH}
                onChange={(e) => setSpeedKmH(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>30 km/h (도심)</span>
                <span>180 km/h (고속도로)</span>
                <span>320 km/h (초고속 한계)</span>
              </div>
            </div>

            {/* Motion Blur Limit Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  허용 모션 블러 한계 (Allowable Blur)
                </label>
                <span className="text-sm font-mono font-black text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {blurLimitMm.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={blurLimitMm}
                onChange={(e) => setBlurLimitMm(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0.2 mm (초정밀 4K)</span>
                <span>1.5 mm (표준 ANPR)</span>
                <span>4.0 mm (완화)</span>
              </div>
            </div>

            {/* Trigger Frequency Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  연사 트리거 주파수 (Trigger Rate)
                </label>
                <span className="text-sm font-mono font-black text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {triggerFreqHz} Hz
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={triggerFreqHz}
                onChange={(e) => setTriggerFreqHz(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5 Hz (단발)</span>
                <span>20 Hz (일반 ITS)</span>
                <span>60 Hz (초고속 연사)</span>
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 bg-slate-900 text-white p-5 sm:p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
                <span className="text-xs font-bold text-slate-400">계산된 전자제어 파라미터</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    calcResult.isHazardous
                      ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                  }`}
                >
                  {calcResult.isHazardous ? (
                    <>
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>열 폭주 위험 (Duty &gt; 6%)</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>열역학적 안전 (Normal)</span>
                    </>
                  )}
                </span>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center mb-5">
                <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">차량 이동 환산 속도</span>
                  <span className="text-xl font-black font-mono text-cyan-400">
                    {calcResult.speedMS.toFixed(1)} <span className="text-xs font-normal">m/s</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                    ({calcResult.speedMmPerMicroSec.toFixed(3)} mm/µs)
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">권장 max 펄스 폭</span>
                  <span className="text-xl font-black font-mono text-amber-400">
                    {calcResult.pulseDurationMs.toFixed(3)} <span className="text-xs font-normal">ms</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                    ({calcResult.pulseDurationMicroSec.toFixed(1)} µs)
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">듀티 사이클 (Duty)</span>
                  <span
                    className={`text-xl font-black font-mono ${
                      calcResult.isHazardous ? 'text-rose-400' : 'text-purple-300'
                    }`}
                  >
                    {calcResult.dutyCycle.toFixed(2)} <span className="text-xs font-normal">%</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                    (안전 한계치: 6.0%)
                  </span>
                </div>
              </div>

              {/* Duty Cycle Visual Bar */}
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 mb-4">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>듀티 사이클 임계치 인디케이터</span>
                  <span className="font-mono">
                    {calcResult.dutyCycle.toFixed(2)}% / 기준 6.0%
                  </span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden relative">
                  {/* 6% threshold marker */}
                  <div className="absolute left-[30%] top-0 bottom-0 w-0.5 bg-amber-400 z-10"></div>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      calcResult.isHazardous ? 'bg-rose-500' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(100, (calcResult.dutyCycle / 20) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Thermal Recommendation Notice */}
            <div
              className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                calcResult.isHazardous
                  ? 'bg-rose-950/50 border-rose-800/80 text-rose-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>엔지니어링 열역학 진단:</span>
              </div>
              <p>{calcResult.recommendation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger & Communication Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trigger Interface Card */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">하드웨어 및 지능형 소프트웨어 트리거</h3>
              <p className="text-xs text-slate-500">카메라 셔터와의 찰나 동기화 기술</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">
                ⚡ TTL 레벨 (3.3V ~ 24V 광절연) 하드웨어 동기화
              </span>
              <p className="leading-relaxed">
                레이더 또는 노면 매설 루프 코일로부터 발생하는 전기 펄스를 포토커플러(Photocoupler)로 광절연 수신하여 <strong>20µs 이내</strong>의 지연 없는 실시간 발광을 수행합니다. 전자기적 노이즈에 의한 오발광을 원천 차단합니다.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">
                🧠 VCA (Video Content Analytics) AI 영상 감지
              </span>
              <p className="leading-relaxed">
                루프 코일 공사 없이 카메라 내부 딥러닝 객체 추적 엔진이 차량의 바퀴가 가상 감지선(Sweet Spot)에 도달하는 순간을 예측하여 소프트웨어 플래그를 트리거 핀으로 펄스 방출합니다.
              </p>
            </div>
          </div>
        </div>

        {/* RS-485 Communication Card */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">RS-485 통신 및 원격 관제 인터페이스</h3>
              <p className="text-xs text-slate-500">최대 1,200m 데이지 체인 중앙 관리</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">
                📡 차동 신호(Differential Signal) 극강의 노이즈 내성
              </span>
              <p className="leading-relaxed">
                고전압 트롤리선 및 변전 설비가 인접한 도로 환경에서도 왜곡 없이 <strong>최대 1,200m</strong>까지 통신할 수 있으며, 2가닥 트위스트 페어 선 하나로 최대 32대의 투광기를 데이지 체인(Daisy-chain) 구성할 수 있습니다.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">
                🎛️ 원격 파라미터 조작 및 예지 보전(Predictive Maintenance)
              </span>
              <p className="leading-relaxed">
                고소 작업차 탑승 없이 교통 관제소에서 1~20단계 밝기 조정, 스트로브 펄스 폭(0.1~3.0ms) 변경이 가능하며, 내부 서미스터 온도 및 LED 고장 상태를 상시 폴링(Polling)합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
