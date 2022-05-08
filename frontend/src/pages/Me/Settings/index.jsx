import React from 'react'
import {Switch, Typography, Button, Skeleton, message} from 'antd'
import Api from '../../../utils/Api';

export default function Settings() {

  const [publicStatus, setPublicStatus] = React.useState(null);
  const [project, setProject] = React.useState(null);
  const [internship, setInternship] = React.useState(null);
  const [education, setEducation] = React.useState(null);
  const [awards, setAwards] = React.useState(null);
  const [activity, setActivity] = React.useState(null);
  const [skills, setSkills] = React.useState(null);
  var starting = React.useRef(true);

  React.useEffect(() => {
    if (starting.current) {
      starting.current = false;
      new Api('getProfile', [null], handleProfileInfo)
    }
  })

  const handleProfileInfo = (res) => {
    if (res.status === 'ok') {
      setPublicStatus(res.result.public)
      setProject(res.result.project)
      setAwards(res.result.awards)
      setActivity(res.result.activity)
      setEducation(res.result.education)
      setInternship(res.result.internship)
      setSkills(res.result.skills)
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  const changePrivacy = () => {
    var status = publicStatus;
    var newstatus = status === 1?0:1
    setPublicStatus(newstatus)
    new Api('updateProfile', [project, internship, education, awards, activity, skills, newstatus], handleUpdateProfileCallback)
  }

  const handleUpdateProfileCallback = (res) => {
    if (res.status !== 'ok'){
      message.error({content:'Update not saved because error: '+res.status, key:'message'})
    }
  }

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>
      {publicStatus === null?<><Skeleton active></Skeleton><Skeleton active></Skeleton></>:<>
      <div className='theme-box' style={{ width: '100%', height: "250px", padding:'30px 50px 30px 50px' }}>
      <Typography.Title level={5}>Open Profile to the Public</Typography.Title>
      <Switch checked={publicStatus === 1?true:false} onChange={changePrivacy} />
      <Typography.Text style={{display:'block', marginTop:'10px' }} type='secondary'>Current State: {publicStatus === 1?'Everyone on the Internet can view your profile':'Only the publishers of your applied posts (applied by online profile) can view your profile'}</Typography.Text>
      <Typography.Title level={5} style={{marginTop:'30px'}}>Change Password</Typography.Title>
      <div style={{marginTop:'0px'}}></div>
      <Button shape='round'>Change Password</Button>
      </div></>}
    </div>
  )
}
