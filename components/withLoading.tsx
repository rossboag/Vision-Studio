import React from 'react'

interface WithLoadingProps {
  loading: boolean
}

function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoadingProps> {
  return ({ loading, ...props }: WithLoadingProps & P) => {
    if (loading) {
      return <div className="flex justify-center items-center h-full">Loading...</div>
    }
    return <WrappedComponent {...(props as P)} />
  }
}

export default withLoading

