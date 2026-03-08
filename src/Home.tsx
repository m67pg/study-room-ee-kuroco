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
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // KurocoのAPIエンドポイントURL
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
      const response = await axios.post(LOGIN_API_URL, payload);

      if (response.status === 200) {
        // トークンをセッションストレージに保存
        const token = response.data.token;
        sessionStorage.setItem('kuroco_token', token);

        console.log("ログイン成功");
        
        // 遷移先をドメイン直下 (/) に設定
        // App.tsx側でログイン状態を判定してHomeを表示します
        // ※状態を確実に反映させるため、必要に応じて画面をリロードさせる場合もあります
        navigate('/');
        window.location.reload(); 
      }
    } catch (err: any) {
      console.error("Login Error:", err.response?.data);
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
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            borderRadius: 3,
            backgroundColor: '#ffffff'
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
            学習室入退室管理
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="action" />
                  </InputAdornment>
                ),
              }}
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
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 4, 
                mb: 2, 
                height: '56px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '8px'
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'ログイン'}
            </Button>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 4, color: 'text.secondary' }}>
          <Typography variant="body2" align="center">
            c {new Date().getFullYear()} Study Room Attendance System
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;