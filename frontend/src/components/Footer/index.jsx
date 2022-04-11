import React, { Component } from 'react';
import {Divider} from 'antd';
import './index.css'

export default class Footer extends Component {
 render() {
    return (
      <div style={{marginTop:'100px', backgroundColor:'#57068C', textAlign:'center', paddingTop:'20px', paddingBottom:'20px'}}>
      
      <span className='footer-button'>Terms</span>
      <Divider type="vertical" style={{backgroundColor:'#bf9ed480', marginLeft:'20px', marginRight:'20px'}}/>
      <span className='footer-button'>Privacy</span>
      <Divider type="vertical" style={{backgroundColor:'#bf9ed480', marginLeft:'20px', marginRight:'20px'}}/>
      <span className='footer-button'>About</span>
      <Divider type="vertical" style={{backgroundColor:'#bf9ed480', marginLeft:'20px', marginRight:'20px'}} />
      <span className='footer-button'>Contact</span>
      <div style={{marginTop:'20px'}}><img alt='logo' src='/logo/4.png' height='30px'></img><span style={{marginLeft:'10px', color:'#bf9ed4'}}>© 2022 InternSHare, Inc.</span></div>
      </div>
    )
  }
}
