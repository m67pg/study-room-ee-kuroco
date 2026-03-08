import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

// デバッグ用：認証を無視してHomeを出す
// ビルドエラーを防ぐため、使っていない Login と Navigate のインポートを削除しました
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;