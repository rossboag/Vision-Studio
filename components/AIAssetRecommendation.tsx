import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface Asset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'icon' | 'font';
}

const AIAssetRecommendation: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(false)
  const { generateText } = useAI()

  const recommendAssets = async (description: string) => {
    setLoading(true)
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: `Based on the following project description, recommend 5 assets (images, icons, or fonts) that would be suitable: "${description}". For each asset, provide an id, name, url, and type.`,
        max_tokens: 300
      })
      const parsedAssets = JSON.parse(result.text)
      setAssets(parsedAssets)
    } catch (error) {
      console.error('Error recommending assets:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Asset Recommendations</h2>
      <input
        type="text"
        placeholder="Describe your project..."
        className="w-full p-2 border rounded mb-4"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            recommendAssets(e.currentTarget.value)
          }
        }}
      />
      <button 
        onClick={() => recommendAssets(document.querySelector('input')?.value || '')}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Recommending...' : 'Get Recommendations'}
      </button>
      {assets.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">{asset.name}</h3>
              <p>Type: {asset.type}</p>
              <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Asset
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AIAssetRecommendation

