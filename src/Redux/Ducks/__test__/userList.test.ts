import * as ducks from '../userList'
import reducer from '../userList'

const mockResponseSuccess = [{
  username: 'username',
  name: 'name',
  email: 'email',
  gender: 'male',
  registered: '2009-02-26T06:52:02.103Z',
}]

const mockQuery = {
  keyword: 'irvan',
  gender: 'male',
}

const mockResponseFailed = 'Failed Fetching Data'

describe('Testing Action Ducks userList', () => {
  it('When user list fetch', () => {
    const expected = {
      type: ducks.USER_LIST_FETCH,
    }
    expect(ducks.userListFetch()).toEqual(expected)
  })

  it('When user list fetch is success', () => {
    const expected = {
      payload: mockResponseSuccess,
      type: ducks.USER_LIST_FETCH_SUCCESS,
    }
    expect(ducks.userListFetchSuccess(mockResponseSuccess)).toEqual(expected)
  })

  it('When user list fetch is failed', () => {
    const expected = {
      payload: mockResponseFailed,
      type: ducks.USER_LIST_FETCH_FAILED,
    }
    expect(ducks.userListFetchFailed(mockResponseFailed)).toEqual(expected)
  })

  it('When user list query updated', () => {
    const expected = {
      payload: mockQuery,
      type: ducks.USER_LIST_QUERY,
    }
    expect(ducks.userListQuery(mockQuery)).toEqual(expected)
  })

  it('When user list query reset', () => {
    const expected = {
      type: ducks.USER_LIST_QUERY_RESET,
    }
    expect(ducks.userListQueryReset()).toEqual(expected)
  })
})

describe('Testing reducer user list', () => {
  it('Reducer user detail fetch', () => {
    const action = {
      type: ducks.USER_LIST_FETCH,
    }
    const expected = {
      ...ducks.INITIAL_STATE,
      isLoading: true,
    }
    expect(reducer(ducks.INITIAL_STATE, action)).toEqual(expected)
  })
  it('Reducer when user list fetch is success', () => {
    const action = {
      payload: mockResponseSuccess,
      type: ducks.USER_LIST_FETCH_SUCCESS,
    }
    const expected = {
      ...ducks.INITIAL_STATE,
      isLoading: false,
      isError: false,
      users: mockResponseSuccess,
    }
    expect(reducer(ducks.INITIAL_STATE, action)).toEqual(expected)
  })
  it('Reducer when user list fetch is failed', () => {
    const action = {
      payload: mockResponseFailed,
      type: ducks.USER_LIST_FETCH_FAILED,
    }
    const expected = {
      ...ducks.INITIAL_STATE,
      isLoading: false,
      isError: true,
      errorMessage: mockResponseFailed
    }
    expect(reducer(ducks.INITIAL_STATE, action)).toEqual(expected)
  })

  it('Reducer when user list query updated', () => {
    const action = {
      payload: mockQuery,
      type: ducks.USER_LIST_QUERY,
    }
    const expected = {
      ...ducks.INITIAL_STATE,
      isLoading: true,
      query: {
        ...ducks.INITIAL_STATE.query,
        ...mockQuery,
      }
    }
    expect(reducer(ducks.INITIAL_STATE, action)).toEqual(expected)
  })

  it('Reducer when user list query reset', () => {
    const action = {
      type: ducks.USER_LIST_QUERY_RESET,
    }
    const expected = {
      ...ducks.INITIAL_STATE,
      isLoading: true,
      query: ducks.INITIAL_STATE.query,
    }
    expect(reducer(ducks.INITIAL_STATE, action)).toEqual(expected)
  })
})