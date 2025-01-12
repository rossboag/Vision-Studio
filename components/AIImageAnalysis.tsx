import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface AIImageAnalysisProps {
  imageUrl: string
}

const AIImageAnalysis: React.FC<AIImageAnalysisProps> = ({ imageUrl }) => {
  const [analysis, setAnalysis] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { generateText } = useAI()

  const analyzeImage = async () => {
    setLoading(true)
    try {
      // Use AI to generate analysis of the image
      const result = await generateText({
        model: 'gpt-4-vision',
        prompt: `Analyze this image and provide a detailed description: ${imageUrl}`,
        max_tokens: 200
      })
      setAnalysis(result.text)
    } catch (error) {
      console.error('Error analyzing image:', error)
      setAnalysis('Failed to analyze image. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={imageUrl} alt="Image to analyze" className="w-full h-64 object-cover mb-4 rounded" />
      <button 
        onClick={analyzeImage} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>
      {analysis && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  )
}

export default AIImageAnalysis

