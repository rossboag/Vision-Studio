import { useEffect, useCallback } from 'react'

type KeyHandler = (event: KeyboardEvent) => void

export function useKeyboardShortcut(key: string, handler: KeyHandler, modifiers: string[] = []) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const modifiersPressed = modifiers.every(
        modifier => event.getModifierState(modifier)
      )
      if (event.key === key && modifiersPressed) {
        handler(event)
      }
    },
    [key, handler, modifiers]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
}

