import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

const AIColorPaletteGenerator: React.FC = () => {
  const [palette, setPalette] = useState<ColorPalette | null>(null)
  const [loading, setLoading] = useState(false)
  const { generateText } = useAI()

  const generatePalette = async () => {
    setLoading(true)
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: 'Generate a color palette with primary, secondary, accent, background, and text colors. Provide the colors in hex format.',
        max_tokens: 100
      })
      const colors = result.text.match(/#[0-9A-Fa-f]{6}/g)
      if (colors && colors.length >= 5) {
        setPalette({
          primary: colors[0],
          secondary: colors[1],
          accent: colors[2],
          background: colors[3],
          text: colors[4]
        })
      }
    } catch (error) {
      console.error('Error generating color palette:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Color Palette Generator</h2>
      <button 
        onClick={generatePalette} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Palette'}
      </button>
      {palette && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {Object.entries(palette).map(([key, color]) => (
            <div key={key} className="text-center">
              <div 
                className="w-16 h-16 mx-auto rounded-full mb-2" 
                style={{ backgroundColor: color }}
              ></div>
              <p className="text-sm">{key}</p>
              <p className="text-xs">{color}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AIColorPaletteGenerator

