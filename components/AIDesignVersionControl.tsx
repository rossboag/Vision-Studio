import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface DesignVersion {
  id: string;
  description: string;
  timestamp: string;
  changes: string[];
}

const AIDesignVersionControl: React.FC<{ currentDesign: string }> = ({ currentDesign }) => {
  const [versions, setVersions] = useState<DesignVersion[]>([])
  const [loading, setLoading] = useState(false)
  const { generateText } = useAI()

  const createNewVersion = async () => {
    setLoading(true)
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: `Analyze the current design and create a new version with a description and list of changes: ${currentDesign}`,
        max_tokens: 300
      })
      const newVersion: DesignVersion = JSON.parse(result.text)
      setVersions(prevVersions => [...prevVersions, newVersion])
    } catch (error) {
      console.error('Error creating new version:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Design Version Control</h2>
      <button 
        onClick={createNewVersion}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create New Version'}
      </button>
      {versions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Version History:</h3>
          <ul className="space-y-4">
            {versions.map((version) => (
              <li key={version.id} className="border-b pb-2">
                <p className="font-medium">{version.description}</p>
                <p className="text-sm text-gray-500">{version.timestamp}</p>
                <ul className="list-disc pl-5 mt-2">
                  {version.changes.map((change, index) => (
                    <li key={index} className="text-sm">{change}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AIDesignVersionControl

