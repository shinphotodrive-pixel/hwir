import React from 'react';
import { Zap, Radio, Cpu } from 'lucide-react';
import { TabType } from '../types';
import { GlobalSearch } from './GlobalSearch';

interface HeaderProps {
  onNavigate: (tab: TabType, targetId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
              <Zap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  ITS 야간 단속 하이브리드 조명 기술 대시보드
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-900/90 text-blue-200 border border-blue-700/80">
                  Ø 150mm+ 대구경 광학
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                지능형 교통 시스템(ITS) & ANPR 야간 단속 투광기 · 플래시 광학 및 전자 제어 기술 종합 분석
              </p>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 lg:max-w-md flex justify-start lg:justify-center">
            <GlobalSearch onNavigate={onNavigate} />
          </div>

          {/* Quick System Requirements Badges */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 text-xs">
            <div className="bg-slate-800/90 border border-slate-700/90 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-amber-300 font-bold">규격:</span>
              <span className="text-slate-200 font-medium">Ø 150mm 이상 원형</span>
            </div>
            <div className="bg-slate-800/90 border border-slate-700/90 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-bold">파장:</span>
              <span className="text-slate-200 font-medium">850nm IR + 가시광</span>
            </div>
            <div className="bg-slate-800/90 border border-slate-700/90 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-bold">통신:</span>
              <span className="text-slate-200 font-medium">RS-485 / TTL</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
