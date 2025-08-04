// src/routes/emotion.route.js
const express = require('express');
const router = express.Router();
const {
  createEmotion,
  updateTodayEmotion,
  getEmotions,
} = require('../controllers/emotion.controller');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /emotions:
 *   post:
 *     summary: "감정 기록 (기본: 오늘, 선택적으로 날짜 지정 가능)"
 *     tags: [Emotions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emoji
 *               - date
 *             properties:
 *               emoji:
 *                 type: string
 *                 example: "😊"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: "기록할 날짜 (형식: YYYY-MM-DD)"
 *                 example: "2025-08-01"
 *     responses:
 *       201:
 *         description: "감정 기록 성공"
 *       409:
 *         description: "이미 해당 날짜에 감정을 기록함"
 *       500:
 *         description: "서버 오류"
 */
router.post('/', authenticateToken, createEmotion);

/**
 * @swagger
 * /emotions/today:
 *   put:
 *     summary: "오늘 감정 수정"
 *     tags: [Emotions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emoji
 *             properties:
 *               emoji:
 *                 type: string
 *                 example: "😢"
 *     responses:
 *       200:
 *         description: "감정 수정 성공"
 *       404:
 *         description: "오늘 감정 기록이 존재하지 않음"
 *       500:
 *         description: "서버 오류"
 */
router.put('/today', authenticateToken, updateTodayEmotion);

/**
 * @swagger
 * /emotions:
 *   get:
 *     summary: "감정 조회 (기본: 오늘, 또는 날짜/감정 조건 검색)"
 *     description: "쿼리 스트링을 통해 특정 날짜 또는 특정 이모지의 감정 기록을 조회할 수 있습니다. 쿼리가 없으면 오늘 기준으로 조회합니다."
 *     tags: [Emotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: "조회할 날짜 (형식: YYYY-MM-DD)"
 *         example: "2025-08-01"
 *       - in: query
 *         name: emoji
 *         schema:
 *           type: string
 *         required: false
 *         description: "조회할 이모지 (예: 😊)"
 *         example: "😊"
 *     responses:
 *       200:
 *         description: "감정 조회 성공"
 *       500:
 *         description: "서버 오류"
 */
router.get('/', authenticateToken, getEmotions);

module.exports = router;