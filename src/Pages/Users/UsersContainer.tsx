import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { userListFetch, userListQuery, userListQueryReset } from '../../Redux/Ducks/userList'

import UsersView from './UsersView'

const UsersContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state.userList)

  const [keyword, setKeyword] = useState<string>('');
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

  const handleSearch = (payload: string) => {
    setKeyword(payload);
    dispatch(userListQuery({
      keyword: payload,
    }))
  }

  const handleDebounce = useMemo(() => debounce((payload: string) => {
    dispatch(userListQuery({
      keyword: payload,
    }))
  }, 5000), [userListQuery])

  const handleGender = (gender: string) => {
    dispatch(userListQuery({
      gender: gender === 'all' ? undefined : gender,
    }))
  }

  const handleReset = () => {
    setKeyword('')
    dispatch(userListQueryReset())
  }

  useEffect(() => {
    handleDebounce(keyword)
  }, [keyword])

  const props = {
    users: state.users,
    query: state.query,
    sortOrder,
    isLoading: state.isLoading,
    keyword,
    handlePaginationChange,
    handleSort,
    handleSearch,
    handleSearchDebounce: setKeyword,
    handleGender,
    handleReset,
  }

  return <UsersView {...props} />
}

export default UsersContainer
