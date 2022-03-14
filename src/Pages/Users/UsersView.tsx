import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';

import './styles.css';

const UsersView = () => {

  const handleSort = (column: string) => {
    return 1;
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    console.log(page);
    console.log(pageSize);
  }

  const columns: ColumnsType = [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: () => handleSort('username'),
      sortDirections: ['descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: () => handleSort('name'),
      sortOrder: 'ascend',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.email - b.email,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.gender - b.gender,
    },
    {
      title: 'Registered Date',
      dataIndex: 'registeredDate',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.registeredDate - b.registeredDate,
    },
  ];
  
  const data = [
    {
      username: 'irvanuser',
      name: 'irvan',
      email: 'irvan@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2010 11:21',
    },
    {
      username: 'irvanuser123',
      name: 'irvan septian',
      email: 'irvan1234@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2009 11:21',
    },
    {
      username: 'irvanuser98',
      name: 'irvan kurniawan',
      email: 'irvan9882@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2011 11:21',
    },
    {
      username: 'irvanuser',
      name: 'irvan',
      email: 'irvan@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2010 11:21',
    },
    {
      username: 'irvanuser123',
      name: 'irvan septian',
      email: 'irvan1234@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2009 11:21',
    },
    {
      username: 'irvanuser98',
      name: 'irvan kurniawan',
      email: 'irvan9882@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2011 11:21',
    },
    {
      username: 'irvanuser',
      name: 'irvan',
      email: 'irvan@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2010 11:21',
    },
    {
      username: 'irvanuser123',
      name: 'irvan septian',
      email: 'irvan1234@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2009 11:21',
    },
    {
      username: 'irvanuser98',
      name: 'irvan kurniawan',
      email: 'irvan9882@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2011 11:21',
    },
    {
      username: 'irvanuser',
      name: 'irvan',
      email: 'irvan@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2010 11:21',
    },
    {
      username: 'irvanuser123',
      name: 'irvan septian',
      email: 'irvan1234@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2009 11:21',
    },
    {
      username: 'irvanuser98',
      name: 'irvan kurniawan',
      email: 'irvan9882@gmail.com',
      gender: 'Male',
      registeredDate: '13-01-2011 11:21',
    },
  ];

  return (
    <div className="container">
      <Table<any>
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={handlePaginationChange}
      />
    </div>
  );
}

export default UsersView;
