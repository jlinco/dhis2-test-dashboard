'use client'

import { useState } from 'react'

type LocalStorageKey = string

export function useLocalStorage<T>(
  key: LocalStorageKey,
  initialValue: T
  // eslint-disable-next-line no-unused-vars
): [T, (value: T) => void] {
  const [items, setItems] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.error(error)
    }
  })

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(items) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setItems(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [items, setValue]
}
