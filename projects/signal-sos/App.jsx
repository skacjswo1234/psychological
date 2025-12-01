import React, { useState, useEffect } from 'react';
import {
  ArrowRight, ArrowLeft, Activity, Brain, Zap, Radio,
  CheckCircle, Shield, AlertTriangle, TrendingUp,
  BarChart2, Share2, FileText, Siren,
  Scan, User
} from 'lucide-react';
import './index.css';

// --- [DATA] ---
const LOGIC_DATA = [
  {
    icon: <Brain className="text-cyan-400" />,
    title: '36가지 행동 데이터',
    desc: '표정, 습관 등 36개 무의식 데이터를 스캐닝하여 근본 원인을 찾습니다.',
  },
  {
    icon: <Radio className="text-purple-400" />,
    title: '주파수 패턴 해독',
    desc: '단순한 반항이 아닌, 내면 에너지의 불균형을 파동 패턴으로 해독합니다.',
  },
  {
    icon: <TrendingUp className="text-emerald-400" />,
    title: '3년 후 미래 예측',
    desc: '현재의 시그널을 방치했을 때와 조율했을 때, 3년 뒤 달라질 아이의 미래를 시뮬레이션합니다.',
  },
];

// --- 36개 질문 배열 ---
const QUESTIONS = [
  // PART 1. 인지 및 반응 (Q1~Q6) - DATA-01~06
  {
    id: 1,
    cat: '인지 및 반응 (DATA-01)',
    q: '아이의 이름을 불렀을 때 첫 반응은?',
    ops: [
      { type: 'C', t: '지연 (Latency)', d: '한참 뒤에 멍하니 쳐다본다. ' },
      { type: 'E', t: '과잉 (Overreact)', d: '"아 왜요!"라며 날카롭게 대꾸한다. ' },
      { type: 'P', t: '회피 (Avoidance)', d: '눈을 마주치지 않고 기어들어가는 목소리를 낸다. ' },
      { type: 'S', t: '정상 (Normal)', d: '하던 일을 멈추고 즉시 대답한다. ' },
    ],
  },
  {
    id: 2,
    cat: '인지 및 반응',
    code: 'DATA-02',
    q: '대화 중 아이의 시선 처리는?',
    ops: [
      { type: 'C', t: '초점 없음', d: '초점이 없이 허공을 응시한다.' },
      { type: 'E', t: '강한 고정', d: '노려보거나 시선을 강하게 고정한다.' },
      { type: 'P', t: '회피/회피', d: '바닥을 보거나 시선을 계속 피한다.' },
      { type: 'S', t: '편안한 교감', d: '말하는 사람의 눈을 편안하게 맞춘다.' },
    ],
  },
  {
    id: 3,
    cat: '인지 및 반응',
    code: 'DATA-03',
    q: '지시 사항(심부름 등)을 전달했을 때?',
    ops: [
      { type: 'C', t: '기억 상실', d: '"네"하고 바로 잊어버린다.' },
      { type: 'E', t: '불복종', d: '"내가 왜 해야 하냐"며 따진다.' },
      { type: 'P', t: '느린 움직임', d: '억지로 몸을 일으키지만 매우 느리다.' },
      { type: 'S', t: '즉시 실행', d: '내용을 확인하고 바로 실행한다.' },
    ],
  },
  {
    id: 4,
    cat: '인지 및 반응',
    code: 'DATA-04',
    q: '질문을 했을 때 대답하는 속도는?',
    ops: [
      { type: 'C', t: '동문서답/지연', d: '동문서답하거나 한참 생각한다.' },
      { type: 'E', t: '말 자름', d: '질문이 끝나기도 전에 말을 자른다.' },
      { type: 'P', t: '응답 회피', d: '"몰라요"라며 대답을 회피한다.' },
      { type: 'S', t: '경청 후 응답', d: '질문을 끝까지 듣고 대답한다.' },
    ],
  },
  {
    id: 5,
    cat: '인지 및 반응',
    code: 'DATA-05',
    q: '예상치 못한 상황(실수 등)에서의 반응은?',
    ops: [
      { type: 'C', t: '정지', d: '아무 반응 없이 굳어 버린다.' },
      { type: 'E', t: '책임 전가', d: '남 탓을 하거나 물건을 걷어찬다.' },
      { type: 'P', t: '과도한 위축', d: '"죄송해요"라며 과하게 위축된다.' },
      { type: 'S', t: '문제 수습', d: '실수를 인정하고 수습하려 한다.' },
    ],
  },
  {
    id: 6,
    cat: '인지 및 반응',
    code: 'DATA-06',
    q: '흥미 없는 주제에 대한 태도는?',
    ops: [
      { type: 'C', t: '수신 차단', d: '아예 듣지 않고 딴짓을 한다.' },
      { type: 'E', t: '산만함', d: '지루함을 참지 못하고 몸을 비튼다.' },
      { type: 'P', t: '영혼 없음', d: '듣는 척하지만 영혼이 없다.' },
      { type: 'S', t: '최소 경청', d: '최소한의 경청하는 태도를 보인다.' },
    ],
  },

  // PART 2. 생활 습관 및 루틴 (Q7~Q12) - DATA-07~12
  {
    id: 7,
    cat: '생활 습관',
    code: 'DATA-07',
    q: '아침 기상 시 모습은?',
    ops: [
      { type: 'C', t: '현실 파악 지연', d: '깨워도 비몽사몽하며 현실 파악이 느리다. ' },
      { type: 'E', t: '소리 지름', d: '짜증을 내거나 소리를 지르며 일어난다. ' },
      { type: 'P', t: '기동 불가', d: '일어나기 힘들어하며 몸이 천근만근이다. ' },
      { type: 'S', t: '정시 기상', d: '알람 소리나 부모의 소리에 바로 일어난다. ' },
    ],
  },
  {
    id: 8,
    cat: '생활 습관',
    code: 'DATA-08',
    q: '등교/외출 준비 패턴은?',
    ops: [
      { type: 'C', t: '입력 오류', d: '꼭 하나씩 빠뜨리거나 가방을 두고 간다. ' },
      { type: 'E', t: '분노 충돌', d: '물건이 안 보이면 화를 내고 뒤집어엎는다. ' },
      { type: 'P', t: '수동 대기', d: '부모가 챙겨줄 때까지 가만히 있는다. ' },
      { type: 'S', t: '자기 주도', d: '미리 챙겨둔 것을 가지고 나간다. ' },
    ],
  },
  {
    id: 9,
    cat: '생활 습관',
    code: 'DATA-09',
    q: '식사 태도 및 식욕은?',
    ops: [
      { type: 'C', t: '비효율적', d: '밥을 입에 물고 있거나 세월아 네월아 먹는다.' },
      { type: 'E', t: '충동적 폭식', d: '폭식하거나 반찬 투정이 심하다.' },
      { type: 'P', t: '식욕 부진', d: '입맛이 없다며 깨작거린다.' },
      { type: 'S', t: '규칙적 섭취', d: '규칙적으로 적당량을 먹는다.' },
    ],
  },
  {
    id: 10,
    cat: '생활 습관',
    code: 'DATA-10',
    q: '귀가 후 첫 행동은?',
    ops: [
      { type: 'C', t: '로그아웃', d: '인사도 없이 방으로 들어가 문을 닫는다.' },
      { type: 'E', t: '에너지 방출', d: '가방을 던지거나 신발을 험하게 벗는다.' },
      { type: 'P', t: '쓰러짐', d: '현관이나 소파에 쓰러지듯 눕는다.' },
      { type: 'S', t: '루틴 실행', d: '다녀왔다고 인사하고 손을 씻는다.' },
    ],
  },
  {
    id: 11,
    cat: '생활 습관',
    code: 'DATA-11',
    q: '숙제나 할 일을 시작할 때?',
    ops: [
      { type: 'C', t: '시간 낭비', d: '멍하니 책상에 앉아 시간만 보낸다.' },
      { type: 'E', t: '불만 표출', d: '하기 싫다고 불평하며 시작을 미룬다.' },
      { type: 'P', t: '포기', d: '시작도 하기 전에 "못하겠어요"라며 한숨 쉰다.' },
      { type: 'S', t: '정시 시작', d: '정해진 시간에 책상에 앉는다.' },
    ],
  },
  {
    id: 12,
    cat: '생활 습관',
    code: 'DATA-12',
    q: '수면 패턴은?',
    ops: [
      { type: 'C', t: '몽롱함', d: '자다 깨다를 반복하거나 꿈을 많이 꾼다.' },
      { type: 'E', t: '불면', d: '밤늦게까지 안 자고 돌아다닌다.' },
      { type: 'P', t: '과수면', d: '주말에 하루 종일 자거나 계속 누워있다.' },
      { type: 'S', t: '안정적', d: '일정한 시간에 자고 깬다.' },
    ],
  },

  // PART 3. 정서 및 감정 (Q13~Q18) - DATA-13~18
  {
    id: 13,
    cat: '정서 및 감정',
    code: 'DATA-13',
    q: '평소 가장 자주 짓는 표정은?',
    ops: [
      { type: 'C', t: '무표정', d: '무표정하거나 멍한 표정.' },
      { type: 'E', t: '불만', d: '미간을 찌푸리거나 불만 가득한 표정.' },
      { type: 'P', t: '걱정', d: '슬프거나 걱정스러운 표정.' },
      { type: 'S', t: '안정', d: '편안하고 안정된 표정.' },
    ],
  },
  {
    id: 14,
    cat: '정서 및 감정',
    code: 'DATA-14',
    q: '화가 났을 때 표현 방식은?',
    ops: [
      { type: 'C', t: '침묵', d: '입을 닫고 투명 인간 취급한다.' },
      { type: 'E', t: '파괴적', d: '소리를 지르거나 물건을 던진다.' },
      { type: 'P', t: '내적 표출', d: '혼자 방에 들어가 울거나 자책한다.' },
      { type: 'S', t: '언어적 해소', d: '화난 이유를 말로 표현한다.' },
    ],
  },
  {
    id: 15,
    cat: '정서 및 감정',
    code: 'DATA-15',
    q: '즐거움이나 기쁨의 표현은?',
    ops: [
      { type: 'C', t: '반응 없음', d: '반응이 없거나 시큰둥하다.' },
      { type: 'E', t: '과잉 흥분', d: '과하게 흥분하거나 오버 액션을 한다.' },
      { type: 'P', t: '단기 기쁨', d: '웃음이 짧고 금세 어두워진다.' },
      { type: 'S', t: '균형', d: '밝게 웃으며 감정을 공유한다.' },
    ],
  },
  {
    id: 16,
    cat: '정서 및 감정',
    code: 'DATA-16',
    q: '스트레스 상황에서의 말버릇은?',
    ops: [
      { type: 'C', t: '회피', d: '"몰라요", "상관없어요."' },
      { type: 'E', t: '극단적', d: '"아 짜증 나", "망했어."' },
      { type: 'P', t: '자책', d: '"전 안 돼요", "힘들어요."' },
      { type: 'S', t: '해결 지향', d: '"어떻게 하죠?", "도와주세요."' },
    ],
  },
  {
    id: 17,
    cat: '정서 및 감정',
    code: 'DATA-17',
    q: '감정 기복의 정도는?',
    ops: [
      { type: 'C', t: '평타 유지', d: '감정 변화를 알 수 없을 만큼 평타다.' },
      { type: 'E', t: '롤러코스터', d: '천국과 지옥을 오가듯 롤러코스터를 탄다.' },
      { type: 'P', t: '만성적 우울', d: '항상 가라앉아 있고 우울해 보인다.' },
      { type: 'S', t: '빠른 회복', d: '기복이 있으나 금방 평정심을 찾는다.' },
    ],
  },
  {
    id: 18,
    cat: '정서 및 감정',
    code: 'DATA-18',
    q: '칭찬을 들었을 때 반응은?',
    ops: [
      { type: 'C', t: '무시', d: '못 들은 척하거나 무시한다.' },
      { type: 'E', t: '거만', d: '"당연하죠"라며 거만하거나 비꼰다.' },
      { type: 'P', t: '부정', d: '"아니에요"라며 과하게 부정한다.' },
      { type: 'S', t: '긍정 수용', d: '"감사합니다"라고 웃으며 받는다.' },
    ],
  },

  // PART 4. 신체화 증상 및 에너지 (Q19~Q24) - DATA-19~24
  {
    id: 19,
    cat: '신체화 및 에너지',
    code: 'DATA-19',
    q: '이유 없는 신체 통증은?',
    ops: [
      { type: 'C', t: '멍함', d: '어지러움이나 멍함을 호소한다.' },
      { type: 'E', t: '열감/답답함', d: '열이 나거나 가슴이 답답하다고 한다.' },
      { type: 'P', t: '두통/복통', d: '배가 아프거나 머리가 아프다고 한다.' },
      { type: 'S', t: '통증 없음', d: '특별히 아픈 곳이 없다.' },
    ],
  },
  {
    id: 20,
    cat: '신체화 및 에너지',
    code: 'DATA-20',
    q: '평소 자세는?',
    ops: [
      { type: 'C', t: '흐트러짐', d: '흐트러지거나 구부정한 자세.' },
      { type: 'E', t: '산만', d: '산만하게 계속 움직이는 자세.' },
      { type: 'P', t: '기대기', d: '축 쳐져서 기대거나 엎드린 자세.' },
      { type: 'S', t: '바름', d: '비교적 바른 자세 유지.' },
    ],
  },
  {
    id: 21,
    cat: '신체화 및 에너지',
    code: 'DATA-21',
    q: '손이나 다리의 움직임은?',
    ops: [
      { type: 'C', t: '반복 습관', d: '손톱을 뜯거나 머리카락을 꼰다.' },
      { type: 'E', t: '떨림/진동', d: '다리를 심하게 떨거나 볼펜을 딱딱거린다.' },
      { type: 'P', t: '정적', d: '움직임이 거의 없고 정적이다.' },
      { type: 'S', t: '자제', d: '불필요한 움직임이 적다.' },
    ],
  },
  {
    id: 22,
    cat: '신체화 및 에너지',
    code: 'DATA-22',
    q: '눈빛의 상태는?',
    ops: [
      { type: 'C', t: '흐림/탁함', d: '초점이 흐리고 탁하다.' },
      { type: 'E', t: '날카로움', d: '눈에 핏발이 서거나 날카롭다.' },
      { type: 'P', t: '무기력', d: '눈에 힘이 없고 졸려 보인다.' },
      { type: 'S', t: '또렷함', d: '눈동자가 맑고 또렷하다.' },
    ],
  },
  {
    id: 23,
    cat: '신체화 및 에너지',
    code: 'Q23/B',
    q: '활동량(에너지) 수준은?',
    ops: [
      { type: 'C', t: '귀찮음', d: '움직이는 것을 귀찮아한다.' },
      { type: 'E', t: '과잉 활동', d: '잠시도 가만히 있지 못한다.' },
      { type: 'P', t: '빠른 지침', d: '금방 지치고 힘들어한다.' },
      { type: 'S', t: '균형', d: '적당히 활동하고 쉴 줄 안다.' },
    ],
  },
  {
    id: 24,
    cat: '신체화 및 에너지',
    code: 'Q24/B',
    q: '목소리 톤과 크기는?',
    ops: [
      { type: 'C', t: '웅얼거림', d: '웅얼거리거나 발음이 부정확하다.' },
      { type: 'E', t: '고음/고성', d: '목소리가 크고 톤이 높다.' },
      { type: 'P', t: '작음', d: '기어들어가서 잘 안 들린다.' },
      { type: 'S', t: '적절함', d: '상황에 맞는 적절한 톤이다.' },
    ],
  },

  // PART 5. 사회성 및 관계 (Q25~Q30) - DATA-25~30
  {
    id: 25,
    cat: '사회성 및 관계',
    code: 'DATA-25',
    q: '친구들과 있을 때 모습은?',
    ops: [
      { type: 'C', t: '고립', d: '무리에 섞이지 않고 혼자 겉돈다.' },
      { type: 'E', t: '지배', d: '친구들을 주도하거나 명령하려 한다.' },
      { type: 'P', t: '종속', d: '친구들 눈치를 보며 끌려다닌다.' },
      { type: 'S', t: '대등', d: '친구들과 대등하게 어울린다.' },
    ],
  },
  {
    id: 26,
    cat: '사회성 및 관계',
    code: 'DATA-26',
    q: '갈등 상황 해결 방식은?',
    ops: [
      { type: 'C', t: '회피', d: '상황을 회피하고 도망간다.' },
      { type: 'E', t: '물리적 충돌', d: '말싸움이나 몸싸움으로 번진다.' },
      { type: 'P', t: '무조건 사과', d: '무조건 사과하고 덮으려 한다.' },
      { type: 'S', t: '대화/중재', d: '대화로 풀거나 선생님께 알린다.' },
    ],
  },
  {
    id: 27,
    cat: '사회성 및 관계',
    code: 'DATA-27',
    q: '새로운 환경(새 학기 등)에서의 적응은?',
    ops: [
      { type: 'C', t: '낯설음', d: '낯설어하며 적응에 시간이 오래 걸린다.' },
      { type: 'E', t: '관심 유도', d: '과하게 나서거나 관심을 끌려 한다.' },
      { type: 'P', t: '등교 거부', d: '불안해하며 등교를 거부하려 한다.' },
      { type: 'S', t: '빠른 적응', d: '며칠 내로 적응하고 친구를 사귄다.' },
    ],
  },
  {
    id: 28,
    cat: '사회성 및 관계',
    code: 'DATA-28',
    q: '수업 시간 발표 태도는?',
    ops: [
      { type: 'C', t: '묵묵부답', d: '시켜도 묵묵부답이다.' },
      { type: 'E', t: '과잉 발표', d: '시키지 않아도 나서서 떠든다.' },
      { type: 'P', t: '떨림/긴장', d: '얼굴이 빨개지고 목소리가 떨린다.' },
      { type: 'S', t: '적절한 발표', d: '지명받으면 일어나서 발표한다.' },
    ],
  },
  {
    id: 29,
    cat: '사회성 및 관계',
    code: 'DATA-29',
    q: '공감 능력은?',
    ops: [
      { type: 'C', t: '무관심', d: '타인의 감정에 무관심하다.' },
      { type: 'E', t: '자기 우선', d: '내 감정이 우선이라 남을 배려하지 않는다.' },
      { type: 'P', t: '과잉 이입', d: '타인의 감정에 과하게 이입해 힘들어한다.' },
      { type: 'S', t: '균형 잡힌 공감', d: '친구의 기쁨과 슬픔을 적절히 공감한다.' },
    ],
  },
  {
    id: 30,
    cat: '사회성 및 관계',
    code: 'DATA-30',
    q: '규칙 준수 여부는?',
    ops: [
      { type: 'C', t: '무지', d: '규칙을 몰라서 어긴다.' },
      { type: 'E', t: '저항', d: '규칙이 마음에 안 든다며 어긴다.' },
      { type: 'P', t: '공포', d: '혼날까 봐 무서워서 지킨다.' },
      { type: 'S', t: '자발적 준수', d: '약속된 규칙을 잘 지킨다.' },
    ],
  },

  // PART 6. 디지털 및 몰입 (Q31~Q36) - DATA-31~36
  {
    id: 31,
    cat: '디지털 및 몰입',
    code: 'DATA-31',
    q: '스마트폰 사용 시간은?',
    ops: [
      { type: 'C', t: '현실 도피', d: '하루 종일 손에서 놓지 않는다.' },
      { type: 'E', t: '충동적 사용', d: '게임에서 지면 소리를 지르며 한다.' },
      { type: 'P', t: '비교 집착', d: 'SNS를 보며 남들과 비교하느라 바쁘다.' },
      { type: 'S', t: '시간 관리', d: '정해진 시간만큼 사용한다.' },
    ],
  },
  {
    id: 32,
    cat: '디지털 및 몰입',
    code: 'DATA-32',
    q: '기기를 뺏거나 제지했을 때?',
    ops: [
      { type: 'C', t: '차단', d: '못 들은 척 계속하거나 멍하니 있는다.' },
      { type: 'E', t: '폭력적 저항', d: '욕을 하거나 폭력적으로 변한다.' },
      { type: 'P', t: '금단 현상', d: '울거나 안절부절못한다.' },
      { type: 'S', t: '수용', d: '아쉽지만 그만두고 반납한다.' },
    ],
  },
  {
    id: 33,
    cat: '디지털 및 몰입',
    code: 'DATA-33',
    q: '좋아하는 것에 대한 집중력은?',
    ops: [
      { type: 'C', t: '쉽게 싫증', d: '좋아하는 것에도 금방 싫증을 낸다.' },
      { type: 'E', t: '과몰입', d: '한 가지에 미친 듯이 파고든다.' },
      { type: 'P', t: '흥미 상실', d: '좋아하는 게 뭔지 모른다.' },
      { type: 'S', t: '꾸준한 몰입', d: '꾸준히 즐기며 몰입한다.' },
    ],
  },
  {
    id: 34,
    cat: '디지털 및 몰입',
    code: 'Q34/D',
    q: '멍하니 있는 시간(Screen Time 제외)은?',
    ops: [
      { type: 'C', t: '대부분 멍함', d: '하루의 대부분을 멍하게 보낸다.' },
      { type: 'E', t: '자극 추구', d: '멍할 틈 없이 계속 자극을 찾는다.' },
      { type: 'P', t: '걱정 과부하', d: '걱정하느라 멍할 틈이 없다.' },
      { type: 'S', t: '휴식', d: '가끔 휴식 차원에서 멍때린다.' },
    ],
  },
  {
    id: 35,
    cat: '디지털 및 몰입',
    code: 'Q35/D',
    q: '가상 세계와 현실의 구분은?',
    ops: [
      { type: 'C', t: '현실 도피', d: '현실보다 가상 세계를 더 편안해한다.' },
      { type: 'E', t: '스트레스 해소', d: '현실의 스트레스를 게임에서 푼다.' },
      { type: 'P', t: '평가 집착', d: '온라인상에서의 평가에 집착한다.' },
      { type: 'S', t: '구분 명확', d: '가상은 가상일 뿐, 현실 생활을 즐긴다.' },
    ],
  },
  {
    id: 36,
    cat: '디지털 및 몰입',
    code: 'Q36/D',
    q: '무언가를 만들거나 창작할 때?',
    ops: [
      { type: 'C', t: '회피', d: '귀찮아서 시작도 안 한다.' },
      { type: 'E', t: '기발함', d: '엉뚱하고 기발한 것을 만든다.' },
      { type: 'P', t: '모방', d: '남들이 만든 것을 따라 한다.' },
      { type: 'S', t: '차근차근', d: '매뉴얼대로 차근차근 만든다.' },
    ],
  },
];

// 결과 데이터 (전문가 수준 텍스트 적용)
const RESULT_DATA = {
  TYPE_C: {
    code: 'TYPE C',
    name: '신호 혼선형',
    color: 'from-gray-400 via-slate-500 to-zinc-600',
    shadow: 'shadow-slate-500/50',
    icon: <Radio size={60} className="text-white" />,
    keyword: '#과부하 #정보처리장애 #주의력저하',
    desc: ' 안테나 고장 신호! 너무 많은 정보 때문에 뇌 회로가 과부하 걸린 상태입니다.',
    detail:
      "아이의 뇌 회로는 **외부 자극 수용 용량(Input Capacity)**을 초과했습니다. 스스로를 보호하기 위해 '수신 차단(Shut down)' 메커니즘을 가동 중이며, 멍 때리기, 느린 반응, 건망증은  **과부하된 뇌가 보내는 긴급 재부팅 신호**입니다. 아이는 내면의 혼란을 언어화하지 못하고 있습니다.",
    risk: {
      title: '방치 시 위험 시나리오 (3년 후)',
      text: '학습된 무기력과 현실 도피로 이어져, 사회적 관계망을 잃고 은둔형 외톨이가 될 확률이 높습니다. 뇌가 복잡한 인지 활동을 회피하면서 학업 성취도는 장기간 정체됩니다.',
    },
    growth: {
      title: '조율 시 성장 시나리오 (3년 후)',
      text: '정보의 홍수 속에서 본질을 꿰뚫어 보는 깊은 사고력을 가진 연구자, 기획자, 프로그래머로 성장합니다. 한 분야에 몰입하면 뛰어난 집중력을 발휘하는 잠재력이 있습니다. ',
    },
    guide: {
      do: "정보 다이어트: 지시는 '한 번에 하나씩, 시각적으로' 전달하고 침묵 시간을 보장해야 합니다.",
      dont: "다그치거나 '느림'을 비난하는 것은 뇌 회로에 대한 공격입니다.",
      key: '디지털 디톡스, 명확한 루틴 제공, 멍때리는 시간 보장 (20분 이상)',
    },
  },

  TYPE_E: {
    code: 'TYPE E',
    name: '파동 급류형',
    color: 'from-red-500 via-orange-500 to-yellow-500',
    shadow: 'shadow-orange-500/50',
    icon: <Siren size={60} className="text-white" />,
    keyword: '#분노폭발 #충동 #에너지과잉 #자기제어상실',
    desc: ' 에너지 폭주! 감당할 수 없는 거대한 에너지 파도에 휩쓸려 두려워하는 중입니다.',
    detail:
      '아이 내면의 에너지가 댐을 넘어설 정도로 차올랐습니다. 뇌의 **편도체(Amygdala)**는 과민하게 작동하는 반면, **전두엽(Prefrontal Cortex)**의 충동 제어 기능이 일시적으로 마비된 상태입니다. 감정의 폭발은 의도가 아니라, 에너지를 외부로 내보내지 않으면 스스로 견딜 수 없는 고통이기 때문입니다.',
    risk: {
      title: '방치 시 위험 시나리오 (3년 후)',
      text: '충동 조절 장애나 반사회적 행동 패턴으로 고착되어, 학교 생활 부적응 및 대인관계 파탄이 우려됩니다.',
    },
    growth: {
      title: '조율 시 성장 시나리오 (3년 후)',
      text: '열정적이고 카리스마 있는 리더, 혁신가로 성장합니다. 넘치는 에너지를 스포츠나 예술로 승화시킵니다. ',
    },
    guide: {
      do: '에너지 방류 채널 확보: 파도가 지나갈 때까지 기다리고, 물리적 거리를 두세요.',
      dont: '같이 화를 내며 맞부딪히지 마세요 (에너지 증폭 금지).',
      key: '고강도 운동(복싱, 달리기), 드럼 연주',
    },
  },

  TYPE_P: {
    code: 'TYPE P',
    name: '에너지 누수형',
    color: 'from-blue-400 via-cyan-500 to-teal-500',
    shadow: 'shadow-cyan-500/50',
    icon: <AlertTriangle size={60} className="text-white" />,
    keyword: '#불안 #신체화 #방전 #자기효능감결여',
    desc: ' 배터리 5%! 마음의 그릇에 구멍이 나 에너지가 줄줄 새고 있다는 몸의 비명입니다.',
    detail:
      '아이의 **자율신경계**는 만성적인 긴장 상태에 놓여 있습니다. 무의식은 이 고통을 해결할 수 없을 때, 에너지를 고갈시키고 **통증(복통, 두통)**으로 바꿔 몸을 강제로 멈춥니다. 꾀병이 아니라 **\'정신적 고통의 신체화\'** 현상입니다.',
    risk: {
      title: '방치 시 위험 시나리오 (3년 후)',
      text: '만성 우울증이나 불안 장애, 신체화 장애로 이어져 정상적인 등교나 사회 생활이 불가능해질 수 있습니다.',
    },
    growth: {
      title: '조율 시 성장 시나리오 (3년 후)',
      text: '타인의 아픔을 깊이 이해하는 섬세한 상담가나 예술가로 성장합니다. 사람과 마음을 다루는 분야에서 독보적인 힘을 발휘합니다. ',
    },
    guide: {
      do: '안정 기지 제공: 작은 성취에도 10배로 칭찬하고 무조건적인 신뢰를 보여주세요.',
      dont: "남들과 비교하거나 '나약하다'고 비난하지 마세요.",
      key: '따뜻한 목욕, 수면 시간 확보, 스킨십',
    },
  },

  TYPE_S: {
    code: 'TYPE S',
    name: '신호 공명형',
    color: 'from-green-400 via-emerald-500 to-lime-500',
    shadow: 'shadow-emerald-500/50',
    icon: <CheckCircle size={60} className="text-white" />,
    keyword: '#안정 #조화 #성장 #자기주도',
    desc: ' 수신 양호! 내면과 외면이 조화롭게 공명하고 있습니다.',
    detail:
      '현재 아이는 안정적인 정서 상태를 유지하고 있습니다. **좌뇌와 우뇌가 균형**을 이루어 문제 해결 능력과 회복 탄력성이 높습니다. 지금의 긍정적인 환경을 유지해주면 아이는 스스로 길을 찾아갈 것입니다.',
    risk: {
      title: '주의해야 할 점',
      text: '너무 믿고 방임하면 숨겨진 고민을 놓칠 수 있습니다. 겉으로는 안정적이어도 완벽주의적 압박감을 느낄 수 있으니, 주기적인 대화가 필요합니다.',
    },
    growth: {
      title: '예상 성장 시나리오 (3년 후)',
      text: '자기 주도적인 학습자이자, 주변에 긍정적인 영향을 주는 리더로 성장합니다. 사회의 건강한 시스템을 구축하는 인재가 됩니다. ',
    },
    guide: {
      do: '자율성 부여: 지금처럼 믿고 지지해 주십시오.',
      dont: '과도한 욕심이나 부모의 기대를 투영하여 아이의 페이스를 망치지 마세요.',
      key: '가족 여행, 취미 생활 공유',
    },
  },
};

// --- [HELPER] Radar Chart ---
const RadarChart = ({ scores }) => {
  const data = [
    { label: '혼선(C)', val: scores.C, c: 'text-gray-400', bar: 'bg-gray-500' },
    { label: '급류(E)', val: scores.E, c: 'text-red-400', bar: 'bg-red-500' },
    { label: '누수(P)', val: scores.P, c: 'text-cyan-400', bar: 'bg-cyan-500' },
    { label: '안정(S)', val: scores.S, c: 'text-green-400', bar: 'bg-green-500' },
  ];

  return (
    <div className="w-full space-y-3 mt-4">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className={`text-xs font-bold w-12 ${d.c}`}>{d.label}</span>
          <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${d.bar} transition-all duration-1000`}
              style={{ width: `${(d.val / 90) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 w-6 text-right">{d.val}</span>
        </div>
      ))}
    </div>
  );
};

// --- [COMPONENT] Main App ---
export default function SosSignalScanner() {
  const [phase, setPhase] = useState(0);
  const [targetName, setTargetName] = useState('');
  const [scores, setScores] = useState({ C: 0, E: 0, P: 0, S: 0 });
  const [finalType, setFinalType] = useState(null);

  const calculateResult = () => {
    const maxScore = Math.max(scores.C, scores.E, scores.P, scores.S);
    if (scores.C === maxScore) return 'TYPE_C';
    if (scores.E === maxScore) return 'TYPE_E';
    if (scores.P === maxScore) return 'TYPE_P';
    return 'TYPE_S';
  };

  const handleNext = (type) => {
    if (type) {
      setScores((prev) => ({ ...prev, [type]: prev[type] + 10 }));
    }
    if (phase < QUESTIONS.length) {
      setPhase((prev) => prev + 1);
    } else {
      setFinalType(calculateResult());
      setPhase(99);
    }
  };

  const handlePrev = () => {
    if (phase > 1) setPhase((prev) => prev - 1);
    else if (phase === 1) setPhase(0);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black"></div>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20"></div>
      </div>

      <header className="fixed top-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <Activity className="text-cyan-400 animate-pulse" size={20} />
          <span className="font-bold tracking-widest text-lg font-mono">
            SOS SIGNAL SCANNER <span className="text-xs text-cyan-500 align-top">STUDENT SOS</span>
          </span>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 pt-24 pb-12 flex flex-col items-center min-h-screen justify-center">
        {phase === 0 && <HeroSection onStart={() => setPhase(1)} />}
        {phase === 1 && (
          <InputSection name={targetName} setName={setTargetName} onNext={() => setPhase(2)} />
        )}
        {phase >= 2 && phase <= 1 + QUESTIONS.length && (
          <QuestionSection
            qIdx={phase - 2}
            onNext={handleNext}
            total={QUESTIONS.length}
            onPrev={handlePrev}
          />
        )}
        {phase === 99 && <LoadingSection onComplete={() => setPhase(100)} />}
        {phase === 100 && finalType && (
          <ResultReport
            typeKey={finalType}
            name={targetName}
            scores={scores}
            onRestart={() => window.location.reload()}
          />
        )}
      </main>
    </div>
  );
}

// 1. Hero
function HeroSection({ onStart }) {
  return (
    <div className="w-full max-w-4xl animate-fade-in flex flex-col items-center">
      <div className="relative w-80 h-80 flex items-center justify-center mb-8">
        <div className="absolute inset-0 border border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-8 border border-cyan-500/10 rounded-full"></div>
        <div className="absolute inset-0 border-t border-cyan-500/50 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute w-full h-full rounded-full animate-[spin_3s_linear_infinite] origin-center bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.1)_60deg,rgba(6,182,212,0.5)_90deg,transparent_90deg)]"></div>
        <div className="relative z-10 w-40 h-40 bg-black/50 backdrop-blur-md rounded-full border border-cyan-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <Siren size={64} className="text-cyan-400 animate-pulse" />
        </div>
        <div className="absolute top-10 left-20 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-16 right-12 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="text-center space-y-6 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest animate-pulse">
          <AlertTriangle size={12} /> SOS SIGNAL SCANNER v2.0
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white tracking-tight">
          SOS 시그널 스캐너
        </h1>

        <p className="text-gray-400 text-lg font-light leading-relaxed">
          "선생님, 우리 아이가 이상해요..."
          <br />
          그저 사춘기인 줄 알았습니다. 행동은 빙산의 일각입니다.
          <br />
          <strong className="text-cyan-400">무의식 행동 데이터 36가지</strong>를 분석하여
          <br />
          아이의 SOS 신호를 지금 바로 해석하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10">
        {LOGIC_DATA.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="p-3 bg-black/50 rounded-xl border border-white/10 mb-4 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full md:w-auto px-12 py-5 mt-10 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full font-bold text-white text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(8,145,178,0.4)] flex items-center justify-center gap-3"
      >
        <Scan size={24} /> 36가지 데이터 SOS 스캔 시작
      </button>
    </div>
  );
}

// 2. Input
function InputSection({ name, setName, onNext }) {
  return (
    <div className="w-full max-w-md animate-fade-in bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
      <div className="text-cyan-500 font-mono text-xs mb-6 tracking-widest flex items-center gap-2">
        <User size={14} /> TARGET IDENTIFICATION
      </div>
      <h2 className="text-2xl font-bold mb-2">분석 대상 등록</h2>
      <p className="text-gray-400 text-sm mb-8">관찰하고 있는 학생(자녀)의 이름을 입력하세요.</p>
      <div className="space-y-4">
        <label className="text-xs text-gray-500 block mb-1 font-bold">STUDENT NAME</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black/50 border border-gray-600 rounded-xl p-4 text-white focus:border-cyan-500 outline-none text-lg transition-all focus:ring-1 focus:ring-cyan-500"
          placeholder="예: 김철수"
        />
      </div>
      <button
        onClick={onNext}
        disabled={!name}
        className="w-full mt-8 py-4 rounded-xl bg-gray-800 font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 transition-all text-white border border-white/10"
      >
        SOS 스캔 시작
      </button>
    </div>
  );
}

// 3. Question
function QuestionSection({ qIdx, onNext, total, onPrev }) {
  const q = QUESTIONS[qIdx];
  const progress = ((qIdx + 1) / total) * 100;

  return (
    <div className="w-full max-w-xl animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between text-xs font-mono text-cyan-500 mb-2">
          <span>CASE FILE: Q{String(qIdx + 1).padStart(2, '0')}/Q{total}</span>
          <span>{Math.round(progress)}% ANALYZED</span>
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-400 text-sm font-bold tracking-wider">{q.cat}</span>
          <span className="text-xs text-gray-600 font-mono border border-gray-700 px-2 py-0.5 rounded">
            {q.code}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold leading-snug break-keep">{q.q}</h2>
      </div>

      <div className="space-y-3">
        {q.ops.map((op, i) => (
          <button
            key={i}
            onClick={() => onNext(op.type)}
            className="w-full text-left p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500 transition-all group relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                {op.t}
              </div>
              <div className="text-sm text-gray-400 mt-1">{op.d}</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      <button
        onClick={onPrev}
        className="mt-8 text-gray-500 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
      >
        <ArrowLeft size={16} /> 이전 단계
      </button>
    </div>
  );
}

// 4. Loading
function LoadingSection({ onComplete }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setP((prev) => {
        if (prev >= 100) {
          clearInterval(t);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm text-center">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-r-2 border-purple-500 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-mono">
          {p}%
        </div>
      </div>
      <h2 className="text-xl font-bold text-white animate-pulse mb-2">
        36가지 행동 데이터 SOS 디코딩 중...
      </h2>
      <div className="space-y-1 text-xs text-gray-500 font-mono">
        <p>UNCONSCIOUS PATTERN MATCHING...</p>
        <p>SOS SIGNAL FREQUENCY CHECK...</p>
        <p>FUTURE TRAJECTORY CALCULATION...</p>
      </div>
    </div>
  );
}

// 5. Result Report
function ResultReport({ typeKey, name, scores, onRestart }) {
  const result = RESULT_DATA[typeKey];
  const [showShare, setShowShare] = useState(false);

  const handleCopy = () => {
    const text = `[학생 SOS 시그널 스캐너 결과]\n이름: ${name}\n유형: ${result.name}\n\n"${result.desc}"\n\n36가지 데이터 SOS 스캔 결과 확인하기`;
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setShowShare(true);
      setTimeout(() => setShowShare(false), 3000);
    } catch (err) {
      // ignore
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="w-full max-w-3xl animate-fade-in pb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg:white/5 text-[10px] font-mono mb-4 text-gray-300">
          <FileText size={12} /> SOS ANALYSIS REPORT v2.0
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          {name} 학생의 SOS 시그널 리포트
        </h1>
        <p className="text-gray-400 text-sm">관측 일시: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-gray-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md mb-6 relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${result.color} blur-[100px] opacity-20 pointer-events-none`}
        ></div>
        <div className="flex flex-col items-center text-center relative z-10">
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center mb-6 shadow-2xl ${result.shadow} animate-pulse-slow`}
          >
            {result.icon}
          </div>
          <div className="font-mono text-cyan-400 font-bold mb-2 tracking-widest">
            {result.code}
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2 break-keep">{result.name}</h2>
          <p className="text-sm text-gray-400 mb-6 font-medium">{result.keyword}</p>

          {/* 행동 데이터 해석 (전문 진단) */}
          <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-white/20 text-left w-full">
            <h3 className="text-lg font-bold text-white mb-2"> 행동 데이터 해석</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              <span className="text-cyan-400 font-bold">"{result.desc}"</span>
              <br />
              <br />
              {result.detail}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-sm font-bold text-gray-400 flex items-center gap-2 mb-2">
            <BarChart2 size={16} /> 36가지 데이터 SOS 분포도
          </h3>
          <RadarChart scores={scores} />
        </div>
      </div>

      {/* 3년 후 시나리오 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertTriangle size={80} className="text-red-500" />
          </div>
          <h3 className="text-red-400 font-bold mb-2 text-sm flex items-center gap-2">
            <AlertTriangle size={16} /> 방치 시 위험 시나리오
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">{result.risk.text}</p>
        </div>

        <div className="bg-green-900/10 border border-green-500/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={80} className="text-green-500" />
          </div>
          <h3 className="text-green-400 font-bold mb-2 text-sm flex items-center gap-2">
            <CheckCircle size={16} /> 조율 시 성장 시나리오
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">{result.growth.text}</p>
        </div>
      </div>

      {/* 행동 가이드 */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield size={20} className="text-yellow-400" /> 행동 가이드 (Action Plan)
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3 items-start p-3 bg-black/30 rounded-lg">
            <span className="text-green-500 font-bold text-xs mt-1 w-12 text-center border border-green-500/50 rounded px-1">
              DO
            </span>
            <p className="text-gray-300 text-sm">{result.guide.do}</p>
          </div>
          <div className="flex gap-3 items-start p-3 bg-black/30 rounded-lg">
            <span className="text-red-500 font-bold text-xs mt-1 w-12 text-center border border-red-500/50 rounded px-1">
              DON'T
            </span>
            <p className="text-gray-300 text-sm">{result.guide.dont}</p>
          </div>
          <div className="flex gap-3 items-start p-3 bg-black/30 rounded-lg">
            <span className="text-purple-500 font-bold text-xs mt-1 w-12 text-center border border-purple-500/50 rounded px-1">
              KEY
            </span>
            <p className="text-gray-300 text-sm">
              에너지 조율 활동: <span className="text-white font-bold">{result.guide.key}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-white/10 font-bold flex items-center gap-2"
        >
          <ArrowLeft size={18} /> 다시하기
        </button>
        <button
          onClick={handleCopy}
          className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2 shadow-lg"
        >
          <Share2 size={18} /> 결과 공유하기
        </button>
      </div>

      {showShare && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in bg-black/80">
          <div className="bg-gray-900 border border-cyan-500/50 p-6 rounded-2xl flex items-center gap-3 shadow-2xl">
            <CheckCircle className="text-cyan-400" />{' '}
            <span className="font-bold text-white">결과 리포트가 복사되었습니다.</span>
          </div>
        </div>
      )}
    </div>
  );
}


