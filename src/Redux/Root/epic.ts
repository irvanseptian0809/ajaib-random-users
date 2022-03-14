import { combineEpics } from 'redux-observable'

import * as userListEpics from '../Epics/userList'
import api from '../../Utils/api'

function rootEpics(action$: any, store: any) {
  const dependencies = {
    api,
  }
  const allEpics = [
    ...Object.values(userListEpics),
  ]

  return combineEpics(...allEpics)(action$, store, dependencies)
}

export default rootEpics