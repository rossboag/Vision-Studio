import React, { useState } from 'react'
import { useAI } from '@ai-sdk/react'

interface AccessibilityIssue {
  element: string;
  issue: string;
  suggestion: string;
}

const AIAccessibilityChecker: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])
  const [loading, setLoading] = useState(false)
  const { generateText } = useAI()

  const checkAccessibility = async () => {
    setLoading(true)
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: `Analyze the following HTML for accessibility issues. Provide a list of issues, each with the element, the issue, and a suggestion for improvement: ${htmlContent}`,
        max_tokens: 500
      })
      const parsedIssues = JSON.parse(result.text)
      setIssues(parsedIssues)
    } catch (error) {
      console.error('Error checking accessibility:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Accessibility Checker</h2>
      <button 
        onClick={checkAccessibility}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Accessibility'}
      </button>
      {issues.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Accessibility Issues:</h3>
          <ul className="list-disc pl-5">
            {issues.map((issue, index) => (
              <li key={index} className="mb-2">
                <strong>{issue.element}:</strong> {issue.issue}
                <br />
                <span className="text-green-600">Suggestion: {issue.suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AIAccessibilityChecker

