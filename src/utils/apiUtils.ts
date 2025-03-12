import { NewsItemResponse } from '../api/types';

// API 응답 데이터를 애플리케이션에서 사용하는 형식으로 변환하는 유틸리티 함수

/**
 * API에서 받은 뉴스 아이템을 애플리케이션에서 사용하는 형식으로 변환
 */
export const transformNewsItem = (apiNewsItem: NewsItemResponse) => {
  return {
    id: apiNewsItem.id,
    title: apiNewsItem.title,
    preview: apiNewsItem.preview,
    content: apiNewsItem.content,
    imageUrl: apiNewsItem.imageUrl,
    category: apiNewsItem.category,
    source: apiNewsItem.source,
    publishedAt: apiNewsItem.publishedAt,
    url: apiNewsItem.url,
    leftPercent: apiNewsItem.biasData.leftPercent,
    centerPercent: apiNewsItem.biasData.centerPercent,
    rightPercent: apiNewsItem.biasData.rightPercent,
  };
};

/**
 * 정치적 성향 중 가장 높은 값과 해당 성향을 반환
 */
export const getDominantBias = (leftPercent: number, centerPercent: number, rightPercent: number) => {
  const maxPercent = Math.max(leftPercent, centerPercent, rightPercent);
  const dominantSide = 
    maxPercent === leftPercent ? 'Left' : 
    maxPercent === centerPercent ? 'Center' : 'Right';
  
  return { dominantSide, maxPercent };
};

/**
 * 날짜 형식을 변환하는 함수
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * 에러 메시지를 사용자 친화적으로 변환
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * API 요청 시 사용할 수 있는 재시도 함수
 */
export const retryFetch = async <T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error;
      
      // 마지막 시도가 아니면 지정된 시간만큼 대기 후 재시도
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};
