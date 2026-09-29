import React, { useState, useEffect, useRef } from 'react';
import { WAVELENGTH_METRICS } from '../../data/itsData';
import { Eye, ShieldAlert, Sparkles, Layers, Sliders } from 'lucide-react';

interface OpticsTabProps {
  targetWavelength?: string;
}

export const OpticsTab: React.FC<OpticsTabProps> = ({ targetWavelength }) => {
  const [selectedWavelength, setSelectedWavelength] = useState<string>(targetWavelength || '850nm');
  const [beamMode, setBeamMode] = useState<'standard' | 'hrt'>('hrt');
  const [beamIntensity, setBeamIntensity] = useState<number>(85);
  const [plateReflectivity, setPlateReflectivity] = useState<number>(90);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (targetWavelength && ['850nm', '740nm', '940nm', 'white'].includes(targetWavelength)) {
      setSelectedWavelength(targetWavelength);
    }
  }, [targetWavelength]);

  // Canvas drawing function for the beam visualizer
  const renderBeamSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Road Background (Night Asphalt)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Perspective Road Lanes
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height);
    ctx.lineTo(width * 0.38, height * 0.25);
    ctx.moveTo(width * 0.85, height);
    ctx.lineTo(width * 0.62, height * 0.25);
    ctx.stroke();

    // Center dotted line
    ctx.setLineDash([12, 12]);
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height);
    ctx.lineTo(width * 0.5, height * 0.25);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Vehicle & Plate Coordinates
    const targetX = width / 2;
    const targetY = height * 0.58;

    // Vehicle Trunk Silhouette
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(targetX - 70, targetY - 45, 140, 75, 8);
    ctx.fill();
    ctx.stroke();

    // Vehicle Tail lights
    ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
    ctx.beginPath();
    ctx.roundRect(targetX - 65, targetY - 35, 20, 10, 3);
    ctx.roundRect(targetX + 45, targetY - 35, 20, 10, 3);
    ctx.fill();

    // 4. Render Light Beam projection
    const intensityRatio = beamIntensity / 100;

    if (beamMode === 'standard') {
      // Standard Circular Hot-Spot Beam
      const radius = 130;
      const grad = ctx.createRadialGradient(targetX, targetY, 15, targetX, targetY, radius);
      grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * intensityRatio})`);
      grad.addColorStop(0.3, `rgba(244, 63, 94, ${0.65 * intensityRatio})`);
      grad.addColorStop(0.7, `rgba(244, 63, 94, ${0.2 * intensityRatio})`);
      grad.addColorStop(1, 'rgba(244, 63, 94, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Overexposed Blown-Out License Plate
      const blowoutAlpha = Math.min(1, intensityRatio * (plateReflectivity / 75));
      ctx.fillStyle = `rgba(255, 255, 255, ${0.95})`;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 30 * blowoutAlpha;
      ctx.fillRect(targetX - 42, targetY - 14, 84, 28);
      ctx.shadowBlur = 0;

      // Unreadable bleached text representation
      ctx.fillStyle = `rgba(220, 220, 220, ${1 - blowoutAlpha * 0.8})`;
      ctx.font = 'bold 12px "Noto Sans KR", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('12가 3456', targetX, targetY + 5);

      // Warning text tag above plate
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 11px "Noto Sans KR", sans-serif';
      ctx.fillText('🚨 중심 과노출 백화 (Plate Blowout)', targetX, targetY - 26);
    } else {
      // HRT Elliptical Holographic Diffuser Beam (16:9 Road profile)
      ctx.save();
      ctx.translate(targetX, targetY);
      ctx.scale(2.2, 0.75); // Elliptical scaling for widescreen lane coverage

      const radius = 95;
      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, radius);
      grad.addColorStop(0, `rgba(59, 130, 246, ${0.75 * intensityRatio})`);
      grad.addColorStop(0.6, `rgba(59, 130, 246, ${0.35 * intensityRatio})`);
      grad.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Sharp High-Contrast License Plate
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.fillRect(targetX - 42, targetY - 14, 84, 28);
      ctx.strokeRect(targetX - 42, targetY - 14, 84, 28);

      // Crisp ANPR Characters
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px "Noto Sans KR", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('12가 3456', targetX, targetY + 5);

      // Success tag above plate
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px "Noto Sans KR", sans-serif';
      ctx.fillText('✅ 균일 광학 배광 · ANPR 99.9% 판독 성공', targetX, targetY - 26);
    }

    // Lane indicator labels at the bottom
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('차선 1 (추월차선)', width * 0.32, height - 12);
    ctx.fillText('차선 2 (주행차선)', width * 0.68, height - 12);
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 300;
        renderBeamSimulation();
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [beamMode, beamIntensity, plateReflectivity]);

  useEffect(() => {
    renderBeamSimulation();
  }, [beamMode, beamIntensity, plateReflectivity]);

  const activeMetric = WAVELENGTH_METRICS.find((m) => m.wavelength === selectedWavelength) || WAVELENGTH_METRICS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
          <span>🔬</span>
          <span>섹션 안내: 광학 파장 특성 및 빔 포밍(HRT) 시뮬레이션</span>
        </h2>
        <p className="text-xs sm:text-sm text-blue-900/80 mt-1.5 leading-relaxed">
          적외선 파장(850nm, 740nm, 940nm) 및 백색 가시광의 CMOS 센서 양자 효율과 번호판 재귀반사(Retroreflection) 통제 원리를 분석합니다. 대구경 원형 콜리메이터와 홀로그래픽 디퓨저(HRT)를 통해 중심부 백화 현상(Hot-spot)을 방지하는 광학 제어 메커니즘을 경험해보세요.
        </p>
      </div>

      {/* Wavelength Comparison Section */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>파장 대역별 성능 및 특성 인터랙티브 분석</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              각 파장별 CMOS 양자 효율, 번호판 콘트라스트, VMMR 색상 식별력을 비교해 보세요.
            </p>
          </div>

          {/* Wavelength Selector Buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg">
            {WAVELENGTH_METRICS.map((m) => (
              <button
                key={m.wavelength}
                onClick={() => setSelectedWavelength(m.wavelength)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedWavelength === m.wavelength
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m.wavelength.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Wavelength Active Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Metrics Bars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeMetric.color }}></span>
                {activeMetric.label}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                역할: {activeMetric.role}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">CMOS 양자 흡수 효율</span>
                  <span className="font-mono font-bold text-slate-900">{activeMetric.cmosEfficiency}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeMetric.cmosEfficiency}%`, backgroundColor: activeMetric.color }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">인간 육안 비가시성 (눈부심 방지)</span>
                  <span className="font-mono font-bold text-slate-900">{activeMetric.invisibility}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-emerald-500"
                    style={{ width: `${activeMetric.invisibility}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">번호판 재귀반사 명암비 (ANPR 판독력)</span>
                  <span className="font-mono font-bold text-slate-900">{activeMetric.plateContrast}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-cyan-500"
                    style={{ width: `${activeMetric.plateContrast}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">차종 / 외장 색상(VMMR) 식별력</span>
                  <span className="font-mono font-bold text-slate-900">{activeMetric.vmmrColor}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-amber-500"
                    style={{ width: `${activeMetric.vmmrColor}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">유효 조사 및 도달 한계 거리</span>
                  <span className="font-mono font-bold text-slate-900">{activeMetric.effectiveDistance}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-purple-500"
                    style={{ width: `${activeMetric.effectiveDistance}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Technical Insight */}
          <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 text-xs flex flex-col justify-between h-full">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1">물리 특성 및 엔지니어링 분석</span>
              <p className="text-slate-700 leading-relaxed font-normal text-xs sm:text-[13px]">
                {activeMetric.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80">
              <div className="flex items-start gap-2 text-slate-600">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>하이브리드 조합 권고:</strong> 850nm IR을 기반으로 상시 감시를 유지하면서 위반 시 백색/적색 스트로브를 연동하는 듀얼 구성이 글로벌 최우수 표준입니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Beam Simulator Canvas */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>광학 빔 성형 & 번호판 빛 번짐(Plate Blowout) 시뮬레이터</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              원형 집광 렌즈의 중심 핫스팟 현상과 16:9 화각에 맞춘 HRT 홀로그래픽 렌즈의 확산 차이를 체험하세요.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setBeamMode('standard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                beamMode === 'standard'
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              일반 원형 빔 (핫스팟 발생)
            </button>
            <button
              onClick={() => setBeamMode('hrt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                beamMode === 'hrt'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              HRT 홀로그래픽 타원 빔 (균일 배광)
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950">
          <canvas ref={canvasRef} className="w-full block" />
          
          <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] px-3 py-1.5 rounded-lg border border-slate-700/80 backdrop-blur-xs flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${beamMode === 'hrt' ? 'bg-blue-400' : 'bg-rose-400 animate-ping'}`}></span>
            <span>
              현재 빔 프로파일: <strong>{beamMode === 'hrt' ? 'HRT 타원형 35° × 10° 빔' : '집광 원형 10° 핫스팟 빔'}</strong>
            </span>
          </div>
        </div>

        {/* Interactive Sliders Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex justify-between font-bold text-slate-700 mb-1.5">
              <span>투광기 순간 발광 강도 (Intensity)</span>
              <span className="font-mono text-blue-600">{beamIntensity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={beamIntensity}
              onChange={(e) => setBeamIntensity(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>20% (저출력)</span>
              <span>60% (일반)</span>
              <span>100% (5.5kW 순간 피크)</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex justify-between font-bold text-slate-700 mb-1.5">
              <span>번호판 재귀반사 계수 (Retroreflection)</span>
              <span className="font-mono text-blue-600">{plateReflectivity}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={plateReflectivity}
              onChange={(e) => setPlateReflectivity(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>40% (노후/오염)</span>
              <span>75% (표준 번호판)</span>
              <span>100% (신규 고반사 필름)</span>
            </div>
          </div>
        </div>

        {/* Technical Explanations */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <span>🎯 재귀반사(Retroreflection) 한계와 문제점</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              자동차 번호판의 미세 유리 비드(Glass Bead) 코팅은 입사된 광선을 정확히 발광원(카메라 방향)으로 역반사시킵니다. 따라서 중심 광량이 과도하면 번호판의 흑색 활자까지 하얗게 타버려 ANPR 문자인식이 완전히 실패합니다.
            </p>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
              <span>💡 HRT(Hot-spot Reduction Tech)의 해결 원리</span>
            </h4>
            <p className="text-blue-800/90 leading-relaxed">
              Raytec 및 최신 ITS 대구경 렌즈 표면에 적용된 미세 홀로그래픽 디퓨저는 중심 광속을 가로 방향으로 타원형(예: 35°×10°)으로 분산시켜 노면 전체에 균일한 조도를 부여함으로써 백화 없이 선명한 문자를 포착합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Photobiological Safety Note */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            광생물학적 안전 규격: IEC 62471 Exempt Group 준수 의무
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            고속도로 조명은 망막 열 손상(Retinal Thermal Hazard) 및 청색광 위해(Blue Light Hazard)로부터 운전자를 보호해야 합니다. 확산 렌즈를 통해 단위 면적당 방사 휘도(Radiance)를 낮춤으로써 IEC 62471 안전 면제 그룹(Exempt Group) 기준을 충족해야 공공 인프라 납품이 승인됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};
