// src/controllers/emotion.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 감정 기록 (기본: 오늘, 선택적으로 날짜 지정 가능)
 */
const createEmotion = async (req, res) => {
  const userId = req.user.id;
  const { emoji, date } = req.body;

  if (!emoji || !date) {
    return res.status(400).json({ message: 'emoji와 date는 필수입니다.' });
  }

  try {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // 날짜만 비교

    const existing = await prisma.emotion.findUnique({
      where: {
        userId_date: {
          userId,
          date: targetDate,
        },
      },
    });

    if (existing) {
      return res.status(409).json({ message: '이 날짜에는 이미 감정을 기록했습니다.' });
    }

    const emotion = await prisma.emotion.create({
      data: {
        userId,
        emoji,
        date: targetDate,
      },
    });

    return res.status(201).json({ message: '감정이 저장되었습니다.', emotion });
  } catch (error) {
    console.error('❌ 감정 저장 오류:', error);
    return res.status(500).json({ message: '감정 저장 중 서버 오류 발생' });
  }
};

/**
 * 오늘 감정 수정
 */
const updateTodayEmotion = async (req, res) => {
  const userId = req.user.id;
  const { emoji } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const existing = await prisma.emotion.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    if (!existing) {
      return res.status(404).json({ message: '오늘 기록된 감정이 없습니다.' });
    }

    const updated = await prisma.emotion.update({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      data: {
        emoji,
      },
    });

    return res.status(200).json({ message: '감정이 수정되었습니다.', emotion: updated });
  } catch (error) {
    console.error('❌ 감정 수정 오류:', error);
    return res.status(500).json({ message: '감정 수정 중 서버 오류 발생' });
  }
};

/**
 * 감정 조회 (기본: 오늘, 또는 날짜/감정 조건 조회)
 */
const getEmotions = async (req, res) => {
  const userId = req.user.id;
  const { date, emoji } = req.query;

  try {
    const where = {
      userId,
    };

    if (date) {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);
      where.date = targetDate;
    } else {
      // date 쿼리 없으면 오늘 날짜
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      where.date = today;
    }

    if (emoji) {
      where.emoji = emoji;
    }

    const emotions = await prisma.emotion.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
    });

    return res.status(200).json({ emotions });
  } catch (error) {
    console.error('❌ 감정 조회 오류:', error);
    return res.status(500).json({ message: '감정 조회 중 서버 오류 발생' });
  }
};

module.exports = {
  createEmotion,
  updateTodayEmotion,
  getEmotions,
};