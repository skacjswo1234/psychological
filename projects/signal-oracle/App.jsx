import React, { useState, useEffect } from 'react';
import { Brain, Radio, Zap, Moon, Sun, Star, Activity, RefreshCw, Share2, DollarSign, Users, Heart, Thermometer, Copy, Eye, Briefcase, CheckCircle, BarChart2, AlertTriangle, BatteryCharging, ChevronRight } from 'lucide-react';
import './index.css';

const UltimaFrequencyTest = () => {
  const [step, setStep] = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ WEALTH: 0, HEALTH: 0, RELATION: 0, LOVE: 0, SPIRIT: 0, CAREER: 0 });
  const [progress, setProgress] = useState(0);

  // 30문항 (6개 영역 x 5문항)
  const questions = [
    // [PART 1: SPIRIT - 영성/직관]
    { id: 1, category: "SPIRIT", icon: <Eye className="w-4 h-4 text-purple-500"/>, text: "논리적으로 설명할 수는 없지만, '그냥 알 것 같은' 직감이 맞을 때가 많나요?", subtext: "무의식이 의식보다 빠르게 데이터를 처리하는 '직관(Intuition)'의 신호입니다.", options: [{t:"소름 돋게 자주 맞다", s:10}, {t:"가끔 그런 편이다", s:7}, {t:"긴가민가하다", s:5}, {t:"별로 없다", s:2}, {t:"전혀 없다", s:0}] },
    { id: 2, category: "SPIRIT", text: "알람이 울리기 직전에 눈이 저절로 떠지거나, 시간을 보면 11:11일 때가 많나요?", subtext: "당신의 생체 시계와 리듬이 외부 환경과 정확하게 동기화되고 있다는 증거입니다.", options: [{t:"매일 그렇다", s:10}, {t:"자주 그렇다", s:7}, {t:"가끔", s:5}, {t:"알람 듣고 깬다", s:2}, {t:"전혀 없다", s:0}] },
    { id: 3, category: "SPIRIT", text: "어떤 사람을 생각하자마자 연락이 오거나, 궁금했던 내용이 TV/유튜브에 바로 뜨나요?", subtext: "심리학에서는 이를 '동시성(Synchronicity)'이라 하며, 몰입도가 높을 때 발생합니다.", options: [{t:"너무 자주 있어서 신기하다", s:10}, {t:"몇 번 경험했다", s:7}, {t:"가끔", s:5}, {t:"우연이라 생각한다", s:2}, {t:"없다", s:0}] },
    { id: 4, category: "SPIRIT", text: "남들은 못 맡는 미세한 냄새를 맡거나, 예민하게 소리를 감지하나요?", subtext: "감각 기관의 필터가 열려 더 많은 정보를 수집하고 있는 상태입니다.", options: [{t:"매우 예민하다", s:10}, {t:"남들보다 빠른 편이다", s:7}, {t:"보통이다", s:5}, {t:"둔한 편이다", s:2}, {t:"전혀 아니다", s:0}] },
    { id: 5, category: "SPIRIT", text: "꿈의 내용이 선명하게 기억나거나, 꿈에서 본 상황이 현실에서 비슷하게 일어나나요?", subtext: "수면 중 뇌가 시뮬레이션한 데이터가 현실과 일치하는 현상입니다.", options: [{t:"영화처럼 생생하다", s:10}, {t:"자주 기억난다", s:7}, {t:"가끔", s:5}, {t:"거의 없다", s:2}, {t:"꿈을 안 꾼다", s:0}] },

    // [PART 2: WEALTH - 금전/현실화]
    { id: 6, category: "WEALTH", icon: <DollarSign className="w-4 h-4 text-yellow-500"/>, text: "현재 통장 잔고와 상관없이, 미래에 부자가 될 거라는 막연한 '확신'이 드나요?", subtext: "결핍감 대신 풍요의 마인드셋이 자리 잡았을 때 나타나는 심리적 안정감입니다.", options: [{t:"무조건 확신한다", s:10}, {t:"긍정적으로 생각한다", s:7}, {t:"반반이다", s:5}, {t:"불안하다", s:2}, {t:"매우 불안하다", s:0}] },
    { id: 7, category: "WEALTH", text: "최근 작은 경품 당첨, 할인, 식사 대접 등 소소한 '공짜 행운'이 있었나요?", subtext: "운의 흐름이 긍정적으로 바뀌고 있다는 초기 신호입니다.", options: [{t:"자주 생긴다", s:10}, {t:"몇 번 있었다", s:7}, {t:"보통이다", s:5}, {t:"별로 없다", s:2}, {t:"돈 나갈 일만 많다", s:0}] },
    { id: 8, category: "WEALTH", text: "갑자기 평소와 다른 길로 가고 싶거나, 충동적으로 무언가를 시도하고 싶나요?", subtext: "당신의 뇌가 기존 패턴을 깨고 새로운 기회를 탐색하려는 신호입니다.", options: [{t:"강한 충동을 느낀다", s:10}, {t:"가끔 그렇다", s:7}, {t:"보통", s:5}, {t:"계획대로만 한다", s:2}, {t:"전혀 없다", s:0}] },
    { id: 9, category: "WEALTH", text: "돈을 쓸 때 죄책감보다 '감사함'이나 '기쁨'이 더 크게 느껴지나요?", subtext: "돈에 대한 부정적 무의식이 해소되었을 때 나타나는 반응입니다.", options: [{t:"쓸 때마다 행복하다", s:10}, {t:"기분 좋게 쓴다", s:7}, {t:"가끔 아깝다", s:5}, {t:"쓰는 게 두렵다", s:2}, {t:"죄책감이 든다", s:0}] },
    { id: 10, category: "WEALTH", text: "주변에서 돈 버는 이야기나 정보가 자꾸 들려오나요?", subtext: "뇌의 RAS(망상활성계)가 '기회'를 포착하기 위해 안테나를 세운 상태입니다.", options: [{t:"정보가 쏟아진다", s:10}, {t:"자주 들린다", s:7}, {t:"가끔", s:5}, {t:"신경 안 씀", s:2}, {t:"못 들었다", s:0}] },

    // [PART 3: CAREER - 직업/성취]
    { id: 11, category: "CAREER", icon: <Briefcase className="w-4 h-4 text-orange-500"/>, text: "꽉 막혀있던 일이나 골치 아픈 문제가 갑자기 해결책이 보이거나 풀리기 시작했나요?", subtext: "업무 몰입도가 높아져 '플로우(Flow)' 상태에 진입했다는 신호입니다.", options: [{t:"기적처럼 해결됐다", s:10}, {t:"순조로워졌다", s:7}, {t:"비슷하다", s:5}, {t:"여전히 막막하다", s:2}, {t:"더 꼬였다", s:0}] },
    { id: 12, category: "CAREER", text: "타인으로부터 예상치 못한 칭찬이나 인정을 받았나요?", subtext: "당신의 성과와 에너지가 외부로 긍정적으로 표출되고 있습니다.", options: [{t:"극적인 칭찬을 받았다", s:10}, {t:"인정받는 분위기다", s:7}, {t:"보통이다", s:5}, {t:"무시당한다", s:2}, {t:"지적만 받는다", s:0}] },
    { id: 13, category: "CAREER", text: "새로운 제안, 이직 권유, 혹은 협업 요청이 들어오나요?", subtext: "당신의 사회적 주파수가 상승하여 기회를 끌어당기고 있습니다.", options: [{t:"거절할 정도로 많이 온다", s:10}, {t:"좋은 제안이 있었다", s:7}, {t:"연락은 온다", s:5}, {t:"조용하다", s:2}, {t:"전혀 없다", s:0}] },
    { id: 14, category: "CAREER", text: "일을 할 때 시간 가는 줄 모르게 집중되거나 묘한 기대감이 생기나요?", subtext: "내재적 동기가 발동하여 효율이 극대화된 상태입니다.", options: [{t:"설레는 기분이다", s:10}, {t:"나쁘지 않다", s:7}, {t:"그냥 그렇다", s:5}, {t:"하기 싫다", s:2}, {t:"죽을 만큼 싫다", s:0}] },
    { id: 15, category: "CAREER", text: "나의 의견을 냈을 때 사람들이 귀를 기울이고 힘이 실리나요?", subtext: "자신감이 목소리와 태도에 배어 나와 리더십이 발휘되는 중입니다.", options: [{t:"내 의견대로 된다", s:10}, {t:"영향력이 생겼다", s:7}, {t:"가끔 그렇다", s:5}, {t:"무시당한다", s:2}, {t:"전혀 아니다", s:0}] },

    // [PART 4: HEALTH - 신체/에너지]
    { id: 16, category: "HEALTH", icon: <Thermometer className="w-4 h-4 text-green-500"/>, text: "이유 없이 몸이 가볍고 에너지가 넘치거나, 반대로 급격히 나른한가요?", subtext: "에너지 레벨이 재조정될 때 나타나는 명현 현상입니다.", options: [{t:"확실한 변화가 있다", s:10}, {t:"컨디션이 달라졌다", s:7}, {t:"가끔 그렇다", s:5}, {t:"보통이다", s:2}, {t:"항상 피곤하다", s:0}] },
    { id: 17, category: "HEALTH", text: "미간이나 머리 특정 부위가 지릿하거나 묵직한 압력이 느껴지나요?", subtext: "고도의 집중 상태나 몰입 상태에서 나타나는 뇌 혈류량 변화입니다.", options: [{t:"자주 느껴진다", s:10}, {t:"가끔 느껴진다", s:7}, {t:"두통처럼 온다", s:5}, {t:"잘 모름", s:2}, {t:"없다", s:0}] },
    { id: 18, category: "HEALTH", text: "식성이 바뀌거나, 평소 좋아하던 음식이 갑자기 안 당기나요?", subtext: "신체 리듬이 바뀌면서 몸이 필요로 하는 영양소가 달라진 것입니다.", options: [{t:"확실히 변했다", s:10}, {t:"조금 변했다", s:7}, {t:"가끔", s:5}, {t:"그대로다", s:2}, {t:"폭식한다", s:0}] },
    { id: 19, category: "HEALTH", text: "병원에 갈 정도는 아니지만 귀에서 '삐-' 소리(이명)가 들리나요?", subtext: "청각 신경이 예민해져 내부의 소리를 감지하는 현상입니다.", options: [{t:"선명하게 들린다", s:10}, {t:"종종 들린다", s:7}, {t:"피곤할 때만", s:5}, {t:"거의 없다", s:2}, {t:"없다", s:0}] },
    { id: 20, category: "HEALTH", text: "잠을 적게 잤는데도 정신이 맑거나, 반대로 잠이 쏟아지나요?", subtext: "뇌가 정보를 처리하고 재배선(Rewiring)하는 과정입니다.", options: [{t:"수면 패턴이 확 바뀜", s:10}, {t:"변화가 있다", s:7}, {t:"보통", s:5}, {t:"피곤하다", s:2}, {t:"불면증이다", s:0}] },

    // [PART 5: RELATION - 인간관계]
    { id: 21, category: "RELATION", icon: <Users className="w-4 h-4 text-blue-500"/>, text: "오래된 친구나 지인과 대화가 갑자기 잘 안 통하고 답답한가요?", subtext: "관심사와 가치관이 달라지면서 관계의 재정립이 필요한 시기입니다.", options: [{t:"대화가 아예 안 통한다", s:10}, {t:"답답함을 느낀다", s:7}, {t:"가끔", s:5}, {t:"잘 통한다", s:2}, {t:"매우 잘 통한다", s:0}] },
    { id: 22, category: "RELATION", text: "나를 힘들게 하던 사람이 갑자기 떠나거나 관계가 정리되었나요?", subtext: "당신의 태도가 단호해지면서 부정적인 관계가 자연스럽게 멀어지는 것입니다.", options: [{t:"기적처럼 정리됐다", s:10}, {t:"자연스럽게 멀어짐", s:7}, {t:"그대로다", s:5}, {t:"오히려 더 꼬였다", s:2}, {t:"전혀 아님", s:0}] },
    { id: 23, category: "RELATION", text: "처음 본 사람에게 강렬한 호감을 느끼거나 '통한다'는 느낌을 받나요?", subtext: "비슷한 성향과 에너지를 가진 사람들을 끌어당기고 있습니다.", options: [{t:"강하게 느낀다", s:10}, {t:"호감 가는 사람이 생김", s:7}, {t:"가끔", s:5}, {t:"없다", s:2}, {t:"사람이 싫다", s:0}] },
    { id: 24, category: "RELATION", text: "타인의 감정이나 기분이 마치 내 것처럼 생생하게 느껴지나요?", subtext: "공감 능력이 극대화되어 상대방의 의도를 빠르게 파악합니다.", options: [{t:"매우 잘 느낀다", s:10}, {t:"눈치가 빨라졌다", s:7}, {t:"보통이다", s:5}, {t:"둔한 편이다", s:2}, {t:"관심 없다", s:0}] },
    { id: 25, category: "RELATION", text: "사람들이 유독 나에게 고민을 털어놓거나 의지하려 하나요?", subtext: "당신에게서 안정감과 신뢰감을 느끼기 때문입니다.", options: [{t:"자주 그렇다", s:10}, {t:"종종 있다", s:7}, {t:"가끔", s:5}, {t:"별로", s:2}, {t:"전혀 없다", s:0}] },

    // [PART 6: LOVE - 애정/매력]
    { id: 26, category: "LOVE", icon: <Heart className="w-4 h-4 text-pink-500"/>, text: "동물이나 아기들이 나를 빤히 쳐다보거나 이유 없이 다가오나요?", subtext: "비언어적 신호에 민감한 존재들은 당신의 편안한 분위기를 감지합니다.", options: [{t:"시선을 한 몸에 받는다", s:10}, {t:"자주 쳐다본다", s:7}, {t:"가끔", s:5}, {t:"잘 모름", s:2}, {t:"피한다", s:0}] },
    { id: 27, category: "LOVE", text: "거울을 봤는데 내가 평소보다 예뻐 보이거나 표정이 밝아 보이나요?", subtext: "자존감이 높아지고 내면의 평화가 외면으로 드러나는 현상입니다.", options: [{t:"확실히 좋아 보인다", s:10}, {t:"밝아 보인다", s:7}, {t:"보통", s:5}, {t:"피곤해 보임", s:2}, {t:"푸석하다", s:0}] },
    { id: 28, category: "LOVE", text: "이유 없이 설레거나, 사랑받고 싶은 마음이 벅차오르나요?", subtext: "감정의 문이 열리고 타인을 받아들일 심리적 여유가 생긴 상태입니다.", options: [{t:"가슴이 벅차다", s:10}, {t:"설렌다", s:7}, {t:"가끔", s:5}, {t:"별로", s:2}, {t:"무덤덤하다", s:0}] },
    { id: 29, category: "LOVE", text: "평소 안 입던 밝은 색 옷이나 새로운 스타일이 끌리나요?", subtext: "변화에 대한 욕구가 생기고 자신을 표현하고 싶은 에너지가 솟는 것입니다.", options: [{t:"취향이 확 바뀜", s:10}, {t:"눈길이 간다", s:7}, {t:"가끔", s:5}, {t:"그대로다", s:2}, {t:"무채색이 좋다", s:0}] },
    { id: 30, category: "LOVE", text: "우연히 들은 노래 가사나 영화 대사가 내 사랑 이야기 같나요?", subtext: "무의식이 현재 상황과 관련된 정보에 집중하고 있는 '칵테일 파티 효과'입니다.", options: [{t:"소름 돋게 똑같다", s:10}, {t:"비슷하다", s:7}, {t:"가끔", s:5}, {t:"별로", s:2}, {t:"전혀 아님", s:0}] }
  ];

  const handleAnswer = (points) => {
    const category = questions[currentQ].category;
    setScores(prev => ({ ...prev, [category]: prev[category] + points }));
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('loading');
    }
  };

  useEffect(() => {
    if (step === 'loading') {
      const timer = setInterval(() => {
        setProgress(old => (old >= 100 ? 100 : old + 2));
      }, 20);
      if (progress === 100) setTimeout(() => setStep('result'), 500);
      return () => clearInterval(timer);
    }
  }, [step, progress]);

  // 영역별 상세 분석 멘트 (소름 유도 강화)
  const getDetailFeedback = (score, type) => {
    if (score >= 40) { // High (최상)
      switch(type) {
        case 'WEALTH': return " [금전] 최상. 돈의 흐름이 보이고 기회가 쏟아집니다. 지금 투자나 사업 결정은 '대박'일 확률이 높습니다.";
        case 'CAREER': return " [성취] 최고조. 당신의 능력이 200% 발휘되는 시기입니다. 승진, 이직, 계약 등 원하는 대로 이루어집니다.";
        case 'RELATION': return " [관계] 리더십. 사람들이 당신을 따르고 돕습니다. 귀인이 찾아오니 모임에 적극적으로 나가세요.";
        case 'LOVE': return " [애정] 매력 폭발. 가만히 있어도 이성이 꼬입니다. 고백받거나 운명의 상대를 만날 확률이 매우 높습니다.";
        case 'SPIRIT': return " [직관] 통찰력. 남들이 못 보는 것을 봅니다. 당신의 '촉'이 곧 정답이니 분석하지 말고 느낌을 믿으세요.";
        case 'HEALTH': return " [신체] 활력. 에너지가 넘칩니다. 적게 자도 개운하고 면역력이 최상입니다. 무엇이든 할 수 있는 몸 상태입니다.";
      }
    } else if (score >= 20) { // Mid (중간)
      switch(type) {
        case 'WEALTH': return " [금전] 상승세. 소소한 이익이 생깁니다. 큰 욕심보다는 현재의 흐름을 유지하며 기회를 엿보세요.";
        case 'CAREER': return " [성취] 안정. 노력한 만큼 결과가 나옵니다. 지금은 기초를 다지며 다음 도약을 준비할 때입니다.";
        case 'RELATION': return " [관계] 변화. 인간관계가 재편되고 있습니다. 떠나는 사람 잡지 말고 오는 사람 막지 마세요.";
        case 'LOVE': return " [애정] 썸. 호감 가는 사람이 생기거나 관계가 발전합니다. 조금 더 적극적으로 표현해도 좋습니다.";
        case 'SPIRIT': return " [직관] 개화. 가끔 신기한 우연을 겪습니다. 꿈이나 스쳐가는 생각을 메모해두면 힌트가 됩니다.";
        case 'HEALTH': return " [신체] 기복. 컨디션이 오르락내리락합니다. 무리하지 말고 수면 시간을 규칙적으로 지키세요.";
      }
    } else { // Low (최저)
      switch(type) {
        case 'WEALTH': return " [금전] 주의. 충동구매나 투자는 금물입니다. 지금은 지갑을 닫고 새는 돈을 막아야 할 때입니다.";
        case 'CAREER': return " [성취] 정체. 일이 뜻대로 안 풀리고 막막합니다. 억지로 하기보다 잠시 멈춰서 방향을 점검하세요.";
        case 'RELATION': return " [관계] 스트레스. 사람 만나는 게 피곤합니다. 억지로 어울리지 말고 혼자만의 시간을 가지세요.";
        case 'LOVE': return " [애정] 고독. 외로움에 아무나 만나면 상처받습니다. 지금은 나 자신을 먼저 사랑해 줄 때입니다.";
        case 'SPIRIT': return " [직관] 차단. 머리가 복잡해 신호를 놓치고 있습니다. 멍하니 있는 시간을 늘려 뇌를 쉬게 하세요.";
        case 'HEALTH': return " [신체] 방전. 만성 피로와 무기력증. 영양이 부족합니다. 따뜻한 음식을 먹고 푹 쉬어야 합니다.";
      }
    }
  };

  // 결핍 분석 및 처방
  const getPrescription = (scores) => {
    const lowestKey = Object.keys(scores).reduce((a, b) => scores[a] < scores[b] ? a : b);
    
    const prescriptions = {
      WEALTH: {
        lacking: "현재 당신은 '풍요에 대한 믿음'이 부족합니다. 무의식 깊은 곳에 '돈은 힘들게 벌어야 한다'는 고정관념이나 결핍에 대한 두려움이 자리 잡고 있어, 들어오려는 돈의 흐름을 막고 있습니다.",
        signal: "돈에 대한 감정을 '걱정'에서 '감사'로 바꿔야 합니다. 10원을 쓸 때도 '이 돈이 나에게 기쁨을 주었다'고 느끼세요.",
        mindset: "'나는 이미 충분하다'는 여유 갖기",
        action: "지갑 정리하기 (영수증 버리고 지폐 방향 맞추기)",
        item: "골드(Gold) 컬러 소품, 시트린 원석"
      },
      CAREER: {
        lacking: "현재 당신은 '목표에 대한 확신'이 부족합니다. 능력은 충분하지만, '내가 잘할 수 있을까?' 하는 자기 검열과 의심이 실행력을 갉아먹고 있습니다. 에너지가 분산되어 성과가 나지 않습니다.",
        signal: "작은 성공 경험을 쌓아 뇌에 '나는 유능하다'는 데이터를 입력해야 합니다. 거창한 목표 대신 오늘 끝낼 수 있는 일을 완수하세요.",
        mindset: "'완벽하지 않아도 일단 시작한다' 생각하기",
        action: "오늘 할 일 3가지 적고 무조건 끝내기",
        item: "만년필, 짙은 남색(Navy) 다이어리"
      },
      RELATION: {
        lacking: "현재 당신은 '경계 설정(Boundaries)'이 부족합니다. 타인의 감정이나 요구를 거절하지 못해 에너지가 줄줄 새고 있습니다. 착한 사람이 되려다 정작 나를 잃어버린 상태입니다.",
        signal: "단호함의 파동을 만들어야 합니다. 싫은 것은 싫다고 말할 때, 당신을 존중하는 진짜 인연들이 남게 됩니다.",
        mindset: "'모두에게 사랑받을 필요는 없다' 인정하기",
        action: "불필요한 단톡방 나가기, 연락처 3명 정리하기",
        item: "거울(나를 비춤), 은(Silver) 액세서리"
      },
      LOVE: {
        lacking: "현재 당신은 '자기애(Self-Love)'가 부족합니다. 타인의 사랑을 갈구하고 있거나, 외로움을 채우기 위해 외부를 두리번거리고 있습니다. 내면이 비어있으면 겉도는 인연만 꼬입니다.",
        signal: "나 자신을 가장 귀한 손님처럼 대접하세요. 내가 나를 사랑하는 만큼, 정확히 그만큼 타인도 나를 사랑하게 됩니다.",
        mindset: "'나는 사랑받을 자격이 있다'고 믿기",
        action: "나에게 꽃 선물하기, 맛있는 혼밥 사주기",
        item: "로즈쿼츠 원석, 핑크색 잠옷/속옷"
      },
      HEALTH: {
        lacking: "현재 당신은 '그라운딩(Grounding)'이 부족합니다. 생각이 너무 많아 에너지가 머리로만 쏠려있고, 하체와 뿌리가 약해져 있습니다. 현실 감각이 떨어지고 체력이 바닥난 상태입니다.",
        signal: "머리의 열기를 발바닥으로 내리는 연습이 필요합니다. 흙을 밟거나 몸을 움직여 에너지를 순환시켜야 합니다.",
        mindset: "'건강한 몸에 건강한 운이 깃든다' 명심하기",
        action: "맨발 걷기, 반신욕 하기",
        item: "나무 소재 소품, 녹색 식물"
      },
      SPIRIT: {
        lacking: "현재 당신은 '여유와 고요함'이 부족합니다. 스마트폰과 정보의 홍수 속에서 뇌가 쉴 틈이 없어, 우주가 보내는 미세한 시그널을 전혀 감지하지 못하고 있습니다.",
        signal: "디지털 기기를 끄고 '멍 때리는' 시간을 가져야 합니다. 비어있어야 채울 수 있습니다. 직관은 침묵 속에서 찾아옵니다.",
        mindset: "'아무것도 하지 않아도 괜찮다' 허용하기",
        action: "하루 10분 명상, 자기 전 핸드폰 멀리하기",
        item: "향초(Candle), 보라색 아이템"
      }
    };
    return prescriptions[lowestKey];
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const lowestScoreResult = getPrescription(scores);
  
  const getResult = () => {
    if (totalScore >= 240) return {
      type: "TYPE S. MASTER (최적화)",
      title: "몰입과 성취의 '마스터 주파수'",
      desc: "당신은 현재 뇌와 몸, 마음이 완벽하게 정렬된 '최적화(Optimization)' 상태입니다. 심리학적으로는 '플로우(Flow)' 상태에 있으며, 불필요한 걱정 없이 목표를 향해 질주하고 있습니다. 지금 당신이 마음먹은 일은 장애물 없이 현실이 됩니다. 단순한 운이 아니라, 당신의 준비된 역량이 기회를 만나 폭발하는 시기입니다.",
      current: " [현재 상태] 판단력이 명확하고 두려움이 없습니다. 뇌의 전두엽이 활성화되어 최상의 의사결정을 내리고 있습니다.",
      color: "text-purple-400",
      bg: "from-purple-900 via-purple-800 to-black"
    };
    if (totalScore >= 170) return {
      type: "TYPE A. SHIFT (확장기)",
      title: "알을 깨고 나오는 '격변의 주파수'",
      desc: "축하합니다. 정체기를 뚫고 급성장하는 구간에 진입했습니다. 하지만 변화의 속도가 빨라 '성장통'을 겪고 있습니다. 감정 기복이 있거나 인간관계가 바뀌는 것은 나쁜 게 아닙니다. 더 큰 성공을 담기 위해 낡은 껍질을 벗고 있는 자연스러운 과정입니다.",
      current: " [현재 상태] 기대감과 불안감이 공존합니다. 뇌가 새로운 환경에 적응하느라 에너지를 많이 쓰고 있어 피로할 수 있습니다.",
      color: "text-blue-400",
      bg: "from-blue-900 via-blue-800 to-black"
    };
    if (totalScore >= 100) return {
      type: "TYPE B. SENSING (각성기)",
      title: "신호를 감지하는 '직관의 눈'",
      desc: "이제 막 잠재력이 깨어나고 있습니다. 우연 같은 기회들이 찾아오고, '뭔가 달라져야겠다'는 생각이 듭니다. 하지만 아직은 현실적인 제약이나 의심 때문에 주저하고 있군요. 조금만 더 확신을 가지고 밀어붙이면 흐름을 탈 수 있습니다.",
      current: " [현재 상태] 호기심이 늘고 새로운 정보에 관심이 갑니다. 무의식이 변화를 원하고 신호를 보내는 중입니다.",
      color: "text-yellow-400",
      bg: "from-yellow-900 via-yellow-800 to-black"
    };
    return {
      type: "TYPE C. RECHARGE (충전기)",
      title: "잠시 멈춤이 필요한 '재정비 신호'",
      desc: "현재 당신의 에너지는 많이 소모된 상태입니다. 일이 꼬이거나 의욕이 없는 건 게으른 게 아니라, 뇌와 몸이 '제발 좀 쉬자'고 보내는 구조 신호입니다. 억지로 달리면 고장 납니다. 지금은 성과를 낼 때가 아니라, 뿌리를 내리고 내면을 단단히 채울 때입니다.",
      current: " [현재 상태] 번아웃 직전 혹은 만성 피로. 외부 자극을 차단하고 온전히 '나'에게 집중해야 운이 돌아옵니다.",
      color: "text-gray-400",
      bg: "from-gray-900 via-gray-800 to-black"
    };
  };

  const result = getResult();

  // Radar Chart Data Generation (SVG Path for Hexagon)
  const maxScore = 50; 
  const points = [
    scores.SPIRIT / maxScore,
    scores.WEALTH / maxScore,
    scores.CAREER / maxScore,
    scores.HEALTH / maxScore,
    scores.RELATION / maxScore,
    scores.LOVE / maxScore
  ];
  
  const getCoord = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = value * 40; 
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    return `${x},${y}`;
  };

  const polyPoints = points.map((p, i) => getCoord(p, i, 6)).join(" ");
  const bgPolyPoints = [1,1,1,1,1,1].map((p, i) => getCoord(p, i, 6)).join(" ");

  const copyAndShareResult = () => {
    const text = `[시그널 오라클 정밀 진단 결과]\n\n 나의 현재 주파수는: ${result.type} (${result.title})\n\n 나의 운명 요약:\n${result.desc}\n\n[영역별 상세 점수]\n 직관: ${scores.SPIRIT}/50\n 금전: ${scores.WEALTH}/50\n 직업: ${scores.CAREER}/50\n 신체: ${scores.HEALTH}/50\n 관계: ${scores.RELATION}/50\n 애정: ${scores.LOVE}/50\n\n- 지금 가장 부족한 영역: ${lowestScoreResult.lacking.split(' ')[2].replace(/'/g, '')}\n-  미래 창조 시그널: "${lowestScoreResult.signal}"\n\n 당신의 주파수도 확인해보세요!\n[여기에 웹사이트 링크를 넣어주세요]`; 
    
    // 개발자가 실제 호스팅 후 웹사이트 주소를 넣어줘야 함.
    navigator.clipboard.writeText(text);
    alert("분석 결과가 클립보드에 복사되었습니다! 친구의 DM창이나 스토리에 붙여넣어 공유해보세요.");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]"></div>

      <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col p-6">
        
        <header className="flex justify-between items-center py-4 mb-2 border-b border-gray-800">
          <div>
            <h1 className="text-lg font-serif font-bold text-yellow-500 tracking-widest">SIGNAL ORACLE</h1>
            <p className="text-[9px] text-gray-500 tracking-[0.2em]">ULTRA PRECISION ANALYSIS</p>
          </div>
          <Radio className="w-4 h-4 text-yellow-500 animate-pulse" />
        </header>

        {step === 'intro' && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in py-6">
            <div className="text-center mb-8">
              <div className="inline-block p-6 rounded-full border border-yellow-500/30 mb-6 relative group">
                <div className="absolute inset-0 rounded-full border border-yellow-500 animate-ping opacity-20"></div>
                <Brain className="w-16 h-16 text-yellow-400 group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-bold mb-3 leading-tight">
                운명 정밀 종합 검진<br/>
                <span className="text-yellow-500 text-lg font-normal tracking-widest">[ 6대 영역 30문항 ]</span>
              </h2>
              
              <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-800 text-left space-y-4 mb-8 backdrop-blur-sm">
                <p className="text-gray-300 text-xs leading-relaxed text-center mb-2">
                  당신의 현재 상태를 <strong>6가지 영역</strong>으로<br/>나누어 정밀 분석합니다.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-700">
                    <Eye className="w-3 h-3 text-purple-500"/> <span className="text-xs text-gray-300">직관/통찰</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-700">
                    <DollarSign className="w-3 h-3 text-yellow-500"/> <span className="text-xs text-gray-300">금전운</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-700">
                    <Briefcase className="w-3 h-3 text-orange-500"/> <span className="text-xs text-gray-300">직업/성취</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-700">
                    <Thermometer className="w-3 h-3 text-green-500"/> <span className="text-xs text-gray-300">신체/활력</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-700">
                    <Users className="w-3 h-3 text-blue-500"/> <span className="text-xs text-gray-300">인간관계</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-700">
                    <Heart className="w-3 h-3 text-pink-500"/> <span className="text-xs text-gray-300">애정/매력</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setStep('test')}
                className="w-full bg-gradient-to-r from-yellow-700 to-yellow-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:brightness-110 transition-all"
              >
                정밀 검진 시작하기
              </button>
              <p className="mt-4 text-[10px] text-gray-600">※ 소요시간 약 8분 / 결과 캡처 필수</p>
            </div>
          </div>
        )}

        {step === 'test' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-end text-xs mb-2">
                <span className="text-yellow-500 font-bold tracking-widest uppercase flex items-center gap-1">
                   {questions[currentQ].icon || <Activity className="w-4 h-4"/>} {questions[currentQ].category} PART
                </span>
                <span className="text-gray-500">{currentQ + 1} / {questions.length}</span>
              </div>
              <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all duration-300 ease-out"
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <span className="inline-block px-2 py-1 bg-gray-800 text-gray-400 text-[10px] rounded mb-3">
                Q.{currentQ + 1}
              </span>
              <h3 className="text-lg font-bold mb-2 leading-snug text-white">
                {questions[currentQ].text}
              </h3>
              <p className="text-xs text-gray-400 border-l-2 border-yellow-500/50 pl-3">
                {questions[currentQ].subtext}
              </p>
            </div>

            {/* 5 Options */}
            <div className="space-y-2.5 mb-10">
              {questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.s)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all active:scale-95 flex justify-between items-center group
                    ${idx === 0 ? 'bg-yellow-900/20 border-yellow-500/30 hover:bg-yellow-900/40' : 
                      idx === 4 ? 'bg-gray-900/30 border-gray-800 hover:bg-gray-900' :
                      'bg-gray-900/50 border-gray-700 hover:bg-gray-800'}`}
                >
                  <span className={`text-sm ${idx === 0 ? 'text-yellow-100 font-medium' : 'text-gray-300'}`}>
                    {opt.t}
                  </span>
                  {idx === 0 && <Star className="w-3 h-3 text-yellow-500 opacity-50 group-hover:opacity-100" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <Activity className="text-yellow-500 w-10 h-10 animate-bounce mb-4" />
            <h2 className="text-xl font-bold text-white mb-2 tracking-widest">ANALYZING</h2>
            <p className="text-xs text-yellow-500/80 mb-8 font-mono">CALCULATING 6-DIMENSIONS...</p>
            <div className="w-48 bg-gray-900 h-1 rounded-full"><div className="h-full bg-yellow-500" style={{width: `${progress}%`}}></div></div>
            <p className="text-gray-500 text-xs mt-2">{progress}%</p>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-fade-in pb-10">
            <div className="text-center mb-6 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-[10px] text-gray-400 mb-4">
                <Brain className="w-3 h-3 text-yellow-500" /> FINAL DIAGNOSIS
              </div>
              <h2 className={`text-2xl font-bold font-serif mb-2 ${result.color}`}>{result.type.split('.')[0]}</h2>
              <h3 className="text-sm text-gray-300 font-medium tracking-wide uppercase">{result.title}</h3>
            </div>

            <div className="space-y-5">
              {/* 1. Overall Analysis & Current State */}
              <div className="bg-gray-900/40 p-5 rounded-2xl border border-gray-800 backdrop-blur-sm">
                <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-3 h-3"/> Total Analysis
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed text-justify mb-4">
                  {result.desc}
                </p>
                <div className="bg-black/40 p-3 rounded-lg border border-gray-700/50">
                  <p className="text-xs text-yellow-500/90 leading-relaxed font-medium">{result.current}</p>
                </div>
              </div>

              {/* 2. Radar Chart (Hexagon) */}
              <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
                 <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                   <polygon points={bgPolyPoints} stroke="#333" strokeWidth="0.5" fill="none"/>
                   <polygon points={bgPolyPoints} stroke="#333" strokeWidth="0.5" fill="none" transform="scale(0.5) translate(50,50)"/>
                   <polygon points={polyPoints} fill="rgba(234, 179, 8, 0.3)" stroke="#EAB308" strokeWidth="1.5" />
                 </svg>
                 <div className="absolute top-0 text-[9px] text-purple-500 font-bold">직관</div>
                 <div className="absolute top-[25%] right-0 text-[9px] text-yellow-500 font-bold">금전</div>
                 <div className="absolute bottom-[25%] right-0 text-[9px] text-orange-500 font-bold">성취</div>
                 <div className="absolute bottom-0 text-[9px] text-green-500 font-bold">신체</div>
                 <div className="absolute bottom-[25%] left-0 text-[9px] text-blue-500 font-bold">관계</div>
                 <div className="absolute top-[25%] left-4 text-[9px] text-pink-500 font-bold">애정</div>
              </div>

              {/* 3. Detailed 6 Areas */}
              <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl border border-gray-800 relative overflow-hidden group shadow-lg">
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${result.bg}`}></div>
                <h4 className="flex items-center gap-2 text-xs font-bold text-yellow-200 mb-4 uppercase tracking-wider">
                  <BarChart2 className="w-3 h-3" /> 6대 영역 정밀 진단
                </h4>
                
                <div className="space-y-3">
                  <div className="text-xs text-gray-300 leading-relaxed border-b border-gray-800 pb-2">{getDetailFeedback(scores.WEALTH, 'WEALTH')}</div>
                  <div className="text-xs text-gray-300 leading-relaxed border-b border-gray-800 pb-2">{getDetailFeedback(scores.CAREER, 'CAREER')}</div>
                  <div className="text-xs text-gray-300 leading-relaxed border-b border-gray-800 pb-2">{getDetailFeedback(scores.RELATION, 'RELATION')}</div>
                  <div className="text-xs text-gray-300 leading-relaxed border-b border-gray-800 pb-2">{getDetailFeedback(scores.LOVE, 'LOVE')}</div>
                  <div className="text-xs text-gray-300 leading-relaxed border-b border-gray-800 pb-2">{getDetailFeedback(scores.SPIRIT, 'SPIRIT')}</div>
                  <div className="text-xs text-gray-300 leading-relaxed">{getDetailFeedback(scores.HEALTH, 'HEALTH')}</div>
                </div>
              </div>

              {/* 4. What is Lacking & Signal Creation (New Section) */}
              <div className="bg-gray-900/60 p-5 rounded-2xl border border-red-900/30">
                <h4 className="flex items-center gap-2 text-xs font-bold text-red-400 mb-3 uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3" /> 결핍 데이터 & 솔루션
                </h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-gray-500 block mb-1">무엇이 부족한가?</span>
                    <p className="text-sm text-gray-300 leading-relaxed">{lowestScoreResult.lacking}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-yellow-500 block mb-1 flex items-center gap-1"><BatteryCharging className="w-3 h-3"/> 미래 창조 시그널</span>
                    <p className="text-sm text-yellow-100 font-medium leading-relaxed">"{lowestScoreResult.signal}"</p>
                  </div>
                </div>
              </div>

              {/* 5. 3-Step Urgent Prescription (Enhanced) */}
              <div className="bg-black p-5 rounded-2xl border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
                <h4 className="flex items-center gap-2 text-xs font-bold text-yellow-500 mb-4 uppercase tracking-wider">
                  <Sun className="w-3 h-3" /> 3단계 긴급 처방
                </h4>
                <div className="space-y-4">
                  <div className="pl-3 border-l-2 border-yellow-900">
                    <span className="text-[10px] text-yellow-700 block mb-1 tracking-wider font-bold">MINDSET (마인드)</span>
                    <p className="text-sm text-gray-300">{lowestScoreResult.mindset}</p>
                  </div>
                  <div className="pl-3 border-l-2 border-yellow-900">
                    <span className="text-[10px] text-yellow-700 block mb-1 tracking-wider font-bold">ACTION (행동)</span>
                    <p className="text-sm text-gray-300">{lowestScoreResult.action}</p>
                  </div>
                  <div className="pl-3 border-l-2 border-yellow-900">
                    <span className="text-[10px] text-yellow-700 block mb-1 tracking-wider font-bold">ITEM (행운 아이템)</span>
                    <p className="text-sm text-gray-300">{lowestScoreResult.item}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button onClick={copyAndShareResult} className="col-span-2 bg-gradient-to-r from-yellow-700 to-yellow-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg">
                <Share2 className="w-4 h-4" /> 결과 복사하고 공유하기
              </button>
              
              <div className="col-span-2 text-center text-[10px] text-gray-500 mt-2">
                * 위 버튼을 누르면 **분석 결과가 복사**됩니다.<br/>친구의 DM창이나 스토리에 '붙여넣기'하여 공유해보세요!
              </div>

              <button 
                onClick={() => {
                  setStep('intro');
                  setCurrentQ(0);
                  setScores({WEALTH:0, HEALTH:0, RELATION:0, LOVE:0, SPIRIT:0, CAREER:0});
                }}
                className="col-span-2 text-xs text-gray-600 py-3 flex items-center justify-center gap-1 hover:text-gray-400"
              >
                <RefreshCw className="w-3 h-3" /> 다시 검진하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UltimaFrequencyTest;

