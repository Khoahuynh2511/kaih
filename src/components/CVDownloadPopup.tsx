'use client'

import { useEffect, useState, useCallback } from 'react'

interface CVItem {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

const CVDownloadPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const cvItems: CVItem[] = [
    {
      id: 'harvard',
      title: 'Full Resume',
      description: 'Complete CV with all experience',
      icon: 'file',
      href: '/CV_HuynhDangKhoa_Harvard.html'
    },
    {
      id: 'fullstack',
      title: 'Fullstack Developer',
      description: 'Frontend + Backend expertise',
      icon: 'layers',
      href: '/CV_Fullstack.html'
    },
    {
      id: 'frontend',
      title: 'Frontend Engineer',
      description: 'React, Next.js, Angular',
      icon: 'layout',
      href: '/CV_FE.html'
    },
    {
      id: 'backend',
      title: 'Backend Engineer',
      description: 'Node.js, FastAPI, Spring Boot',
      icon: 'server',
      href: '/CV_BE.html'
    },
    {
      id: 'ai',
      title: 'AI/ML Engineer',
      description: 'LLMs, Computer Vision, Deep Learning',
      icon: 'brain',
      href: '/CV_AI.html'
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      description: 'Python, SQL, Power BI, Tableau',
      icon: 'chart',
      href: '/CV_DA.html'
    },
    {
      id: 'data-engineer',
      title: 'Data Engineer',
      description: 'ETL, Spark, Docker, Kubernetes',
      icon: 'database',
      href: '/CV_DE.html'
    },
    {
      id: 'mobile',
      title: 'Mobile Developer',
      description: 'Android, Kotlin, Firebase',
      icon: 'smartphone',
      href: '/CV_Mobile.html'
    }
  ]

  const filteredItems = cvItems.filter(item => {
    const searchLower = search.toLowerCase()
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    )
  })

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      setSearch('')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSelect = (item: CVItem) => {
    window.open(item.href, '_blank')
  }

  const getIcon = (icon: string) => {
    const icons: Record<string, JSX.Element> = {
      file: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      layers: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      layout: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
      server: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
      brain: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      chart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      database: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
      smartphone: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    }
    return icons[icon] || icons.file
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download CV
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
            <div className="relative w-full max-w-lg bg-card border rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center border-b px-4">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search CV versions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-4 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 text-xs bg-muted rounded">ESC</kbd>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto p-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-left group"
                    >
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">{getIcon(item.icon)}</span>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <svg className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No CV versions found
                  </div>
                )}
              </div>
              
              <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Click to open in new tab</span>
                <span>Press <kbd className="px-1.5 py-0.5 bg-muted rounded">ESC</kbd> to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CVDownloadPopup
