import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  // ログイン状態のチェック（トークンの有無）
  const isAuthenticated = !!sessionStorage.getItem('kuroco_token');

  return (
    <Router>
      <Routes>
        {/* ドメイン直下をHomeに設定 */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/Login" />} 
        />
        
        {/* ログイン画面 */}
        <Route path="/Login" element={<Login />} />

        {/* 以前の /Home も残しておくか、不要なら削除してOKです */}
        <Route 
          path="/Home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/Login" />} 
        />

        {/* 定義されていないURLに来た場合はルートへ飛ばす */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;