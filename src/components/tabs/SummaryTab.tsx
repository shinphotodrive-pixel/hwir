import React from 'react';
import { AlertTriangle, ShieldCheck, Maximize2, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export const SummaryTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Intro Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
          <span>📌</span>
          <span>섹션 안내: 야간 교통 단속 패러다임의 변화와 하이브리드 조명</span>
        </h2>
        <p className="text-xs sm:text-sm text-blue-900/80 mt-1.5 leading-relaxed">
          이 섹션에서는 전통적인 제논 백색 플래시의 눈부심(Glare) 및 빛공해 문제점을 짚어보고, 평상시 비가시 영역인 적외선(850nm)을 가동하다가 단속 위반 시점에만 백색/적색 가시광을 인가하는 <strong>하이브리드(Smart Dual-Light) 투광 기술</strong>의 등장 배경을 설명합니다. 아울러 직경 150mm 이상의 대구경 폼팩터가 열 방출과 광학 빔 정밀 제어에 왜 필수적인지 명확한 개념을 제공합니다.
        </p>
      </div>

      {/* 3 Core Challenges & Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 1 */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center font-bold text-lg mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">기존 단속 조명의 한계</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              전통적인 고출력 백색 제논 조명은 야간 운전자에게 순간적 시각 상실(눈부심/Glare)을 야기하여 2차 사고 위험을 높이고, 도심 빛공해(Light Pollution) 법적 규제 대상이 되며 끊임없는 민원을 유발합니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] text-amber-700 font-semibold gap-1">
            <span>• 야간 시야 장애(Flash Blindness) 유발</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center font-bold text-lg mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">하이브리드(Dual-Light) 해법</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              평시에는 육안에 거의 안 보이는 850nm IR로 스텔스 감시를 진행하고, 차량 위반 감지 찰나(수 ms)에만 백색/적색 플래시를 터뜨려 <strong>컬러 증거(차종, 외장 색상, 운전자)</strong>를 확보하고 심리적 경고 효과를 극대화합니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] text-blue-700 font-semibold gap-1">
            <span>• 24시간 스텔스 + 위반 시 100% 컬러 캡처</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center font-bold text-lg mb-4">
              <Maximize2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">150mm+ 대구경 규격의 당위성</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              수kW 급 피크 전력에서 발생하는 막대한 열을 외부로 방출하기 위한 메탈 방열판 공간 확보와, 중심부 과노출(Blowout) 없는 균일한 타원형 빔 조사를 위해 직경 150mm 이상의 광학 렌즈/배열 하우징이 필수입니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] text-emerald-700 font-semibold gap-1">
            <span>• 발열 면적 확장 & 광학 빔 분산 최적화</span>
          </div>
        </div>
      </div>

      {/* Conceptual Architecture Workflow */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>⚙️ 하이브리드 단속 조명 작동 프로세스 아키텍처</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">카메라 - 레이더 - 조명 마이크로초 동기화 메커니즘</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-600 font-mono">
            동기화 지연: &lt; 20 µs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left relative">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-black">
                  1
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  항시 모니터링
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">850nm IR 스텔스 가동</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                운전자 눈부심 없이 24시간 고속도로 차량 추적 및 ANPR 기본 번호판 흑백 포착을 상시 수행합니다.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-slate-400 font-mono">소비 전력: 저전력 유지 (PoE+)</div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between hover:border-amber-300 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center text-xs font-black">
                  2
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-800">
                  트리거 검출
                </span>
              </div>
              <h4 className="font-bold text-amber-950 text-sm mb-1.5">레이더 / VCA 위반 감지</h4>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                60GHz FMCW 레이더 또는 AI 딥러닝 영상 분석으로 과속·신호위반을 감지하고 광절연 TTL 신호를 생성합니다.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-amber-700 font-mono">신호 레벨: 3.3V ~ 24V 광절연</div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                  3
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-800">
                  동기화 발광
                </span>
              </div>
              <h4 className="font-bold text-blue-950 text-sm mb-1.5">µs 단위 플래시 동기화</h4>
              <p className="text-xs text-blue-900/80 leading-relaxed">
                카메라 셔터 개방 시점에 정확히 맞추어 백색 크세논/LED 또는 적색 스트로브를 0.1~1ms 동안 순간 인가합니다.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-blue-700 font-mono">펄스 파워: 최대 5.5 kW 인가</div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                  4
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">
                  증거 수집
                </span>
              </div>
              <h4 className="font-bold text-emerald-950 text-sm mb-1.5">풀 컬러 증거 수집 & 복귀</h4>
              <p className="text-xs text-emerald-900/80 leading-relaxed">
                차종/도장색(VMMR), 운전자 얼굴을 풀 컬러로 캡처 완료한 후 즉시 IR 모드로 복귀하여 빛공해를 완벽 차단합니다.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-emerald-700 font-mono">복귀 시간: 즉시 (&lt; 1ms)</div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            단속 조명 방식별 핵심 기술 특성 대조표
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            전통 제논 단독 vs 순수 IR 단독 vs 150mm+ 대구경 하이브리드(Dual-Light)
          </p>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3.5">평가 항목</th>
                <th className="p-3.5">전통 백색 제논 단독</th>
                <th className="p-3.5">순수 850nm IR 단독</th>
                <th className="p-3.5 text-blue-900 bg-blue-50/80">150mm+ 하이브리드 듀얼 조명</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">운전자 눈부심(Glare)</td>
                <td className="p-3.5 text-red-600 font-medium">심각 (야간 실명 위험)</td>
                <td className="p-3.5 text-emerald-600 font-medium">전무 (Faint Red Glow만 인지)</td>
                <td className="p-3.5 text-blue-700 font-bold bg-blue-50/40">최소화 (위반 시에만 극초단 인가)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">차종/색상(VMMR) 인식</td>
                <td className="p-3.5 text-emerald-600 font-medium">우수 (풀컬러 캡처)</td>
                <td className="p-3.5 text-red-600 font-medium">불가 (흑백/단색 왜곡)</td>
                <td className="p-3.5 text-blue-700 font-bold bg-blue-50/40">완벽 (위반 순간 100% 풀컬러 확보)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">도심 빛공해 법적 규제</td>
                <td className="p-3.5 text-red-600 font-medium">빈번한 민원 및 과태료 대상</td>
                <td className="p-3.5 text-emerald-600 font-medium">규제 완전 면제</td>
                <td className="p-3.5 text-blue-700 font-bold bg-blue-50/40">완벽 충족 (조명환경관리구역 부합)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">발열 관리 및 수명</td>
                <td className="p-3.5 text-amber-600">제논 튜브 소모 (수백만 회 한계)</td>
                <td className="p-3.5 text-emerald-600">우수 (50,000시간 LED)</td>
                <td className="p-3.5 text-blue-700 font-bold bg-blue-50/40">극대화 (150mm+ 메탈 하우징 방열)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
