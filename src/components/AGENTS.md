<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-24 | Updated: 2026-02-24 -->

# components

## Purpose
Pikmin 타이머 앱의 재사용 가능한 React 컴포넌트들. 타이머 UI, Pikmin 캐릭터, 배경 애니메이션, 인터랙티브 요소 등을 포함한다.

## Key Files

| File | Description |
|------|-------------|
| `AppHeader.tsx` | 앱 헤더 — 활성 타이머 카운트 표시 |
| `TimerGrid.tsx` | 타이머 카드들의 그리드 레이아웃 |
| `TimerCard.tsx` | 개별 타이머 카드 — 진행률, Pikmin, 삭제 버튼 |
| `TimerForm.tsx` | 타이머 추가 폼 (라벨 + 시간 입력) |
| `TimerDisplay.tsx` | 시간 포맷팅 및 표시 (MM:SS 등) |
| `ProgressArc.tsx` | SVG 원형 진행률 시각화 |
| `Pikmin.tsx` | Pikmin 캐릭터 컴포넌트 (애니메이션) |
| `MushroomIcon.tsx` | 버섯 아이콘 (Pikmin 테마) |
| `Background.tsx` | 하늘/잔디 애니메이션 배경 |
| `InteractiveElements.tsx` | 인터랙티브 UI 요소들 |
| `QuickAddBar.tsx` | 프리셋 기반 빠른 타이머 추가 바 |

## For AI Agents

### Working In This Directory
- 모든 컴포넌트는 개별 파일로 분리
- Framer Motion `motion.*`으로 애니메이션 적용
- TailwindCSS 유틸리티 클래스 사용
- Pikmin 테마 컬러는 `pk-*` 네임스페이스 (`pk-sky-deep`, `pk-grass-mid` 등)

### Testing Requirements
- 컴포넌트 변경 시 `pnpm build`로 빌드 확인
- 시각적 변경은 브라우저에서 수동 검증

### Common Patterns
- Props 인터페이스를 컴포넌트 위에 정의
- `clsx` + `tailwind-merge`로 조건부 스타일링
- Framer Motion `variants`는 `@/lib/motionVariants`에서 import
- 타이머 상태에 따른 조건부 렌더링 (`running`, `completed`, `dismissed`)

## Dependencies

### Internal
- `@/lib/utils` — 유틸리티 함수 (시간 포맷팅 등)
- `@/lib/motionVariants` — Framer Motion 애니메이션 정의
- `@/lib/presets` — 타이머 프리셋 데이터
- `@/types/timer` — Timer 인터페이스

### External
- `framer-motion` — 애니메이션
- `lucide-react` — 아이콘
- `clsx`, `tailwind-merge` — 클래스 유틸리티

<!-- MANUAL: -->
