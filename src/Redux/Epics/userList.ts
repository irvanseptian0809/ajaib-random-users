import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'

import {
  USER_LIST_FETCH,
  USER_LIST_QUERY,
  userListFetchSuccess,
  userListFetchFailed,
} from '../Ducks/userList'

export function userListFetchEpic(action$: any, state$: any, { api }: any) {
  return action$.pipe(
    ofType(USER_LIST_FETCH, USER_LIST_QUERY),
    mergeMap(() =>
      api({
        endpoint: {
          method: 'GET',
          api: 'https://randomuser.me/api/', 
        },
        query: {
          ...state$.value.userList.query,
        }
      }).pipe(
        mergeMap((response: any) => of(userListFetchSuccess(response.results))),
        catchError(() => of(userListFetchFailed('Failed Fetching Data'))),
      )
    ),
  )
}