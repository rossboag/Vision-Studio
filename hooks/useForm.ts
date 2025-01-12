import { useState, ChangeEvent, FormEvent } from 'react'

type FormValues = Record<string, string>

interface UseFormReturn {
  values: FormValues
  errors: FormValues
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (onSubmit: (values: FormValues) => void) => (e: FormEvent<HTMLFormElement>) => void
}

export function useForm(initialValues: FormValues): UseFormReturn {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormValues>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (onSubmit: (values: FormValues) => void) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: FormValues = {}
    Object.keys(values).forEach(key => {
      if (!values[key]) {
        newErrors[key] = 'This field is required'
      }
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      onSubmit(values)
    }
  }

  return { values, errors, handleChange, handleSubmit }
}

