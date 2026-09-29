import React from 'react';
import { Zap, Compass, Gauge, ShieldCheck } from 'lucide-react';

export const ExecutiveKpiBanner: React.FC = () => {
  return (
    <section className="bg-slate-800 border-b border-slate-700/80 text-slate-200 py-3.5 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          
          <div className="p-2 sm:p-2.5 rounded-lg bg-slate-850/50 border border-slate-700/50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>최대 피크 펄스 파워</span>
            </div>
            <span className="text-base sm:text-xl font-black text-amber-400 font-mono tracking-tight">
              4.5 kW ~ 5.5 kW
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              1ms 순간 고출력 발광 방전
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-lg bg-slate-850/50 border border-slate-700/50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>유효 단속 및 감지 거리</span>
            </div>
            <span className="text-base sm:text-xl font-black text-cyan-400 font-mono tracking-tight">
              150m ~ 450m
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              10° 좁은 빔 / HRT 타원형 성형
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-lg bg-slate-850/50 border border-slate-700/50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>모션 정지 한계 속도</span>
            </div>
            <span className="text-base sm:text-xl font-black text-emerald-400 font-mono tracking-tight">
              최대 320 km/h
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              0.1~0.5ms 초고속 스냅샷 포착
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-lg bg-slate-850/50 border border-slate-700/50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>광생물학적 안전 규격</span>
            </div>
            <span className="text-base sm:text-xl font-black text-purple-300 font-mono tracking-tight">
              IEC 62471 Exempt
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              망막 손상 없는 안전 0등급
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
