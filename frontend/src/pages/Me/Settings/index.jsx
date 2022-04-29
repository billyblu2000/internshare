import React from 'react'
import {Switch, Typography, Button} from 'antd'

export default function Settings() {
  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>
      <div className='theme-box' style={{ width: '100%', height: "250px", padding:'30px 50px 30px 50px' }}>
      <Typography.Title level={5}>Open Profile to the Public</Typography.Title>
      <Switch defaultChecked />
      <Typography.Text style={{display:'block', marginTop:'10px' }} type='secondary'>Current State: Everyone on the Internet can view your profile</Typography.Text>
      <Typography.Title level={5} style={{marginTop:'30px'}}>Change Password</Typography.Title>
      <div style={{marginTop:'0px'}}></div>
      <Button shape='round'>Change Password</Button>
      </div>
      </div>
  )
}
