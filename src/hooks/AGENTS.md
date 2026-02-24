<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-24 | Updated: 2026-02-24 -->

# hooks

## Purpose
타이머 앱의 핵심 비즈니스 로직을 캡슐화하는 커스텀 React 훅. 타이머 상태 관리, 웹 알림, 타이머 완료 감지를 담당한다.

## Key Files

| File | Description |
|------|-------------|
| `useTimerManager.ts` | 타이머 CRUD 및 상태 관리 — `addTimer`, `removeTimer`, `clearCompleted`, `canAddTimer` |
| `useNotification.ts` | Web Notifications API 래퍼 — `permission`, `requestPermission`, `notify` |
| `useTimerAlerts.ts` | 타이머 완료 감지 및 알림 트리거 — `timers` + `now` 모니터링 |

## For AI Agents

### Working In This Directory
- 각 훅은 단일 책임 원칙(SRP) 준수
- `useTimerManager`가 핵심 상태 관리자 — 타이머 배열, 현재 시간(`now`), CRUD 연산
- `useTimerAlerts`는 `useTimerManager`와 `useNotification`의 출력을 합성
- LocalStorage 영속성은 `@/lib/timerStorage`에 위임

### Testing Requirements
- 훅 테스트 시 `renderHook` 사용 (React Testing Library)
- `useTimerManager`: 타이머 추가/삭제/정리, MAX_TIMERS 제한 검증
- `useNotification`: Notification API 모킹 필요
- `useTimerAlerts`: 타이머 완료 시 알림 호출 검증

### Common Patterns
- 순수 로직은 `@/lib/*`에 분리, 훅은 React 상태와 연결만 담당
- `useCallback`/`useMemo`로 참조 안정성 유지
- 의존성 배열 명시적 관리

## Dependencies

### Internal
- `@/lib/timerState` — 타이머 상태 초기화
- `@/lib/timerStorage` — LocalStorage 읽기/쓰기
- `@/lib/sound` — 완료 시 오디오 재생
- `@/types/timer` — Timer 인터페이스, MAX_TIMERS

### External
- `react` — useState, useEffect, useCallback, useRef

<!-- MANUAL: -->
