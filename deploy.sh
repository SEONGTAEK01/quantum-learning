#!/bin/bash

# 양자역학 학습 사이트 GitHub Pages 배포 스크립트
# 사용법: ./deploy.sh

echo "🚀 양자역학 학습 사이트 배포 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Git 상태 확인
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Git 저장소가 아닙니다. git init을 먼저 실행하세요.${NC}"
    exit 1
fi

# 변경사항이 있는지 확인
if ! git diff --quiet || ! git diff --staged --quiet; then
    echo -e "${YELLOW}📝 변경사항을 커밋합니다...${NC}"

    # 사용자에게 커밋 메시지 입력 받기
    echo "커밋 메시지를 입력하세요 (엔터 시 기본 메시지 사용):"
    read -r commit_message

    if [ -z "$commit_message" ]; then
        commit_message="사이트 업데이트 $(date '+%Y-%m-%d %H:%M:%S')"
    fi

    git add .
    git commit -m "$commit_message"
else
    echo -e "${GREEN}✅ 변경사항이 없습니다.${NC}"
fi

# 원격 저장소가 설정되어 있는지 확인
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${RED}❌ 원격 저장소가 설정되지 않았습니다.${NC}"
    echo "GitHub에서 저장소를 생성한 후 다음 명령어를 실행하세요:"
    echo "git remote add origin https://github.com/your-username/quantum-learning.git"
    exit 1
fi

# GitHub에 푸시
echo -e "${YELLOW}📤 GitHub에 푸시합니다...${NC}"
if git push origin main; then
    echo -e "${GREEN}✅ 성공적으로 푸시되었습니다!${NC}"
else
    echo -e "${RED}❌ 푸시에 실패했습니다.${NC}"
    echo "GitHub 저장소 권한을 확인하고 다시 시도하세요."
    exit 1
fi

# GitHub Pages URL 표시
REPO_URL=$(git remote get-url origin)
USERNAME=$(echo "$REPO_URL" | sed -n 's/.*github\.com[:/]\([^/]*\)\/.*/\1/p')
REPO_NAME=$(echo "$REPO_URL" | sed -n 's/.*\/\([^/]*\)\.git$/\1/p')

if [ -z "$REPO_NAME" ]; then
    REPO_NAME=$(echo "$REPO_URL" | sed -n 's/.*\/\([^/]*\)$/\1/p')
fi

PAGES_URL="https://${USERNAME}.github.io/${REPO_NAME}/"

echo ""
echo -e "${GREEN}🎉 배포가 완료되었습니다!${NC}"
echo ""
echo "📱 사이트 URL: $PAGES_URL"
echo ""
echo "⏱️ GitHub Pages가 업데이트되기까지 몇 분 정도 소요될 수 있습니다."
echo ""
echo "🔍 다음 단계:"
echo "1. GitHub 저장소의 Settings > Pages에서 배포 상태 확인"
echo "2. SEO_SETUP_GUIDE.md 파일을 참고하여 Google Search Console 등록"
echo "3. 사이트가 준비되면 $PAGES_URL 에서 확인"
echo ""
echo -e "${YELLOW}💡 팁: 배포 후 sitemap.xml과 index.html의 URL들을 실제 주소로 업데이트하세요!${NC}"