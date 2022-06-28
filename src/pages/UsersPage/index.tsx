import React, { FC, useEffect, useState } from 'react';
import { Table, Select, Space, message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../types/IUser';
import { userAPI } from '../../services/UserService';

const columns: ColumnsType<IUser> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const Users: FC = () => {
  const [query, setQuery] = useState({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
  });

  const {
    data: users,
    isLoading,
    error,
  } = userAPI.useFetchAllUsersQuery(query);

  const router = useNavigate();

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setQuery({
      page: newPagination.current,
    });
  };

  const handleGenderChange = (value: string) => {
    setQuery(prevState => {
      return { ...prevState, gender: value };
    });
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      current: users?.meta.pagination.page,
      total: users?.meta.pagination.total,
    });
    if (error) {
      message.error(`The request failed`);
    }
  }, [users, error]);

  return (
    <div className='container'>
      <Space className='mb-1'>
        <label>Gender</label>
        <Select
          defaultValue='All'
          style={{ width: 120 }}
          onChange={handleGenderChange}
        >
          <Select.Option value='male'>male</Select.Option>
          <Select.Option value='female'>female</Select.Option>
          <Select.Option value=''>All</Select.Option>
        </Select>
      </Space>

      <Table
        columns={columns}
        rowKey='id'
        dataSource={users?.data}
        loading={isLoading}
        pagination={pagination}
        onChange={handleTableChange}
        onRow={record => ({
          onClick: e => {
            router(`/edit/${record.id}`);
          },
        })}
      />
    </div>
  );
};

export default Users;
