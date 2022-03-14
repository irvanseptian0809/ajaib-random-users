import createReducer from '../../Utils/createReducer'

export const USER_LIST_FETCH = 'USER_LIST_FETCH'
export const USER_LIST_FETCH_SUCCESS = 'USER_LIST_FETCH_SUCCESS'
export const USER_LIST_FETCH_FAILED = 'USER_LIST_FETCH_FAILED'

export const USER_LIST_QUERY = 'USER_LIST_QUERY'

export interface interfaceUser {
  gender: string,
  id: string,
  name: {
    title: string,
    first: string,
    last: string,
  },
  email: string,
  registered: {
    date: string,
  },
  login: {
    username: string,
  }
}

export interface interfaceQuery {
  seed?: string,
  page?: number,
  pageSize?: number,
  results?: number,
  gender?: string | undefined,
  keyword?: string | undefined,
  sortBy?: string | undefined,
  sordOrder?: string | undefined,
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
    sordOrder: undefined,
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
    query: {
      ...state.query,
      ...payload,
    }
  }),
})

export const userListFetch = () => ({
  type: USER_LIST_FETCH,
})
export const userListFetchSuccess = (payload: interfaceUser) => ({
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

export default reducer