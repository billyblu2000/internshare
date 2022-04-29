import React from 'react'
import { Typography, Divider } from 'antd'

export default function User() {
  return (
    <div style={{ marginLeft: '20%', marginRight: '20%', marginTop:'100px' }}>
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

      </div>

      <div className='theme-box' style={{ width: '100%', marginTop: '10px', padding: '30px 40px 0px 40px' }}>
        <div style={{ float: 'left', }}>
          <Typography.Title level={4} style={{ marginTop: '40px', marginBottom: '0px' }}>Profile | Resume</Typography.Title>
          <Typography.Title level={2} style={{ marginTop: '0px' }}>Billy Yi</Typography.Title>
        </div>
        <Divider></Divider>
        <div style={{ marginBottom: '30px' }}></div>
        <span className='profile-field-title'>Education Background</span>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Internship Experience</span>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Project Experience</span>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Activities</span>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Awards</span>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
        <span className='profile-field-title'>Skills</span>
        <div className='profile-field-content'> placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder</div>
      </div>
      <div style={{marginTop:'50px'}}>&nbsp;</div>
    </div>
  )
}
