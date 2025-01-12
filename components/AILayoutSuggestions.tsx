import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface LayoutSuggestion {
  description: string;
  elements: string[];
}

const AILayoutSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<LayoutSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const { generateText } = useAI()

  const generateSuggestions = async () => {
    setLoading(true)
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: 'Generate 3 unique layout suggestions for a modern website homepage. For each suggestion, provide a brief description and a list of key elements.',
        max_tokens: 300
      })
      const parsedSuggestions = parseSuggestions(result.text)
      setSuggestions(parsedSuggestions)
    } catch (error) {
      console.error('Error generating layout suggestions:', error)
    }
    setLoading(false)
  }

  const parseSuggestions = (text: string): LayoutSuggestion[] => {
    const suggestions = text.split('\n\n')
    return suggestions.map(suggestion => {
      const [description, elements] = suggestion.split('\n- ')
      return {
        description: description.trim(),
        elements: elements.split('\n').map(e => e.replace('- ', ''))
      }
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Layout Suggestions</h2>
      <button 
        onClick={generateSuggestions} 
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Layout Suggestions'}
      </button>
      {suggestions.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Suggestion {index + 1}</h3>
              <p className="mb-2">{suggestion.description}</p>
              <ul className="list-disc pl-5">
                {suggestion.elements.map((element, i) => (
                  <li key={i}>{element}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AILayoutSuggestions

