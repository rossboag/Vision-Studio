import React from 'react'

interface OptimizedComponentProps {
  title: string
  content: string
}

const OptimizedComponent: React.FC<OptimizedComponentProps> = React.memo(({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{content}</p>
    </div>
  )
})

OptimizedComponent.displayName = 'OptimizedComponent'

export default OptimizedComponent

