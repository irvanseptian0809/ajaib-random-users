import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
import dayjs from 'dayjs'

import {
  USER_LIST_FETCH,
  USER_LIST_QUERY,
  USER_LIST_QUERY_RESET,
  userListFetchSuccess,
  userListFetchFailed,
} from '../Ducks/userList'

export function userListFetchEpic(action$: any, state$: any, { api }: any) {
  return action$.pipe(
    ofType(USER_LIST_FETCH, USER_LIST_QUERY, USER_LIST_QUERY_RESET),
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
        mergeMap((response: any) => {
          const userListResponse = response.results.map((item: any) => {
            return {
              username: item.login.username,
              name: `${item.name.title} ${item.name.first} ${item.name.last}`,
              email: item.email,
              gender: item.gender,
              registered: dayjs(item.registered.date).format('DD-MM-YYYY HH:MM'),

            }
          })
          return of(userListFetchSuccess(userListResponse))
        }),
        catchError(() => of(userListFetchFailed('Failed Fetching Data'))),
      )
    ),
  )
}