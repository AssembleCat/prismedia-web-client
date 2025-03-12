import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface NewsItem {
  id: string;
  title: string;
  preview: string;
  imageUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  category?: string;
  leftPercent: number;
  centerPercent: number;
  rightPercent: number;
  date?: string;
  sourceCount?: number;
  source?: string;
}

interface NewsCardProps {
  news: NewsItem;
  size?: 'small' | 'medium' | 'large' | 'featured';
  layout?: 'vertical' | 'horizontal';
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  news, 
  size = 'medium', 
  layout = 'vertical'  // 기본값은 수직 레이아웃
}) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | undefined>(news.imageUrl);
  
  const {
    id,
    title,
    preview,
    imageUrl,
    sourceName,
    category,
    leftPercent,
    centerPercent,
    rightPercent,
    date,
    sourceCount,
    source
  } = news;

  // 카드 크기에 따른 클래스 설정
  const cardClasses = {
    small: layout === 'vertical' ? 'h-64' : 'h-auto',
    medium: layout === 'vertical' ? 'h-80' : 'h-auto',
    large: layout === 'vertical' ? 'h-96' : 'h-auto',
    featured: 'h-[28rem] col-span-2 row-span-2'
  };

  // 이미지 크기에 따른 클래스 설정
  const imageClasses = {
    small: layout === 'vertical' ? 'h-32 w-full' : 'h-24 w-24 flex-shrink-0',
    medium: layout === 'vertical' ? 'h-40 w-full' : 'h-24 w-24 flex-shrink-0',
    large: layout === 'vertical' ? 'h-48 w-full' : 'h-32 w-32 flex-shrink-0',
    featured: 'h-64 w-full'
  };

  // 제목 크기에 따른 클래스 설정
  const titleClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    featured: 'text-3xl'
  };

  // 카드 크기에 따른 플레이스홀더 이미지 크기 설정
  const getPlaceholderImageUrl = () => {
    if (layout === 'horizontal' && size !== 'featured') {
      return 'https://dummyimage.com/200x200/000/fff&text=PRISMEDIA';
    }
    
    const dimensions = {
      small: '400x200',
      medium: '600x300',
      large: '800x400',
      featured: '1200x600'
    };
    return `https://dummyimage.com/${dimensions[size]}/000/fff&text=PRISMEDIA`;
  };

  // 이미지 로드 오류 처리 함수
  const handleImageError = () => {
    console.log('이미지 로드 실패:', imageUrl);
    setImageSrc(getPlaceholderImageUrl());
  };
  
  // imageUrl이 변경될 때마다 상태 초기화
  useEffect(() => {
    setImageSrc(imageUrl);
  }, [imageUrl]);

  // 뉴스 카드 클릭 핸들러
  const handleCardClick = () => {
    navigate(`/news/${id}`);
  };

  // 수평 레이아웃 (이미지가 오른쪽에 있는 형태)
  if (layout === 'horizontal' && size !== 'featured') {
    return (
      <div 
        className={`overflow-hidden flex cursor-pointer hover:shadow-lg transition-shadow duration-300`}
        onClick={handleCardClick}
      >
        {/* 컨텐츠 */}
        <div className="p-4 flex-grow">
          {/* 카테고리와 날짜 */}
          {(category || date || source) && (
            <div className="pb-1 flex justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                {category && <span className="font-medium">{category}</span>}
                {source && (
                  <>
                    <span>•</span>
                    <span>{source}</span>
                  </>
                )}
              </div>
              {date && <span>{date}</span>}
            </div>
          )}

          <h3 className={`${titleClasses[size]} font-bold text-gray-900 mb-2 line-clamp-3`}>{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{preview}</p>
          
          {/* 출처 정보 */}
          {(sourceName || sourceCount) && (
            <div className="text-sm text-gray-500 mb-2">
              {sourceCount ? `${sourceCount} Sources` : sourceName}
            </div>
          )}

          {/* 정치적 성향 표시 (간략화된 버전) */}
          <div className="flex items-center mt-2">
            <div className="flex h-3 w-16 mr-2">
              <div 
                className="bg-red-600" 
                style={{ width: `${leftPercent}%` }}
              ></div>
              <div 
                className="bg-gray-200" 
                style={{ width: `${centerPercent}%` }}
              ></div>
              <div 
                className="bg-blue-600" 
                style={{ width: `${rightPercent}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600">
              {leftPercent > centerPercent && leftPercent > rightPercent ? `Left ${leftPercent}%` : 
               centerPercent > leftPercent && centerPercent > rightPercent ? `Center ${centerPercent}%` : 
               `Right ${rightPercent}%`}
            </span>
          </div>
        </div>

        {/* 이미지 */}
        <div className={`${imageClasses[size]} overflow-hidden bg-gray-200`}>
          {!imageUrl ? (
            <img 
              src={getPlaceholderImageUrl()} 
              alt="기본 이미지" 
              className="w-full h-full object-cover"
              onError={() => console.error("플레이스홀더 이미지 로드 실패")}
            />
          ) : (
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}
        </div>
      </div>
    );
  }

  // 수직 레이아웃 (기존 레이아웃)
  return (
    <div 
      className={`overflow-hidden flex flex-col ${cardClasses[size]} cursor-pointer hover:shadow-lg transition-shadow duration-300`}
      onClick={handleCardClick}
    >
      {/* 카테고리와 날짜 */}
      {(category || date || source) && (
        <div className="px-4 pt-3 pb-1 flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {category && <span className="font-medium">{category}</span>}
            {source && (
              <>
                <span>•</span>
                <span>{source}</span>
              </>
            )}
          </div>
          {date && <span>{date}</span>}
        </div>
      )}

      {/* 이미지 */}
      <div className={`${imageClasses[size]} overflow-hidden bg-gray-200`}>
        {!imageUrl ? (
          // 이미지 URL이 없는 경우 플레이스홀더 이미지 표시
          <img 
            src={getPlaceholderImageUrl()} 
            alt="기본 이미지" 
            className="w-full h-full object-cover"
            onError={() => console.error("플레이스홀더 이미지 로드 실패")}
          />
        ) : (
          // 이미지 URL이 있는 경우 원본 이미지 또는 오류 시 플레이스홀더 이미지 표시
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
      </div>

      {/* 컨텐츠 */}
      <div className="p-4 flex-grow">
        <h3 className={`${titleClasses[size]} font-bold text-gray-900 mb-2 line-clamp-3`}>{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{preview}</p>
        
        {/* 출처 정보 */}
        {(sourceName || sourceCount) && (
          <div className="text-sm text-gray-500 mb-2">
            {sourceCount ? `${sourceCount} Sources` : sourceName}
          </div>
        )}
      </div>

      {/* 정치적 성향 바 */}
      <div className="mt-auto">
        <div className="flex h-6 w-full">
          <div 
            className="bg-red-600" 
            style={{ width: `${leftPercent}%` }}
            title={`Left: ${leftPercent}%`}
          >
            {leftPercent > 10 && (
              <span className="text-white text-xs font-medium px-2 leading-6">
                Left {leftPercent}%
              </span>
            )}
          </div>
          <div 
            className="bg-gray-200" 
            style={{ width: `${centerPercent}%` }}
            title={`Center: ${centerPercent}%`}
          >
            {centerPercent > 10 && (
              <span className="text-gray-700 text-xs font-medium px-2 leading-6">
                Center {centerPercent}%
              </span>
            )}
          </div>
          <div 
            className="bg-blue-600" 
            style={{ width: `${rightPercent}%` }}
            title={`Right: ${rightPercent}%`}
          >
            {rightPercent > 10 && (
              <span className="text-white text-xs font-medium px-2 leading-6">
                Right {rightPercent}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
