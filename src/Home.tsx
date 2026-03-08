import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('kuroco_token'); // トークンを削除
    navigate('/Login');
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4">Hello World!</Typography>
      <Typography sx={{ mt: 2 }}>ログインに成功しました。</Typography>
      <Button variant="outlined" sx={{ mt: 4 }} onClick={handleLogout}>
        ログアウト
      </Button>
    </Container>
  );
};

export default Home;