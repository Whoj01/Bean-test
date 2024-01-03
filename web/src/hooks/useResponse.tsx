import { useState } from "react"

export const useResponse = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const setMessageToError = (msg: string) => {
    setMessage(msg)
  }

  return {
    error,
    loading,
    setLoading,
    setError,
    setMessageToError,
    message
  }
}