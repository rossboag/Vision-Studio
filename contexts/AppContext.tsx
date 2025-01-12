import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  theme: string
  setTheme: (theme: string) => void
  user: any
  setUser: (user: any) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ theme, setTheme, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

