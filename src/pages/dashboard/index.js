import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import axios from 'axios'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
} from './components'
import styles from './index.less'
import store from 'store'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalConfirmed: 0,
      totalRecovered: 0,
      totalDeath: 0,
      countryData: []
    }
  }
  componentDidMount = () => {
    axios
      .get(`https://api.covid19api.com/summary`)
      .then((res) => {
        console.log("res", res);
        this.setState({
          totalConfirmed: res.data.Global.TotalConfirmed,
          totalRecovered: res.data.Global.TotalRecovered,
          totalDeath: res.data.Global.TotalDeaths,
          countryData: res.data.Countries
        })
      })
      .catch((err) => {
        console.error("error", err);
      })
  }

  render() {
    const { totalConfirmed,
      totalRecovered,
      totalDeath, countryData } = this.state;
    const userDetail = store.get('user')
    const { avatar, username } = userDetail
    const { dashboard, loading } = this.props
    const {
      weather,
      sales,
      quote,
      numbers,
      recentSales,
      comments,
      completed,
      browser,
      cpu,
      user,
    } = dashboard
    console.log("recentSales", recentSales);
    const newNumbers = [
      {
        icon: 'pay-circle-o',
        color: Color.green,
        title: 'Global Confirmed',
        number: totalConfirmed,
      },
      {
        icon: 'team',
        color: Color.blue,
        title: 'Global Recovered',
        number: totalRecovered,
      },
      {
        icon: 'message',
        color: Color.purple,
        title: 'Global Death',
        number: totalDeath,
      },
      // {
      //   // icon: 'FastBackwardOutlined',
      //   color: Color.red,
      //   title: 'Referrals',
      //   number: 4324,
      // },
    ]

    const numberCards = newNumbers.map((item, key) => (
      <Col key={key} lg={8} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>
          {numberCards}
          <Col lg={24} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <RecentSales data={countryData} />
            </Card>
          </Col>
          {/* <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <ScrollBar>
                <Comments data={comments} />
              </ScrollBar>
            </Card>
          </Col> */}
          {/* <Col lg={18} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Sales data={sales} />
            </Card>
          </Col> */}
          <Col lg={24} md={24}>
            <Row gutter={24}>
              <Col lg={12} md={12}>
                <Card
                  bordered={false}
                  className={styles.weather}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.blue,
                  }}
                >
                  <Weather
                    {...weather}
                    loading={loading.effects['dashboard/queryWeather']}
                  />
                </Card>
              </Col>
              <Col lg={12} md={12}>
                <Card
                  bordered={false}
                  className={styles.quote}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.peach,
                  }}
                >
                  <ScrollBar>
                    <Quote {...quote} />
                  </ScrollBar>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <Browser data={browser} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <ScrollBar>
                <Cpu {...cpu} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}
            >
              <User {...user} avatar={avatar} username={username} />
            </Card>
          </Col> */}
        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
