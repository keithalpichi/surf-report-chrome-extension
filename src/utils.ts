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
