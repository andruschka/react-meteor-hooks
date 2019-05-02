import { useState } from 'react'

export default function useMethod(methodName, { transform } = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const call = (...args) => {
    setIsLoading(true)
    return new Promise((resolve, reject) => {
      Meteor.call(methodName, ...args, (err, result) => {
        if (err) {
          setError(err)
          reject(err)
        } else {
          setData(transform ? transform(result) : result)
          resolve(result)
        }
        setIsLoading(false)
      })
    })
  }

  return { isLoading, data, error, call }
}