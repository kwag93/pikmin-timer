<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-24 | Updated: 2026-02-24 -->

# types

## Purpose
애플리케이션 전역에서 사용하는 TypeScript 타입 정의. 타이머 도메인 모델이 정의되어 있다.

## Key Files

| File | Description |
|------|-------------|
| `timer.ts` | Timer 인터페이스 및 MAX_TIMERS 상수 정의 |

## For AI Agents

### Working In This Directory
- Timer 인터페이스 필드: `id`, `label`, `createdAt`, `durationMs`, `endAt`, `status`
- `status`는 `'running' | 'completed' | 'dismissed'` 유니온 타입
- `MAX_TIMERS = 8` — 동시 타이머 최대 개수
- 타입 변경 시 전체 코드베이스에 영향 — 모든 사용처 확인 필수

### Testing Requirements
- 타입 변경 후 `pnpm check-types` 실행

### Common Patterns
- 도메인 타입은 이 디렉토리에 집중
- 컴포넌트 Props 타입은 각 컴포넌트 파일에 정의

## Dependencies

### Internal
- 없음 (다른 모든 레이어에서 이 타입을 import)

### External
- 없음

<!-- MANUAL: -->
