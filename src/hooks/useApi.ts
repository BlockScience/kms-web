import { useState, useEffect } from 'preact/hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { api, auth0 } from '@/config'

interface ApiOptions<Result> {
  /** The HTTP method to use. */
  method?: string
  /** The body of the request. */
  data?: object
  /** If true, call will happen on first call to update() instead of immediately. */
  defer?: boolean
  /** If true, response will be streamed with SSE. Does not effect final returned result. */
  streaming?: boolean
  /** Callback for when the result is updated. */
  onResult?: (result: Result) => void
  /** Callback for when new tokens are streamed. */
  onStream?: (token: string[]) => void
}

interface ApiReturn<Result> {
  /** The result of the API call. */
  result: Result | null
  /** The stream of tokens. */
  stream: string[] | null
  /** Whether the API call is loading. */
  loading: boolean
  /** The error from the API call. */
  error: string | object | null
  /** Update the API call with new data or endpoint. Passing nothing will re-call with current options. */
  update: (data: object, endpoint?: string) => void
}

/**
 * Securely calls an API endpoint with the given options.
 * If the endpoint is null, the call will not be made. This is the same as setting deferred to true.
 * @param endpoint the endpoint to call.
 * @param options set options like method, body, etc.
 */
export function useApi<Result>(
  endpoint: string | null,
  options?: ApiOptions<Result>,
): ApiReturn<Result> {
  const { getAccessTokenSilently } = useAuth0()

  // Internal values
  const _method = options?.method || 'GET'
  const _streaming = options?.streaming || false
  const [_deferred, setDeferred] = useState(options?.defer || false)
  const [_endpoint, setEndpoint] = useState(endpoint)
  const [_data, setData] = useState(options?.data || null)

  // Exported values
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [stream, setStream] = useState<string[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const update = (data = _data, endpoint = _endpoint) => {
    if (_data !== data) setData(data)
    if (_endpoint !== endpoint) setEndpoint(endpoint)
    setDeferred(false)
  }

  useEffect(() => {
    if (!result || error) return
    if (options?.onResult) options.onResult(result)
  }, [result])

  useEffect(() => {
    if (!stream || error) return
    if (options?.onStream) options.onStream(stream)
  }, [stream])

  useEffect(() => {
    if (_deferred || !_endpoint) return
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0.audience,
          },
        })

        return accessToken
      } catch (error) {
        console.error((error as { message: string }).message)
      }
    }

    const getData = async () => {
      const token = await getToken()
      const url = `${api.url}${_endpoint}`

      if (_method === 'GET' && _data) {
        console.error(
          `Attempting to send GET request with body: ${_data} to ${url}`,
        )
      }
      try {
        const resp: Response = await fetch(url, {
          method: _method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: _data ? JSON.stringify(_data) : null,
        })

        if (_streaming) {
          const reader = resp.body?.getReader()

          setStream([])

          for (;;) {
            if (!reader) break
            const { value, done } = await reader.read()
            const decoder = new TextDecoder('utf-8')

            if (done) {
              // TODO: setResult after streaming is complete
              setLoading(false)
              setStream(null)
              break
            }

            if (value) {
              const data = decoder.decode(value, { stream: true })
              setStream((array) => [...(array || []), data])
            }
          }
        } else {
          const resp_json = await resp.json()
          setResult(resp_json)
          setLoading(false)
        }
      } catch (e) {
        setLoading(false)
        console.error(e)
        setError(e as string)
      }
    }
    setLoading(true)
    getData()
  }, [getAccessTokenSilently, _endpoint, _data, _deferred])

  return { result, stream, loading, error, update }
}
