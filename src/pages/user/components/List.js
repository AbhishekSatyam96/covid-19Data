import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
// import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
// import { Link } from 'umi'
// import styles from './List.less'
import axios from 'axios'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      countryData: []
    };
  }
  componentDidMount = () => {
    axios
      .get(`https://api.covid19api.com/summary`)
      .then((res) => {
        console.log("resList", res);
        this.setState({
          countryData: res.data.Countries
        })
      })
      .catch((err) => {
        console.error("error", err);
      })
  }

  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props
    const{countryData} = this.state;
    const columns = [
      // {
      //   title: <Trans>Avatar</Trans>,
      //   dataIndex: 'avatar',
      //   key: 'avatar',
      //   width: 72,
      //   fixed: 'left',
      //   render: text => <Avatar style={{ marginLeft: 8 }} src={text} />,
      // },
      // {
      //   title: <Trans>Name</Trans>,
      //   dataIndex: 'name',
      //   key: 'name',
      //   render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      // },
      {
        title: <Trans>Country</Trans>,
        dataIndex: 'Country',
        key: 'Country',
      },
      {
        title: <Trans>Total Confirmed</Trans>,
        dataIndex: 'TotalConfirmed',
        key: 'TotalConfirmed',
      },
      {
        title: <Trans>Total Recovered</Trans>,
        dataIndex: 'TotalRecovered',
        key: 'TotalRecovered',
        // render: text => <span>{text ? 'Male' : 'Female'}</span>,
      },
      {
        title: <Trans>TotalDeaths</Trans>,
        dataIndex: 'TotalDeaths',
        key: 'TotalDeaths',
      },
      {
        title: <Trans>Today Confirmed</Trans>,
        dataIndex: 'NewConfirmed',
        key: 'NewConfirmed',
      },
      {
        title: <Trans>Today Recovered</Trans>,
        dataIndex: 'NewRecovered',
        key: 'NewRecovered',
      },
      {
        title: <Trans>Today Deaths</Trans>,
        dataIndex: 'NewDeaths',
        key: 'NewDeaths',
      },
      // {
      //   title: <Trans>Operation</Trans>,
      //   key: 'operation',
      //   fixed: 'right',
      //   render: (text, record) => {
      //     return (
      //       <DropOption
      //         onMenuClick={e => this.handleMenuClick(record, e)}
      //         menuOptions={[
      //           { key: '1', name: i18n.t`Update` },
      //           { key: '2', name: i18n.t`Delete` },
      //         ]}
      //       />
      //     )
      //   },
      // },
    ]

    return (
      <Table
        // {...tableProps}
        // pagination={{
        //   ...tableProps.pagination,
        //   showTotal: total => i18n.t`Total ${total} Items`,
        // }}
        // className={styles.table}
        // bordered
        // scroll={{ x: 1200 }}
        columns={columns}
        // simple
        // rowKey={record => record.id}
        dataSource={countryData}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
