# GitHub Pages 배포 가이드

## 빠른 배포 (자동 스크립트 사용)

```bash
# 스크립트 실행 권한 부여 (한 번만 실행)
chmod +x deploy.sh

# 배포 실행
./deploy.sh
```

## 수동 배포 단계

### 1단계: GitHub 저장소 생성
1. [GitHub](https://github.com)에 로그인
2. **New repository** 클릭
3. Repository name: `quantum-learning` (또는 원하는 이름)
4. **Public**으로 설정
5. **Create repository** 클릭

### 2단계: 로컬 Git 설정
```bash
# Git 초기화 (아직 안 했다면)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "양자역학 학습 사이트 초기 버전"

# 기본 브랜치를 main으로 설정
git branch -M main

# 원격 저장소 연결 (your-username을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/your-username/quantum-learning.git

# GitHub에 푸시
git push -u origin main
```

### 3단계: GitHub Pages 활성화
1. GitHub 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**에서 "Deploy from a branch" 선택
4. **Branch**에서 `main` 선택, 폴더는 `/ (root)` 선택
5. **Save** 클릭

### 4단계: 배포 확인
- 배포는 보통 5-10분 정도 소요됩니다
- `https://your-username.github.io/quantum-learning/` 에서 사이트 확인
- GitHub 저장소의 **Actions** 탭에서 배포 진행 상황 확인 가능

## 배포 후 필수 작업

### URL 업데이트
배포된 실제 URL로 다음 파일들을 업데이트해야 합니다:

1. **index.html** (14, 20, 21, 31, 48, 50, 51번째 줄)
2. **sitemap.xml** (모든 URL)
3. **robots.txt** (사이트맵 URL)

### 예시: URL 업데이트
```bash
# 실제 GitHub 사용자명이 'johndoe'이고 저장소명이 'quantum-learning'인 경우
# 모든 'your-username'을 'johndoe'로 변경
# 모든 'your-domain'을 'johndoe'로 변경

find . -name "*.html" -o -name "*.xml" -o -name "*.txt" | xargs sed -i 's/your-username/johndoe/g'
find . -name "*.html" -o -name "*.xml" -o -name "*.txt" | xargs sed -i 's/your-domain/johndoe/g'
```

### 업데이트 후 재배포
```bash
git add .
git commit -m "실제 URL로 업데이트"
git push origin main
```

## 커스텀 도메인 설정 (선택사항)

### 도메인이 있는 경우
1. 도메인 DNS 설정에서 CNAME 레코드 추가:
   ```
   www.your-domain.com -> your-username.github.io
   ```

2. GitHub Pages 설정에서 **Custom domain**에 `www.your-domain.com` 입력

3. **Enforce HTTPS** 체크박스 활성화

### 무료 도메인 서비스
- [Freenom](https://freenom.com) - .tk, .ml, .ga 도메인 무료 제공
- [GitHub Student Pack](https://education.github.com/pack) - 학생이라면 .me 도메인 1년 무료

## 문제 해결

### 일반적인 문제들

#### 1. 404 오류가 발생하는 경우
- GitHub Pages가 아직 활성화되지 않았을 수 있습니다 (최대 10분 대기)
- 저장소가 Public인지 확인
- main 브랜치에 index.html이 있는지 확인

#### 2. CSS/JS가 로드되지 않는 경우
```html
<!-- 절대 경로 대신 상대 경로 사용 -->
<link rel="stylesheet" href="./styles.css">
<script src="./script.js"></script>
```

#### 3. 이미지가 표시되지 않는 경우
- 이미지 파일 경로 확인
- 파일명 대소문자 정확히 입력
- GitHub에 이미지 파일이 업로드되었는지 확인

#### 4. 사이트맵이 인식되지 않는 경우
- robots.txt의 사이트맵 URL이 정확한지 확인
- sitemap.xml이 루트 디렉토리에 있는지 확인
- XML 문법 오류가 없는지 확인

### 디버깅 도구
- [GitHub Pages Health Check](https://github.com/github/pages-health-check)
- [W3C Markup Validator](https://validator.w3.org/)
- [Google Search Console](https://search.google.com/search-console/)

## 업데이트 워크플로우

### 일반적인 업데이트
```bash
# 파일 수정 후
git add .
git commit -m "설명적인 커밋 메시지"
git push origin main
```

### 자동 배포 스크립트 사용
```bash
./deploy.sh
# 커밋 메시지 입력하거나 엔터로 기본 메시지 사용
```

## 성능 최적화

### 이미지 최적화
```bash
# ImageOptim, TinyPNG 등 도구 사용
# WebP 형식 사용 권장
```

### CDN 활용
GitHub Pages는 자동으로 전 세계 CDN을 통해 서비스되므로 별도 설정 불필요

## 보안 고려사항

### HTTPS 강제
- GitHub Pages는 기본적으로 HTTPS 제공
- 커스텀 도메인 사용 시 "Enforce HTTPS" 옵션 활성화

### 민감한 정보 보호
- API 키나 개인정보는 절대 저장소에 업로드하지 말 것
- .gitignore 파일 활용

## 모니터링 및 분석

### Google Analytics 연동
```html
<!-- Google Analytics 코드를 index.html의 <head>에 추가 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 방문자 통계 확인
- GitHub 저장소의 **Insights > Traffic** 탭에서 기본 통계 확인 가능

이제 양자역학 학습 사이트가 전 세계 누구나 접근할 수 있는 공개 웹사이트가 됩니다! 🌍✨