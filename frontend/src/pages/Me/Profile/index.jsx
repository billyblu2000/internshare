import React from 'react'
import { Typography, Divider, Upload, Tooltip, message, Skeleton } from 'antd'
import { FilePdfOutlined, EditOutlined } from '@ant-design/icons';
import Api from '../../../utils/Api';

import './index.css'
import { nameToShort } from '../../../utils/utils';

export default function Profile() {


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
      new Api('getProfile', [null], handleProfileInfo)
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

  const updateProfile = () => {
    new Api('updateProfile', [project, internship, education, awards, activity, skills, staticInfo.public], handleUpdateProfileCallback)
  }

  const handleUpdateProfileCallback = (res) => {
    if (res.status !== 'ok'){
      message.error({content:'Update not saved because error: '+res.status, key:'message'})
    }
  }

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>{staticInfo === null ? <><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/></> : <>
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
        <div style={{ float: 'left', }}>
          <Typography.Title level={4} style={{ marginTop: '40px', marginBottom: '0px' }}>Profile | Resume</Typography.Title>
          <Typography.Title level={2} style={{ marginTop: '0px' }}>{staticInfo.name}</Typography.Title>
        </div>
        <Upload.Dragger name='file' multiple={false} action='' style={{ marginTop: '10px', width: '50%', float: 'right' }}>
          <p className="ant-upload-drag-icon">
            <FilePdfOutlined />
          </p>
          <p className="ant-upload-text">Click to upload your CV in PDF format</p>
        </Upload.Dragger>
        <Divider></Divider>
        <div style={{ marginBottom: '30px' }}></div>
        <span className='profile-field-title'>Education Background</span>
        <Tooltip title="Click to Edit" mouseEnterDelay={0.3}><div className='profile-field-content'><Typography.Paragraph editable={{triggerType:'text', onChange:setEducation, onEnd:updateProfile}}>{education === ''?'Click to Edit':education}</Typography.Paragraph></div></Tooltip>
        <span className='profile-field-title'>Internship Experience</span>
        <Tooltip title="Click to Edit" mouseEnterDelay={0.3}><div className='profile-field-content'><Typography.Paragraph editable={{triggerType:'text', onChange:setInternship, onEnd:updateProfile}}>{internship === ''?'Click to Edit':internship}</Typography.Paragraph></div></Tooltip>
        <span className='profile-field-title'>Project Experience</span>
        <Tooltip title="Click to Edit" mouseEnterDelay={0.3}><div className='profile-field-content'><Typography.Paragraph editable={{tooltip:true, triggerType:'text', onChange:setProject, onEnd:updateProfile}}>{project === ''?'Click to Edit':project}</Typography.Paragraph></div></Tooltip>
        <span className='profile-field-title'>Activities</span>
        <Tooltip title="Click to Edit" mouseEnterDelay={0.3}><div className='profile-field-content'><Typography.Paragraph editable={{triggerType:'text', onChange:setActivity, onEnd:updateProfile}}>{activity === ''?'Click to Edit':activity}</Typography.Paragraph></div></Tooltip>
        <span className='profile-field-title'>Awards</span>
        <Tooltip title="Click to Edit" mouseEnterDelay={0.3}><div className='profile-field-content'><Typography.Paragraph editable={{triggerType:'text', onChange:setAwards, onEnd:updateProfile}}>{awards === ''?'Click to Edit':awards}</Typography.Paragraph></div></Tooltip>
        <span className='profile-field-title'>Skills</span>
        <Tooltip title="Click to Edit" mouseEnterDelay={0.3}><div className='profile-field-content'><Typography.Paragraph editable={{triggerType:'text', onChange:setSkills, onEnd:updateProfile}}>{skills === ''?'Click to Edit':skills}</Typography.Paragraph></div></Tooltip>
      </div>
      <div style={{ marginTop: '50px' }}>&nbsp;</div>
    </>}
    </div>
  )
}
