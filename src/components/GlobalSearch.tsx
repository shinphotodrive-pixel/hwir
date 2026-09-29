import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Command, ArrowRight, CornerDownLeft, Sparkles, Layers, Cpu, Compass, ShoppingCart, Lightbulb } from 'lucide-react';
import { SearchItem, SearchCategory, TabType } from '../types';
import { SEARCH_DATABASE } from '../data/searchDatabase';

interface GlobalSearchProps {
  onNavigate: (tab: TabType, targetId?: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut (Cmd+K or Ctrl+K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter items based on query & category
  const filteredResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    return SEARCH_DATABASE.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.categoryKey !== selectedCategory) {
        return false;
      }

      // Query filter
      if (!cleanQuery) return true;

      const titleMatch = item.title.toLowerCase().includes(cleanQuery);
      const subtitleMatch = item.subtitle.toLowerCase().includes(cleanQuery);
      const highlightMatch = item.highlightText?.toLowerCase().includes(cleanQuery);
      const tagMatch = item.tags.some((t) => t.toLowerCase().includes(cleanQuery));

      return titleMatch || subtitleMatch || highlightMatch || tagMatch;
    });
  }, [query, selectedCategory]);

  // Reset selectedIndex when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Handle keyboard navigation inside search list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    onNavigate(item.tab, item.targetId);
    setIsOpen(false);
  };

  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'products':
        return <Lightbulb className="w-3.5 h-3.5 text-amber-500" />;
      case 'optics':
        return <Layers className="w-3.5 h-3.5 text-blue-500" />;
      case 'control':
        return <Cpu className="w-3.5 h-3.5 text-emerald-500" />;
      case 'guides':
        return <Compass className="w-3.5 h-3.5 text-purple-500" />;
      case 'media':
        return <ShoppingCart className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const categories: { key: SearchCategory; label: string; count?: number }[] = [
    { key: 'all', label: '전체' },
    { key: 'products', label: '단속 조명 제품' },
    { key: 'optics', label: '광학 & 파장 스펙' },
    { key: 'control', label: '전자제어 & PWM' },
    { key: 'guides', label: '설계 가이드' },
    { key: 'media', label: '구매 & 영상' },
  ];

  const popularKeywords = ['850nm', 'Dahua 5500W', 'PWM 계산기', 'HRT 타원 빔', '체크리스트', 'Raytec', 'IEC 62471', '광절연 TTL'];

  return (
    <div className="relative">
      {/* Search Trigger Button in Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-72 md:w-80 lg:w-96 flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-400 hover:text-slate-200 transition-all text-xs cursor-pointer shadow-inner group"
      >
        <div className="flex items-center gap-2 truncate">
          <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0" />
          <span className="truncate">기술 스펙, 제품명, 가이드 검색...</span>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700 rounded shadow-xs">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </kbd>
        </div>
      </button>

      {/* Global Search Dialog Modal / Dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 sm:pt-16 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={dropdownRef}
            className="bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scaleIn text-slate-200"
          >
            {/* Search Input Bar */}
            <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/95 sticky top-0 z-10">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="검색어를 입력하세요 (예: 850nm, Dahua, PWM 펄스, HRT, 체크리스트...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="w-full bg-transparent border-0 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-0 font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="w-6 h-6 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 text-[11px] font-mono rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="px-3.5 py-2.5 bg-slate-850/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-thin text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Results Area */}
            <div className="overflow-y-auto p-2 sm:p-3 space-y-1.5 max-h-[55vh] scrollbar-thin">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`p-3 rounded-xl transition-all cursor-pointer border flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-slate-800/90 border-blue-500/70 text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {getCategoryIcon(item.categoryKey)}
                            <span>{item.category}</span>
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-950/80 text-blue-300 border border-blue-800">
                              {item.badge}
                            </span>
                          )}
                          <h4 className={`font-bold text-xs sm:text-sm truncate ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                            {item.title}
                          </h4>
                        </div>

                        <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 leading-relaxed">
                          {item.subtitle}
                        </p>

                        {item.highlightText && (
                          <div className="text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800/60 inline-block truncate max-w-full">
                            {item.highlightText}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0 self-center pl-2">
                        <span className="hidden sm:inline-block text-[11px] font-medium text-blue-400">
                          이동
                        </span>
                        <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-500'} transition-transform`} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">일치하는 검색 결과가 없습니다</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      '{query}'에 대한 항목을 찾을 수 없습니다. 다른 검색어를 시도해 보세요.
                    </p>
                  </div>

                  <div className="pt-3">
                    <span className="text-xs font-semibold text-slate-400 block mb-2">추천 검색어:</span>
                    <div className="flex flex-wrap justify-center gap-1.5 max-w-md mx-auto">
                      {popularKeywords.map((kw) => (
                        <button
                          key={kw}
                          onClick={() => setQuery(kw)}
                          className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 cursor-pointer"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">↓</kbd>
                  <span>이동</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">Enter</kbd>
                  <span>선택</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">Esc</kbd>
                  <span>닫기</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                총 {filteredResults.length}개 항목 발견
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
