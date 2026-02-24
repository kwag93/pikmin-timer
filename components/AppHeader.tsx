'use client'

interface AppHeaderProps {
  activeCount: number
}

export function AppHeader({ activeCount }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-emerald-800/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🍄</span>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Pikmin Bloom Timer
          </h1>
        </div>
        {activeCount > 0 && (
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400 text-emerald-900 text-sm font-bold shadow"
            aria-label={`활성 타이머 ${activeCount}개`}
          >
            {activeCount}
          </div>
        )}
      </div>
    </header>
  )
}
