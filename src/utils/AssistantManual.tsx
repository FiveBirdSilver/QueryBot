export const BasicManual =
  "안녕하세요! 저는 GA4 챗봇입니다.\n제가 도와드릴 수 있는 작업을 안내할게요.\n\n어시스턴스를 선택하거나 질문을 통해 질문할 수 있습니다.";

export const SelectManual = [
  { id: "qna", title: "QnA Assistant", content: "GA4를 사용하는 방법에 대해 질문해보세요." },
  {
    id: "query",
    title: "Query Assistant",
    content: "SQL문을 생성하고 BigQuery에서 원하는 데이터를 조회하고차트를 생성합니다.",
  },
  { id: "insight", title: "Insight Assistant", content: "Query를 기반으로 데이터를 분석하고 인사이트를 도출합니다." },
];

export const QnaManual = {
  text: "QnA Assistant에서는 추천 카테고리를 선택하여 질문을 구체화하거나 채팅을 통해 GA4 관련 내용에 대해 답변할 수 있습니다.",
  category: [
    "애널리틱스 시작하기",
    "데이터 수집 및 관리하기",
    "보고 및 탐색",
    "광고 및 기여 분석",
    "잠재고객 및 리마케팅",
    "계정, 속성, 사용자 관리하기",
    "Google 애널리틱스 360",
  ],
};

export const QueryManual = {
  text: "Query Assistant에서는 유저가 알고싶어하는 데이터를 조회할 수 있는 sql문을 생성하고 BigQuery를 통해 데이터를 조회 할수 있는 기능을 제공합니다.",
  category: ["고객 유입 데이터", "전환 데이터", "매출 데이터", "고객 획득", "이벤트 데이터"],
};

export const InsightManual = {
  text: "Insight Assistant에서는 Query를 통해 복잡한 분석을 진행하고 결과를 시각화하여 인사이트를 도출합니다.",
  category: ["감성 분석", "시계열 분석", "가설 검증", "임팩트 분석", "분석 모델 추천"],
};
