import { useState } from 'react'
import { useAI } from '@ai-sdk/react'

export const useAITextGeneration = () => {
  const [generatedText, setGeneratedText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { generateText } = useAI()

  const generateAIText = async (prompt: string) => {
    setLoading(true)
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: prompt,
        max_tokens: 100
      })
      setGeneratedText(result.text)
    } catch (error) {
      console.error('Error generating text:', error)
      setGeneratedText('Failed to generate text. Please try again.')
    }
    setLoading(false)
  }

  return { generatedText, loading, generateAIText }
}

