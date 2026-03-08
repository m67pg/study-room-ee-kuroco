import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  // セッションストレージからトークンを取得
  // ブラウザをリロードしてもここが再評価されます
  const token = sessionStorage.getItem('kuroco_token');
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        {/* 1. ルート (/) の挙動 */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Home /> : <Navigate to="/Login" replace />
          } 
        />
        
        {/* 2. ログイン画面 (/Login) */}
        {/* すでにログイン済みでここに来た場合はルート(/)へ戻す */}
        <Route 
          path="/Login" 
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/" replace />
          } 
        />

        {/* 3. 以前の残骸や打ち間違いなど、あらゆるURLをルートに集約 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;