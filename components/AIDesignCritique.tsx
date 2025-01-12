import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface AIDesignCritiqueProps {
  designUrl: string;
}

const AIDesignCritique: React.FC<AIDesignCritiqueProps> = ({ designUrl }) => {
  const [critique, setCritique] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const { generateText } = useAI()

  const getCritique = async () => {
    setLoading(true)
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: `Provide a constructive critique of the design at this URL: ${designUrl}. Consider aspects such as layout, color scheme, typography, user experience, and overall effectiveness. Offer specific suggestions for improvement.`,
        max_tokens: 500
      })
      setCritique(result.text)
    } catch (error) {
      console.error('Error getting design critique:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Design Critique</h2>
      <img src={designUrl} alt="Design to critique" className="w-full h-auto rounded mb-4" />
      <button 
        onClick={getCritique}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Get Design Critique'}
      </button>
      {critique && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Critique:</h3>
          <p className="whitespace-pre-wrap">{critique}</p>
        </div>
      )}
    </div>
  )
}

export default AIDesignCritique

