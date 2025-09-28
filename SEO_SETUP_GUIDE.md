# 구글 검색 등록 및 SEO 설정 가이드

## 1단계: GitHub Pages로 사이트 배포

### GitHub 저장소 생성 및 업로드
```bash
# 1. GitHub에서 새 저장소 생성 (예: quantum-learning)
# 2. 로컬에서 git 초기화
git init
git add .
git commit -m "양자역학 학습 사이트 초기 버전"
git branch -M main
git remote add origin https://github.com/your-username/quantum-learning.git
git push -u origin main
```

### GitHub Pages 설정
1. GitHub 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**에서 "Deploy from a branch" 선택
4. **Branch**에서 `main` 브랜치와 `/ (root)` 선택
5. **Save** 클릭
6. 몇 분 후 `https://your-username.github.io/quantum-learning/` URL에서 접근 가능

### 도메인 설정 (선택사항)
- 커스텀 도메인이 있다면 Pages 설정에서 추가 가능
- 예: `quantum-learning.com`

## 2단계: URL 업데이트

사이트가 배포된 후 다음 파일들의 URL을 실제 주소로 변경:

### index.html 업데이트
```html
<!-- 14번째 줄 -->
<link rel="canonical" href="https://your-username.github.io/quantum-learning/">

<!-- 20-21번째 줄 -->
<meta property="og:url" content="https://your-username.github.io/quantum-learning/">
<meta property="og:image" content="https://your-username.github.io/quantum-learning/og-image.jpg">

<!-- 31번째 줄 -->
<meta name="twitter:image" content="https://your-username.github.io/quantum-learning/og-image.jpg">

<!-- JSON-LD 구조화 데이터 (48-51번째 줄) -->
"url": "https://your-username.github.io/quantum-learning/",
"logo": "https://your-username.github.io/quantum-learning/logo.png",
"sameAs": [
    "https://github.com/your-username/quantum-learning"
]
```

### sitemap.xml 업데이트
모든 `https://your-domain.github.io/quantum-learning/`을 실제 URL로 변경

### robots.txt 업데이트
```txt
Sitemap: https://your-username.github.io/quantum-learning/sitemap.xml
```

## 3단계: Google Search Console 등록

### 1. Google Search Console 접속
- https://search.google.com/search-console/ 방문
- Google 계정으로 로그인

### 2. 속성 추가
1. **속성 추가** 버튼 클릭
2. **URL 접두어** 선택
3. `https://your-username.github.io/quantum-learning/` 입력
4. **계속** 클릭

### 3. 소유권 확인
**방법 1: HTML 파일 업로드**
1. 제공된 HTML 파일 다운로드
2. 사이트 루트 디렉토리에 업로드
3. **확인** 클릭

**방법 2: HTML 태그 추가 (권장)**
1. 제공된 메타 태그 복사
2. `index.html`의 `<head>` 섹션에 추가:
```html
<meta name="google-site-verification" content="제공된-인증-코드" />
```
3. GitHub에 커밋 및 푸시
4. **확인** 클릭

### 4. 사이트맵 제출
1. Search Console에서 왼쪽 메뉴의 **색인 > Sitemaps** 클릭
2. **새 사이트맵 추가**에 `sitemap.xml` 입력
3. **제출** 클릭

### 5. URL 검사 및 색인 요청
1. 상단 검색창에 메인 페이지 URL 입력
2. **색인 생성 요청** 클릭 (해당 옵션이 있는 경우)

## 4단계: 추가 SEO 최적화

### 소셜 미디어 이미지 생성
1. **og-image.jpg** 생성 (1200x630px)
   - 사이트 제목과 주요 특징 포함
   - 양자역학 관련 시각적 요소 추가
2. **logo.png** 생성 (정사각형, 512x512px 권장)
3. **favicon.ico** 생성 (16x16, 32x32, 48x48px)

### 페이지 속도 최적화
- [PageSpeed Insights](https://pagespeed.web.dev/)에서 성능 확인
- 이미지 최적화 (WebP 형식 사용)
- CSS/JS 파일 압축

### 모바일 친화성 확인
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)에서 확인
- 반응형 디자인 검증

## 5단계: 추가 검색 엔진 등록

### Bing Webmaster Tools
1. https://www.bing.com/webmasters/ 방문
2. 사이트 추가 및 소유권 확인
3. 사이트맵 제출

### 네이버 웹마스터도구
1. https://searchadvisor.naver.com/ 방문
2. 사이트 등록 및 소유권 확인
3. 사이트맵 제출

### 다음 검색등록
1. https://register.search.daum.net/ 방문
2. 사이트 등록 신청

## 6단계: 성과 모니터링

### Google Analytics 연동 (선택사항)
1. Google Analytics 계정 생성
2. 추적 코드를 `index.html`에 추가:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 정기적인 확인 사항
- Search Console에서 검색 성과 모니터링
- 크롤링 오류 확인
- 새로운 콘텐츠 추가 시 사이트맵 업데이트
- 페이지 로딩 속도 모니터링

## 예상 일정

| 단계 | 소요 시간 | 설명 |
|------|-----------|------|
| GitHub Pages 배포 | 10-30분 | 즉시 배포, DNS 전파 시간 포함 |
| Search Console 등록 | 5-10분 | 소유권 확인 즉시 완료 |
| 사이트맵 처리 | 1-3일 | Google이 사이트맵을 처리하는 시간 |
| 첫 검색 노출 | 1-2주 | 사이트 품질과 콘텐츠에 따라 달라짐 |
| 완전한 색인화 | 2-4주 | 모든 페이지가 검색에 노출되는 시간 |

## 체크리스트

### 기술적 SEO
- [ ] 메타 태그 추가 완료
- [ ] Open Graph 태그 추가 완료
- [ ] 구조화된 데이터 추가 완료
- [ ] 사이트맵 생성 및 제출 완료
- [ ] robots.txt 생성 완료
- [ ] 소유권 확인 완료
- [ ] HTTPS 설정 확인 (GitHub Pages 기본 제공)

### 콘텐츠 최적화
- [ ] 제목 태그 최적화
- [ ] 메타 설명 최적화
- [ ] 이미지 alt 텍스트 추가
- [ ] 내부 링크 구조 최적화
- [ ] 콘텐츠 품질 및 독창성 확인

### 사용자 경험
- [ ] 모바일 반응형 디자인 확인
- [ ] 페이지 로딩 속도 최적화
- [ ] 내비게이션 구조 직관성 확인
- [ ] 접근성 기준 준수

## 문제 해결

### 색인이 안 되는 경우
1. robots.txt에서 차단되었는지 확인
2. Search Console에서 크롤링 오류 확인
3. 사이트맵이 올바르게 제출되었는지 확인
4. 페이지가 실제로 접근 가능한지 확인

### 검색 순위가 낮은 경우
1. 콘텐츠 품질 개선
2. 키워드 최적화
3. 외부 링크 확보 (다른 교육 사이트에서 링크)
4. 사용자 경험 개선

이 가이드를 따라하면 양자역학 학습 사이트가 구글을 포함한 주요 검색 엔진에서 검색될 수 있습니다! 🚀