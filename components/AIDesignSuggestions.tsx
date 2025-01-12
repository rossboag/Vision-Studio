import React, { useState } from 'react'
import { useAITextGeneration } from '../hooks/useAITextGeneration'

interface AIDesignSuggestionsProps {
  currentDesign: string
}

const AIDesignSuggestions: React.FC<AIDesignSuggestionsProps> = ({ currentDesign }) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { generatedText, loading, generateAIText } = useAITextGeneration()

  const getSuggestions = async () => {
    await generateAIText(`Given the current design: "${currentDesign}", provide 3 suggestions for improvement.`)
    const newSuggestions = generatedText.split('\n').filter(s => s.trim() !== '')
    setSuggestions(newSuggestions)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Design Suggestions</h2>
      <button 
        onClick={getSuggestions} 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Generating Suggestions...' : 'Get AI Suggestions'}
      </button>
      {suggestions.length > 0 && (
        <ul className="mt-4 list-disc pl-5">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="mb-2">{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AIDesignSuggestions

