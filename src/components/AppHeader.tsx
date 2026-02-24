
import { useInstallPrompt } from '@/hooks/useInstallPrompt'

interface AppHeaderProps {
  activeCount: number
}

export function AppHeader({ activeCount }: AppHeaderProps) {
  const { canInstall, promptInstall } = useInstallPrompt()

  return (
    <header className="glass-card sticky top-0 z-50 flex items-center justify-between border-b border-white/20 px-6 py-4 pt-[max(1rem,env(safe-area-inset-top))] shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">🍄</span>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          Pikmin Bloom Timers
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {canInstall && (
          <button
            onClick={promptInstall}
            className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-700 text-sm font-semibold transition-colors hover:bg-emerald-200 active:scale-95"
          >
            <span>📲</span>
            앱 설치
          </button>
        )}
        {activeCount > 0 && (
          <div
            className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-yellow-700"
            aria-label={`활성 타이머 ${activeCount}개`}
          >
            <span className="text-sm">⏱</span>
            <span className="text-sm font-bold">{activeCount} Active</span>
          </div>
        )}
      </div>
    </header>
  )
}
