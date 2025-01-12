import { useState, useCallback } from 'react'

interface DesignState {
  elements: any[];
  selectedElement: number | null;
}

export const useDesignHistory = (initialState: DesignState) => {
  const [history, setHistory] = useState<DesignState[]>([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const pushState = useCallback((newState: DesignState) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, currentIndex + 1)
      return [...newHistory, newState]
    })
    setCurrentIndex(prevIndex => prevIndex + 1)
  }, [currentIndex])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1)
    }
  }, [currentIndex])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1)
    }
  }, [currentIndex, history.length])

  return {
    currentState: history[currentIndex],
    pushState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1
  }
}

