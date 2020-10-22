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
