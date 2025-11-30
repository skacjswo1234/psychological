import React, { useState, useEffect } from 'react';
import { Brain, Zap, Scale, Activity, ChevronRight, RefreshCw, Share2, Star, Sparkles, BarChart2 } from 'lucide-react';
import './index.css';

const YouthSignalTest = () => {
  const [step, setStep] = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ S: 0, A: 0, B: 0, C: 0 });
  const [progress, setProgress] = useState(0);

  // 16문항 (순서대로 S, A, B, C 반복 패턴)
  const questions = [
    { id: 1, type: 'S', text: "표정·분위기 변화에 민감하다." },
    { id: 2, type: 'A', text: "새로운 활동·도전에 설렌다." },
    { id: 3, type: 'B', text: "갈등 시 자연스럽게 중재한다." },
    { id: 4, type: 'C', text: "잠들기 전에 생각이 많아진다." },
    { id: 5, type: 'S', text: "누가 기분 나쁘면 내가 원인인가 고민한다." },
    { id: 6, type: 'A', text: "정체된 느낌이 들면 변화를 찾는다." },
    { id: 7, type: 'B', text: "손해를 봐도 분위기가 편하면 좋다." },
    { id: 8, type: 'C', text: "일어나지 않은 상황도 미리 걱정한다." },
    { id: 9, type: 'S', text: "분위기에 따라 기운이 크게 바뀐다." },
    { id: 10, type: 'A', text: "새로운 아이디어를 실행해 본 적 있다." },
    { id: 11, type: 'B', text: "힘들어 보이는 사람을 외면 못 한다." },
    { id: 12, type: 'C', text: "지나간 말·상황을 자꾸 되새긴다." },
    { id: 13, type: 'S', text: "말투·표정에 쉽게 상처받는다." },
    { id: 14, type: 'A', text: "실패해도 다시 도전하는 편이다." },
    { id: 15, type: 'B', text: "누가 서운해하지 않게 말투를 조절한다." },
    { id: 16, type: 'C', text: "기분이 좋다가도 갑자기 불안해질 때가 있다." }
  ];

  // 4점 척도
  const options = [
    { t: "매우 그렇다", s: 4 },
    { t: "자주 그렇다", s: 3 },
    { t: "가끔 그렇다", s: 2 },
    { t: "전혀 아니다", s: 1 }
  ];

  const handleAnswer = (points) => {
    const currentType = questions[currentQ].type;
    setScores(prev => ({ ...prev, [currentType]: prev[currentType] + points }));
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('loading');
    }
  };

  // 로딩 로직 수정 (안정성 강화)
  useEffect(() => {
    if (step === 'loading') {
      let curr = 0;
      const timer = setInterval(() => {
        curr += 2;
        setProgress(curr);
        if (curr >= 100) {
          clearInterval(timer);
          setTimeout(() => setStep('result'), 500);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [step]);

  // 결과 데이터 계산
  const getResultData = () => {
    // 최고 점수 유형 찾기 (동점일 경우 순서대로 우선순위)
    const maxType = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
    
    const types = {
      S: {
        label: "TYPE S (Sensor) · 감정 공감형",
        keyword: "예민함 · 공감력 · 분위기 감지 · 감정파동",
        desc: "감정이 요동치는 시기는 대개 성장의 전조입니다. 예민함은 '위험'이 아니라 '감각이 열린 상태'에 가깝습니다.",
        features: ["작은 변화도 바로 알아차린다.", "공감 능력이 좋아 관계는 넓지만 쉽게 지친다.", "감정 기복이 크고 스스로도 통제가 어렵다."],
        strength: ["인간관계 센스가 뛰어나다.", "예술적 감수성과 섬세한 표현력.", "상대의 마음을 읽는 높은 직관력."],
        weakness: ["감정에 과몰입해 스스로를 소진시킨다.", "불안을 확대 해석하며 자책한다."],
        solution: "\"감정 거리두기 · 생각 멈춤 연습\"이 핵심입니다. 혼자 숨 고를 수 있는 시간과, 나를 있는 그대로 인정해주는 한 사람만 있어도 당신의 예민함은 강력한 공감력 자산이 됩니다.",
        color: "text-purple-400",
        icon: <Activity className="w-8 h-8"/>
      },
      A: {
        label: "TYPE A (Action) · 도전 추진형",
        keyword: "도전 · 변화 · 속도 · 실행력",
        desc: "지금은 '변화의 초입'에 있을 가능성이 큽니다. 요즘 느끼는 불안과 조급함은 실패의 신호라기보다 '방향을 바꾸라'는 우주의 신호입니다.",
        features: ["새로운 변화에 강하다.", "정체되면 금방 지루해한다.", "하고 싶은 게 많고 에너지가 폭발형이다."],
        strength: ["생각보다 먼저 행동으로 옮기는 실행력.", "문제 해결 속도가 빠르다.", "상황을 이끄는 리더십."],
        weakness: ["충동적으로 결정해 후회할 수 있다.", "속도에 비해 디테일을 놓칠 수 있다."],
        solution: "\"속도를 조절하며 방향성을 명확히 하는 시기\"입니다. 지금 충분히 잘하고 있다는 확신, 도전과 휴식의 리듬을 만들어주는 환경이 당신의 에너지를 건강하게 확장시켜 줍니다.",
        color: "text-red-400",
        icon: <Zap className="w-8 h-8"/>
      },
      B: {
        label: "TYPE B (Balance) · 조율·중재형",
        keyword: "균형 · 관계 감각 · 안정 · 배려",
        desc: "관계·학교·가정에서 '새로운 역할 변화'가 올 수 있는 시기입니다. 보이지 않는 곳에서 균형을 맞추느라 힘들었던 시간이, 앞으로는 강점으로 작용합니다.",
        features: ["모두와 큰 갈등 없이 지내는 편이다.", "중재자 역할을 자주 맡는다.", "손해를 보더라도 관계가 편하면 만족한다."],
        strength: ["조율하고 중재하는 능력이 뛰어나다.", "공감과 이성의 균형감각.", "묵직한 신뢰감을 주는 태도."],
        weakness: ["지나친 양보로 자기 욕구를 잃기 쉽다.", "감정을 쌓아두다가 한 번에 무너질 수 있다."],
        solution: "\"경계선 세우기 · 감정 솔직하기\"가 중요합니다. '그건 네 책임이 아니야', '너도 싫다고 해도 돼'라는 허용이 당신에게는 큰 위로이자 해방이 됩니다.",
        color: "text-green-400",
        icon: <Scale className="w-8 h-8"/>
      },
      C: {
        label: "TYPE C (Chaos) · 생각·불안형",
        keyword: "생각 많음 · 불안감 · 예측 · 분석",
        desc: "지금의 혼란은 망가진 상태가 아니라, 사실 '정리 재구성' 단계일 수 있습니다. 기존 방식과 생각이 수명을 다해 가고 있다는 신호입니다.",
        features: ["사소한 말에도 오래 생각한다.", "미래 걱정이 많고, 시나리오가 반복된다.", "감정보다 머리가 먼저 움직인다."],
        strength: ["상황 분석과 구조 파악 능력이 뛰어나다.", "깊이 있는 통찰과 아이디어.", "위험을 미리 감지하고 대비한다."],
        weakness: ["과도한 걱정으로 시작도 못 할 수 있다.", "자기비난 루프에 빠지기 쉽다."],
        solution: "\"확신의 근거 모으기 · 작은 실천 하나 시작하기\"입니다. 머릿속 생각을 노트에 적거나 말로 정리하는 것만으로도 불안이 줄어듭니다. 당신의 분석력은 강력한 무기입니다.",
        color: "text-blue-400",
        icon: <Brain className="w-8 h-8"/>
      }
    };

    return types[maxType] || types.S;
  };

  const result = getResultData();

  const copyResult = () => {
    const text = `[청소년 시그널 타입 분석]\n결과: ${result.label}\n키워드: ${result.keyword}\n\n솔루션: ${result.solution}`;
    navigator.clipboard.writeText(text);
    alert("결과가 복사되었습니다.");
  };

  return (
    <div className="min-h-screen bg-[#050509] text-[#f5f5f7] font-sans flex flex-col items-center p-4 overflow-x-hidden">
      <div className="w-full max-w-lg bg-[#101018] rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.7)] border border-white/5 overflow-hidden min-h-[85vh] flex flex-col relative">
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(213,178,90,0.15),transparent_60%)] pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/10 relative z-10 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#d5b25a] shadow-[0_0_8px_rgba(213,178,90,0.9)]"></div>
              <span className="text-xs text-[#d5b25a] font-bold tracking-widest uppercase">Future Pattern Lab</span>
           </div>
           <span className="text-[10px] text-gray-500">YOUTH TEST</span>
        </div>

        {/* STEP 1: INTRO */}
        {step === 'intro' && (
          <div className="p-8 flex flex-col justify-center flex-grow relative z-10">
            <h1 className="text-3xl font-bold mb-4 leading-tight text-white">청소년<br/><span className="text-[#d5b25a]">시그널 타입</span> 테스트</h1>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              요즘 아이의 예민함, 감정 기복, 반복되는 패턴이 단순한 성격이 아니라 어떤 <strong>'흐름의 신호'</strong>인지 확인하는 4타입 테스트입니다.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                 <span className="text-xs text-gray-400 block mb-1">S TYPE</span>
                 <span className="text-sm font-bold text-purple-300">감정/공감</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                 <span className="text-xs text-gray-400 block mb-1">A TYPE</span>
                 <span className="text-sm font-bold text-red-300">도전/행동</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                 <span className="text-xs text-gray-400 block mb-1">B TYPE</span>
                 <span className="text-sm font-bold text-green-300">조율/중재</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                 <span className="text-xs text-gray-400 block mb-1">C TYPE</span>
                 <span className="text-sm font-bold text-blue-300">생각/분석</span>
              </div>
            </div>
            <button 
              onClick={() => setStep('test')}
              className="w-full bg-gradient-to-br from-[#f8e2a0] to-[#d5b25a] text-black font-bold py-4 rounded-full shadow-[0_10px_26px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              내 시그널 분석하기 <ChevronRight className="w-4 h-4"/>
            </button>
            <p className="mt-4 text-[10px] text-gray-600 text-center">※ 16문항 / 약 3분 소요</p>
          </div>
        )}

        {/* STEP 2: TEST */}
        {step === 'test' && (
          <div className="p-6 flex flex-col flex-grow relative z-10 justify-center">
            <div className="mb-8">
              <div className="flex justify-between text-xs mb-3 text-gray-500 font-medium">
                <span className="text-[#d5b25a]">Q.{currentQ + 1}</span>
                <span>{currentQ + 1} / {questions.length}</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-[#d5b25a] transition-all duration-300 ease-out" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-2 leading-snug text-white">{questions[currentQ].text}</h3>
            </div>
            <div className="space-y-3">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.s)}
                  className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-[#d5b25a]/20 border border-white/10 hover:border-[#d5b25a] transition-all active:scale-95 flex justify-between items-center group"
                >
                  <span className="text-sm text-gray-300 group-hover:text-[#d5b25a] transition-colors">{opt.t}</span>
                  <div className="w-4 h-4 rounded-full border-2 border-gray-600 group-hover:border-[#d5b25a] group-hover:bg-[#d5b25a]"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: LOADING */}
        {step === 'loading' && (
          <div className="p-12 text-center flex flex-col justify-center items-center flex-grow relative z-10">
            <RefreshCw className="text-[#d5b25a] w-10 h-10 animate-spin mb-6" />
            <h2 className="text-xl font-bold mb-2 text-white tracking-wide">패턴 분석 중...</h2>
            <p className="text-xs text-gray-500 mb-8">S.A.B.C 알고리즘 계산 중</p>
            <div className="w-48 bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-[#d5b25a] transition-all duration-75" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 'result' && (
          <div className="p-6 animate-fade-in pb-10 relative z-10 overflow-y-auto h-full">
            <div className="mb-6 text-center">
               <span className="inline-block px-3 py-1 rounded-full bg-[#d5b25a]/20 text-[#d5b25a] text-[10px] font-bold border border-[#d5b25a]/30 mb-4">ANALYSIS REPORT</span>
               <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center ${result.color}`}>
                 {result.icon}
               </div>
               <h2 className={`text-2xl font-bold mb-1 ${result.color}`}>{result.label.split('·')[0]}</h2>
               <p className="text-sm text-gray-400">{result.label.split('·')[1]}</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
               <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Current Flow</h4>
               <p className="text-sm text-gray-300 leading-relaxed text-justify">{result.desc}</p>
            </div>
            <div className="space-y-6 mb-8">
               <div>
                  <h4 className="text-sm font-bold text-[#d5b25a] mb-2 flex items-center gap-2"><Star className="w-3 h-3"/> 강점 (Strength)</h4>
                  <ul className="space-y-2">
                     {result.strength.map((item, i) => (
                        <li key={i} className="text-xs text-gray-400 pl-3 border-l border-gray-700">{item}</li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2"><Activity className="w-3 h-3"/> 주의점 (Caution)</h4>
                   <ul className="space-y-2">
                     {result.weakness.map((item, i) => (
                        <li key={i} className="text-xs text-gray-500 pl-3 border-l border-gray-800">{item}</li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className="bg-gradient-to-br from-[#d5b25a]/20 to-transparent p-6 rounded-2xl border border-[#d5b25a]/30 mb-8">
               <h4 className="text-sm font-bold text-[#d5b25a] mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4"/> 시그널 솔루션</h4>
               <p className="text-sm text-gray-200 leading-relaxed">{result.solution}</p>
            </div>

            {/* Score Chart */}
            <div className="bg-black/30 p-5 rounded-xl mb-8">
                <h4 className="text-[10px] text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2"><BarChart2 className="w-3 h-3"/> 타입별 점수 분포</h4>
                <div className="flex items-end gap-2 h-24 justify-between px-2">
                    {Object.entries(scores).map(([key, val]) => (
                        <div key={key} className="flex flex-col items-center gap-1 w-1/4">
                            <span className="text-[10px] text-gray-400">{val}</span>
                            <div className={`w-full rounded-t ${key === result.label[5] ? 'bg-[#d5b25a]' : 'bg-gray-800'}`} style={{height: `${(val/16)*100}%`}}></div>
                            <span className="text-[10px] font-bold text-gray-500">{key}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-3">
                <button onClick={copyResult} className="flex-1 bg-[#d5b25a] hover:bg-[#c4a24f] text-black py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg">
                    <Share2 className="w-4 h-4"/> 결과 공유
                </button>
                <button 
                    onClick={() => {
                        setStep('intro');
                        setCurrentQ(0);
                        setScores({S:0, A:0, B:0, C:0});
                    }}
                    className="flex-1 border border-white/10 text-gray-400 py-4 rounded-xl text-sm hover:bg-white/5 transition"
                >
                    <RefreshCw className="w-4 h-4 inline mr-1"/> 다시 하기
                </button>
            </div>
            
            <p className="mt-6 text-[10px] text-gray-600 text-center leading-relaxed">
                이 도구는 의학적 진단이 아니며,<br/>청소년의 흐름을 이해하기 위한 참고용 리포트입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouthSignalTest;

