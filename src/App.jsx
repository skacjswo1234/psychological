import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UltimaFrequencyTest from '../projects/signal-oracle/App';
import SignalLabFinal from '../projects/signal-lab/App';
import YouthSignalTest from '../projects/youth-signal/App';
import AdultSignalTest from '../projects/adult-signal/App';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/signal-oracle" element={<UltimaFrequencyTest />} />
        <Route path="/project/signal-lab" element={<SignalLabFinal />} />
        <Route path="/project/youth-signal" element={<YouthSignalTest />} />
        <Route path="/project/adult-signal" element={<AdultSignalTest />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
