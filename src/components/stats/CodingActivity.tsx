'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface DailyAverage {
  hours: number
  minutes: number
  text: string
}

interface WakatimeStats {
  dailyAverage: DailyAverage
  totalHours: number
  bestDay: { date: string; hours: number } | null
  languages: Array<{ name: string; percent: number; hours: number }>
}

const CodingActivity = () => {
  const [stats, setStats] = useState<WakatimeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://wakatime.com/share/@jktrn/ef6e633b-589d-44f2-9ae6-0eb93445cf2a.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((data) => {
        const languages = data.data.slice(0, 5).map((lang: any) => ({
          name: lang.name,
          percent: lang.percent,
          hours: lang.hours
        }))

        const totalHours = data.data.reduce((sum: number, lang: any) => sum + lang.hours, 0)
        const avgHoursPerDay = totalHours / 30
        const hours = Math.floor(avgHoursPerDay)
        const minutes = Math.round((avgHoursPerDay - hours) * 60)

        setStats({
          dailyAverage: {
            hours,
            minutes,
            text: `${hours}h ${minutes}m`
          },
          totalHours: Math.round(totalHours),
          bestDay: null,
          languages
        })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Failed to load coding activity
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-primary">{stats.dailyAverage.text}</div>
          <div className="text-sm text-muted-foreground mt-2">Daily Average</div>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-primary">{stats.totalHours}h</div>
          <div className="text-sm text-muted-foreground mt-2">Total (Last 30 days)</div>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-primary">{stats.languages.length}+</div>
          <div className="text-sm text-muted-foreground mt-2">Languages Used</div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Top Languages (Last 30 days)</h3>
        <div className="space-y-4">
          {stats.languages.map((lang, index) => (
            <div key={lang.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{lang.name}</span>
                <span className="text-muted-foreground">{lang.percent.toFixed(1)}% ({Math.round(lang.hours)}h)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${lang.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CodingActivity
