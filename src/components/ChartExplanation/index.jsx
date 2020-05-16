import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import styles from './style.less'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }
]

const ChartExplanation = () => {

  return (
    <div className={styles.chartExplanation}>
      <Table columns={columns} dataSource={data} size='small' pagination={false} scroll={{ y: 100 }} />
    </div>
  )
}

export default ChartExplanation