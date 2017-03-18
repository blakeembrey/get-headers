export interface Headers {
  [headerName: string]: string | string[]
}

interface Case {
  [key: string]: string
}

export function parse (value: string): Headers {
  const arr: string[] = []
  const lines = value.replace(/\r?\n$/, '').split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const header = lines[i]
    const indexOf = header.indexOf(':')
    const name = header.substr(0, indexOf).trim()
    const value = header.substr(indexOf + 1).trim()

    arr.push(name, value)
  }

  return array(arr)
}

export function http (response: any): Headers {
  if (response.rawHeaders) {
    return array(response.rawHeaders)
  }

  const headers: Headers = {}

  Object.keys(response.headers).forEach(function (key) {
    const value = response.headers[key]

    // Need to normalize `Set-Cookie` header under node 0.10 which is
    // always set as an array.
    if (value.length === 1) {
      headers[key] = value[0]
    } else {
      headers[key] = value
    }
  })

  return headers
}

export function array (values: string[]) {
  const casing: Case = {}
  const headers: Headers = {}

  for (let i = 0; i < values.length; i = i + 2) {
    const name = values[i]
    const lower = name.toLowerCase()
    const oldName = casing[lower]
    const value = values[i + 1]

    if (!headers.hasOwnProperty(oldName)) {
      headers[name] = value
    } else {
      // Move the header property when the name case changes.
      if (name !== oldName) {
        headers[name] = headers[oldName]
        delete headers[oldName]
      }

      if (typeof headers[name] === 'string') {
        headers[name] = [headers[name] as string, value]
      } else {
        (headers[name] as string[]).push(value)
      }
    }

    casing[lower] = name
  }

  return headers
}
