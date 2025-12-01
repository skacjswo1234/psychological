import React, { useState } from 'react';
import './index.css';

const AdultSignalTest = () => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState(null);
  const [scores, setScores] = useState({ S: 0, A: 0, B: 0, C: 0 });
  const [error, setError] = useState(false);

  // 25문항 데이터 (S:감정/직관, A:도전/실행, B:조율/관계, C:분석/신중)
  const questions = [
    { t: "S", q: "누군가의 말투나 표정이 미세하게 달라지면 바로 기분의 변화를 감지한다." },
    { t: "A", q: "새로운 일·사업·프로젝트 이야기를 들으면 위험보다 가능성이 먼저 떠오른다." },
    { t: "B", q: "서로 부딪치는 사람들 사이에서 자연스럽게 중재자 역할을 맡게 된다." },
    { t: "C", q: "중요한 결정을 앞두면 수십 가지 경우의 수를 머릿속에서 시뮬레이션한다." },
    { t: "S", q: "타인의 감정이 내 몸으로 옮겨오는 것처럼, 상대가 힘들면 나도 금방 지쳐버린다." },
    { t: "A", q: "삶이 너무 평온하고 변화가 없으면 '이대로 괜찮은 걸까?' 불안해진다." },
    { t: "B", q: "내가 조금 손해를 보더라도 분위기가 편안하면 그쪽을 선택하는 편이다." },
    { t: "C", q: "아직 일어나지 않은 최악의 상황까지 미리 상상하며 대비하려는 습관이 있다." },
    { t: "S", q: "공간의 공기, 사람의 눈빛, 말하지 않은 분위기까지 신경에 와 닿는 편이다." },
    { t: "A", q: "아이디어가 떠오르면 완벽히 준비되기 전에라도 일단 한 번 해보는 쪽이다." },
    { t: "B", q: "팀이나 모임에서 서로의 입장을 듣고, 균형 잡힌 결론으로 정리하는 일을 자주 한다." },
    { t: "C", q: "이미 끝난 대화나 사건을 며칠 동안 계속 떠올리며 '그때 왜 그랬지?' 되짚어본다." },
    { t: "S", q: "칭찬과 비난 중 비난 한마디가 훨씬 오래 마음에 남아 계속 신경 쓰인다." },
    { t: "A", q: "바쁘고 할 일이 많을수록 오히려 에너지가 살아나는 느낌이 든다." },
    { t: "B", q: "상대가 서운해하지 않도록, 말 한마디에도 단어·톤을 조절하는 편이다." },
    { t: "C", q: "결정 하나를 내리기까지 지나치게 많은 정보를 찾고, 그 때문에 피곤해질 때가 많다." },
    { t: "S", q: "사람들 사이에서 보이지 않는 긴장감이나 미묘한 거리감이 느껴지면 마음이 불편해진다." },
    { t: "A", q: "삶이 크게 흔들릴 때마다, 오히려 '이걸 계기로 한 번 바꿔볼까?' 하는 마음이 든다." },
    { t: "B", q: "가족·친구·동료들 사이에서 '네가 있어서 다행이야'라는 말을 자주 듣는 편이다." },
    { t: "C", q: "잠들기 전이나 새벽에 미래에 대한 걱정과 계산으로 머리가 멈추지 않을 때가 자주 있다." },
    { t: "S", q: "상대방의 말이 논리적으로 맞지 않거나 진심이 느껴지지 않으면 몸이 먼저 거부감을 느낀다." },
    { t: "A", q: "변화가 두렵긴 해도, 결국 '안 해보고 후회하는 것'이 더 싫다고 느낀다." },
    { t: "B", q: "어느 한쪽 편을 확실히 드는 것보다, 양쪽의 상황을 함께 고려하려는 편이다." },
    { t: "C", q: "하루를 돌아보면, '왜 그렇게 말했지? 왜 그렇게 행동했지?'라는 자기 분석을 자주 한다." },
    { t: "S", q: "사람 많은 곳에서 오래 있다 오면, 마치 배터리가 다 방전된 것처럼 며칠은 혼자 있어야 충전된다." }
  ];

  // 타입별 결과 상세 내용
  const resultData = {
    S: {
      title: "TYPE S - Sensor (감정·공감형)",
      keyword: "직관 · 공감 · 예술성 · 감정파동",
      current: "최근 감정 기복이 크고 사소한 말에도 상처가 오래 남나요? 이는 붕괴가 아니라 당신의 감각이 확장되는 '성장의 전조'입니다. 타인의 감정을 내 것처럼 느끼는 능력이 극대화된 상태입니다.",
      emotion: "타인의 감정이 그대로 복사되어 들어옵니다. 기분이 좋을 땐 천국, 나쁠 땐 지옥을 오갑니다.",
      relation: "'좋은 사람'이 되려다 에너지가 고갈됩니다. 손절하고 싶은데 미안해서 못 하는 경우가 많습니다.",
      work: "감정이 안정되면 천재적인 생산성을 보이지만, 기분이 상하면 업무가 마비됩니다. 예술/상담/케어 분야에 강합니다.",
      burnout: "남을 돕다가 가장 먼저 지칩니다. '괜찮아'라고 말하지만 속은 곪아있을 수 있습니다.",
      solution: "1. 감정 분리수거 (저건 내 감정이 아니다) <br> 2. 혼자만의 동굴 시간 확보 <br> 3. 예민함을 '직관'으로 승화시키기"
    },
    A: {
      title: "TYPE A - Action (도전·추진형)",
      keyword: "실행 · 돌파 · 속도 · 리더십",
      current: "요즘 느끼는 불안과 조급함은 실패의 신호가 아닙니다. '판을 바꾸라'는 강력한 전조 현상입니다. 정체된 상황을 견디지 못하고 새로운 흐름을 타려는 에너지가 끓어오르고 있습니다.",
      emotion: "일이 잘 풀리면 행복하고, 막히면 화가 납니다. 감정보다 행동이 먼저 나가는 스타일입니다.",
      relation: "리더십이 있지만, 속도가 느린 사람을 답답해합니다. 직설적인 화법으로 오해를 사기도 합니다.",
      work: "위기를 기회로 만드는 승부사입니다. 시작은 빠르지만 마무리가 약할 수 있으니 조력자가 필요합니다.",
      burnout: "멈추면 불안해서 계속 달리다가 방전됩니다. 자신이 지친 줄도 모르고 달리다 갑자기 쓰러질 수 있습니다.",
      solution: "1. 의도적인 '멈춤' 시간 갖기 <br> 2. 속도보다 방향 점검하기 <br> 3. 작은 성취를 기록하며 불안 잠재우기"
    },
    B: {
      title: "TYPE B - Balance (조율·중재형)",
      keyword: "안정 · 평화 · 중재 · 신뢰",
      current: "관계나 조직에서 새로운 역할이 부여되는 시기입니다. 겉으로는 평온해 보이지만, 속으로는 사람 사이의 균형을 맞추느라 엄청난 에너지를 쓰고 있습니다.",
      emotion: "평화를 위해 내 감정을 억누릅니다. 화를 내기보다 참거나 스스로를 설득하는 편입니다.",
      relation: "모두에게 좋은 사람이지만, 정작 내 속마음을 털어놓을 '진짜 내 편'은 적을 수 있습니다.",
      work: "팀워크의 핵심입니다. 갈등을 중재하고 조직을 단단하게 만듭니다. 단, 거절을 못 해 일이 몰릴 수 있습니다.",
      burnout: "참고 참다가 한 번에 터지거나, 조용히 관계를 끊어버립니다 (도어슬램).",
      solution: "1. 거절하는 연습 (작은 것부터) <br> 2. 내 감정 솔직하게 표현하기 <br> 3. '모두를 만족시킬 순 없다'는 사실 받아들이기"
    },
    C: {
      title: "TYPE C - Chaos (분석·설계형)",
      keyword: "통찰 · 분석 · 완벽주의 · 시뮬레이션",
      current: "지금의 혼란은 망가진 게 아니라 '재부팅' 중인 상태입니다. 기존의 방식이 더 이상 통하지 않아, 뇌가 새로운 전략을 짜기 위해 데이터를 맹렬히 분석하고 있습니다.",
      emotion: "감정을 분석하려고 합니다. '내가 왜 슬프지?'를 따지다가 감정을 놓쳐버리거나, 생각이 꼬리에 꼬리를 뭅니다.",
      relation: "깊이 있는 대화를 선호합니다. 가벼운 잡담이나 비논리적인 사람에게 에너지를 뺏깁니다.",
      work: "계획과 전략의 대가입니다. 하지만 완벽하게 준비하려다 시작 타이밍을 놓칠 수 있습니다.",
      burnout: "생각 과부하(Overthinking)로 인해 아무것도 안 해도 뇌가 지쳐있습니다. 수면 장애가 올 수 있습니다.",
      solution: "1. 생각 멈추고 일단 저지르기 (실행) <br> 2. 생각을 글로 적어 뇌에서 꺼내기 <br> 3. '이 정도면 충분해'라고 말해주기"
    }
  };

  const handleAnswer = (qIndex, value) => {
    setAnswers(prev => ({ ...prev, [qIndex]: parseInt(value) }));
    setError(false);
  };

  const calculateResult = () => {
    // 모든 질문에 답했는지 확인
    if (Object.keys(answers).length !== questions.length) {
      setError(true);
      return;
    }

    // 점수 계산
    const newScores = { S: 0, A: 0, B: 0, C: 0 };
    questions.forEach((item, index) => {
      if (answers[index]) {
        newScores[item.t] += answers[index];
      }
    });

    // 최고 점수 타입 찾기
    let maxScore = -1;
    let maxType = 'S'; // 기본값 설정
    for (const type in newScores) {
      if (newScores[type] > maxScore) {
        maxScore = newScores[type];
        maxType = type;
      }
    }

    // 모든 점수가 0이거나 maxType이 없으면 에러 처리
    if (maxScore <= 0 || !maxType) {
      setError(true);
      return;
    }

    setScores(newScores);
    setResultType(maxType);
    setShowResult(true);
    window.scrollTo(0, 0);
  };

  const shareResult = () => {
    const data = resultData[resultType];
    const text = `[시그널 오라클 성인 타입 분석]\n나의 결과: ${data.title}\n\n지금 내 무의식의 시그널을 확인해보세요.`;
    
    if (navigator.share) {
      navigator.share({
        title: '시그널 오라클',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("결과가 복사되었습니다! (화면 캡처를 추천합니다)");
    }
  };

  if (showResult && resultType) {
    const data = resultData[resultType];
    return (
      <div className="adult-signal-app">
        <div className="card">
          <div className="badge">
            <div className="badge-dot"></div>
            분석 완료
          </div>
          <div className="result-box">
            <span className="type-tag">{resultType} Type</span>
            <h2 className="result-title">{data.title}</h2>
            <p className="result-keywords">{data.keyword}</p>
            
            <div className="analysis-block">
              <div className="analysis-title"> 현재 흐름 (Current Flow)</div>
              <div className="analysis-content">{data.current}</div>
            </div>
            <div className="analysis-block">
              <div className="analysis-title"> 감정 & 관계 (Emotion)</div>
              <ul className="analysis-list">
                <li>{data.emotion}</li>
                <li>{data.relation}</li>
              </ul>
            </div>
            <div className="analysis-block">
              <div className="analysis-title"> 일 & 번아웃 (Work)</div>
              <ul className="analysis-list">
                <li>{data.work}</li>
                <li>{data.burnout}</li>
              </ul>
            </div>
            <div className="analysis-block">
              <div className="analysis-title"> 시그널 솔루션 (Solution)</div>
              <div className="analysis-content solution-text" dangerouslySetInnerHTML={{ __html: data.solution }}></div>
            </div>

            {/* 점수 차트 */}
            <div className="score-chart">
              <div className="chart-bar-group">
                <div className="chart-bar-bg">
                  <div className="chart-bar-fill" style={{height: `${(scores.S/28)*100}%`}}></div>
                </div>
                <span className="chart-label">S</span>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-bg">
                  <div className="chart-bar-fill" style={{height: `${(scores.A/28)*100}%`}}></div>
                </div>
                <span className="chart-label">A</span>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-bg">
                  <div className="chart-bar-fill" style={{height: `${(scores.B/28)*100}%`}}></div>
                </div>
                <span className="chart-label">B</span>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-bg">
                  <div className="chart-bar-fill" style={{height: `${(scores.C/28)*100}%`}}></div>
                </div>
                <span className="chart-label">C</span>
              </div>
            </div>
            <button className="btn-share" onClick={shareResult}>결과 공유하기</button>
            <div className="btn-retry" onClick={() => window.location.reload()}>다시 검사하기</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adult-signal-app">
      <div className="card">
        <div className="badge">
          <div className="badge-dot"></div>
          Signal Oracle · Business & Life
        </div>
        <h1>성인 시그널 타입 테스트</h1>
        <p className="subtitle">
          직장, 관계, 돈, 그리고 나.<br/>
          복잡한 현실 속에서 나의 무의식은 어떤 <strong>시그널</strong>을 보내고 있을까요?<br/>
          <strong>4가지 타입(S/A/B/C)</strong>으로 당신의 현재 상태를 분석합니다.
        </p>
        <div className="divider"></div>
        <div className="section-header">Q1 ~ Q25 진단 문항</div>
        
        <div id="questions-container">
          {questions.map((item, index) => (
            <div key={index} className="question-item">
              <div className="q-header">
                <span className="q-num">Q{index + 1}</span>
                <span>{item.t} Type Check</span>
              </div>
              <div className="q-text">{item.q}</div>
              <div className="scale-container">
                <div className="scale-options">
                  {[1, 2, 3, 4].map(value => (
                    <label key={value} className="radio-label">
                      <input 
                        type="radio" 
                        name={`q${index}`} 
                        value={value}
                        checked={answers[index] === value}
                        onChange={() => handleAnswer(index, value)}
                      />
                      <div className="radio-btn">{value}</div>
                    </label>
                  ))}
                </div>
                <div className="scale-labels">
                  <span>전혀 아님</span>
                  <span>매우 그렇다</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="error-msg">모든 문항에 체크해주세요.</div>}
        <button className="btn-primary" onClick={calculateResult}>결과 분석하기</button>
      </div>
    </div>
  );
};

export default AdultSignalTest;

