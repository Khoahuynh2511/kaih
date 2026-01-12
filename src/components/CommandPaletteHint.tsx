'use client'

import { useState, useEffect } from 'react'

const CommandPaletteHint = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    
    const dismissed = sessionStorage.getItem('cmdPaletteHintDismissed')
    if (dismissed) {
      setIsVisible(false)
    }
  }, [])

  const handleClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: !isMac,
      metaKey: isMac,
      bubbles: true
    })
    document.dispatchEvent(event)
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    sessionStorage.setItem('cmdPaletteHintDismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={handleClick}
          className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/50"
          aria-label="Open command palette"
        >
          <svg 
            className="w-5 h-5 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          
          <span 
            className={`overflow-hidden transition-all duration-300 ${
              isHovered ? 'w-auto opacity-100' : 'w-0 opacity-0'
            }`}
          >
            <span className="whitespace-nowrap text-sm font-medium">
              Quick Search
            </span>
          </span>
          
          <div className={`flex items-center gap-1 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-70'
          }`}>
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border font-mono">
              {isMac ? 'Cmd' : 'Ctrl'}
            </kbd>
            <span className="text-muted-foreground text-xs">+</span>
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border font-mono">
              K
            </kbd>
          </div>
        </button>

        <button
          onClick={handleDismiss}
          className={`absolute -top-2 -right-2 w-5 h-5 bg-muted hover:bg-destructive hover:text-destructive-foreground rounded-full flex items-center justify-center text-xs transition-all duration-200 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          aria-label="Dismiss hint"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div 
        className={`absolute bottom-full right-0 mb-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-popover border rounded-lg shadow-lg p-3 text-sm max-w-[200px]">
          <p className="text-popover-foreground font-medium mb-1">Quick Navigation</p>
          <p className="text-muted-foreground text-xs">
            Search pages, actions, and more with the command palette.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CommandPaletteHint
