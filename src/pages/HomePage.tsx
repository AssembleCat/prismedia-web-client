import React from 'react';
import { mockFeaturedNews, mockTrendingNews, mockRecommendedNews } from '../utils/mockData';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const featuredNews = mockFeaturedNews;
  const trendingNews = mockTrendingNews;
  const recommendedNews = mockRecommendedNews;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 주요 뉴스 (큰 카드) */}
        <div className="mb-10">
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative">
              <img 
                src={featuredNews.imageUrl} 
                alt={featuredNews.title} 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-1 text-sm text-gray-200 mb-2">
                  <span>{featuredNews.category}</span>
                  {featuredNews.source && (
                    <>
                      <span>•</span>
                      <span>{featuredNews.source}</span>
                    </>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{featuredNews.title}</h2>
                <p className="text-lg text-gray-200 mb-4">{featuredNews.preview}</p>
                
                {/* 정치적 성향 바 */}
                <div className="flex h-6 w-full">
                  <div 
                    className="bg-red-700/70" 
                    style={{ width: `${featuredNews.leftPercent}%` }}
                    title={`Left: ${featuredNews.leftPercent}%`}
                  >
                    {featuredNews.leftPercent > 10 && (
                      <span className="text-white text-xs font-medium px-2 leading-6 truncate w-full text-center">
                        Left {featuredNews.leftPercent}%
                      </span>
                    )}
                  </div>
                  <div 
                    className="bg-gray-300" 
                    style={{ width: `${featuredNews.centerPercent}%` }}
                    title={`Center: ${featuredNews.centerPercent}%`}
                  >
                    {featuredNews.centerPercent > 10 && (
                      <span className="text-gray-700 text-xs font-medium px-2 leading-6 truncate w-full text-center">
                        Center {featuredNews.centerPercent}%
                      </span>
                    )}
                  </div>
                  <div 
                    className="bg-blue-700/70" 
                    style={{ width: `${featuredNews.rightPercent}%` }}
                    title={`Right: ${featuredNews.rightPercent}%`}
                  >
                    {featuredNews.rightPercent > 10 && (
                      <span className="text-white text-xs font-medium px-2 leading-6 truncate w-full text-center">
                        Right {featuredNews.rightPercent}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 트렌딩 뉴스 (세로 1줄) */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">트렌딩 뉴스</h2>
          <div className="space-y-6">
            {trendingNews.map((news, index) => (
              <div key={index} className="flex items-start gap-4 border-b border-gray-200 pb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <span>{news.category}</span>
                    {news.source && (
                      <>
                        <span>•</span>
                        <span>{news.source}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{news.preview}</p>
                  
                  {/* 정치적 성향 표시 (간략화된 버전) */}
                  <div className="flex items-center mt-2">
                    {/* 가장 높은 비율 찾기 */}
                    {(() => {
                      const maxPercent = Math.max(news.leftPercent, news.centerPercent, news.rightPercent);
                      const dominantSide = 
                        maxPercent === news.leftPercent ? 'Left' : 
                        maxPercent === news.centerPercent ? 'Center' : 'Right';
                      
                      return (
                        <>
                          <div className="flex h-3 w-16 mr-2">
                            <div 
                              className="bg-red-700/70" 
                              style={{ width: `${news.leftPercent}%` }}
                            ></div>
                            <div 
                              className="bg-gray-300" 
                              style={{ width: `${news.centerPercent}%` }}
                            ></div>
                            <div 
                              className="bg-blue-700/70" 
                              style={{ width: `${news.rightPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">
                            {dominantSide} {maxPercent}%
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
                
                <img 
                  src={news.imageUrl} 
                  alt={news.title} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 추천 뉴스 (세로 1줄) */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">추천 뉴스</h2>
          <div className="space-y-6">
            {recommendedNews.map((news, index) => (
              <div key={index} className="flex items-start gap-4 border-b border-gray-200 pb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <span>{news.category}</span>
                    {news.source && (
                      <>
                        <span>•</span>
                        <span>{news.source}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{news.preview}</p>
                  
                  {/* 정치적 성향 표시 (간략화된 버전) */}
                  <div className="flex items-center mt-2">
                    {/* 가장 높은 비율 찾기 */}
                    {(() => {
                      const maxPercent = Math.max(news.leftPercent, news.centerPercent, news.rightPercent);
                      const dominantSide = 
                        maxPercent === news.leftPercent ? 'Left' : 
                        maxPercent === news.centerPercent ? 'Center' : 'Right';
                      
                      return (
                        <>
                          <div className="flex h-3 w-16 mr-2">
                            <div 
                              className="bg-red-700/70" 
                              style={{ width: `${news.leftPercent}%` }}
                            ></div>
                            <div 
                              className="bg-gray-300" 
                              style={{ width: `${news.centerPercent}%` }}
                            ></div>
                            <div 
                              className="bg-blue-700/70" 
                              style={{ width: `${news.rightPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">
                            {dominantSide} {maxPercent}%
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
                
                <img 
                  src={news.imageUrl} 
                  alt={news.title} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* 푸터 메뉴 */}
      <footer className="bg-amber-50 border-t border-amber-200 py-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-around">
            <a href="#" className="text-amber-800 hover:text-amber-600">홈</a>
            <a href="#" className="text-amber-800 hover:text-amber-600">검색</a>
            <a href="#" className="text-amber-800 hover:text-amber-600">저장됨</a>
            <a href="#" className="text-amber-800 hover:text-amber-600">프로필</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
