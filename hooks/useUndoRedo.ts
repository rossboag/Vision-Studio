import { useState, useCallback } from 'react'

interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useUndoRedo<T>(initialPresent: T) {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialPresent,
    future: []
  })

  const canUndo = state.past.length > 0
  const canRedo = state.future.length > 0

  const undo = useCallback(() => {
    setState(prevState => {
      if (prevState.past.length === 0) return prevState

      const previous = prevState.past[prevState.past.length - 1]
      const newPast = prevState.past.slice(0, prevState.past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [prevState.present, ...prevState.future]
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState(prevState => {
      if (prevState.future.length === 0) return prevState

      const next = prevState.future[0]
      const newFuture = prevState.future.slice(1)

      return {
        past: [...prevState.past, prevState.present],
        present: next,
        future: newFuture
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState(prevState => ({
      past: [...prevState.past, prevState.present],
      present: newPresent,
      future: []
    }))
  }, [])

  return { state: state.present, set, undo, redo, canUndo, canRedo }
}

