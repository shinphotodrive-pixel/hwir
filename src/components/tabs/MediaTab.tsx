import React, { useState, useEffect } from 'react';
import { PROCUREMENT_LINKS, YOUTUBE_VIDEOS } from '../../data/itsData';
import { ShoppingCart, Video, ExternalLink, Play, Clock, Tag, X } from 'lucide-react';

interface MediaTabProps {
  targetId?: string;
}

export const MediaTab: React.FC<MediaTabProps> = ({ targetId }) => {
  const [activeVideoEmbed, setActiveVideoEmbed] = useState<string | null>(null);

  useEffect(() => {
    if (targetId) {
      const matchedVideo = YOUTUBE_VIDEOS.find((v) => v.id === targetId);
      if (matchedVideo && matchedVideo.embedId) {
        setActiveVideoEmbed(matchedVideo.embedId);
      }
      setTimeout(() => {
        const el = document.getElementById(`media-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [targetId]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Intro Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
          <span>🎥</span>
          <span>섹션 안내: 시안 영상 & 구매/데이터시트 디렉토리</span>
        </h2>
        <p className="text-xs sm:text-sm text-blue-900/80 mt-1.5 leading-relaxed">
          보고서에 포함된 모든 산업용 하이브리드 조명 및 단속 장비의 <strong>공식 데이터시트 열람/구매 URL</strong>과 현장 배선 연동 및 스트로보 모션 정지 효과를 검증할 수 있는 <strong>YouTube 학습 시연 영상 디렉토리</strong>입니다.
        </p>
      </div>

      {/* Procurement Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <span>주요 장비 공식 구매처 및 데이터시트 디렉토리</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">총 6개 공식 제조사/유통망</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCUREMENT_LINKS.map((item) => (
            <div
              key={item.id}
              id={`media-${item.id}`}
              className={`bg-white p-5 rounded-xl border transition-all flex flex-col justify-between ${
                targetId === item.id
                  ? 'border-blue-500 ring-2 ring-blue-400/50 shadow-md'
                  : 'border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {item.vendor}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {item.badge}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.model}</h4>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">{item.desc}</p>
                <div className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200/80 mb-4">
                  {item.specs}
                </div>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-slate-900 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition-colors w-full cursor-pointer shadow-xs"
              >
                <span>공식 제품 정보 & 데이터시트 열람</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Technical Demonstration Matrix */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Video className="w-5 h-5 text-red-600" />
            <span>현장 배선 및 광학 효과 시연 유튜브(YouTube) 영상 갤러리</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">6대 실증 영상 컬렉션</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {YOUTUBE_VIDEOS.map((v) => (
            <div
              key={v.id}
              id={`media-${v.id}`}
              className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden group ${
                targetId === v.id
                  ? 'border-red-500 ring-2 ring-red-400/50 shadow-md'
                  : 'border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md'
              }`}
            >
              {/* Video Thumbnail Fake/Embed Preview Box */}
              <div className="relative bg-slate-900 aspect-video flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg z-20 cursor-pointer">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center z-20 text-[11px] text-slate-300">
                  <span className="font-semibold text-white truncate max-w-[180px]">{v.tag}</span>
                  {v.duration && (
                    <span className="flex items-center gap-1 font-mono text-[10px] bg-slate-800/80 px-1.5 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      {v.duration}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {v.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {v.desc}
                  </p>
                </div>

                <div className="flex gap-2">
                  {v.embedId && (
                    <button
                      onClick={() => setActiveVideoEmbed(v.embedId!)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-3 rounded-lg transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-red-600 fill-current" />
                      <span>대시보드 내 재생</span>
                    </button>
                  )}
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In-app Video Modal */}
      {activeVideoEmbed && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-3xl w-full overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-white">
              <span className="text-sm font-bold flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                <span>기술 시연 영상 재생</span>
              </span>
              <button
                onClick={() => setActiveVideoEmbed(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoEmbed}?autoplay=1`}
                title="YouTube video player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
