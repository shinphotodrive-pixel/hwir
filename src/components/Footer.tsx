import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>ITS 지능형 교통 단속 카메라용 대구경 하이브리드 조명 분석 대시보드</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            지능형 교통 시스템(ITS) 및 ANPR 야간 단속 광학·전자제어 기술 분석 보고서를 기반으로 제작된 대화형 엔지니어링 탐색기입니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>IEC 62471 Exempt 기준 부합</span>
          </span>
          <span className="text-slate-700">|</span>
          <span>150mm+ 대구경 광학 사양</span>
          <span className="text-slate-700">|</span>
          <span>PWM 열역학 안전 듀티 6% 클램핑</span>
        </div>
      </div>
    </footer>
  );
};
