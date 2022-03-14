import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userListFetch } from '../../Redux/Ducks/userList'

import UsersView from './UsersView'

const UsersContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state.userList)

  useEffect(() => {
    dispatch(userListFetch())
  },[]);

  useEffect(() => {
    console.log(state.users)
  },[state.users])
  return <UsersView />
}

export default UsersContainer
