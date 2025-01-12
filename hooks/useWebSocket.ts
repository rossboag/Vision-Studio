import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { initializeSocket, getSocket } from '../lib/socket'

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = initializeSocket()
    }

    const socket = socketRef.current

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  const emit = (eventName: string, data: any) => {
    const socket = getSocket()
    socket.emit(eventName, data)
  }

  return { isConnected, emit }
}

