import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './recentSales.less'

const status = {
  1: {
    color: Color.green,
    text: 'SALE',
  },
  2: {
    color: Color.yellow,
    text: 'REJECT',
  },
  3: {
    color: Color.red,
    text: 'TAX',
  },
  4: {
    color: Color.blue,
    text: 'EXTENDED',
  },
}

function RecentSales({ data }) {
  const columns = [
    {
      title: 'Country',
      dataIndex: 'Country',
    },
    {
      title: 'Total Confirmed',
      dataIndex: 'TotalConfirmed',
      // render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
    },
    {
      title: 'Total Deaths',
      dataIndex: 'TotalDeaths',
      // render: text => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Total Recovered',
      dataIndex: 'TotalRecovered',
      // render: (text, it) => (
      //   <span style={{ color: status[it.status].color }}>${text}</span>
      // ),
    },
  ]
  // const tempData = [];
  // tempData.push(data[177]);
  // tempData.push(data[23]);
  // tempData.push(data[138]);
  // tempData.push(data[76]);
  // tempData.push(data[176]);
  // tempData.push(data[156]);
  return (
    <div className={styles.recentsales}>
      {/* <h3>Top 6 most corona cases countries</h3> */}
      <Table
        pagination={false}
        columns={columns}
        // rowKey={(record, key) => key}
        dataSource={data.filter((item, key) => key < 5)}
      // dataSource={data}
      />
    </div>
  )
}

RecentSales.propTypes = {
  data: PropTypes.array,
}

export default RecentSales
