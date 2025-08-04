const express = require('express');
const router = express.Router();
const {
  createReflection,
  getReflections,
  getReflectionById,
} = require('../controllers/reflection.controller');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Reflections
 *   description: 회고 API
 */

/**
 * @swagger
 * /reflections:
 *   post:
 *     summary: 회고 작성
 *     tags: [Reflections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: 오늘은 프로젝트를 마무리했다.
 *     responses:
 *       201:
 *         description: 회고 작성 성공
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
router.post('/', authenticateToken, createReflection);

/**
 * @swagger
 * /reflections:
 *   get:
 *     summary: 회고 목록 조회
 *     tags: [Reflections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 회고 목록 조회 성공
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
router.get('/', authenticateToken, getReflections);

/**
 * @swagger
 * /reflections/{id}:
 *   get:
 *     summary: 회고 상세 조회
 *     tags: [Reflections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 회고 ID
 *     responses:
 *       200:
 *         description: 회고 상세 조회 성공
 *       403:
 *         description: 권한 없음 (다른 사용자의 회고)
 *       404:
 *         description: 회고를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/:id', authenticateToken, getReflectionById);

module.exports = router;
