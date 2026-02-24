'use client'

import { useTimerManager } from '@/hooks/useTimerManager'
import { useNotification } from '@/hooks/useNotification'
import { useTimerAlerts } from '@/hooks/useTimerAlerts'
import { initAudioContext } from '@/lib/sound'
import { AppHeader } from '@/components/AppHeader'
import { TimerGrid } from '@/components/TimerGrid'
import { TimerForm } from '@/components/TimerForm'
import { Background } from '@/components/Background'

export default function PikminBloomTimer() {
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
    <main className="relative min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-200">
      <Background />
      <AppHeader activeCount={activeCount} />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center gap-6">
        <TimerForm onAddTimer={handleAddTimer} canAddTimer={canAddTimer} />
        <TimerGrid timers={timers} now={now} onRemoveTimer={removeTimer} />
        {timers.some(t => t.status !== 'running') && (
          <button
            onClick={clearCompleted}
            className="fixed bottom-6 right-6 z-20 px-4 py-2.5 bg-red-500/90 hover:bg-red-600 backdrop-blur-sm text-white text-sm font-medium rounded-full shadow-lg transition-all"
          >
            완료된 타이머 정리
          </button>
        )}
      </div>
    </main>
  )
}
