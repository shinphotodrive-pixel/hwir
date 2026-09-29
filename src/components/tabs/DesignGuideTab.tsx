import React, { useState } from 'react';
import { DEPLOYMENT_CHECKLIST } from '../../data/itsData';
import { ChecklistItem } from '../../types';
import { Compass, CheckSquare, Square, ShieldCheck, Download, AlertCircle, Sparkles } from 'lucide-react';

export const DesignGuideTab: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEPLOYMENT_CHECKLIST);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = checklist.filter((item) => item.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  const handleExportChecklist = () => {
    const lines = [
      `=== ITS 야간 단속 하이브리드 조명 현장 시공 적합성 검증 보고서 ===`,
      `검증 진행률: ${checkedCount}/${checklist.length} 항목 완료 (${progressPercent}%)`,
      `발행 일시: ${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR')}`,
      ``,
      ...checklist.map(
        (c) =>
          `[${c.checked ? '완료 V' : '미완료 X'}] (${c.category}) ${c.title}${c.mandatory ? ' [필수]' : ''}\n    - 상세: ${c.description}`
      ),
    ];

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Intro Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
          <span>📐</span>
          <span>섹션 안내: ITS 인프라 설계 및 현장 시공 전략 가이드</span>
        </h2>
        <p className="text-xs sm:text-sm text-blue-900/80 mt-1.5 leading-relaxed">
          지자체 및 도로교통 관제 기관이 신규 스마트 교차로나 고속도로 단속 톨게이트를 설계할 때 반드시 검토해야 할 법적, 광학적, 통신 아키텍처 가이드라인과 인터랙티브 엔지니어링 체크리스트입니다.
        </p>
      </div>

      {/* 3 Core Strategic Pillars */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-600" />
          <span>신규 단속 시설 설계 3대 핵심 전략</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">
                하이브리드(IR + White/Red) 단일 통합 하우징 채택
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                IR 투광기와 백색 플래시를 분리 시공하면 지주(Pole) 하중 초과와 설치 비용이 2배로 상승합니다. 단일 150mm+ 대구경 섀시 내에서 850nm 스텔스 광과 고출력 백색/적색 펄스를 자동 전환하는 올인원 일루미네이터를 채택하세요.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-semibold">
              • 시공 원가 35% 절감 및 지주 풍압 하중 최소화
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">
                열역학 한계 관리 & RS-485 예지 정비 망 구축
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                5kW 급 방전 펄스 환경에서 LED 수명을 지키려면 듀티 사이클을 6% 이내로 하드웨어 클램핑해야 합니다. RS-485 또는 Ethernet 망을 통해 관제센터가 기기 내부 서미스터 온도를 24시간 감시하도록 설계합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold">
              • LED 50,000시간 수명 보장 및 긴급 셧다운 방지
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-black text-lg mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">
                IEC 62471 Exempt Group & 빛공해 방지법 부합
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                운전자 시야 교란(Flash Glare)을 차단하여 2차 추돌 사고를 방지하고 인공조명 빛공해 방지법 상의 주거지 창면 조도 기준(10 Lux 이하)을 준수하기 위해 광생물학적 안전 0등급(Exempt) 인증 장비만을 선정해야 합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-purple-700 font-semibold">
              • 야간 빛공해 민원 원천 차단 및 법적 규제 통과
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Deployment Readiness Checklist */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              <span>현장 시공 엔지니어링 적합성 체크리스트</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              조명 설치 및 ANPR 카메라 연동 전 현장 감리 필수 확인 8대 규격
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">검증 완료율</span>
              <span className="text-sm font-bold font-mono text-blue-600">
                {checkedCount} / {checklist.length} ({progressPercent}%)
              </span>
            </div>
            <button
              onClick={handleExportChecklist}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{copied ? '리포트 복사됨!' : '점검 결과 내보내기'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressPercent === 100
                ? 'bg-emerald-500'
                : progressPercent > 50
                ? 'bg-blue-600'
                : 'bg-amber-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                item.checked
                  ? 'bg-blue-50/40 border-blue-200 hover:bg-blue-50/70'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-blue-600">
                {item.checked ? (
                  <CheckSquare className="w-5 h-5 fill-blue-600 text-white" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {item.category}
                  </span>
                  {item.mandatory && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      필수 규격
                    </span>
                  )}
                  <h4
                    className={`font-bold text-sm ${
                      item.checked ? 'text-slate-900 line-through text-slate-500' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
