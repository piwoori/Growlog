const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createReflection = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { content } = req.body;

    const newReflection = await prisma.reflection.create({
      data: { content, userId },
    });

    return res.status(201).json({
      message: '회고가 성공적으로 저장되었습니다.',
      reflection: newReflection,
    });
  } catch (error) {
    console.error('❌ 회고 저장 오류:', error);
    return res.status(500).json({ error: '회고 저장 중 오류' });
  }
};

const getReflections = async (req, res) => {
  try {
    const userId = req.user.userId;

    const reflections = await prisma.reflection.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ reflections });
  } catch (error) {
    console.error('❌ 회고 목록 조회 오류:', error);
    return res.status(500).json({ error: '회고 목록 조회 중 오류' });
  }
};

const getReflectionById = async (req, res) => {
  const userId = req.user.id; // 또는 req.user.userId
  const reflectionId = parseInt(req.params.id, 10);

  try {
    const reflection = await prisma.reflection.findUnique({
      where: { id: reflectionId },
      include: {
        emotion: true, // 감정 연결되어 있다면 함께 반환
      },
    });

    if (!reflection) {
      return res.status(404).json({ message: '회고를 찾을 수 없습니다.' });
    }

    if (reflection.userId !== userId) {
      return res.status(403).json({ message: '본인의 회고만 조회할 수 있습니다.' });
    }

    return res.status(200).json({ reflection });
  } catch (error) {
    console.error('❌ 회고 상세 조회 오류:', error);
    return res.status(500).json({ message: '회고 상세 조회 중 서버 오류 발생' });
  }
};

module.exports = { createReflection, getReflections, getReflectionById, };