import React, { lazy, Suspense } from 'react'

const LazyLoadedComponent: React.FC<{ componentName: string }> = ({ componentName }) => {
  const Component = lazy(() => import(`./${componentName}`))

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export default LazyLoadedComponent

