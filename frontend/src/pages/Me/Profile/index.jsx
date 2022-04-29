import React from 'react'
import { Typography, Divider, Upload, Button } from 'antd'
import { FilePdfOutlined, EditOutlined } from '@ant-design/icons';

import './index.css'

export default function Profile() {
  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>
      <div className='theme-box' style={{ width: '100%', backgroundColor: '#52792420' }}>
        <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>

          <div className='search-result-avatar' style={{ backgroundColor: '#527924' }}>BY</div>
          <Typography.Title level={3} style={{ marginTop: '10px', marginBottom: '10px' }}>Billy Yi </Typography.Title>
          <Typography.Text style={{ marginTop: '0px', color: '#00000080' }}>ly1387@nyu.edu</Typography.Text>
          <Divider type='vertical' style={{ backgroundColor: '#AAAAAA80' }}></Divider>
          <Typography.Text style={{ marginTop: '0px', color: '#00000080' }}>2023</Typography.Text>
          <Divider type='vertical' style={{ backgroundColor: '#AAAAAA80' }}></Divider>
          <Typography.Text style={{ marginTop: '0px', color: '#00000080' }}>Computer Science</Typography.Text>

        </div>
        {/* <div style={{textAlign:'center',marginTop:'30px'}}>
          <div style={{display:'inline-block', justifyContent:'space-between', marginRight:'200px'}}>
            <div style={{fontSize:'15px', color:'gray'}}>Year</div>
            <div>2023</div>
          </div>
          <div style={{display:'inline-block', justifyContent:'space-between'}}>
            <div style={{fontSize:'15px', color:'gray'}}>Major</div>
            <div>Computer Science</div>
          </div>
        </div> */}

      </div>

      <div className='theme-box' style={{ width: '100%', marginTop: '10px', padding: '30px 40px 0px 40px' }}>
        <div style={{ float: 'left', }}>
          <Typography.Title level={4} style={{ marginTop: '40px', marginBottom: '0px' }}>Profile | Resume</Typography.Title>
          <Typography.Title level={2} style={{ marginTop: '0px' }}>Billy Yi</Typography.Title>
        </div>
        <Upload.Dragger name='file' multiple={false} action='' style={{ marginTop: '10px', width: '50%', float: 'right' }}>
          <p className="ant-upload-drag-icon">
            <FilePdfOutlined />
          </p>
          <p className="ant-upload-text">Click to upload your CV in PDF format</p>
        </Upload.Dragger>
        <Divider></Divider>
        <div style={{ marginBottom: '30px' }}></div>
        <span className='profile-field-title'>Education Background</span><Button type='text' className='comment-reply-button'><EditOutlined />Click to Edit</Button>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Internship Experience</span><Button type='text' className='comment-reply-button'><EditOutlined />Click to Edit</Button>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Project Experience</span><Button type='text' className='comment-reply-button'><EditOutlined />Click to Edit</Button>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Activities</span><Button type='text' className='comment-reply-button'><EditOutlined />Click to Edit</Button>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Awards</span><Button type='text' className='comment-reply-button'><EditOutlined />Click to Edit</Button>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Skills</span><Button type='text' className='comment-reply-button'><EditOutlined />Click to Edit</Button>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
      </div>
      <div style={{marginTop:'50px'}}>&nbsp;</div>
    </div>
  )
}
