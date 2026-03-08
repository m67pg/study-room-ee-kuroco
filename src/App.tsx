import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  // ログイン状態のチェック
  const isAuthenticated = !!sessionStorage.getItem('kuroco_token');

  return (
    <Router>
      <Routes>
        {/* ドメイン直下を唯一のHOMEとする */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/Login" replace />} 
        />
        
        {/* ログイン画面 */}
        <Route path="/Login" element={<Login />} />

        {/* それ以外のURL（/Homeなど）に直接来ても、すべてルート（/）へ飛ばす */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;