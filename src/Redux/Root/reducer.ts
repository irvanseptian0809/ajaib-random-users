import { combineReducers } from 'redux'
import userList from '../Ducks/userList'

const appReducers = combineReducers({
  userList,
})

const rootReducers = (state: any, action: any) => {
  return appReducers(state, action)
}

export default rootReducers