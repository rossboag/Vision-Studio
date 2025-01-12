import { useState, useEffect } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setIsLoading(false)
  }, [src])

  return (
    <div style={{ width, height, position: 'relative' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f0f0f0',
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    </div>
  )
}

export default LazyImage

