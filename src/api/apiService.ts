import { ApiResponse, NewsItemResponse, NewsListResponse, NewsDetailResponse, SearchParams, SearchResultResponse } from './types';

// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// 기본 fetch 함수
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`API 요청: ${url}`);
    const response = await fetch(url, {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
      credentials: 'include', // HttpOnly 쿠키를 사용하기 위한 설정
    });

    // 응답이 JSON이 아닌 경우 처리
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API 응답이 JSON 형식이 아닙니다.');
    }

    const data = await response.json();

    // API 응답 형식 확인 및 변환
    if (!response.ok) {
      return {
        success: false,
        data: {} as T,
        error: data.error || `HTTP 오류: ${response.status}`,
      };
    }

    return {
      success: true,
      data: data as T,
      meta: data.meta,
    };
  } catch (error) {
    console.error('API 요청 오류:', error);
    return {
      success: false,
      data: {} as T,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
}

// 뉴스 API 서비스
export const newsApi = {
  // 홈페이지 뉴스 목록 가져오기
  getHomeNews: async (): Promise<ApiResponse<NewsListResponse>> => {
    return fetchApi<NewsListResponse>('/api/news');
  },

  // 특정 카테고리의 뉴스 목록 가져오기
  getCategoryNews: async (category: string, page = 1, pageSize = 10): Promise<ApiResponse<NewsListResponse>> => {
    return fetchApi<NewsListResponse>(`/api/news/category/${category}?page=${page}&pageSize=${pageSize}`);
  },

  // 뉴스 상세 정보 가져오기
  getNewsDetail: async (newsId: string): Promise<ApiResponse<NewsDetailResponse>> => {
    return fetchApi<NewsDetailResponse>(`/api/news/${newsId}`);
  },

  // 트렌딩 뉴스 가져오기
  getTrendingNews: async (limit = 5): Promise<ApiResponse<NewsItemResponse[]>> => {
    return fetchApi<NewsItemResponse[]>(`/api/news?sort=views&size=${limit}`);
  },

  // 추천 뉴스 가져오기
  getRecommendedNews: async (limit = 5): Promise<ApiResponse<NewsItemResponse[]>> => {
    return fetchApi<NewsItemResponse[]>(`/api/news?sort=recommended&size=${limit}`);
  },

  // 뉴스 검색
  searchNews: async (params: SearchParams): Promise<ApiResponse<SearchResultResponse>> => {
    // URL 쿼리 파라미터 생성
    const queryParams = new URLSearchParams();
    
    if (params.query) queryParams.append('keyword', params.query);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.pageSize) queryParams.append('size', params.pageSize.toString());
    if (params.category) queryParams.append('category', params.category);
    if (params.source) queryParams.append('source', params.source);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.sortBy) queryParams.append('sort', params.sortBy);

    return fetchApi<SearchResultResponse>(`/api/news?${queryParams.toString()}`);
  },
};

// 뉴스 클러스터 API 서비스
export const clusterApi = {
  // 모든 뉴스 클러스터 조회
  getAllClusters: async (page = 0, size = 10, includeItems = false): Promise<ApiResponse<any>> => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
    queryParams.append('includeItems', includeItems.toString());
    
    return fetchApi<any>(`/api/clusters?${queryParams.toString()}`);
  },

  // 특정 ID의 뉴스 클러스터 조회
  getClusterById: async (id: string, includeItems = true): Promise<ApiResponse<any>> => {
    return fetchApi<any>(`/api/clusters/${id}?includeItems=${includeItems}`);
  },

  // 토픽별 뉴스 클러스터 조회
  getClustersByTopic: async (topic: string, page = 0, size = 10, includeItems = false): Promise<ApiResponse<any>> => {
    const queryParams = new URLSearchParams();
    queryParams.append('topic', topic);
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
    queryParams.append('includeItems', includeItems.toString());
    
    return fetchApi<any>(`/api/clusters?${queryParams.toString()}`);
  },

  // 키워드로 뉴스 클러스터 검색
  searchClusters: async (keywords: string, page = 0, size = 10, includeItems = false): Promise<ApiResponse<any>> => {
    const queryParams = new URLSearchParams();
    queryParams.append('keywords', keywords);
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
    queryParams.append('includeItems', includeItems.toString());
    
    return fetchApi<any>(`/api/clusters?${queryParams.toString()}`);
  },
};

// 사용자 API 서비스 (추후 확장 가능)
export const userApi = {
  // 사용자 로그인
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    return fetchApi<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // 사용자 등록
  register: async (userData: { email: string; password: string; name: string }): Promise<ApiResponse<{ token: string; user: any }>> => {
    return fetchApi<{ token: string; user: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // 사용자 프로필 가져오기
  getProfile: async (): Promise<ApiResponse<any>> => {
    return fetchApi<any>('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
  
  // 토큰 갱신 (리프레시 토큰 사용)
  refreshToken: async (): Promise<ApiResponse<{ accessToken: string }>> => {
    return fetchApi<{ accessToken: string }>('/api/auth/refresh', {
      method: 'POST',
    });
  },
  
  // 로그아웃
  logout: async (): Promise<ApiResponse<void>> => {
    return fetchApi<void>('/api/auth/logout', {
      method: 'POST',
    });
  },
};

export default {
  news: newsApi,
  cluster: clusterApi,
  user: userApi,
};
