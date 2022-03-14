import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

interface interfaceQuery {
  offset?: number,
  limit?: number,
}

interface interfaceApi {
  endpoint: {
    method: string,
    api: string,
  },
  query?: interfaceQuery,
  params?: string[],
}

function generateUrl(params: string[] = [], query?: interfaceQuery | any, api?: string) {
  let endpoint = ''
  if (params.length > 0) {
    params.map((param: string) => endpoint = `${endpoint}/${param}`)
  }
  if (query) {
    const queryParam = new URLSearchParams()
    Object.keys(query).forEach((key: any) => {
      queryParam.append(key, query[key])
    })
    endpoint = `${endpoint}?${queryParam.toString()}`
  }

  return `${api}/${endpoint}`
}

export default function api(options: interfaceApi) {
  const {
    endpoint,
    query,
    params,
  }: interfaceApi = options
  const { method, api } = endpoint
  const url = generateUrl(params, query, api)

  return ajax({
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  }).pipe(
    map((res: any) => res.response || {}),
    catchError((error: any) =>  throwError(error.response)),
  )
}
