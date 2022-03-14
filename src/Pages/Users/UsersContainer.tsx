import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { userListFetch, userListQuery, userListQueryReset } from '../../Redux/Ducks/userList'

import UsersView from './UsersView'

const UsersContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state.userList)

  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | undefined>(undefined);

  useEffect(() => {
    dispatch(userListFetch())
  },[]);

  const handleSort = (column: string) => {
    setSortBy(column)
    sortOrder === 'descend' ? setSortOrder('ascend') : setSortOrder('descend')

    return 0
  }

  useEffect(() => {
    dispatch(userListQuery({
      sortBy,
      sortOrder,
    }))
  },[sortBy, sortOrder]);

  const handlePaginationChange = (page: number) => {
    dispatch(userListQuery({
      page,
    }))
  }

  const handleSearch = (keyword: string) => {
    dispatch(userListQuery({
      keyword,
    }))
  }

  const handleSearchDebounce = debounce((keyword: string) => {
    handleSearch(keyword)
  }, 5000)

  const handleGender = (gender: string) => {
    dispatch(userListQuery({
      gender: gender === 'all' ? undefined : gender,
    }))
  }

  const handleReset = () => {
    dispatch(userListQueryReset())
  }

  const props = {
    users: state.users,
    query: state.query,
    sortOrder,
    isLoading: state.isLoading,
    handlePaginationChange,
    handleSort,
    handleSearch,
    handleSearchDebounce,
    handleGender,
    handleReset,
  }

  return <UsersView {...props} />
}

export default UsersContainer
