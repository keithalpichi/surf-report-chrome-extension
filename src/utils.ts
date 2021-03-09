import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Location } from './models'

type classNameObject = {[key: string]: boolean }
export function classNames (...args: Array<string | classNameObject | undefined | null>): string {
  let result: string[] = []
  for (const key of args) {
    if (key === undefined || key === null) {
      continue
    }
    if (typeof key === 'string') {
      result.push(key)
      continue
    }
    for (const className in key) {
      if (key[className]) {
        result.push(className)
      }
    }
  }
  return result.join(' ')
}

export function debounce<F extends Function> (func: F, wait: number): F {
  let timeoutID: number

  if (!Number.isInteger(wait)) {
    console.warn('Called debounce without a valid number')
    wait = 300
  }

  // conversion through any necessary as it wont satisfy criteria otherwise
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID)
    const context = this

    timeoutID = window.setTimeout(function () {
		    func.apply(context, args)
    }, wait)
  } as any
}

export function throttle<F extends (...args: any[]) => any> (func: F, waitFor: number) {
  const now = () => new Date().getTime()
  const resetStartTime = () => startTime = now()
  let timeout: NodeJS.Timeout
  let startTime: number = now() - waitFor

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      const timeLeft = (startTime + waitFor) - now()
      if (timeout) {
        clearTimeout(timeout)
      }
      if (startTime + waitFor <= now()) {
        resetStartTime()
        resolve(func(...args))
      } else {
        timeout = setTimeout(() => {
          resetStartTime()
          resolve(func(...args))
        }, timeLeft)
      }
    })
}

export function useDebounce (value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

type SurflineSearchResultItem = {
  hits: {
    total: number
    max_score: number
    hits: Array<{
      _index: string
      _id: string
      _score: number
      _type: 'spot' | 'geoname' | 'editorial' | 'travel'
      _source: {
        name: string
        location: {
          lon: number
          lat: number
        }
        href: string
      }
    }>
  }
}

function parseSpots (data?: SurflineSearchResultItem[]): Location[] {
  const results: Location[] = []
  if (!data) {
    return results
  }
  for (const item of data) {
    if (!item.hits || !item.hits.hits) {
      continue
    }
    for (const hit of item.hits.hits) {
      if (hit._type !== 'spot') {
        continue
      }
      results.push(new Location({
        id: hit._id,
        name: hit._source.name,
        coordinates: {
          latitude: hit._source.location.lat,
          longitude: hit._source.location.lon
        }
      }))
    }
  }
  return results
}

export function useSpotFinder (searchTerm: string) {
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)
  const { data, error } = useSWR(debouncedSearchTerm ? `https://services.surfline.com/search/site?q=${debouncedSearchTerm}&querySize=10&suggestionSize=10&newsSearch=false` : null)
  return {
    data: parseSpots(data),
    isLoading: !error && !data,
    isError: error
  }
}
