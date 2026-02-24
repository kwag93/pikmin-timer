import { useTimerManager } from '@/hooks/useTimerManager'
import { useNotification } from '@/hooks/useNotification'
import { useTimerAlerts } from '@/hooks/useTimerAlerts'
import { initAudioContext } from '@/lib/sound'
import { AppHeader } from '@/components/AppHeader'
import { TimerGrid } from '@/components/TimerGrid'
import { TimerForm } from '@/components/TimerForm'
import { Background } from '@/components/Background'

export default function App() {
  const { timers, now, addTimer, removeTimer, clearCompleted, canAddTimer } = useTimerManager()
  const { permission, requestPermission, notify } = useNotification()

  useTimerAlerts({ timers, now, notify })

  const handleAddTimer = async (durationSeconds: number, label: string) => {
    if (permission === 'default') {
      await requestPermission()
    }
    initAudioContext()
    addTimer(durationSeconds, label)
  }

  const activeCount = timers.filter(t => t.status === 'running').length

  return (
    <div className="relative flex min-h-screen w-full flex-col text-slate-900">
      <Background />
      <AppHeader activeCount={activeCount} />
      <main className="relative z-10 flex grow flex-col px-6 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-10">
          <TimerForm onAddTimer={handleAddTimer} canAddTimer={canAddTimer} />
          <TimerGrid timers={timers} now={now} onRemoveTimer={removeTimer} />
        </div>
      </main>

      {/* Clear completed button */}
      {timers.some(t => t.status !== 'running') && (
        <button
          onClick={clearCompleted}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#ef4444' }}
        >
          <span>🗑</span>
          완료된 타이머 정리
        </button>
      )}
    </div>
  )
}
