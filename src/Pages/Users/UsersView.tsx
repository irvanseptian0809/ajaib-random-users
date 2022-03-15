import React, { useState } from 'react'
import { Button, Table, Pagination, Input, Select, Row, Col } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { interfaceUser, interfaceQuery } from '../../Redux/Ducks/userList'

import './styles.css'

const { Option } = Select
const { Search } = Input

interface interfaceUsersView {
  users: interfaceUser[],
  query: interfaceQuery,
  sortOrder: 'ascend' | 'descend' | undefined,
  isLoading: boolean,
  keyword: string,
  handlePaginationChange: (page: number) => void,
  handleSort: (column: string) => number,
  handleSearch: (e: string) => void,
  handleSearchDebounce: (e: string) => void,
  handleGender: (e: string) => void,
  handleReset: () => void,
}

const UsersView = ({
  users,
  query,
  sortOrder,
  isLoading,
  keyword,
  handlePaginationChange,
  handleSort,
  handleSearch,
  handleSearchDebounce,
  handleGender,
  handleReset,
}: interfaceUsersView) => {

  const columns: ColumnsType = [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: () => handleSort('username'),
      defaultSortOrder: sortOrder,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: () => handleSort('name'),
      defaultSortOrder: sortOrder,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: () => handleSort('email'),
      defaultSortOrder: sortOrder,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: () => handleSort('gender'),
      defaultSortOrder: sortOrder,
    },
    {
      title: 'Registered Date',
      dataIndex: 'registered',
      sorter: () => handleSort('registeredDate'),
      defaultSortOrder: sortOrder,
    },
  ];

  return (
    <div className="container">
      <Row gutter={16} className="search-section">
        <Col span={6}>
          <Search
            value={keyword}
            placeholder="Search"
            onChange={(e) => handleSearchDebounce(e.target.value)}
            onSearch={(e) => handleSearch(e)}
            enterButton
          />
        </Col>
        <Col span={6}>
          <Select
            value={query.gender === undefined ? 'all' : query.gender}
            className="full-width"
            onChange={(e) => handleGender(e)}
          >
            <Option value="all">All</Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Button onClick={handleReset}>Reset Filter</Button>
        </Col>
      </Row>

      <Table<any>
        columns={columns}
        dataSource={users}
        pagination={false}
        loading={isLoading}
      />

      <div className="pagination">
        <Pagination
          current={query.page}
          total={100}
          showSizeChanger={false}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}

export default UsersView;
