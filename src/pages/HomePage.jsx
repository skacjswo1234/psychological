import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, ArrowRight, Radio, Activity, Scale } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const projects = [
    {
      id: 'signal-oracle',
      title: 'Signal Oracle',
      subtitle: '운명 정밀 종합 검진',
      description: '6대 영역 30문항으로 당신의 현재 주파수를 정밀 분석합니다',
      icon: <Brain className="w-8 h-8 text-yellow-500" />,
      gradient: 'from-yellow-900/20 to-yellow-800/10',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-400',
      hoverColor: 'yellow'
    },
    {
      id: 'signal-lab',
      title: 'Signal Lab',
      subtitle: '학생 행동 시그널 분석',
      description: '36가지 행동 전조 증상 체크 및 에너지 파동 분석',
      icon: <Radio className="w-8 h-8 text-blue-500" />,
      gradient: 'from-blue-900/20 to-blue-800/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      hoverColor: 'blue'
    },
    {
      id: 'youth-signal',
      title: 'Youth Signal',
      subtitle: '청소년 시그널 타입 테스트',
      description: '16문항으로 청소년의 감정·행동 패턴을 4가지 타입으로 분석',
      icon: <Activity className="w-8 h-8 text-amber-500" />,
      gradient: 'from-amber-900/20 to-amber-800/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      hoverColor: 'amber'
    },
    {
      id: 'adult-signal',
      title: 'Adult Signal',
      subtitle: '성인 시그널 타입 테스트',
      description: '25문항으로 직장·관계·돈 속에서 나의 무의식 시그널을 분석',
      icon: <Scale className="w-8 h-8 text-amber-600" />,
      gradient: 'from-amber-900/20 to-amber-800/10',
      borderColor: 'border-amber-600/30',
      textColor: 'text-amber-500',
      hoverColor: 'amber'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* 배경 그라데이션 */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]"></div>
      
      <div className="relative z-10 w-full max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center p-6">
        {/* 프로필 섹션 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 rounded-full border border-gray-800 mb-6 relative group">
            <div className="absolute inset-0 rounded-full border border-yellow-500/20 animate-ping opacity-20"></div>
            <Sparkles className="w-16 h-16 text-yellow-400 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-wide">시그널 오라클에 오신것을 환영합니다</h1>
        </div>

        {/* 프로젝트 카드 섹션 */}
        <div className="w-full space-y-4 mb-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`block group relative overflow-hidden rounded-2xl border ${project.borderColor} bg-gradient-to-br ${project.gradient} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]`}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-black/40 border border-gray-800">
                    {project.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h2 className={`text-xl font-bold mb-1 ${project.textColor}`}>
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-300 mb-1">{project.subtitle}</p>
                    <p className="text-xs text-gray-500">{project.description}</p>
                  </div>
                </div>
                <div className="ml-4">
                  {project.id === 'signal-oracle' ? (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                  ) : project.id === 'signal-lab' ? (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  ) : project.id === 'youth-signal' ? (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </div>
              
              {/* 호버 효과 */}
              <div className={`absolute inset-0 bg-gradient-to-r ${
                project.id === 'signal-oracle' ? 'from-yellow-500/0 via-yellow-500/5 to-yellow-500/0' : 
                project.id === 'signal-lab' ? 'from-blue-500/0 via-blue-500/5 to-blue-500/0' : 
                project.id === 'youth-signal' ? 'from-amber-500/0 via-amber-500/5 to-amber-500/0' :
                'from-amber-600/0 via-amber-600/5 to-amber-600/0'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </Link>
          ))}
        </div>

        {/* 푸터 */}
        <div className="text-center text-xs text-gray-600 mt-8">
          <p>각 프로젝트는 독립적으로 작동합니다</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

