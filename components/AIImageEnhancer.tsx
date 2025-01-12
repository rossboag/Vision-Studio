import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface AIImageEnhancerProps {
  imageUrl: string;
}

const AIImageEnhancer: React.FC<AIImageEnhancerProps> = ({ imageUrl }) => {
  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { generateImage } = useAI()

  const enhanceImage = async () => {
    setLoading(true)
    try {
      const result = await generateImage({
        model: 'dall-e-3',
        prompt: `Enhance this image: ${imageUrl}. Improve clarity, color balance, and overall quality.`,
        size: '1024x1024',
        response_format: 'url'
      })
      setEnhancedImageUrl(result.url)
    } catch (error) {
      console.error('Error enhancing image:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Image Enhancer</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Original Image</h3>
          <img src={imageUrl} alt="Original" className="w-full h-auto rounded" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Enhanced Image</h3>
          {enhancedImageUrl ? (
            <img src={enhancedImageUrl} alt="Enhanced" className="w-full h-auto rounded" />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
              {loading ? 'Enhancing...' : 'Enhanced image will appear here'}
            </div>
          )}
        </div>
      </div>
      <button 
        onClick={enhanceImage} 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Enhancing...' : 'Enhance Image'}
      </button>
    </div>
  )
}

export default AIImageEnhancer

