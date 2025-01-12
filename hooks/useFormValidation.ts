import { useState, useCallback } from 'react'

type ValidationRule = (value: string) => string | null

interface ValidationRules {
  [key: string]: ValidationRule[]
}

export function useFormValidation<T extends Record<string, string>>(initialState: T, validationRules: ValidationRules) {
  const [values, setValues] = useState<T>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }, [])

  const validateField = useCallback((name: keyof T, value: string) => {
    const fieldRules = validationRules[name as string]
    if (!fieldRules) return null

    for (const rule of fieldRules) {
      const error = rule(value)
      if (error) return error
    }

    return null
  }, [validationRules])

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    Object.keys(values).forEach(key => {
      const error = validateField(key as keyof T, values[key as keyof T])
      if (error) {
        newErrors[key as keyof T] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validateField])

  return { values, errors, handleChange, validateForm }
}

