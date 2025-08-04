const express = require('express');
const router = express.Router();
const { getDailyData } = require('../controllers/daily.controller');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /daily:
 *   get:
 *     summary: "📅날짜별 감정 & 회고 데이터 조회"
 *     description: "특정 날짜에 작성한 감정과 회고 데이터를 함께 조회합니다."
 *     tags: [Daily]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: "조회할 날짜 (예: 2025-08-01)"
 *     responses:
 *       200:
 *         description: "감정 및 회고 데이터 반환"
 *         content:
 *           application/json:
 *             example:
 *               emotion:
 *                 id: 3
 *                 userId: 5
 *                 emoji: "😇"
 *                 date: "2025-08-01"
 *               reflection:
 *                 title: "오늘도 성장 가능성은 무한했다."
 *                 content: "배운 것을 바로 적용해보니 실력이 늘고 있다는 확신이 들었다."
 *       400:
 *         description: "날짜 파라미터 누락"
 *       500:
 *         description: "서버 오류"
 */

router.get('/', authenticateToken, getDailyData);

module.exports = router;