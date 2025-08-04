const prisma = require('../prisma/client');

// 특정 날짜의 감정과 회고 동시 조회
exports.getDailyData = async (req, res) => {
  const userId = req.user.id;
  const { date } = req.query;

  try {
    if (!date) {
      return res.status(400).json({ message: '날짜를 입력해주세요.' });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const emotion = await prisma.emotion.findFirst({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    const reflection = await prisma.reflection.findFirst({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      select: {
        content: true,
      },
    });

    res.status(200).json({
      emotion,
      reflection,
    });
  } catch (error) {
    console.error('❌ getDailyData error:', error);
    res.status(500).json({ message: '서버 오류' });
    console.error(error.stack); 
  }
};