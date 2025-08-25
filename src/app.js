// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const authRouter = require('./routes/auth.route');
const todoRouter = require('./routes/todo.route');
const reflectionRouter = require('./routes/reflection.route');
const emotionRouter = require('./routes/emotion.route');
const dailyRouter = require('./routes/daily.route'); // ✅ 날짜별 회고 & 감정 조회 라우터

const { authenticateToken } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

// 기본 미들웨어
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ✅ Health Check (공개 엔드포인트)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
  // 상세 버전이 필요하면 아래로 교체
  // res.status(200).json({
  //   status: 'ok',
  //   uptime: process.uptime(),
  //   timestamp: Date.now(),
  //   env: process.env.NODE_ENV || 'dev',
  // });
});

// 🔐 Swagger 자동 토큰 주입 설정
const swaggerToken = `${process.env.SWAGGER_SAMPLE_TOKEN || ''}`;
const swaggerOptions = {
  swaggerOptions: {
    authAction: {
      bearerAuth: {
        name: 'bearerAuth',
        schema: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          scheme: 'bearer',
        },
        value: swaggerToken,
      },
    },
  },
};

// 🛣️ 라우터 등록
app.use('/auth', authRouter);
app.use('/todos', authenticateToken, todoRouter);
app.use('/reflections', reflectionRouter);
app.use('/emotions', authenticateToken, emotionRouter);
app.use('/daily', authenticateToken, dailyRouter);

// 📘 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// ✅ 기본 라우트
app.get('/', (req, res) => {
  res.send('🪴 Welcome to Growlog API!');
});

module.exports = app;