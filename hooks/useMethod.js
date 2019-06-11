import { useReducer } from 'react'

const initialState = {
  isLoading: false,
  data: null,
  error: null,
}

export default function useMethod(methodName, { transform } = {}) {
  const [{ isLoading, error, data }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
      case 'loading':
        return { ...state, isLoading: true }
      case 'success':
        return {
          ...state,
          isLoading: false,
          error: null,
          data: action.payload,
        }
      case 'failure':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          data: null,
        }
      case 'reset':
        return initialState
      default:
        return state
      }
    },
    initialState
  )

  const call = (...args) => {
    dispatch({ type: 'loading' })
    return new Promise((resolve, reject) => {
      Meteor.call(methodName, ...args, (err, result) => {
        if (err) {
          dispatch({ type: 'failure', payload: err })
          reject(err)
        } else {
          dispatch({
            type: 'success',
            payload: transform ? transform(result) : result,
          })
          resolve(result)
        }
      })
    })
  }

  const reset = () => dispatch({ type: 'reset'})

  return { isLoading, data, error, call, reset }
}