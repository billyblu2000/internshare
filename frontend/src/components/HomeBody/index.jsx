import React, { Component } from 'react'
import { AutoComplete, Input } from 'antd';
import { SearchOutlined, LikeFilled} from '@ant-design/icons';
import PostCard from '../PostCard';
import './index.css';

export default class HomeBody extends Component {

  state = {
    selectSearch: false,
  }

  onSelect = () => {
    this.setState({ selectSearch: true })
  }

  onBlur = () => {
    this.setState({ selectSearch: false })
  }

  onSearch = () => {

  }

  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        <div className={this.state.selectSearch ? 'mask-vis' : ''}></div>
        <div style={{ marginTop: '100px', textAlign: 'center', }}>
          <img src='/logo/3.png' alt='logo' height='130px'></img>
        </div>
        <div style={{textAlign:'center', marginTop:'30px'}}>
        <AutoComplete
          style={{ width: 600, fontSize:'20px', zIndex: 2 }}
          onSearch={this.onSearch}  
        >
          <Input bordered={false}
            style={{border:'1px solid rgba(128, 128, 128, 0.336)', borderRadius:'25px', backgroundColor:'white', height:'40px',fontSize:'28px', paddingLeft:'15px', zIndex: 2}}
            onSelect={this.onSelect}
            onBlur={this.onBlur}
            prefix={<SearchOutlined style={{fontSize:'20px', marginRight:'5px', color:'gray'}}/>}
            placeholder="type to search positions">
          </Input>
        </AutoComplete>
        </div>
        <div style={{marginTop:'50px', marginLeft:'15%', marginRight:'15%'}}>
          <div style={{minWidth:'60%', display:'inline-block'}} >
            <div style={{color:'gray'}}><LikeFilled style={{marginRight:'10px', color:'#57068C66'}}/>Positions Recommended for You</div>
            <PostCard item = {null} ></PostCard>
            <PostCard item = {null} official></PostCard>
            <PostCard item = {null}></PostCard>
            <PostCard item = {null}></PostCard>
            <PostCard item = {null}></PostCard>
            <PostCard item = {null}></PostCard>
            <PostCard item = {null}></PostCard>
            <PostCard item = {null}></PostCard>
            <PostCard item = {null}></PostCard>
            <PostCard item = {null}></PostCard>
          </div>
          <div style={{minWidth:'40%', display:'inline-block'}}></div>
        </div>
      </div>
    )
  }
}
