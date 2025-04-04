import React, { useState } from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import { useHomeNews } from '../hooks/useNewsApi';
import { NewsItemResponse } from '../api/types';
import { mockFeaturedNews, mockTrendingNews, mockRecommendedNews } from '../utils/mockData';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [showMockData, setShowMockData] = useState(false);
  
  // API에서 뉴스 데이터 가져오기
  const { data, isLoading, error, useMockData } = useHomeNews();

  // API 응답에서 데이터 추출 또는 모의 데이터 사용
  const featuredNews = (showMockData || (useMockData && !data)) ? mockFeaturedNews : (data?.featured || mockFeaturedNews);
  const trendingNews = (showMockData || (useMockData && !data)) ? mockTrendingNews : (data?.trending || mockTrendingNews);
  const recommendedNews = (showMockData || (useMockData && !data)) ? mockRecommendedNews : (data?.recommended || mockRecommendedNews);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        </main>
      </div>
    );
  }
  
  // 인증 오류 처리
  if (error && error.includes('인증이 필요한 컨텐츠')) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-4 rounded shadow-md">
              <p className="font-bold">로그인이 필요합니다</p>
              <p className="mt-2">{error}</p>
            </div>
            <Link 
              to="/login" 
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              로그인 페이지로 이동
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // 에러 상태 표시
  if (error && !showMockData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">오류 발생!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
          <button 
            onClick={() => setShowMockData(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
          >
            미리보기
          </button>
        </main>
      </div>
    );
  }

  // API 응답에서 데이터 변환 함수
  const mapNewsItem = (item: NewsItemResponse) => {
    return {
      id: item.id,
      title: item.title,
      preview: item.preview,
      imageUrl: item.imageUrl,
      category: item.category,
      source: item.source,
      leftPercent: item.biasData.leftPercent,
      centerPercent: item.biasData.centerPercent,
      rightPercent: item.biasData.rightPercent,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 주요 뉴스 (큰 카드) */}
        <div className="mb-10">
          <NewsCard 
            news={
              'biasData' in featuredNews 
                ? mapNewsItem(featuredNews as NewsItemResponse)
                : featuredNews
            } 
            size="featured"
            layout="vertical"
          />
        </div>
        
        {/* 트렌딩 뉴스 (세로 1줄) */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">트렌딩 뉴스</h2>
          <div className="space-y-6">
            {trendingNews.map((news, index) => (
              <div key={news.id || index} className="border-b border-gray-200 pb-6">
                <NewsCard 
                  news={
                    'biasData' in news 
                      ? mapNewsItem(news as NewsItemResponse)
                      : news
                  } 
                  size="medium"
                  layout="horizontal"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 추천 뉴스 (그리드) */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">추천 뉴스</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedNews.map((news, index) => (
              <div key={news.id || index}>
                <NewsCard 
                  news={
                    'biasData' in news 
                      ? mapNewsItem(news as NewsItemResponse)
                      : news
                  } 
                  size="small"
                  layout="horizontal"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* 푸터 메뉴 */}
      <footer className="bg-amber-50 border-t border-amber-200 py-4 mt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-around">
            <a href="/" className="text-amber-800 hover:text-amber-600">홈</a>
            <a href="/saved" className="text-amber-800 hover:text-amber-600">저장됨</a>
            <a href="/profile" className="text-amber-800 hover:text-amber-600">프로필</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
