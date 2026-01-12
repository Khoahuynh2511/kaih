'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface GitHubUserData {
  public_repos: number
  followers: number
  following: number
  public_gists: number
}

interface ContributionData {
  total: { [key: string]: number }
  contributions: Array<{ date: string; count: number; level: number }>
}

interface Props {
  username: string
}

const GitHubStats = ({ username }: Props) => {
  const [userData, setUserData] = useState<GitHubUserData | null>(null)
  const [contributionData, setContributionData] = useState<ContributionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        ])

        if (!userRes.ok || !contribRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const user = await userRes.json()
        const contrib = await contribRes.json()

        setUserData(user)
        setContributionData(contrib)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  const calculateStreak = (contributions: Array<{ date: string; count: number }>) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let currentStreak = 0
    let maxStreak = 0
    let tempStreak = 0
    
    const sortedContribs = [...contributions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    for (const contrib of sortedContribs) {
      if (contrib.count > 0) {
        tempStreak++
        if (tempStreak > maxStreak) maxStreak = tempStreak
      } else {
        tempStreak = 0
      }
    }

    for (const contrib of sortedContribs) {
      const contribDate = new Date(contrib.date)
      contribDate.setHours(0, 0, 0, 0)
      
      if (contrib.count > 0) {
        currentStreak++
      } else {
        break
      }
    }

    return { currentStreak, maxStreak }
  }

  const getTotalContributions = () => {
    if (!contributionData) return 0
    return contributionData.contributions.reduce((sum, c) => sum + c.count, 0)
  }

  const getThisWeekContributions = () => {
    if (!contributionData) return 0
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    return contributionData.contributions
      .filter(c => new Date(c.date) >= weekAgo)
      .reduce((sum, c) => sum + c.count, 0)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Failed to load GitHub stats
      </div>
    )
  }

  const streaks = contributionData ? calculateStreak(contributionData.contributions) : { currentStreak: 0, maxStreak: 0 }

  const stats = [
    {
      label: 'Total Contributions',
      value: getTotalContributions().toLocaleString(),
      description: 'Last 12 months'
    },
    {
      label: 'Current Streak',
      value: `${streaks.currentStreak}`,
      description: 'days'
    },
    {
      label: 'Best Streak',
      value: `${streaks.maxStreak}`,
      description: 'days'
    },
    {
      label: 'This Week',
      value: getThisWeekContributions().toLocaleString(),
      description: 'contributions'
    },
    {
      label: 'Public Repos',
      value: userData?.public_repos?.toLocaleString() || '0',
      description: 'repositories'
    },
    {
      label: 'Followers',
      value: userData?.followers?.toLocaleString() || '0',
      description: 'people'
    },
    {
      label: 'Following',
      value: userData?.following?.toLocaleString() || '0',
      description: 'people'
    },
    {
      label: 'Gists',
      value: userData?.public_gists?.toLocaleString() || '0',
      description: 'public'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
        >
          <div className="text-3xl font-bold text-primary">{stat.value}</div>
          <div className="text-sm font-medium mt-1">{stat.label}</div>
          <div className="text-xs text-muted-foreground">{stat.description}</div>
        </div>
      ))}
    </div>
  )
}

export default GitHubStats
