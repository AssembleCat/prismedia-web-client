import React from 'react';
import { NewsItem } from './NewsCard';

interface NewsSectionProps {
  title: string;
  news: NewsItem[];
  viewAllLink?: string;
  layout?: 'grid' | 'list';
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, news, viewAllLink, layout = 'grid' }) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-amber-900">{title}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-amber-600 hover:text-amber-800 font-medium">
            더 보기
          </a>
        )}
      </div>
      
      {layout === 'grid' ? (
        // 그리드 레이아웃
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden">
              <div className="flex p-4">
                <div className="flex-grow pr-4">
                  <div className="flex items-center gap-1 text-xs text-amber-700 mb-1">
                    {item.category && <span>{item.category}</span>}
                    {item.source && (
                      <>
                        <span>•</span>
                        <span>{item.source}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-amber-950 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-amber-800 mb-2 line-clamp-2">{item.preview}</p>
                  
                  {/* 정치적 성향 표시 (간략화된 버전) */}
                  <div className="flex items-center mt-2">
                    {/* 가장 높은 비율 찾기 */}
                    {(() => {
                      const maxPercent = Math.max(item.leftPercent, item.centerPercent, item.rightPercent);
                      const dominantSide = 
                        maxPercent === item.leftPercent ? 'Left' : 
                        maxPercent === item.centerPercent ? 'Center' : 'Right';
                      
                      return (
                        <>
                          <div className="flex h-3 w-16 mr-2">
                            <div 
                              className="bg-red-700/70" 
                              style={{ width: `${item.leftPercent}%` }}
                            ></div>
                            <div 
                              className="bg-gray-300" 
                              style={{ width: `${item.centerPercent}%` }}
                            ></div>
                            <div 
                              className="bg-blue-700/70" 
                              style={{ width: `${item.rightPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-amber-700">
                            {dominantSide} {maxPercent}%
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-24 h-24">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 리스트 레이아웃 (세로 1줄)
        <div className="space-y-6">
          {news.map((item) => (
            <div key={item.id} className="flex items-start gap-4 border-b border-amber-200 pb-6">
              <div className="flex-1">
                <div className="flex items-center gap-1 text-sm text-amber-700 mb-2">
                  {item.category && <span>{item.category}</span>}
                  {item.source && (
                    <>
                      <span>•</span>
                      <span>{item.source}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold text-amber-950 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-amber-800 mb-2 line-clamp-2">{item.preview}</p>
                
                {/* 정치적 성향 표시 (간략화된 버전) */}
                <div className="flex items-center mt-2">
                  {/* 가장 높은 비율 찾기 */}
                  {(() => {
                    const maxPercent = Math.max(item.leftPercent, item.centerPercent, item.rightPercent);
                    const dominantSide = 
                      maxPercent === item.leftPercent ? 'Left' : 
                      maxPercent === item.centerPercent ? 'Center' : 'Right';
                    
                    return (
                      <>
                        <div className="flex h-3 w-16 mr-2">
                          <div 
                            className="bg-red-700/70" 
                            style={{ width: `${item.leftPercent}%` }}
                          ></div>
                          <div 
                            className="bg-gray-300" 
                            style={{ width: `${item.centerPercent}%` }}
                          ></div>
                          <div 
                            className="bg-blue-700/70" 
                            style={{ width: `${item.rightPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-amber-700">
                          {dominantSide} {maxPercent}%
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>
              
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
