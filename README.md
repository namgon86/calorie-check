# CalorieCheck 🥗

AI 기반 칼로리 분석 웹앱 — 사진 한 장으로 칼로리 확인

## 기능
- 📷 음식 사진 → AI 칼로리 자동 분석
- 🌍 한국어 / 영어 전환
- 📊 탄수화물·단백질·지방·나트륨 표시
- 📝 식단 기록 & 오늘 칼로리 합산
- 🎯 일일 목표 칼로리 설정
- 📱 모바일 최적화 (PWA 지원)

## Vercel 배포 방법

### 1. GitHub에 올리기
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/calorie-check.git
git push -u origin main
```

### 2. Vercel 배포
1. https://vercel.com 접속 → GitHub 로그인
2. "New Project" → calorie-check 레포 선택
3. "Environment Variables" 에서 추가:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...` (본인 API 키)
4. "Deploy" 클릭 → 완료!

### 3. 완성
- `https://calorie-check.vercel.app` 형태의 URL로 접속 가능
- 스마트폰에서 "홈 화면에 추가" → 앱처럼 사용 가능

## 프로젝트 구조
```
calorie-check/
├── api/
│   └── analyze.js      # Vercel Serverless API
├── public/
│   ├── index.html      # 메인 앱
│   └── manifest.json   # PWA 설정
├── vercel.json         # Vercel 설정
└── README.md
```

## 기술 스택
- Frontend: Vanilla HTML/CSS/JS (프레임워크 없음)
- Backend: Vercel Serverless Functions
- AI: Anthropic Claude API (Vision)
- 배포: Vercel (무료)
