# Growlog 🌱

감정, 회고, 할 일을 통합 관리할 수 있는 자기개발 API 서비스입니다.  
간단한 UI 또는 협업용 API 형태로 사용할 수 있도록 백엔드 중심으로 개발되었습니다.

---

## 📌 주요 기능

- 회원가입 / 로그인 (JWT 인증)
- 할 일 등록·조회·수정·삭제
- 회고 작성 및 감정 기록
- 감정 및 달성률 통계 조회
- Swagger 기반 API 문서화

---

## 🧱 기술 스택

| 분류 | 기술 |
|------|------|
| 서버 | Node.js + Express |
| DB | PostgreSQL |
| ORM | Prisma |
| 인증 | JWT (Access / Refresh) |
| 문서화 | Swagger (OpenAPI) |
| 배포 | Render 또는 Railway (예정) |

---

## 🗂️ 폴더 구조

```
growlog-backend/
├── app.js
├── .env.example
├── /routes
├── /controllers
├── /middlewares
├── /prisma
│   └── schema.prisma
├── /docs
│   └── swagger.yaml
└── /utils
```

---

## ⚙️ 로컬 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/your-username/growlog.git

# 2. 디렉토리 이동
cd growlog

# 3. 패키지 설치
npm install

# 4. .env 파일 생성 (.env.example 참고해서 작성)
cp .env.example .env

# 5. DB 마이그레이션
npx prisma migrate dev --name init

# 6. 서버 실행
npm run dev
```

---

## 🔐 .env 환경 변수 예시

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/growlog
JWT_SECRET=your_jwt_secret_key
```

---

## 🧪 API 문서 (Swagger)

`/docs/swagger.yaml` 참고  
또는 서버 실행 후 아래 주소 접속:

```
http://localhost:4000/api-docs
```

---

## 📦 사용된 주요 라이브러리

- `express`
- `dotenv`
- `jsonwebtoken`
- `bcrypt`
- `prisma`
- `cors`
- `swagger-ui-express`

---

## 📄 라이선스

본 프로젝트는 MIT 라이선스를 따릅니다.
