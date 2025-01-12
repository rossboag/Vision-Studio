import React, { useRef, useEffect } from 'react'

interface FocusTrapProps {
  children: React.ReactNode
}

const FocusTrap: React.FC<FocusTrapProps> = ({ children }) => {
  const trapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trapElement = trapRef.current
    if (!trapElement) return

    const focusableElements = trapElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    trapElement.addEventListener('keydown', handleKeyDown)
    firstElement.focus()

    return () => {
      trapElement.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <div ref={trapRef}>{children}</div>
}

export default FocusTrap

