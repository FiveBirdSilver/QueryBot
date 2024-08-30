export const BasicManual =
  '안녕하세요! 저는 GA4 챗봇입니다.\n제가 도와드릴 수 있는 작업을 안내할게요.\n\n어시스턴스를 선택하거나 질문을 통해 질문할 수 있습니다.'

export const DatePickerManual = '데이터 추출을 위한 조회 기간을 선택해주세요.'

export const BigQueryManual = '빅쿼리에 업로드하여 데이터를 조회하시겠습니까? '

export const SelectManual = [
  {
    id: 'qna',
    title: 'QnA Assistant',
    content: 'GA4를 사용하는 방법에 대해 질문해보세요.',
  },
  {
    id: 'query/generate',
    title: 'Query Assistant',
    content:
      'SQL문을 생성하고 BigQuery에서 원하는 데이터를 조회하고차트를 생성합니다.',
  },
  {
    id: 'insight',
    title: 'Insight Assistant',
    content: 'Query를 기반으로 데이터를 분석하고 인사이트를 도출합니다.',
  },
]

export const QnaManual = {
  text: 'QnA Assistant에서는 추천 카테고리를 선택하여 질문을 구체화하거나 채팅을 통해 GA4 관련 내용에 대해 답변할 수 있습니다.',
  category: [
    {
      id: 'getting-started',
      value: '애널리틱스 시작하기',
      text: `애널리틱스 시작하기 카테고리에서는 GA4를 이용하여 웹사이트나 앱의 데이터를 수집하고 분석하는 데 필요한 기본적인 설정 방법에 대한 질문을 처리합니다. 궁금한 사항을 질문하세요.
`,
    },
    {
      id: 'data-collection-management',
      value: '데이터 수집 및 관리하기',
      text: `데이터 수집 및 관리하기 카테고리에서는 주로 “이벤트", “데이터 수집”, 전자상거래 등의 질문을 처리합니다. 궁금한 사항을 질문하세요.`,
    },
    {
      id: 'reporting-exploration',
      value: '보고 및 탐색',
      text: `보고 및 탐색 카테고리에서는 웹사이트 또는 앱에서 수집된 데이터에 대한 다양한 질문을 처리합니다. 궁금한 사항을 질문하세요.`,
    },
    {
      id: 'ads-contribution-analysis',
      value: '광고 및 기여 분석',
      text: '',
    },
    {
      id: 'audience-remarketing',
      value: '잠재고객 및 리마케팅',
      text: `잠재고객 및 리마케팅 카테고리에서는 Google 애널리틱스 4(GA4)를 이용하여 웹사이트나 앱의 사용자를 세분화하고, 이들을 대상으로 맞춤형 마케팅을 진행하기 위한 다양한 기능과 설정 방법에 대한 질문을 처리합니다. 궁금한 사항을 질문하세요.`,
    },
    {
      id: 'account-property-user-management',
      value: '계정, 속성, 사용자 관리하기',
      text: `계정, 속성, 사용자 관리하기 카테고리에서는 Google 애널리틱스 4(GA4) 계정을 처음 설정하거나, 기존 계정을 관리하고, 여러 사용자와 협업하는 방법에 대한 질문을 처리합니다. 궁금한 사항을 질문하세요.`,
    },
  ],
}

export const QueryManual = {
  text: 'Query Assistant에서는 유저가 알고싶어하는 데이터를 조회할 수 있는 sql문을 생성하고 BigQuery를 통해 데이터를 조회 할 수 있는 기능을 제공합니다.',
  category: [
    {
      id: 'customer-acquisition-data',
      value: '고객 유입 데이터',
      text: `고객 유입 데이터 카테고리에서는 사용자가 웹사이트나 애플리케이션에 처음 방문했을 때의 정보에 대한 쿼리를 생성합니다. 주요 지표는 유입 경로, 매체, 캠페인, 소스 등을 포함하며, 이를 통해 사용자가 어떤 경로로 웹사이트에 방문했는지 분석할 수 있습니다.

데이터를 조회할 기간을 선택해주세요.`,
    },
    {
      id: 'conversion-data',
      value: '전환 데이터',
      text: `전환 데이터 카테고리에서는 사용자가 특정 행동을 완료했을 때 수집되는 데이터로, 주요 목표 달성을 측정하는 데 사용할 수 있는 쿼리를 생성합니다. 주요 지표는 구매, 가입, 양식 제출 등 웹사이트 또는 애플리케이션의 목표 행동이 포함됩니다. 전환 데이터를 통해 마케팅 캠페인의 효과를 측정하고, 사용자 경험을 최적화할 수 있습니다.

데이터를 조회할 기간을 선택해주세요.`,
    },
    {
      id: 'revenue-data',
      value: '매출 데이터',
      text: `매출 데이터 카테고리에서는 사용자의 구매 활동과 관련된 모든 데이터로, 상품명, 구매 수량, 가격, 총 매출 등의 데이터를 추출하는 쿼리를 생성합니다. 비즈니스의 수익 성과를 분석하고, 특정 제품의 판매 성과를 평가하며, 재고 관리 및 마케팅 전략을 수립하는 데 사용될 수 있습니다.

데이터를 조회할 기간을 선택해주세요.
`,
    },
    {
      id: 'customer-acquisition',
      value: '고객 획득 데이터',
      text: `
고객 획득 카테고리에서는 새로운 사용자를 웹사이트나 앱으로 유도한 마케팅 노력의 결과를 보여주는 데이터를 추출하는 쿼리를 생성합니다. 이는 신규 사용자 획득에 관한 데이터를 포함하며, 캠페인 효율성을 평가하는 데 사용됩니다.

데이터를 조회할 기간을 선택해주세요.
`,
    },
    {
      id: 'event-data',
      value: '이벤트 데이터',
      text: `이벤트 데이터 카테고리에서는 사용자 행동을 기록하는 모든 이벤트 데이터로 페이지 뷰, 클릭, 스크롤, 동영상 재생 등 다양한 사용자 인터랙션에 대한 데이터를 추출하는 쿼리를 생성합니다.

데이터를 조회할 기간을 선택해주세요.`,
    },
  ],
}

export const InsightManual = {
  text: 'Insight Assistant에서는 Query를 통해 복잡한 분석을 진행하고 결과를 시각화하여 인사이트를 도출합니다.',
  category: [
    {
      id: 'sentiment-analysis',
      value: '감성 분석',
      text: '',
    },
    {
      id: 'time-series-analysis',
      value: '시계열 분석',
      text: '',
    },
    {
      id: 'hypothesis-testing',
      value: '가설 검증',
      text: '',
    },
    {
      id: 'impact-analysis',
      value: '임팩트 분석',
      text: '',
    },
    {
      id: 'model-recommendation',
      value: '분석 모델 추천',
      text: '',
    },
  ],
}
