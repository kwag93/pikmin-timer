<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-24 | Updated: 2026-02-24 -->

# fonts

## Purpose
Geist 가변 폰트 에셋을 저장한다. `src/globals.css`에서 `@font-face`로 로딩된다.

## Key Files

| File | Description |
|------|-------------|
| `GeistVF.woff` | Geist Sans 가변 폰트 — 일반 텍스트용 |
| `GeistMonoVF.woff` | Geist Mono 가변 폰트 — 타이머 숫자 표시용 |

## For AI Agents

### Working In This Directory
- 폰트 파일은 바이너리 에셋 — 직접 수정하지 않음
- 폰트 추가/변경 시 `src/globals.css`의 `@font-face` 설정도 함께 업데이트
- 가변 폰트(Variable Font)이므로 `weight` 범위 지정 가능

### Testing Requirements
- 폰트 변경 후 브라우저에서 렌더링 확인

## Dependencies

### Internal
- `src/globals.css` — 이 폰트들을 `@font-face`로 로딩

### External
- 없음 (CSS `@font-face` 사용)

<!-- MANUAL: -->
