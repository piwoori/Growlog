const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Growlog API',
      version: '1.0.0',
      description: '자기관리 통합 서비스 Growlog의 REST API 문서입니다.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [ // ✅ Swagger 태그 명시
      {
        name: 'Auth',
        description: '인증 관련 API',
      },
      {
        name: 'Todos',
        description: '할 일 관리 API',
      },
      {
        name: 'Reflections',
        description: '회고 관리 API',
      },
      {
        name: 'Emotions',
        description: '감정 기록 API',
      },
      {
        name: 'Daily',
        description: '날짜별 회고 & 감정 통합 조회 API', // ✅ 추가된 부분
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;