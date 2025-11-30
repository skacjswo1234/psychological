import React, { useState, useEffect } from 'react';
import { Brain, Activity, Users, BookOpen, AlertTriangle, CheckCircle, ClipboardList, BarChart2, Share2, RefreshCw, HeartPulse, Zap, ChevronRight, ArrowRight, ArrowLeft, Clock, Target, MessageCircle, FileText, Microscope, TrendingUp, Shield, Sparkles, Lock, Radio, Antenna, Signal, Scan, Pill } from 'lucide-react';
import './index.css';

const SignalLabFinal = () => {
  const [step, setStep] = useState('intro');
  const [resultPage, setResultPage] = useState(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ COGNITIVE: 0, EMOTION: 0, SOCIAL: 0, PHYSICAL: 0, SPIRIT: 0, WEALTH: 0 });
  const [scoreHistory, setScoreHistory] = useState([]);
  const [progress, setProgress] = useState(0);
  const [guideMode, setGuideMode] = useState('teacher');

  // 36문항 (4개 영역 x 9문항)
  const questions = [
    // [PART 1: COGNITIVE -> 수신 명료도]
    { id: 1, category: "COGNITIVE", text: "수업 중 멍하니 있거나, 이름을 불러도 반응 속도가 현저히 느린가요?", options: [{t:"매우 자주 (수신 불가)", s:5}, {t:"자주 멍함", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"즉각 반응", s:0}] },
    { id: 2, category: "COGNITIVE", text: "과제나 준비물을 잊어버리는 '데이터 입력 오류'가 잦나요?", options: [{t:"매일 오류", s:5}, {t:"자주 잊음", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"완벽함", s:0}] },
    { id: 3, category: "COGNITIVE", text: "글씨체가 갑자기 엉망이 되거나, 정리 정돈(패턴화)이 안 되나요?", options: [{t:"해독 불가", s:5}, {t:"많이 흐트러짐", s:4}, {t:"조금", s:3}, {t:"그대로", s:1}, {t:"정돈됨", s:0}] },
    { id: 4, category: "COGNITIVE", text: "복잡한 지시사항을 한 번에 이해하지 못하고 엉뚱하게 행동하나요?", options: [{t:"전혀 이해 못함", s:5}, {t:"자주 되물음", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"한 번에 이해", s:0}] },
    { id: 5, category: "COGNITIVE", text: "성적이 급격히 떨어지거나, 학습 의욕(출력 신호)이 완전히 꺾인 상태인가요?", options: [{t:"완전 포기", s:5}, {t:"급락 중", s:4}, {t:"약간 저하", s:3}, {t:"유지", s:1}, {t:"상승세", s:0}] },
    { id: 6, category: "COGNITIVE", text: "현실 도피성 공상에 빠지거나 수업과 무관한 낙서를 반복하나요?", options: [{t:"수업 내내", s:5}, {t:"자주", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"집중함", s:0}] },
    { id: 7, category: "COGNITIVE", text: "문제를 풀 때 끈기 있게 고민하지 못하고 금방 포기하거나 찍어버리나요?", options: [{t:"읽지도 않고 찍음", s:5}, {t:"조금 보다 포기", s:4}, {t:"가끔", s:3}, {t:"노력함", s:1}, {t:"끝까지 풂", s:0}] },
    { id: 8, category: "COGNITIVE", text: "자신의 학습 상태나 문제점을 스스로 파악하지 못하나요? (모니터링 불가)", options: [{t:"전혀 모름", s:5}, {t:"잘 모름", s:4}, {t:"보통", s:3}, {t:"아는 편", s:1}, {t:"잘 파악함", s:0}] },
    { id: 9, category: "COGNITIVE", text: "스마트폰이나 게임 외에는 어떤 것에도 흥미를 보이지 않나요? (가짜 신호 중독)", options: [{t:"중독 심각", s:5}, {t:"집착함", s:4}, {t:"보통", s:3}, {t:"조절 가능", s:1}, {t:"다양한 흥미", s:0}] },

    // [PART 2: EMOTION -> 파동 안정성]
    { id: 10, category: "EMOTION", text: "사소한 자극에도 화를 내거나 짜증 섞인 반응(파동 충돌)을 보이나요?", options: [{t:"폭발적 분노", s:5}, {t:"자주 짜증", s:4}, {t:"가끔 욱함", s:3}, {t:"별로", s:1}, {t:"평온함", s:0}] },
    { id: 11, category: "EMOTION", text: "이유 없이 갑자기 울음을 터뜨리거나 감정이 극단적으로 널뛰나요?", options: [{t:"매일 그럼", s:5}, {t:"자주", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"안정적", s:0}] },
    { id: 12, category: "EMOTION", text: "표정이 굳어있고, 눈을 마주치지 못하며 위축(에너지 축소)되어 있나요?", options: [{t:"눈 못 마주침", s:5}, {t:"피하는 편", s:4}, {t:"가끔", s:3}, {t:"보통", s:1}, {t:"당당함", s:0}] },
    { id: 13, category: "EMOTION", text: "자신의 능력이나 외모를 비하하는 부정적인 말을 습관적으로 하나요?", options: [{t:"입에 달고 삼", s:5}, {t:"자주 함", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"긍정적 언어", s:0}] },
    { id: 14, category: "EMOTION", text: "미래에 대해 극도로 비관적이거나 '망했다'는 말을 자주 하나요?", options: [{t:"매우 자주", s:5}, {t:"종종", s:4}, {t:"장난처럼", s:3}, {t:"거의 안 함", s:1}, {t:"희망적", s:0}] },
    { id: 15, category: "EMOTION", text: "작은 실수에도 과도하게 불안해하거나 강박적인 완벽주의를 보이나요?", options: [{t:"강박증 수준", s:5}, {t:"심함", s:4}, {t:"약간", s:3}, {t:"보통", s:1}, {t:"유연함", s:0}] },
    { id: 16, category: "EMOTION", text: "칭찬을 해줘도 받아들이지 못하고 의심하거나 부정하나요?", options: [{t:"화내거나 부정", s:5}, {t:"어색해함", s:4}, {t:"보통", s:3}, {t:"좋아함", s:1}, {t:"감사함", s:0}] },
    { id: 17, category: "EMOTION", text: "예상치 못한 상황 변화에 적응하지 못하고 패닉에 빠지나요?", options: [{t:"패닉 상태", s:5}, {t:"많이 당황", s:4}, {t:"약간", s:3}, {t:"괜찮음", s:1}, {t:"유연함", s:0}] },
    { id: 18, category: "EMOTION", text: "감정을 말로 표현하지 못하고 꾹 참거나 억압하는 모습이 보이나요?", options: [{t:"항상 억압", s:5}, {t:"자주 참음", s:4}, {t:"가끔", s:3}, {t:"표현함", s:1}, {t:"잘 표현함", s:0}] },

    // [PART 3: SOCIAL -> 연결 필드]
    { id: 19, category: "SOCIAL", text: "친했던 친구 무리에서 떨어져 나와 혼자 지내는 시간이 늘었나요?", options: [{t:"완전 고립", s:5}, {t:"혼자 다님", s:4}, {t:"가끔 혼자", s:3}, {t:"보통", s:1}, {t:"매우 활발", s:0}] },
    { id: 20, category: "SOCIAL", text: "친구들의 말이나 눈치를 과도하게 살피고 위축되나요?", options: [{t:"공포 수준", s:5}, {t:"많이 봄", s:4}, {t:"가끔", s:3}, {t:"보통", s:1}, {t:"신경 안 씀", s:0}] },
    { id: 21, category: "SOCIAL", text: "공격적인 언어(욕설, 비하) 사용이 갑자기 늘었나요?", options: [{t:"매우 거침", s:5}, {t:"자주 사용", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"고운 말", s:0}] },
    { id: 22, category: "SOCIAL", text: "스마트폰(SNS) 속 관계에만 지나치게 집착하고 현실 관계를 회피하나요?", options: [{t:"현실 단절", s:5}, {t:"집착함", s:4}, {t:"좋아함", s:3}, {t:"보통", s:1}, {t:"균형 잡힘", s:0}] },
    { id: 23, category: "SOCIAL", text: "선생님이나 부모님에게 학교생활을 숨기거나 거짓말을 하나요?", options: [{t:"자주 속임", s:5}, {t:"숨기는 편", s:4}, {t:"가끔", s:3}, {t:"솔직함", s:1}, {t:"공유함", s:0}] },
    { id: 24, category: "SOCIAL", text: "친구들과의 갈등 상황에서 해결하지 못하고 무조건 회피하거나 참나요?", options: [{t:"항상 도망침", s:5}, {t:"회피함", s:4}, {t:"가끔", s:3}, {t:"노력함", s:1}, {t:"잘 해결함", s:0}] },
    { id: 25, category: "SOCIAL", text: "다른 사람의 감정에 공감하지 못하거나 냉담한 반응을 보이나요?", options: [{t:"매우 냉담", s:5}, {t:"무관심", s:4}, {t:"가끔", s:3}, {t:"공감함", s:1}, {t:"잘 공감함", s:0}] },
    { id: 26, category: "SOCIAL", text: "피해의식이 강해서 타인의 호의를 공격이나 비난으로 오해하나요?", options: [{t:"항상 오해", s:5}, {t:"자주", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"안 그럼", s:0}] },
    { id: 27, category: "SOCIAL", text: "규칙이나 질서를 지키는 것을 힘들어하고 반항적인 태도를 보이나요?", options: [{t:"통제 불능", s:5}, {t:"자주 어김", s:4}, {t:"가끔", s:3}, {t:"잘 지킴", s:1}, {t:"모범적", s:0}] },

    // [PART 4: PHYSICAL -> 에너지 그릇]
    { id: 28, category: "PHYSICAL", text: "이유 없이 '배 아파요', '머리 아파요'라며 보건실을 자주 찾나요?", options: [{t:"거의 매일", s:5}, {t:"자주", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"건강함", s:0}] },
    { id: 29, category: "PHYSICAL", text: "수업 시간에 계속 엎드려 자거나, 무기력하게 늘어져 있나요?", options: [{t:"시체처럼 잠", s:5}, {t:"자주 잠", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"활기참", s:0}] },
    { id: 30, category: "PHYSICAL", text: "손톱 물어뜯기, 다리 떨기 등 반복적인 신체 행동이 있나요? (방출)", options: [{t:"매우 심함", s:5}, {t:"자주 보임", s:4}, {t:"가끔", s:3}, {t:"거의 없음", s:1}, {t:"없음", s:0}] },
    { id: 31, category: "PHYSICAL", text: "급식 양이 확 줄었거나, 반대로 폭식(매점 과소비)을 하나요?", options: [{t:"거식/폭식", s:5}, {t:"변화 심함", s:4}, {t:"약간", s:3}, {t:"비슷함", s:1}, {t:"잘 먹음", s:0}] },
    { id: 32, category: "PHYSICAL", text: "안색이 창백하거나 다크서클이 심하고 피곤해 보이나요? (순환 장애)", options: [{t:"환자 같음", s:5}, {t:"피곤해 보임", s:4}, {t:"보통", s:3}, {t:"좋은 편", s:1}, {t:"혈색 좋음", s:0}] },
    { id: 33, category: "PHYSICAL", text: "작은 소리에도 깜짝 놀라거나 예민하게 반응하나요? (과민성)", options: [{t:"경기 일으킴", s:5}, {t:"자주 놀람", s:4}, {t:"가끔", s:3}, {t:"별로", s:1}, {t:"덤덤함", s:0}] },
    { id: 34, category: "PHYSICAL", text: "자주 아프거나 면역력이 떨어져 잔병치레가 늘었나요?", options: [{t:"달고 산다", s:5}, {t:"자주 아픔", s:4}, {t:"가끔", s:3}, {t:"건강함", s:1}, {t:"매우 건강", s:0}] },
    { id: 35, category: "PHYSICAL", text: "자세가 구부정하고 어깨가 잔뜩 움츠러들어 있나요? (방어적 자세)", options: [{t:"항상 위축됨", s:5}, {t:"구부정함", s:4}, {t:"보통", s:3}, {t:"바른 편", s:1}, {t:"당당함", s:0}] },
    { id: 36, category: "PHYSICAL", text: "개인 위생(머리 감기, 옷차림) 관리가 갑자기 소홀해졌나요?", options: [{t:"매우 지저분", s:5}, {t:"소홀함", s:4}, {t:"약간", s:3}, {t:"깔끔함", s:1}, {t:"단정함", s:0}] }
  ];

  const handleAnswer = (points) => {
    const category = questions[currentQ].category;
    setScoreHistory([...scoreHistory, { category, points }]);
    setScores(prev => ({ ...prev, [category]: prev[category] + points }));
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('loading');
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      const lastScore = scoreHistory[scoreHistory.length - 1];
      setScores(prev => ({ ...prev, [lastScore.category]: prev[lastScore.category] - lastScore.points }));
      setScoreHistory(prev => prev.slice(0, -1));
      setCurrentQ(currentQ - 1);
    } else {
      setStep('intro');
    }
  };

  useEffect(() => {
    if (step === 'loading') {
      let currentProgress = 0;
      const timer = setInterval(() => {
        currentProgress += 2;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
             setStep('result');
             setResultPage(1);
          }, 300);
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [step]);

  // --- 분석 로직 ---
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const maxBar = 45;

  const getReportData = () => {
    let summary = {};
    if (totalScore >= 108) { 
       summary = { level: " 적색 경보 (Critical)", title: "에너지 필드 붕괴 및 차단", desc: "현재 아이의 내면 에너지가 완전히 소진되었습니다. 외부와의 소통을 차단하고 내면으로 침잠하며 '살려달라'는 구조 신호(SOS)를 보내고 있습니다. 이는 단순한 반항이 아니라, 영혼이 감당하기 힘든 '노이즈'에 포위된 상태입니다.", color: "text-red-500", bg: "bg-red-900/20 border-red-500/50", gauge: 90 };
    } else if (totalScore >= 72) {
       summary = { level: " 황색 주의 (Warning)", title: "불안정 파동 및 전조 증상 감지", desc: "겉으로는 학교생활을 유지하고 있지만, 주파수가 불안정하게 요동치고 있습니다. 아이의 무의식 속에 '두려움'과 '혼란'의 데이터가 쌓이고 있다는 신호입니다. 이 전조 증상을 무시하면, 부정적인 패턴이 현실화될 수 있습니다.", color: "text-orange-400", bg: "bg-orange-900/20 border-orange-500/50", gauge: 60 };
    } else if (totalScore >= 36) {
       summary = { level: " 경계 (Borderline)", title: "에너지 흐름의 정체 구간", desc: "큰 문제는 없으나, 흐름이 다소 막혀 있어 활력이 떨어져 보일 수 있습니다. 작은 스트레스에도 쉽게 주파수가 흔들릴 수 있으니, 긍정적인 에너지 충전이 필요한 시기입니다.", color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-500/50", gauge: 40 };
    } else {
       summary = { level: " 청색 안정 (Stable)", title: "순조로운 에너지 흐름 유지 중", desc: "아이의 주파수가 안정적이고 맑습니다. 외부의 자극을 유연하게 받아들이고 스스로 정화할 수 있는 힘을 가지고 있습니다. 현재의 긍정적인 흐름을 타고 더 넓은 세상으로 나아갈 준비가 되어 있습니다.", color: "text-green-400", bg: "bg-green-900/20 border-green-500/50", gauge: 20 };
    }

    let details = {};
    if (totalScore < 36) {
        details = {
            type: "TYPE S. 그라운딩형 (Grounding)",
            signal: "뿌리가 깊어 흔들리지 않는 상태입니다. 아이의 내면에는 '나는 할 수 있다'는 긍정의 파동이 흐르고 있습니다.",
            future_bad: " [흐름 예측] 과도한 간섭은 오히려 잘 흐르는 기운을 막을 수 있습니다. 믿고 지켜보는 것이 최고의 양육입니다.",
            future_good: " [성장 예측] 현재의 에너지가 유지된다면, 주변 사람들을 편안하게 해주는 '치유자'나 사람을 이끄는 '리더'로 성장할 운명입니다.",
            guide_teacher: "아이의 의견을 경청해 주는 것만으로도 아이는 '존중받는다'는 에너지를 얻습니다. 결과보다 과정을 칭찬해 주세요.",
            guide_parent: "아이의 선택을 믿어주세요. 부모의 신뢰는 아이가 세상으로 뻗어 나가는 가장 강력한 '에너지 연료'입니다.",
            detail_analysis: {
                COGNITIVE: "학습 신호를 명확하게 수신하고 처리합니다. (안정)",
                EMOTION: "감정의 파도가 잔잔하며 스스로 조절합니다. (안정)",
                SOCIAL: "타인과 건강하게 에너지를 주고받습니다. (원활)",
                PHYSICAL: "에너지 그릇(몸)이 튼튼하여 활력이 넘칩니다. (양호)"
            }
        };
    } else {
        switch (maxCategory) {
        case 'COGNITIVE': details = {
            type: "TYPE C. 신호 혼선형 (Signal Jamming)",
            signal: "생각의 회로에 과부하가 걸렸습니다. 너무 많은 정보와 압박이 들어와, 정작 중요한 신호를 처리하지 못하고 '멍-'해지는 상태입니다. 안테나가 고장 난 것이 아니라, 주파수 채널이 너무 많이 열려 있는 것입니다.",
            future_bad: " [방치 시] '무기력'이라는 늪에 빠질 수 있습니다. '해도 안 된다'는 부정적 데이터가 무의식에 각인되어, 본래의 총명함을 잃게 됩니다.",
            future_good: " [조율 시] 머릿속의 노이즈(잡념)가 제거되면, 무서운 집중력으로 한 가지에 몰입하는 '천재성'이 발휘됩니다.",
            guide_teacher: "한 번에 하나씩만 요청하세요. 아이의 뇌가 쉴 수 있는 '멍 때리는 시간'을 주어야 영감이 떠오릅니다.",
            guide_parent: "스마트폰 등 전자기기를 잠시 멀리하고, 뇌를 비워주는 '디지털 디톡스'가 시급합니다. 비워야 채워집니다.",
            detail_analysis: {
                COGNITIVE: "입력된 정보가 저장되지 않고 증발하는 '누수' 발생.",
                EMOTION: "생각이 많아 감정이 억눌려 있는 상태.",
                SOCIAL: "관계 맺기에 쓸 에너지가 부족하여 소극적임.",
                PHYSICAL: "머리로 열이 쏠려 만성 두통이나 피로 호소."
            }
        }; break;
        
        case 'EMOTION': details = {
            type: "TYPE E. 파동 급류형 (Emotional Storm)",
            signal: "내면의 감정 파동이 폭풍우처럼 치고 있습니다. 아이는 지금 화가 난 것이 아니라, 감당할 수 없는 거대한 에너지에 휩쓸려 두려워하는 중입니다. '폭발'은 자신을 보호하려는 본능적인 방어막입니다.",
            future_bad: " [방치 시] 감정의 파도를 다스리지 못해 인간관계가 끊어지거나, 그 에너지가 자신을 찔러 깊은 우울감에 빠질 수 있습니다.",
            future_good: " [조율 시] 이 거친 파도를 타는 법을 배우면, 타인의 마음을 누구보다 깊게 이해하고 움직이는 '카리스마'를 갖게 됩니다.",
            guide_teacher: "'안 돼'라고 막기보다 '그랬구나'라고 파동을 맞춰주세요(동조). 공감만이 이 폭풍을 잠재울 수 있습니다.",
            guide_parent: "아이의 감정을 판단하지 말고 그저 '안전한 항구'가 되어주세요. 부모가 흔들리지 않아야 아이도 안정을 찾습니다.",
            detail_analysis: {
                COGNITIVE: "감정 기복으로 인해 집중력이 흩어지는 상태.",
                EMOTION: "내면의 화산이 활성화되어 통제 불가능.",
                SOCIAL: "충동적 언행으로 인해 관계에 마찰음 발생.",
                PHYSICAL: "가슴 답답함이나 열감을 자주 느낌."
            }
        }; break;
        case 'SOCIAL': details = {
            type: "TYPE R. 필드 차단형 (Field Blocking)",
            signal: "아이의 에너지 장(Aura)이 잔뜩 움츠러들어 있습니다. 학교라는 공간과 사람들의 기운을 '위협'으로 감지하고, 스스로 보호막을 치고 숨어버린 상태입니다. 외로운 것이 아니라, 상처받지 않기 위해 문을 잠근 것입니다.",
            future_bad: " [방치 시] 세상과의 문을 완전히 닫아걸고 '은둔형 외톨이'가 될 위험이 있습니다. 사람에 대한 불신이 깊어질 수 있습니다.",
            future_good: " [조율 시] 안전하다는 확신이 들면, 누구보다 깊고 진실된 관계를 맺습니다. 많은 친구보다 '진짜 내 편'을 만드는 능력이 있습니다.",
            guide_teacher: "무리하게 어울리게 하기보다, 선생님과의 1:1 관계에서 먼저 신뢰를 쌓아주세요. 아이가 맘 편히 숨 쉴 구멍이 되어주세요.",
            guide_parent: "친구 관계를 강요하지 마세요. 가정에서 충분히 사랑받고 있음을 확인시켜, 아이의 내면 에너지를 먼저 채워야 합니다.",
            detail_analysis: {
                COGNITIVE: "타인의 시선을 의식하느라 학습 효율 저하.",
                EMOTION: "거절에 대한 두려움과 소외감이 큼.",
                SOCIAL: "에너지 교류를 차단하고 고립을 선택함.",
                PHYSICAL: "긴장으로 인해 어깨가 굽거나 위축된 자세."
            }
        }; break;
        case 'PHYSICAL': details = {
            type: "TYPE P. 에너지 누수형 (Energy Leak)",
            signal: "마음의 그릇(몸)에 구멍이 나 에너지가 줄줄 새고 있습니다. 배가 아프고 머리가 아픈 것은 꾀병이 아닙니다. 무의식이 '이제 그만, 더 이상은 못 버텨'라고 몸을 통해 보내는 최후의 통첩입니다.",
            future_bad: " [방치 시] 만성적인 무기력증이나 원인 모를 통증에 시달려, 일상생활 자체가 힘겨워질 수 있습니다.",
            future_good: " [조율 시] 몸의 구멍이 메워지고 에너지가 차오르면, 누구보다 강한 실행력과 끈기를 보여주는 '탱크'가 됩니다.",
            guide_teacher: "아프다고 할 때 의심하지 말고 쉬게 해주세요. '인정받았다'는 느낌만으로도 아이의 통증은 절반으로 줄어듭니다.",
            guide_parent: "따뜻한 밥, 푹신한 잠자리, 가벼운 산책 등 몸을 돌보는 것에 집중하세요. 공부보다 '그라운딩(접지)'이 시급합니다.",
            detail_analysis: {
                COGNITIVE: "체력 저하로 인해 정신적 지구력이 떨어짐.",
                EMOTION: "몸이 힘들어서 짜증과 예민함이 늘어남.",
                SOCIAL: "귀찮음과 무기력으로 관계 맺기 회피.",
                PHYSICAL: "원인 불명의 통증과 수면 장애 호소."
            }
        }; break;
        
        default: details = { type: "분석 중", signal: "", future_bad: "", future_good: "", guide_teacher: "", guide_parent: "", detail_analysis: {} }; 
        }
    }
    return { summary, details };
  };

  const { summary, details } = getReportData();

  const copyResult = () => {
    const text = `[학생 시그널 분석 결과]\n상태: ${summary.level}\n유형: ${details.type}\n\n종합 소견: ${summary.desc}`;
    navigator.clipboard.writeText(text);
    alert("결과 리포트가 복사되었습니다.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center p-4 overflow-x-hidden">
      <div className="w-full max-w-lg bg-[#0F172A] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden min-h-[85vh] flex flex-col relative">
        
        {/* Header */}
        <div className="bg-slate-900/90 backdrop-blur-md p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-bold text-blue-400 flex items-center gap-2 tracking-wide">
              <Brain className="w-5 h-5"/> SIGNAL LAB
            </h1>
            <p className="text-[10px] text-slate-500 tracking-[0.2em] mt-0.5">SIGNAL ANALYZER v6.0</p>
          </div>
          <div className="bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            <span className="text-[10px] font-semibold text-blue-400 tracking-wide">Expert Only</span>
          </div>
        </div>

        {/* --- STEP 1: INTRO --- */}
        {step === 'intro' && (
          <div className="p-8 text-center flex flex-col justify-center flex-grow relative z-10">
            <div className="w-28 h-28 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative">
               <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-20"></div>
               <Radio className="w-12 h-12 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white tracking-tight">학생 행동 시그널 분석</h2>
            <p className="text-sm text-slate-400 mb-8 font-light">"행동 이면에 숨겨진 무의식 신호를 읽습니다."</p>
            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 text-left space-y-3 mb-8 backdrop-blur-sm">
               <p className="text-xs text-slate-400"><CheckCircle className="w-3 h-3 inline mr-1 text-blue-500"/> 36가지 행동 전조 증상 체크</p>
               <p className="text-xs text-slate-400"><CheckCircle className="w-3 h-3 inline mr-1 text-blue-500"/> 에너지 파동 및 흐름 분석</p>
               <p className="text-xs text-slate-400"><CheckCircle className="w-3 h-3 inline mr-1 text-blue-500"/> 교사/학부모 맞춤형 소통 가이드</p>
            </div>
            <button onClick={() => setStep('test')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 group">
              분석 시작하기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        )}

        {/* --- STEP 2: TEST --- */}
        {step === 'test' && (
          <div className="p-6 flex flex-col flex-grow relative z-10">
            <div className="flex justify-between items-center mb-6">
                 <button 
                    onClick={handleBack}
                    className="text-slate-500 hover:text-white flex items-center gap-1 text-sm"
                 >
                    <ArrowLeft className="w-4 h-4"/> 이전 문항
                 </button>
                 <span className="text-slate-500 text-xs font-mono">{currentQ + 1} / {questions.length}</span>
            </div>
            <div className="mb-8 min-h-[80px]">
              <span className="inline-block px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded mb-4 border border-slate-700 tracking-wider">{questions[currentQ].category} CHECK</span>
              <h3 className="text-lg font-bold mb-2 leading-snug text-white">{questions[currentQ].text}</h3>
            </div>
            <div className="space-y-3">
              {questions[currentQ].options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(opt.s)} className={`w-full text-left p-4 rounded-xl border transition-all active:scale-95 flex justify-between items-center group ${idx === 0 ? 'bg-blue-900/20 border-blue-500/30' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}>
                  <span className={`text-sm font-medium ${idx === 0 ? 'text-blue-300' : 'text-slate-300'}`}>{opt.t}</span>
                  {idx === 0 && <Zap className="w-3 h-3 text-blue-400 opacity-50 group-hover:opacity-100" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 3: LOADING --- */}
        {step === 'loading' && (
          <div className="p-12 text-center flex flex-col justify-center items-center flex-grow relative z-10">
            <Antenna className="text-blue-500 w-12 h-12 animate-pulse mb-6" />
            <h2 className="text-xl font-bold mb-2 text-white tracking-wide">시그널 수신 중...</h2>
            <p className="text-xs text-slate-500 mb-10 font-mono">DECODING HIDDEN SIGNALS</p>
            <div className="w-48 bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-slate-600 text-xs mt-3 font-mono">{progress}%</p>
          </div>
        )}

        {/* --- RESULT (5 PAGES) --- */}
        {step === 'result' && (
          <div className="flex flex-col flex-grow relative z-10">
            {/* Navigation Tabs */}
            <div className="flex justify-between px-2 pt-4 border-b border-slate-800 overflow-x-auto bg-[#0F172A]">
               {[1,2,3,4,5].map(num => (
                 <button key={num} onClick={() => setResultPage(num)} className={`px-3 py-3 text-xs font-bold transition-colors whitespace-nowrap ${resultPage === num ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-600 hover:text-slate-400'}`}>
                   {num === 1 ? "1.종합" : num === 2 ? "2.해석" : num === 3 ? "3.흐름" : num === 4 ? "4.가이드" : "5.상세"}
                 </button>
               ))}
            </div>
            <div className="p-6 flex-grow overflow-y-auto pb-20 animate-fade-in">
               
               {/* PAGE 1: 종합 진단 */}
               {resultPage === 1 && (
                 <>
                   <div className="text-center mb-8 pt-4">
                     <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">TOTAL SIGNAL</p>
                     <h2 className={`text-3xl font-bold mb-2 ${summary.color}`}>{summary.level}</h2>
                     <p className="text-sm font-medium text-slate-300">{summary.title}</p>
                     
                     <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden relative">
                        <div className={`h-full rounded-full ${summary.color.replace('text', 'bg')}`} style={{width: `${summary.gauge}%`}}></div>
                     </div>
                   </div>
                   <div className={`p-6 rounded-2xl border mb-6 ${summary.bg}`}>
                     <h4 className="text-xs font-bold mb-3 uppercase flex items-center gap-2 opacity-90"><AlertTriangle className="w-4 h-4"/> 시그널 종합 소견</h4>
                     <p className="text-sm leading-relaxed opacity-90 text-justify font-light">{summary.desc}</p>
                   </div>
                   <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 mb-6 space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <BarChart2 className="w-3 h-3"/> 감지된 에너지 레벨
                        </h4>
                        {[
                        { l: '신호 명료도 (인지)', s: scores.COGNITIVE, c: 'text-blue-400', b: 'bg-blue-500' },
                        { l: '감정 파동 (정서)', s: scores.EMOTION, c: 'text-red-400', b: 'bg-red-500' },
                        { l: '연결 필드 (사회)', s: scores.SOCIAL, c: 'text-purple-400', b: 'bg-purple-500' },
                        { l: '에너지 그릇 (신체)', s: scores.PHYSICAL, c: 'text-orange-400', b: 'bg-orange-500' }
                        ].map((item, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-slate-300">{item.l}</span>
                                <span className={`font-bold ${item.s >= 30 ? item.c : 'text-slate-500'}`}>{item.s}/45</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.s >= 30 ? item.b : 'bg-slate-600'}`} style={{width: `${(item.s/maxBar)*100}%`}}></div>
                            </div>
                        </div>
                        ))}
                    </div>
                 </>
               )}

               {/* PAGE 2: 시그널 심층 해석 */}
               {resultPage === 2 && (
                 <>
                   <div className="mb-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-blue-400 mb-3 font-bold tracking-wider">PRIMARY TYPE</div>
                      <h2 className="text-xl font-bold text-white mb-2">{details.type}</h2>
                   </div>
                   <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-4">
                      <h4 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2 uppercase tracking-wider"><Radio className="w-4 h-4 text-blue-500"/> 시그널 심층 해석</h4>
                      <p className="text-sm text-slate-300 leading-relaxed text-justify font-light">{details.signal}</p>
                   </div>
                   <div className="bg-black/40 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-500 text-center">"행동은 빙산의 일각입니다.<br/>우리는 그 아래의 에너지 흐름을 봅니다."</p>
                   </div>
                 </>
               )}

               {/* PAGE 3: 흐름 예측 */}
               {resultPage === 3 && (
                 <>
                   <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500"/> 미래 흐름 예측</h2>
                   
                   <div className="bg-red-900/10 p-6 rounded-2xl border border-red-900/30 mb-4">
                      <h4 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider"> 방치 시 시나리오</h4>
                      <p className="text-sm text-slate-300 leading-relaxed text-justify">{details.future_bad}</p>
                   </div>
                   <div className="bg-blue-900/10 p-6 rounded-2xl border border-blue-500/30 mb-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <h4 className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider"> 조율(Tuning) 시 시나리오</h4>
                      <p className="text-sm text-white leading-relaxed text-justify">{details.future_good}</p>
                   </div>
                 </>
               )}

               {/* PAGE 4: 행동 가이드 (TAB MODE) */}
               {resultPage === 4 && (
                 <>
                   <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-green-500"/> 맞춤 소통 가이드</h2>
                   
                   <div className="flex bg-slate-900 p-1 rounded-xl mb-4 border border-slate-800">
                       <button onClick={() => setGuideMode('teacher')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${guideMode === 'teacher' ? 'bg-slate-800 text-white shadow' : 'text-slate-500'}`}>교사 가이드</button>
                       <button onClick={() => setGuideMode('parent')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${guideMode === 'parent' ? 'bg-slate-800 text-white shadow' : 'text-slate-500'}`}>학부모 가이드</button>
                   </div>
                   {guideMode === 'teacher' ? (
                       <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-4 animate-fade-in">
                          <h4 className="text-xs font-bold text-orange-400 mb-3 uppercase tracking-wider flex items-center gap-2"><Zap className="w-3 h-3"/> Teacher's Guide</h4>
                          <div className="pl-3 border-l-2 border-orange-500/30">
                             <p className="text-sm text-slate-200 leading-relaxed">{details.guide_teacher}</p>
                          </div>
                       </div>
                   ) : (
                       <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-4 animate-fade-in">
                          <h4 className="text-xs font-bold text-green-400 mb-3 uppercase tracking-wider flex items-center gap-2"><CheckCircle className="w-3 h-3"/> Parent's Guide</h4>
                          <div className="pl-3 border-l-2 border-green-500/30">
                             <p className="text-sm text-slate-200 leading-relaxed">{details.guide_parent}</p>
                          </div>
                       </div>
                   )}
                   
                   <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                       <Pill className="w-4 h-4 text-slate-400"/>
                       <span className="text-xs text-slate-400">이 처방은 2주간 유효합니다.</span>
                   </div>
                 </>
               )}

               {/* PAGE 5: 상세 항목별 코멘트 (NEW) */}
               {resultPage === 5 && (
                 <div className="animate-fade-in">
                   <div className="mb-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-blue-400 mb-3 font-bold tracking-wider">DETAILED REVIEW</div>
                      <h2 className="text-xl font-bold text-white mb-2">영역별 상세 소견</h2>
                   </div>
                   
                   <div className="space-y-4">
                      {details.detail_analysis && Object.entries(details.detail_analysis).map(([key, val]) => (
                        <div key={key} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                           <h4 className="text-xs font-bold text-slate-400 mb-1 uppercase">{key} PART</h4>
                           <p className="text-sm text-slate-300 font-light">{val}</p>
                        </div>
                      ))}
                   </div>
                   <div className="grid grid-cols-2 gap-3 mt-8">
                      <button onClick={copyResult} className="col-span-2 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                        <Share2 className="w-4 h-4"/> 전체 리포트 공유
                      </button>
                      <button 
                        onClick={() => {
                          setStep('intro');
                          setCurrentQ(0);
                          setScores({COGNITIVE:0, EMOTION:0, SOCIAL:0, PHYSICAL:0});
                          setScoreHistory([]);
                          setResultPage(1);
                        }}
                        className="col-span-2 border border-slate-700 text-slate-400 py-3 rounded-xl text-xs hover:text-white"
                      >
                        <RefreshCw className="w-3 h-3 inline"/> 처음으로 돌아가기
                      </button>
                   </div>
                 </div>
               )}
            
            </div>
            {/* Bottom Next Button */}
            {resultPage < 5 && (
               <div className="absolute bottom-6 left-0 w-full px-6">
                  <button onClick={() => setResultPage(resultPage + 1)} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 shadow-lg">
                    다음 페이지 보기 <ChevronRight className="w-4 h-4"/>
                  </button>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalLabFinal;

