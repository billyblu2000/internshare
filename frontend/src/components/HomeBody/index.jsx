import React, { Component } from 'react'
import { AutoComplete, Input, Affix, Button } from 'antd';
import { SearchOutlined, LikeFilled, SendOutlined, RadarChartOutlined } from '@ant-design/icons';
import PostCard from '../PostCard';
import './index.css';
import Api from '../../utils/Api';
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
    console.log(typeof(e))
    if (typeof(e) === 'object'){
      this.setState({search:e.target.value})
    }
    if (typeof(e) === 'string'){
      this.setState({search:e})
    }
    document.documentElement.style.overflow = '';
  }

  getLogoPath = () => {
    var date = new Date();
    var hour = date.getHours();
    if (6 <= hour && hour <= 12){
      return '/logo/2.png'
    } 
    else if (13 <= hour && hour <= 19){
      return '/logo/3.png'
    }
    else{
      return '/logo/4.png'
    }
  }

  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        {this.state.search === ''?null:<Navigate to='/main/search'></Navigate>}
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
            <PostCard data={postData} ></PostCard>
            <PostCard data={postData} official></PostCard>
            <PostCard data={postData}></PostCard>
            <PostCard data={postData}></PostCard>
            <PostCard data={postData}></PostCard>
            <PostCard data={postData}></PostCard>
            <PostCard data={postData}></PostCard>
            <PostCard data={postData}></PostCard>
            <PostCard data={postData}></PostCard>
            <PostCard data={postData}></PostCard>

          </div>
          <div style={{ minWidth: '37%', float: 'left', marginLeft: '3%' }}>
            <Affix offsetTop={80}>
              <div style={{ color: 'gray' }}><SendOutlined style={{ marginRight: '10px', color: '#57068C66', marginBottom: '15px' }} />Your Applies</div>
              <div style={{ width: '100%', height: '200px' }} class='theme-box'></div>
              <div style={{ color: 'gray' }}><RadarChartOutlined style={{ marginRight: '10px', color: '#57068C66', marginTop: '20px', marginBottom: '15px' }} />Your ???</div>
              <div style={{ width: '100%', height: '200px' }} class='theme-box'></div>
            </Affix>
          </div>
          <div style={{ minWidth: '60%', display: 'inline-block' }} >
            <div style={{ textAlign: 'center', marginTop: '20px' }}><Button shape='round'>View More</Button></div>
          </div>
        </div>
      </div>
    )
  }
}
