import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        
        {/* ルート(/)にアクセスしたら /Login にリダイレクト、またはHomeを表示 */}
        <Route path="/" element={<Navigate to="/Login" />} />
        
        {/* 今後作るHOME画面用 */}
        {/* <Route path="/Home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;