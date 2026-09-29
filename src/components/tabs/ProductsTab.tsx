import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCT_DATA } from '../../data/itsData';
import { ProductItem } from '../../types';
import { BarChart3, Search, Filter, ShieldCheck, Zap, Maximize2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductsTabProps {
  targetProductId?: string;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ targetProductId }) => {
  const [filterType, setFilterType] = useState<'all' | 'xenon' | 'led'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'range' | 'power' | 'name'>('range');
  const [expandedId, setExpandedId] = useState<string | null>(targetProductId || null);

  useEffect(() => {
    if (targetProductId) {
      setExpandedId(targetProductId);
      // Reset filter if necessary to ensure target is visible
      const targetItem = PRODUCT_DATA.find((p) => p.id === targetProductId);
      if (targetItem && filterType !== 'all' && targetItem.type !== filterType) {
        setFilterType('all');
      }
      setTimeout(() => {
        const el = document.getElementById(`product-${targetProductId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [targetProductId]);

  const filteredProducts = useMemo(() => {
    return PRODUCT_DATA.filter((p) => {
      const matchType = filterType === 'all' || p.type === filterType;
      const matchSearch =
        p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.vendor.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.lightSource.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.protocol.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchType && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'range') return b.rangeVal - a.rangeVal;
      if (sortBy === 'power') return b.powerVal - a.powerVal;
      return a.name.localeCompare(b.name);
    });
  }, [filterType, searchKeyword, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
          <span>📊</span>
          <span>섹션 안내: 글로벌 플래그십 하이브리드 단속 조명 스펙 비교</span>
        </h2>
        <p className="text-xs sm:text-sm text-blue-900/80 mt-1.5 leading-relaxed">
          글로벌 시장을 선도하는 Hikvision, Dahua, Raytec, LIDLight, Komoto의 대표 150mm+ 대구경 및 하이브리드 조명 제품군을 다각도로 비교합니다. 필터링 가능한 데이터 매트릭스와 시각화 차트를 활용해 사업 목적에 최적화된 장비를 선정하세요.
        </p>
      </div>

      {/* Product Range Comparison Visualizer */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>제품별 야간 유효 단속 및 감지 거리(m) 비교 차트</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              초장거리(450m) 전용 모델부터 교차로 표준 30m 급 모델까지의 배광 도달 거리
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            기준: 10° 좁은 빔 / 고감도 센서 연동
          </span>
        </div>

        {/* Responsive Horizontal Bar Visualization */}
        <div className="space-y-3.5">
          {PRODUCT_DATA.map((item) => {
            const maxRange = 450;
            const percentage = Math.max(8, (item.rangeVal / maxRange) * 100);
            const isTop = item.rangeVal >= 150;

            return (
              <div key={item.id} className="text-xs group">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {item.vendor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[11px]">피크: {item.power}</span>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.rangeVal} m
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[9px] font-mono text-white font-bold ${
                      isTop
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                        : 'bg-gradient-to-r from-teal-500 to-emerald-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  >
                    {percentage > 20 && `${item.rangeVal}m`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Matrix Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="모델명, 제조사, 광원, 통신 프로토콜 검색..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
        </div>

        {/* Filter and Sort options */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>광원:</span>
          </div>

          <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 ({PRODUCT_DATA.length})
            </button>
            <button
              onClick={() => setFilterType('xenon')}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                filterType === 'xenon'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              크세논 가스 하이브리드
            </button>
            <button
              onClick={() => setFilterType('led')}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                filterType === 'led'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              순수 LED 기반
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-2">
            <span>정렬:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs bg-slate-50 text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="range">유효 거리 높은순</option>
              <option value="power">피크 파워 높은순</option>
              <option value="name">모델명 이름순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((p) => {
          const isExpanded = expandedId === p.id;

          return (
            <div
              key={p.id}
              id={`product-${p.id}`}
              className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
                targetProductId === p.id
                  ? 'border-blue-500 ring-2 ring-blue-400/50 shadow-md'
                  : 'border-slate-200 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="p-5">
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {p.vendor}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      p.type === 'xenon'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {p.type === 'xenon' ? 'Xenon + LED 하이브리드' : 'Solid-State LED'}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-base mb-1.5">{p.name}</h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
                  {p.lightSource}
                </p>

                {/* Specs Pill Matrix */}
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500">순간 피크 파워</span>
                    <span className="font-mono font-bold text-amber-700">{p.power}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500">유효 거리 / 화각</span>
                    <span className="font-mono font-bold text-blue-700">{p.range}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500">광학 구경 규격</span>
                    <span className="font-mono font-bold text-purple-700">{p.aperture}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500">제어 프로토콜</span>
                    <span className="font-mono text-slate-700 font-medium text-[11px] text-right truncate max-w-[170px]">
                      {p.protocol}
                    </span>
                  </div>
                </div>

                {/* Expanded Detailed Bullets */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 animate-fadeIn">
                    <span className="font-bold text-slate-800 block text-[11px]">핵심 엔지니어링 특장점:</span>
                    <ul className="space-y-1.5">
                      {p.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-relaxed">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer Toggle */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(p.id)}
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{isExpanded ? '상세 스펙 접기' : '상세 사양 보기'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <span className="text-[10px] text-slate-400 font-mono">폼팩터: {p.form.split(' ')[0]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
