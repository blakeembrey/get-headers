export interface Headers {
  [headerName: string]: string | string[]
}

export function parse (value: string): Headers {
  const headers: Headers = {}
  const lines = value.replace(/\r?\n$/, '').split(/\r?\n/)

  lines.forEach(function (header) {
    const indexOf = header.indexOf(':')
    const name = header.substr(0, indexOf)
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
  var headers: Headers = {}

  if (!response.rawHeaders) {
    Object.keys(response.headers).forEach(function (key) {
      var value = response.headers[key]

      // Need to normalize `Set-Cookie` header under node 0.10 which is
      // always set as an array.
      if (Array.isArray(value) && value.length === 1) {
        value = value[0]
      }

      headers[key] = value
    })
  } else {
    for (var i = 0; i < response.rawHeaders.length; i = i + 2) {
      var name = response.rawHeaders[i]
      var value = response.rawHeaders[i + 1]

      if (!headers.hasOwnProperty(name)) {
        headers[name] = value
      } else if (typeof headers[name] === 'string') {
        headers[name] = [<string> headers[name], value]
      } else {
        (<string[]> headers[name]).push(value)
      }
    }
  }

  return headers
}
