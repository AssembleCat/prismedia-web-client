// API 응답 타입 정의
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  meta?: {
    totalCount?: number;
    page?: number;
    pageSize?: number;
  };
}

// 뉴스 아이템 타입
export interface NewsItemResponse {
  id: string;
  title: string;
  preview: string;
  content: string;
  imageUrl: string;
  category: string;
  source: string;
  publishedAt: string;
  url: string;
  biasData: {
    leftPercent: number;
    centerPercent: number;
    rightPercent: number;
  };
}

// 뉴스 목록 응답 타입
export interface NewsListResponse {
  featured?: NewsItemResponse;
  trending: NewsItemResponse[];
  recommended: NewsItemResponse[];
}

// 뉴스 상세 응답 타입
export interface NewsDetailResponse {
  news: NewsItemResponse;
  relatedNews?: NewsItemResponse[];
}

// 뉴스 카테고리 응답 타입
export interface NewsCategoryResponse {
  categories: {
    id: string;
    name: string;
    count: number;
  }[];
}

// 검색 요청 파라미터 타입
export interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
  category?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'relevance' | 'date' | 'popularity';
}

// 검색 결과 응답 타입
export interface SearchResultResponse {
  results: NewsItemResponse[];
  totalResults: number;
  page: number;
  pageSize: number;
}
