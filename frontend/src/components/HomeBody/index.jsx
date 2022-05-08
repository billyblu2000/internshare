import React, { Component } from 'react'
import { AutoComplete, Input, Affix, Button, Steps, Typography, message, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, LikeFilled, SendOutlined, RadarChartOutlined, EllipsisOutlined, CloseOutlined, CheckOutlined, RightOutlined } from '@ant-design/icons';
import PostCard from '../PostCard';
import './index.css';
import Api from '../../utils/Api';
import { nameToShort } from '../../utils/utils'
import { Navigate } from 'react-router-dom';

const postData = {
  'postId': 1,
  'companyName': 'InternSHare',
  'jobName': 'Frontend Developer',
  'jobDes': 'Hello everyone, InternSHare is now hireing frontend developers! Feel free to apply this position.'
}

export default class HomeBody extends Component {

  state = {
    selectSearch: false,
    sugOptions: [],
    search: '',
    recommendation: [],
    applies: null,
    loggedin: '/__unknown__/'
  }

  componentDidMount = () => {
    new Api('recommendJobPost', [], this.setRecommendation);
    new Api('getUser', [], this.setLoggedin);
    new Api('checkApplyStatus', [], this.setApplies)
  }

  setRecommendation = (res) => {
    if (res.status === 'ok') {
      this.setState({ recommendation: res.result })
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  setApplies = (res) => {
    if (res.status === 'ok') {
      this.setState({ applies: res.result })
    }
  }

  setLoggedin = (res) => {
    if (res.status === 'ok') {
      this.setState({ loggedin: res.name })
    }
    else {
      this.setState({ loggedin: false })
    }
  }

  onSelect = () => {
    this.setState({ selectSearch: true })
    document.documentElement.style.overflow = 'hidden';
    document.getElementsByClassName('homepage-search-ref')[0].style['z-index'] = 1002;
  }

  onBlur = () => {
    this.setState({ selectSearch: false });
    document.documentElement.style.overflow = '';
    document.getElementsByClassName('homepage-search-ref')[0].style['z-index'] = 1;
  }

  // when search input changes
  onSearch = (value) => {

    const setSugOptions = (res) => {
      if (res === []) {
        this.setState({ sugOptions: [] })
      }
      else {
        var sugList = res.map(item => { return { key: 'search-sug-key' + Math.random(), value: item } });
        this.setState({ sugOptions: sugList })
      }
    }
    new Api('searchSuggestions', [value], setSugOptions);
  }

  // when select a word, begin search
  search = (e) => {
    if (typeof (e) === 'object') {
      this.setState({ search: e.target.value })
    }
    if (typeof (e) === 'string') {
      this.setState({ search: e })
    }
    document.documentElement.style.overflow = '';
  }

  getLogoPath = () => {
    var date = new Date();
    var hour = date.getHours();
    if (6 <= hour && hour <= 12) {
      return '/logo/2.png'
    }
    else if (13 <= hour && hour <= 19) {
      return '/logo/3.png'
    }
    else {
      return '/logo/4.png'
    }
  }

  getStepEleAccordingToStatus = () => {
    if (this.state.applies[0].status === 'pending'){
      return <Steps.Step status="process" title="Pending" icon={<EllipsisOutlined />} />
    }
    else if (this.state.applies[0].status === 'accept'){
      return <Steps.Step status="finish" title="Accepted" icon={<CheckOutlined style={{color:'green'}}/>} />
    }
    else if (this.state.applies[0].status === 'reject'){
      return <Steps.Step status="finish" title="Rejected" icon={<CloseOutlined style={{color:'red'}}/>} />
    }
    else{
      return <Steps.Step status="process" title={this.state.applies[0].status} icon={<EllipsisOutlined />} />
    }
    
  }

  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        {this.state.search === '' ? null : <Navigate to={`/main/search/${this.state.search}`}></Navigate>}
        <div className={this.state.selectSearch ? 'mask-vis' : ''}></div>
        <div style={{ marginTop: '100px', textAlign: 'center', }}>
          <img src={this.getLogoPath()} alt='logo' height='130px'></img>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <AutoComplete
            style={{ width: 600, fontSize: '20px', zIndex: 1 }}
            className='homepage-search-ref'
            onSearch={this.onSearch}
            options={this.state.sugOptions}
            onSelect={this.search}
          >
            <Input bordered={false}
              style={{ border: '1px solid rgba(128, 128, 128, 0.336)', borderRadius: '25px', backgroundColor: 'white', height: '40px', fontSize: '28px', paddingLeft: '15px' }}
              onSelect={this.onSelect}
              onBlur={this.onBlur}
              onPressEnter={this.search}
              prefix={<SearchOutlined style={{ fontSize: '20px', marginRight: '5px', color: 'gray' }} />}
              placeholder="type to search positions">
            </Input>
          </AutoComplete>
        </div>
        <div style={{ marginTop: '50px', marginLeft: '15%', marginRight: '15%' }}>
          <div style={{ minWidth: '60%', float: 'left', }} >
            <div style={{ color: 'gray' }}><LikeFilled style={{ marginRight: '10px', color: '#57068C66' }} />Positions Recommended for You</div>
            {this.state.recommendation.length === 0 ?
              <>
                <Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active />
                <Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active />
              </> :
              <>
                {this.state.recommendation.map((item) => {
                  var convertedData = {
                    'postId': item.id,
                    'companyName': item.company,
                    'jobName': item.title,
                    'jobDes': item.description,
                    'color': item.publisher_color,
                    'name': nameToShort(item.publisher_name)
                  }
                  var official = !item.student_email;
                  return <PostCard data={convertedData} official={official} />
                })}
              </>
            }


          </div>
          <div style={{ minWidth: '37%', float: 'left', marginLeft: '3%' }}>
            <Affix offsetTop={80}>
              <div style={{ color: 'gray' }}><SendOutlined style={{ marginRight: '10px', color: '#57068C66', marginBottom: '15px' }} />Your Applies</div>
              <div style={{ width: '100%', height: '200px', padding: '20px' }} class='theme-box'>
                {this.state.applies === null || this.state.loggedin === '/__unknown__/' ? <><Skeleton active></Skeleton></> :
                  <>
                    {this.state.loggedin === false ? <>
                      <div style={{ textAlign: 'center', marginTop: '30px' }}>
                      <Typography.Title level={5} style={{ marginBottom: '30px' }}>You are not logged in!</Typography.Title>
                      <Button shape='round'><Link to='/login'>Login or Register</Link></Button>
                      </div>
                    </> : <>
                      {this.state.applies.length === 0 ? <>
                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                          <Typography.Title level={5} style={{ marginBottom: '30px' }}>You don't have any applications yet!</Typography.Title>
                          <Button shape='round'><Link to='/main/search'>Start Apply</Link></Button>
                        </div>
                      </> : <>
                        <div style={{ display: 'inline-block' }}>
                          <div style={{ backgroundColor: this.state.applies[0].publisher_color }} className='search-result-avatar'>
                            {nameToShort(this.state.applies[0].publisher_name)}
                          </div>
                          <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                            <Typography.Title level={5} style={{ marginBottom: '0px' }}>{this.state.applies[0].company_name}</Typography.Title>
                            <Typography.Title level={4} style={{ marginTop: '0px', marginBottom: '0px' }}>{this.state.applies[0].title}</Typography.Title>
                          </div>
                        </div>
                        <Steps style={{ marginTop: '30px', width: '80%', textAlign: 'center' }}>
                          <Steps.Step status="finish" title="Sent" icon={<SendOutlined />} />
                          {this.getStepEleAccordingToStatus()}
                        </Steps>
                        <div style={{ float: 'right', marginTop: '30px', color: 'gray' }}><Link to='/main/me/applies'>View More<RightOutlined /></Link></div>
                      </>}
                    </>}
                  </>}
              </div>
              <div style={{ color: 'gray' }}><RadarChartOutlined style={{ marginRight: '10px', color: '#57068C66', marginTop: '20px', marginBottom: '15px' }} />Your Personality Test</div>
              <div style={{ width: '100%', height: '200px' }} class='theme-box'>
                <div style={{ textAlign: 'center', marginTop: '80px' }}>Personality Test Coming soon!</div>
              </div>
            </Affix>
          </div>
          <div style={{ minWidth: '60%', display: 'inline-block' }} >
            <div style={{ textAlign: 'center', marginTop: '20px' }}><Button shape='round' ><Link to='/main/search/ '>View More</Link></Button></div>
          </div>
        </div>
      </div>
    )
  }
}
