<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-24 | Updated: 2026-02-24 -->

# lib

## Purpose
프레임워크 비의존적인 유틸리티 함수와 상태 로직. 타이머 상태 관리, 영속성, 사운드, 애니메이션 정의, 프리셋, 공통 유틸을 포함한다.

## Key Files

| File | Description |
|------|-------------|
| `timerState.ts` | 타이머 상태 초기화 및 상태 전환 로직 |
| `timerStorage.ts` | LocalStorage 기반 타이머 영속성 (읽기/쓰기) |
| `sound.ts` | AudioContext 초기화 및 완료 알림 사운드 재생 |
| `motionVariants.ts` | Framer Motion 애니메이션 variants 정의 (재사용 가능) |
| `presets.ts` | 타이머 프리셋 데이터 (5분, 10분 등 자주 쓰는 시간) |
| `utils.ts` | 공통 유틸리티 — 시간 포맷팅, 계산, `cn()` 클래스 머지 |

## For AI Agents

### Working In This Directory
- 모든 함수는 **순수 함수** 또는 **부수효과가 격리된 함수**여야 함
- React 의존성 없음 — 프레임워크 비의존적 유지
- `utils.ts`의 `cn()` = `clsx` + `tailwind-merge` 조합

### Testing Requirements
- 순수 함수는 단위 테스트 용이 — `*.pure.test.ts` 패턴 사용 가능
- `timerStorage.ts`: localStorage 모킹 필요
- `sound.ts`: AudioContext 모킹 필요

### Common Patterns
- Data/Calculation/Action 분리 원칙 준수
- `timerState`와 `timerStorage`로 상태 초기화와 영속성 관심사 분리
- `motionVariants`는 컴포넌트에서 import하여 일관된 애니메이션 적용

## Dependencies

### Internal
- `@/types/timer` — Timer 인터페이스

### External
- `clsx`, `tailwind-merge` — 클래스 유틸리티 (`utils.ts`)
- Web Audio API — 사운드 재생 (`sound.ts`)

<!-- MANUAL: -->
