import { io, Socket } from 'socket.io-client'

let socket: Socket

export const initializeSocket = () => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })

  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  socket.on('disconnect', (reason) => {
    console.log(`Disconnected from WebSocket server: ${reason}`)
  })

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error)
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.')
  }
  return socket
}

