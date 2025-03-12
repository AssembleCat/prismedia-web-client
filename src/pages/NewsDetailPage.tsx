import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useNewsDetail } from '../hooks/useNewsApi';
import { formatDate } from '../utils/apiUtils';

// 언론사 정보 인터페이스
interface NewsSource {
  id: string;
  name: string;
  logo?: string;
  bias: 'Left' | 'Center' | 'Right';
  articles: {
    id: string;
    title: string;
    preview: string;
    url: string;
    publishedAt: string;
  }[];
}

const NewsDetailPage: React.FC = () => {
  // URL 파라미터에서 뉴스 ID 가져오기
  const { newsId } = useParams<{ newsId: string }>();
  
  // API에서 뉴스 상세 정보 가져오기
  const { data, isLoading, error } = useNewsDetail(newsId || '');

  // 모의 관련 기사 데이터 (실제로는 API에서 가져와야 함)
  const mockRelatedSources: NewsSource[] = [
    {
      id: 'channel4',
      name: 'Channel 4',
      logo: 'https://via.placeholder.com/40',
      bias: 'Left',
      articles: [
        {
          id: 'c4-1',
          title: 'Syria latest: crowds celebrate in Damascus after landmark deal',
          preview: 'Crowds of Kurds have taken to the streets in north east Syria to celebrate a breakthrough deal signed between Kurdish officials and the new Syrian government.',
          url: '#',
          publishedAt: '2025-03-12T05:31:49Z'
        }
      ]
    },
    {
      id: 'lefigaro',
      name: 'Le Figaro',
      logo: 'https://via.placeholder.com/40',
      bias: 'Right',
      articles: [
        {
          id: 'lf-1',
          title: 'Syria: By agreeing with the Kurds, Ahmed al-Charaa offers a lifebuoy',
          preview: 'An agreement was signed between the new government and the Kurds to resolve their differences by the end of the year, a success for the Syrian interim president, weakened by the massacres of civilians over the weekend.',
          url: '#',
          publishedAt: '2025-03-12T00:31:49Z'
        }
      ]
    },
    {
      id: 'standard',
      name: 'der Standard AT',
      logo: 'https://via.placeholder.com/40',
      bias: 'Left',
      articles: [
        {
          id: 'ds-1',
          title: 'Rejoicing for agreement between Syrian Kurds and Damascus',
          preview: 'President Sharaa and militia leader Abdi sign an elementary plan to integrate the Kurdish administration and armed forces into the Syrian state',
          url: '#',
          publishedAt: '2025-03-12T00:31:49Z'
        }
      ]
    },
    {
      id: 'frankfurter',
      name: 'Frankfurter Allgemeine',
      logo: 'https://via.placeholder.com/40',
      bias: 'Right',
      articles: [
        {
          id: 'fa-1',
          title: "Syria's new leadership agrees with the Kurds",
          preview: 'The new Syrian government has reached an agreement with Kurdish representatives to integrate Kurdish administration into the Syrian state structure.',
          url: '#',
          publishedAt: '2025-03-11T22:31:49Z'
        }
      ]
    }
  ];

  // 좌/중/우 성향별 기사 수 계산
  const leftArticles = mockRelatedSources.filter(source => source.bias === 'Left').flatMap(source => source.articles).length;
  const centerArticles = mockRelatedSources.filter(source => source.bias === 'Center').flatMap(source => source.articles).length;
  const rightArticles = mockRelatedSources.filter(source => source.bias === 'Right').flatMap(source => source.articles).length;
  const totalArticles = leftArticles + centerArticles + rightArticles;

  // 현재 선택된 필터 (기본값: 'All')
  const [selectedFilter, setSelectedFilter] = React.useState<'All' | 'Left' | 'Center' | 'Right'>('All');

  // 필터링된 언론사 목록
  const filteredSources = selectedFilter === 'All' 
    ? mockRelatedSources 
    : mockRelatedSources.filter(source => source.bias === selectedFilter);

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

  // 에러 상태 표시
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">오류 발생!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </main>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!data || !data.news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">알림:</strong>
            <span className="block sm:inline"> 뉴스를 찾을 수 없습니다.</span>
          </div>
        </main>
      </div>
    );
  }

  const { news } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 뉴스 상세 정보 */}
        <article className="mb-10">
          <div className="mb-4">
            <div className="flex items-center gap-1 text-sm text-amber-700 mb-2">
              <span>{news.category}</span>
              {news.source && (
                <>
                  <span>•</span>
                  <span>{news.source}</span>
                </>
              )}
              <span>•</span>
              <span>{formatDate(news.publishedAt)}</span>
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-4">{news.title}</h1>
            
            {/* 정치적 성향 바 */}
            <div className="flex h-6 w-full mb-6">
              <div 
                className="bg-red-700/70" 
                style={{ width: `${news.biasData.leftPercent}%` }}
                title={`Left: ${news.biasData.leftPercent}%`}
              >
                {news.biasData.leftPercent > 10 && (
                  <span className="text-white text-xs font-medium px-2 leading-6 truncate w-full text-center">
                    Left {news.biasData.leftPercent}%
                  </span>
                )}
              </div>
              <div 
                className="bg-gray-300" 
                style={{ width: `${news.biasData.centerPercent}%` }}
                title={`Center: ${news.biasData.centerPercent}%`}
              >
                {news.biasData.centerPercent > 10 && (
                  <span className="text-gray-700 text-xs font-medium px-2 leading-6 truncate w-full text-center">
                    Center {news.biasData.centerPercent}%
                  </span>
                )}
              </div>
              <div 
                className="bg-blue-700/70" 
                style={{ width: `${news.biasData.rightPercent}%` }}
                title={`Right: ${news.biasData.rightPercent}%`}
              >
                {news.biasData.rightPercent > 10 && (
                  <span className="text-white text-xs font-medium px-2 leading-6 truncate w-full text-center">
                    Right {news.biasData.rightPercent}%
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full h-auto rounded-lg mb-6"
            />
            
            <div className="prose prose-amber max-w-none">
              {/* 뉴스 본문 내용 */}
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>
          </div>
          
          {/* 원본 링크 */}
          <div className="mb-8">
            <a 
              href={news.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-amber-300 text-amber-700 bg-amber-50 rounded-md hover:bg-amber-100"
            >
              <span>원본 기사 보기</span>
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>
        
        {/* 관련 기사 섹션 */}
        <div className="mt-10 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 기사</h2>
          
          {/* 관련 기사 통계 및 필터 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{totalArticles} Articles</h3>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setSelectedFilter('All')}
                  className={`px-3 py-1 text-sm rounded-md ${selectedFilter === 'All' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setSelectedFilter('Left')}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${selectedFilter === 'Left' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                >
                  Left <span className="ml-1 text-xs bg-gray-200 px-1.5 rounded-full">{leftArticles}</span>
                </button>
                <button 
                  onClick={() => setSelectedFilter('Center')}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${selectedFilter === 'Center' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                >
                  Center <span className="ml-1 text-xs bg-gray-200 px-1.5 rounded-full">{centerArticles}</span>
                </button>
                <button 
                  onClick={() => setSelectedFilter('Right')}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${selectedFilter === 'Right' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                >
                  Right <span className="ml-1 text-xs bg-gray-200 px-1.5 rounded-full">{rightArticles}</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* 언론사별 기사 목록 */}
          <div className="space-y-6">
            {filteredSources.map(source => (
              <div key={source.id} className="border border-gray-200 rounded-lg p-4">
                {/* 언론사 헤더 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {source.logo && (
                      <img src={source.logo} alt={source.name} className="w-10 h-10 rounded-full" />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">{source.name}</h4>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-md ${
                      source.bias === 'Left' ? 'bg-red-100 text-red-700' : 
                      source.bias === 'Center' ? 'bg-gray-200 text-gray-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {source.bias}
                    </span>
                  </div>
                </div>
                
                {/* 기사 목록 */}
                <div className="space-y-3">
                  {source.articles.map(article => (
                    <div key={article.id} className="border-t border-gray-100 pt-3">
                      <h5 className="font-semibold text-gray-900 mb-1">{article.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{article.preview}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
                        <a 
                          href={article.url} 
                          className="text-sm text-amber-600 hover:text-amber-700"
                        >
                          Read Full Article
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsDetailPage;
