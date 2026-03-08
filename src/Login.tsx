import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Alert,
  CircularProgress 
} from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // KurocoのAPIエンドポイントURL
  // ※管理画面の「Default」APIで確認したパスに合わせて調整してください
  const LOGIN_API_URL = 'https://m67pg.g.kuroco.app/rcms-api/1/login';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      email: email,
      password: password,
    };

    try {
      // axiosによるPOST送信
      const response = await axios.post(LOGIN_API_URL, payload);

      if (response.status === 200) {
        // 1. トークンの取得
        const token = response.data.token;
        
        // 2. ブラウザに保存（今後のAPIリクエストで使用します）
        sessionStorage.setItem('kuroco_token', token);

        console.log("ログイン成功");
        
        // 3. HOME画面へ遷移
        navigate('/Home');
      }
    } catch (err: any) {
      // エラーハンドリング
      console.error("Login Error:", err.response?.data);
      
      // Kurocoから返ってくるエラーメッセージがあればそれを表示、なければ汎用メッセージ
      const serverMessage = err.response?.data?.errors?.[0]?.message;
      setError(serverMessage || "メールアドレスまたはパスワードが正しくありません。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            borderRadius: 2
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
            学習室入退室管理
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '45px' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'ログイン'}
            </Button>
          </Box>
        </Paper>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
          {'Copyright c Study Room System '}
          {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;