export interface Headers {
  [headerName: string]: string | string[]
}

export function parse (value: string): Headers {
  const headers: Headers = {}
  const lines = value.replace(/\r?\n$/, '').split(/\r?\n/)

  lines.forEach(function (header) {
    const indexOf = header.indexOf(':')
    const name = header.substr(0, indexOf).trim()
    const value = header.substr(indexOf + 1).trim()

    if (!headers.hasOwnProperty(name)) {
      headers[name] = value
    } else if (typeof headers[name] === 'string') {
      headers[name] = [<string> headers[name], value]
    } else {
      (<string[]> headers[name]).push(value)
    }
  })

  return headers
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
  const headers: Headers = {}

  for (let i = 0; i < values.length; i = i + 2) {
    const name = values[i]
    const value = values[i + 1]

    if (!headers.hasOwnProperty(name)) {
      headers[name] = value
    } else if (typeof headers[name] === 'string') {
      headers[name] = [<string> headers[name], value]
    } else {
      (<string[]> headers[name]).push(value)
    }
  }

  return headers
}
