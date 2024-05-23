const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();

app.use('/api', createProxyMiddleware({ 
  target: 'https://lionguest.p-e.kr', 
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // 전달할 때 /api 접두어 제거
  },
}));

app.listen(3000, () => {
  console.log('프록시 서버가 http://localhost:3000 에서 실행 중입니다');
});