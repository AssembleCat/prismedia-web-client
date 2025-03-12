import { NewsItem } from '../components/NewsCard';

export interface NewsItemEx extends NewsItem {
  source?: string;
}

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: '전 필리핀 지도자 두테르테, 마약 살인 관련 국제형사재판소 체포영장으로 체포',
    preview: '필리핀 전 대통령 로드리고 두테르테가 마약과의 전쟁 중 발생한 살인 혐의로 국제형사재판소(ICC)에서 발부한 체포영장에 따라 체포되었습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Duterte+Arrested',
    category: '국제 뉴스',
    leftPercent: 40,
    centerPercent: 33,
    rightPercent: 27,
    sourceCount: 14
  },
  {
    id: '2',
    title: '베이징, 초등학교부터 AI 교육 도입 발표',
    preview: '중국은 미래 AI 인재를 양성하기 위해 초등학교부터 AI 교육을 의무화하는 계획을 발표했습니다. 이는 어린 학생들에게 AI 애플리케이션과 혁신을 교육과정에 통합하는 것을 목표로 합니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Beijing+AI+Education',
    category: '교육',
    leftPercent: 25,
    centerPercent: 50,
    rightPercent: 25,
    sourceCount: 8
  },
  {
    id: '3',
    title: '파키스탄 무장단체, 수백 명의 승객을 태운 열차 공격',
    preview: '파키스탄 무장단체가 수백 명의 승객을 태운 열차를 공격했습니다. 이번 공격으로 인한 사상자 수는 아직 확인되지 않았습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Pakistan+Train+Attack',
    category: '국제 뉴스',
    leftPercent: 30,
    centerPercent: 45,
    rightPercent: 25,
    sourceCount: 14
  },
  {
    id: '4',
    title: '닛산 CEO 마코토 우치다, 4월 1일 사임 예정, 기획 담당 에스피노사 후임으로 지명',
    preview: '닛산 자동차의 CEO 마코토 우치다가 4월 1일부로 사임할 예정이며, 현 기획 담당 임원인 에스피노사가 후임으로 지명되었습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Nissan+CEO+Resigns',
    category: '비즈니스',
    leftPercent: 33,
    centerPercent: 34,
    rightPercent: 33,
    sourceCount: 12
  },
  {
    id: '5',
    title: '미세 플라스틱 오염이 식물의 광합성에 영향을 미친다는 보고서 발표',
    preview: '최근 발표된 연구에 따르면, 미세 플라스틱 오염이 식물의 광합성 과정에 부정적인 영향을 미치는 것으로 나타났습니다. 이는 전 세계 식량 생산에 심각한 영향을 미칠 수 있습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Microplastic+Pollution',
    category: '환경',
    leftPercent: 45,
    centerPercent: 40,
    rightPercent: 15,
    sourceCount: 9
  },
  {
    id: '6',
    title: '한국 검찰, 윤석열 대통령 비판에도 불구하고 윤석열 전 검찰총장 기소 추진',
    preview: '한국 검찰이 현 윤석열 대통령의 비판에도 불구하고 윤석열 전 검찰총장에 대한 기소를 추진하고 있습니다. 이는 한국 정치계에 큰 파장을 일으키고 있습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=South+Korea+Prosecution',
    category: '정치',
    leftPercent: 40,
    centerPercent: 35,
    rightPercent: 25,
    sourceCount: 15
  },
  {
    id: '7',
    title: '마크 주커버그, 중국에 완전한 검열 통제권과 사용자 데이터 접근권 제공했다고 메타 내부고발자 주장',
    preview: '메타(구 페이스북)의 내부고발자가 마크 주커버그 CEO가 중국 정부에 완전한 검열 통제권과 사용자 데이터 접근권을 제공했다고 주장했습니다. 이는 메타의 글로벌 정책에 대한 심각한 의문을 제기합니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Zuckerberg+China+Deal',
    category: '기술',
    leftPercent: 55,
    centerPercent: 30,
    rightPercent: 15,
    sourceCount: 11
  },
  {
    id: '8',
    title: '75년 전 미국의 폭격으로 도쿄는 불에 탄 시체로 가득했다. 생존자들은 보상을 요구',
    preview: '제2차 세계대전 중 미국의 도쿄 폭격 75주년을 맞아, 생존자들이 미국 정부에 공식 사과와 보상을 요구하고 있습니다. 당시 폭격으로 도쿄는 불에 탄 시체로 가득했다고 증언합니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Tokyo+Bombing+Compensation',
    category: '역사',
    leftPercent: 60,
    centerPercent: 25,
    rightPercent: 15,
    sourceCount: 7
  },
  {
    id: '9',
    title: '탱커와 화물선 충돌로 영국 해안에서 화재와 사상자 발생',
    preview: '영국 해안에서 탱커와 화물선이 충돌하여 대형 화재가 발생했으며, 다수의 사상자가 보고되었습니다. 구조 작업이 진행 중입니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=UK+Ship+Collision',
    category: '사고',
    leftPercent: 33,
    centerPercent: 34,
    rightPercent: 33,
    sourceCount: 20
  },
  {
    id: '10',
    title: '마크 카니, 자유당 대표로 선출돼 곧 저스틴 트뤼도 총리 대체 예정',
    preview: '캐나다 전 중앙은행 총재 마크 카니가 자유당 대표로 선출되어 곧 저스틴 트뤼도 총리를 대체할 예정입니다. 이는 캐나다 정치계의 큰 변화를 예고합니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Mark+Carney+Liberal+Leader',
    category: '정치',
    leftPercent: 40,
    centerPercent: 30,
    rightPercent: 30,
    sourceCount: 16
  },
  {
    id: '11',
    title: '이스라엘, 가자지구 전력 공급 차단 발표',
    preview: '이스라엘 정부가 가자지구에 대한 전력 공급을 차단하기로 결정했다고 발표했습니다. 이는 가자지구의 인도주의적 위기를 더욱 악화시킬 것으로 우려됩니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Israel+Gaza+Electricity',
    category: '국제 뉴스',
    leftPercent: 50,
    centerPercent: 20,
    rightPercent: 30,
    sourceCount: 18
  },
  {
    id: '12',
    title: '시리아, 2011년 내전 이후 가장 치명적인 종파 폭력 직면',
    preview: '시리아가 2011년 내전 발발 이후 가장 치명적인 종파 간 폭력 사태에 직면해 있습니다. 국제 사회의 개입이 시급히 요구되고 있습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Syria+Sectarian+Violence',
    category: '국제 뉴스',
    leftPercent: 45,
    centerPercent: 35,
    rightPercent: 20,
    sourceCount: 14
  }
];

export const mockFeaturedNews: NewsItemEx = {
  id: 'featured-1',
  title: '전 필리핀 지도자 두테르테, 마약 살인 관련 국제형사재판소 체포영장으로 체포',
  preview: '필리핀 전 대통령 로드리고 두테르테가 마약과의 전쟁 중 발생한 살인 혐의로 국제형사재판소(ICC)에서 발부한 체포영장에 따라 체포되었습니다. 두테르테의 마약과의 전쟁은 수천 명의 사망자를 낳았으며, 국제사회의 비판을 받아왔습니다. ICC는 두테르테의 정책이 인도에 반한 죄에 해당한다고 판단했습니다.',
  imageUrl: 'https://via.placeholder.com/1200x600?text=Duterte+Arrested+Featured',
  category: '국제 뉴스',
  leftPercent: 40,
  centerPercent: 33,
  rightPercent: 27,
  sourceCount: 14,
  source: 'CNN'
};

export const mockTrendingNews: NewsItemEx[] = [
  {
    id: '3',
    title: '파키스탄 무장단체, 수백 명의 승객을 태운 열차 공격',
    preview: '파키스탄 무장단체가 수백 명의 승객을 태운 열차를 공격했습니다. 이번 공격으로 인한 사상자 수는 아직 확인되지 않았습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Pakistan+Train+Attack',
    category: '파키스탄 정치',
    leftPercent: 43,
    centerPercent: 30,
    rightPercent: 27,
    sourceCount: 14,
    source: '파키스탄'
  },
  {
    id: '4',
    title: '닛산 CEO 마코토 우치다, 4월 1일 사임 예정, 기획 담당 에스피노사 후임으로 지명',
    preview: '닛산 자동차의 CEO 마코토 우치다가 4월 1일부로 사임할 예정이며, 현 기획 담당 임원인 에스피노사가 후임으로 지명되었습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Nissan+CEO+Resigns',
    category: '닛산',
    leftPercent: 33,
    centerPercent: 41,
    rightPercent: 26,
    sourceCount: 22,
    source: '일본'
  },
  {
    id: '5',
    title: '미세 플라스틱 오염이 식물의 광합성에 영향을 미친다는 보고서 발표',
    preview: '최근 발표된 연구에 따르면, 미세 플라스틱 오염이 식물의 광합성 과정에 부정적인 영향을 미치는 것으로 나타났습니다. 이는 전 세계 식량 생산에 심각한 영향을 미칠 수 있습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Microplastic+Pollution',
    category: '환경',
    leftPercent: 22,
    centerPercent: 35,
    rightPercent: 43,
    sourceCount: 7,
    source: '영국'
  }
];

export const mockRecommendedNews: NewsItemEx[] = [
  {
    id: '6',
    title: '한국 검찰, 윤석열 대통령 비판에도 불구하고 윤석열 전 검찰총장 기소 추진',
    preview: '한국 검찰이 현 윤석열 대통령의 비판에도 불구하고 윤석열 전 검찰총장에 대한 기소를 추진하고 있습니다. 이는 한국 정치계에 큰 파장을 일으키고 있습니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=South+Korea+Prosecution',
    category: '한국 정치',
    leftPercent: 40,
    centerPercent: 35,
    rightPercent: 25,
    sourceCount: 15,
    source: '한국'
  },
  {
    id: '7',
    title: '마크 주커버그, 중국에 완전한 검열 통제권과 사용자 데이터 접근권 제공했다고 메타 내부고발자 주장',
    preview: '메타(구 페이스북)의 내부고발자가 마크 주커버그 CEO가 중국 정부에 완전한 검열 통제권과 사용자 데이터 접근권을 제공했다고 주장했습니다. 이는 메타의 글로벌 정책에 대한 심각한 의문을 제기합니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Zuckerberg+China+Deal',
    category: '기술',
    leftPercent: 55,
    centerPercent: 30,
    rightPercent: 15,
    sourceCount: 11,
    source: '미국'
  },
  {
    id: '8',
    title: '75년 전 미국의 폭격으로 도쿄는 불에 탄 시체로 가득했다. 생존자들은 보상을 요구',
    preview: '제2차 세계대전 중 미국의 도쿄 폭격 75주년을 맞아, 생존자들이 미국 정부에 공식 사과와 보상을 요구하고 있습니다. 당시 폭격으로 도쿄는 불에 탄 시체로 가득했다고 증언합니다.',
    imageUrl: 'https://via.placeholder.com/800x400?text=Tokyo+Bombing+Compensation',
    category: '역사',
    leftPercent: 60,
    centerPercent: 25,
    rightPercent: 15,
    sourceCount: 7,
    source: '일본'
  }
];

export const featuredNews = mockFeaturedNews;
export const topNewsStories = mockNews.slice(0, 6);
export const recentNews = mockNews.slice(6);
