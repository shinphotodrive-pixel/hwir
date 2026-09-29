import React from 'react';
import { TabType } from '../types';
import { Lightbulb, Eye, Clock, BarChart3, Video, Compass } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'summary', label: '서론 & 하이브리드 개요', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'optics', label: '광학 파장 & 빔포밍', icon: <Eye className="w-4 h-4" /> },
    { id: 'control', label: '전자제어 & PWM 계산기', icon: <Clock className="w-4 h-4" />, badge: '인터랙티브' },
    { id: 'products', label: '핵심 제품 비교 매트릭스', icon: <BarChart3 className="w-4 h-4" />, badge: '6대 장비' },
    { id: 'media', label: '미디어 & 구매 디렉토리', icon: <Video className="w-4 h-4" /> },
    { id: 'design', label: '인프라 설계 가이드', icon: <Compass className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2.5 scrollbar-thin text-xs sm:text-sm font-semibold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-blue-50/90 text-blue-700 border-blue-200 shadow-xs font-bold'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-blue-600' : 'text-slate-500'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive
                        ? 'bg-blue-200/70 text-blue-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
