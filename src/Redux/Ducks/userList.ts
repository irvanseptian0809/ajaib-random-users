import createReducer from '../../Utils/createReducer'

export const USER_LIST_FETCH = 'USER_LIST_FETCH'
export const USER_LIST_FETCH_SUCCESS = 'USER_LIST_FETCH_SUCCESS'
export const USER_LIST_FETCH_FAILED = 'USER_LIST_FETCH_FAILED'

export const USER_LIST_QUERY = 'USER_LIST_QUERY'
export const USER_LIST_QUERY_RESET = 'USER_LIST_QUERY_RESET'

export interface interfaceUser {
  username: string,
  name: string,
  email: string,
  gender: string,
  registered: string,
}

export interface interfaceQuery {
  seed?: string,
  page?: number,
  pageSize?: number,
  results?: number,
  gender?: string | undefined,
  keyword?: string | undefined,
  sortBy?: string | undefined,
  sortOrder?: any,
}

export interface interfaceUserList {
  users: interfaceUser[],
  isLoading: boolean,
  isError: boolean,
  errorMessage: string,
  query: interfaceQuery,
}

export const INITIAL_STATE: interfaceUserList = {
  users: [],
  query: {
    seed: 'ajaib',
    page: 1,
    pageSize: 10,
    results: 10,
    gender: undefined,
    keyword: undefined,
    sortBy: undefined,
    sortOrder: undefined,
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
}

const reducer = createReducer(INITIAL_STATE, {
  [USER_LIST_FETCH]: (state: any) => ({
    ...state,
    isLoading: true,
  }),
  [USER_LIST_FETCH_SUCCESS]: (state: any, payload: interfaceUser[]) => ({
    ...state,
    isLoading: false,
    isError: false,
    users: payload,
  }),
  [USER_LIST_FETCH_FAILED]: (state: any, payload: string) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload,
  }),

  [USER_LIST_QUERY]: (state: any, payload: interfaceQuery) => ({
    ...state,
    isLoading: true,
    query: {
      ...state.query,
      page: INITIAL_STATE.query.page,
      ...payload,
    }
  }),
  [USER_LIST_QUERY_RESET]: (state: any, payload: interfaceQuery) => ({
    ...state,
    isLoading: true,
    query: INITIAL_STATE.query
  }),
})

export const userListFetch = () => ({
  type: USER_LIST_FETCH,
})
export const userListFetchSuccess = (payload: interfaceUser[]) => ({
  type: USER_LIST_FETCH_SUCCESS,
  payload,
})
export const userListFetchFailed = (payload: string) => ({
  type: USER_LIST_FETCH_FAILED,
  payload,
})

export const userListQuery = (payload: interfaceQuery) => ({
  type: USER_LIST_QUERY,
  payload,
})
export const userListQueryReset = () => ({
  type: USER_LIST_QUERY_RESET,
})

export default reducer