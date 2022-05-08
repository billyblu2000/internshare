import React from 'react'
import { Typography, Divider, Skeleton, message } from 'antd'
import {LockOutlined} from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import Api from '../../utils/Api';
import { nameToShort } from '../../utils/utils';

export default function User() {

  const { email } = useParams();
  const [staticInfo, setStaticInfo] = React.useState(null);
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
      new Api('getProfile', [email], handleProfileInfo)
    }
  })

  const handleProfileInfo = (res) => {
    if (res.status === 'ok') {
      setStaticInfo({
        "id": res.result.id,
        "email": res.result.email,
        "name": res.result.name,
        "cv_id": res.result.cv_id,
        "color": res.result.color,
        "public": res.result.public,
        "year": res.result.year,
        "major": res.result.major
      })
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

  return (
    <div style={{ marginLeft: '20%', marginRight: '20%', marginTop:'100px' }}>{staticInfo === null?<><Skeleton active></Skeleton><Skeleton active></Skeleton><Skeleton active></Skeleton></>:<>
      <div className='theme-box' style={{ width: '100%', backgroundColor: staticInfo.color + '20' }}>
        <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>

          <div className='search-result-avatar' style={{ backgroundColor: staticInfo.color }}>{nameToShort(staticInfo.name)}</div>
          <Typography.Title level={3} style={{ marginTop: '10px', marginBottom: '10px' }}>{staticInfo.name}</Typography.Title>
          <Typography.Text style={{ marginTop: '0px', color: '#00000080' }}>{staticInfo.email}</Typography.Text>
          <Divider type='vertical' style={{ backgroundColor: '#AAAAAA80' }}></Divider>
          <Typography.Text style={{ marginTop: '0px', color: '#00000080' }}>{staticInfo.year}</Typography.Text>
          <Divider type='vertical' style={{ backgroundColor: '#AAAAAA80' }}></Divider>
          <Typography.Text style={{ marginTop: '0px', color: '#00000080' }}>{staticInfo.major}</Typography.Text>

        </div>

      </div>

      <div className='theme-box' style={{ width: '100%', marginTop: '10px', padding: '30px 40px 0px 40px' }}>
        {staticInfo.public !== 1?<div style={{minHeight:"200px", textAlign:'center', paddingTop:'30px'}}><div><LockOutlined style={{fontSize:'30px'}}/></div><Typography.Title level={5}>You cannot view {staticInfo.name}'s profile becuase he/she has set it to private</Typography.Title></div>:<>
        <div style={{ float: 'left', }}>
          <Typography.Title level={4} style={{ marginTop: '40px', marginBottom: '0px' }}>Profile | Resume</Typography.Title>
          <Typography.Title level={2} style={{ marginTop: '0px' }}>{staticInfo.name}</Typography.Title>
        </div>
        <Divider></Divider>
        <div style={{ marginBottom: '30px' }}></div>
        <span className='profile-field-title'>Education Background</span>
        <div className='profile-field-content'> {education}</div>
        <span className='profile-field-title'>Internship Experience</span>
        <div className='profile-field-content'>{internship}</div>
        <span className='profile-field-title'>Project Experience</span>
        <div className='profile-field-content'>{project}</div>
        <span className='profile-field-title'>Activities</span>
        <div className='profile-field-content'>{activity}</div>
        <span className='profile-field-title'>Awards</span>
        <div className='profile-field-content'>{awards}</div>
        <span className='profile-field-title'>Skills</span>
        <div className='profile-field-content'>{skills}</div>
        </>}
        </div>
      <div style={{marginTop:'50px'}}>&nbsp;</div></>}
    </div>
  )
}
