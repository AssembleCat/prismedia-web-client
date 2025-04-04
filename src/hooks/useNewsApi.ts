import { useState, useEffect } from 'react';
import { newsApi } from '../api/apiService';
import { NewsListResponse, NewsDetailResponse, NewsItemResponse } from '../api/types';

// 로딩, 에러, 데이터 상태를 관리하는 기본 인터페이스
interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// 홈페이지 뉴스 데이터를 가져오는 훅
export function useHomeNews(): ApiState<NewsListResponse> & { useMockData: boolean } {
  const [state, setState] = useState<ApiState<NewsListResponse>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchHomeNews = async () => {
      try {
        // 1초 타임아웃 설정
        const timeoutPromise = new Promise<void>((_, reject) => {
          setTimeout(() => reject(new Error('요청 시간 초과')), 1000);
        });

        // API 요청
        const fetchPromise = newsApi.getHomeNews();

        // 둘 중 먼저 완료되는 프로미스 사용
        const response = await Promise.race([fetchPromise, timeoutPromise.then(() => {
          throw new Error('요청 시간 초과');
        })]);
        
        if (response.success) {
          setState({
            data: response.data,
            isLoading: false,
            error: null,
          });
        } else {
          console.error('홈페이지 뉴스 가져오기 실패:', response.error);
          
          // 401 오류 처리 (인증 필요)
          if (response.status === 401) {
            setState({
              data: null,
              isLoading: false,
              error: '인증이 필요한 컨텐츠입니다. 로그인 후 이용해주세요.',
            });
            // 로그인 페이지로 리다이렉트는 apiService에서 처리됨
          } else {
            setState({
              data: null,
              isLoading: false,
              error: response.error || '뉴스를 불러오는데 실패했습니다.',
            });
            setUseMockData(true); // API 오류 시 모의 데이터 사용
          }
        }
      } catch (err) {
        console.error('홈페이지 뉴스 가져오기 오류:', err);
        setState({
          data: null,
          isLoading: false,
          error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
        });
        setUseMockData(true); // 예외 발생 시 모의 데이터 사용
      }
    };

    fetchHomeNews();
  }, []);

  return { ...state, useMockData };
}

// 카테고리별 뉴스를 가져오는 훅
export function useCategoryNews(category: string, page = 1, pageSize = 10): ApiState<NewsListResponse> {
  const [state, setState] = useState<ApiState<NewsListResponse>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        const response = await newsApi.getCategoryNews(category, page, pageSize);
        
        if (response.success) {
          setState({
            data: response.data,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            data: null,
            isLoading: false,
            error: response.error || '뉴스를 불러오는데 실패했습니다.',
          });
        }
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        });
      }
    };

    fetchCategoryNews();
  }, [category, page, pageSize]);

  return state;
}

// 뉴스 상세 정보를 가져오는 훅
export function useNewsDetail(newsId: string): ApiState<NewsDetailResponse> {
  const [state, setState] = useState<ApiState<NewsDetailResponse>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        const response = await newsApi.getNewsDetail(newsId);
        
        if (response.success) {
          setState({
            data: response.data,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            data: null,
            isLoading: false,
            error: response.error || '뉴스 상세 정보를 불러오는데 실패했습니다.',
          });
        }
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        });
      }
    };

    fetchNewsDetail();
  }, [newsId]);

  return state;
}

// 트렌딩 뉴스를 가져오는 훅
export function useTrendingNews(limit = 5): ApiState<NewsItemResponse[]> {
  const [state, setState] = useState<ApiState<NewsItemResponse[]>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await newsApi.getTrendingNews(limit);
        
        if (response.success) {
          setState({
            data: response.data,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            data: null,
            isLoading: false,
            error: response.error || '트렌딩 뉴스를 불러오는데 실패했습니다.',
          });
        }
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        });
      }
    };

    fetchTrendingNews();
  }, [limit]);

  return state;
}

// 추천 뉴스를 가져오는 훅
export function useRecommendedNews(limit = 5): ApiState<NewsItemResponse[]> {
  const [state, setState] = useState<ApiState<NewsItemResponse[]>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchRecommendedNews = async () => {
      try {
        const response = await newsApi.getRecommendedNews(limit);
        
        if (response.success) {
          setState({
            data: response.data,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            data: null,
            isLoading: false,
            error: response.error || '추천 뉴스를 불러오는데 실패했습니다.',
          });
        }
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        });
      }
    };

    fetchRecommendedNews();
  }, [limit]);

  return state;
}
