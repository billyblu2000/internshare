import React from 'react'
import { Typography, Divider, Button, 
  Tooltip, Collapse, Space, 
  Table, Form, Input, DatePicker, 
  Select, Modal, message, Skeleton, 
  Popconfirm, Empty} from 'antd'
import { EditOutlined, CloseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import Api from '../../../utils/Api';
import { Link, useNavigate } from 'react-router-dom';
import positions from '../../../static/positions.json'

import './index.css'
import { nameToShort } from '../../../utils/utils';

const { Title, Text } = Typography;
const { Panel } = Collapse;





const CreateModifyForm = ({form}) => (
  <Form
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 12 }}
    form={form}
    initialValues={{ remember: true }}
    autoComplete="off"
  >
    <Form.Item
      label="Company Name"
      name="company-name"
      rules={[{ required: true, message: 'Please input the company name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Job Title"
      name="job-title"
      rules={[{ required: true, message: 'Please input the job title!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Job Description"
      name="job-description"
      rules={[{ required: true, message: 'Please input the job description!' }]}
    >
      <Input.TextArea rows={6} />
    </Form.Item>
    <Form.Item
      label="Job Requirements"
      name="job-requirements"
      rules={[{ required: true, message: 'Please input the job requirements!' }]}
    >
      <Input.TextArea rows={6} />
    </Form.Item>
    <Form.Item
      label="Apply Start Time"
      name="apply-start-time"
    >
      <DatePicker bordered={false} />
    </Form.Item>
    <Form.Item
      label="Apply Deadline"
      name="apply-deadline"
      rules={[{ required: true, message: 'Please input the apply deadline!' }]}
    >
      <DatePicker bordered={false} />
    </Form.Item>
    <Form.Item
      label="Job Start Date"
      name="job-start-date"
    >
      <DatePicker bordered={false} />
    </Form.Item>
    <Form.Item
      label="job End Date"
      name="job-end-date"
    >
      <DatePicker bordered={false} />
    </Form.Item>
    <Form.Item
      label="Estimated Salary"
      name="estimated salary"
    >
      <Input prefix="￥" suffix="RMB" type='number'/>
    </Form.Item>
    <Form.Item
      label="Tags"
      name="tags"
    >
      <Select
        mode="multiple"
        showArrow
        style={{ width: '100%' }}
        options={loadTags()}
      />
    </Form.Item>
  </Form>
)

const loadTags = () => {
  return positions.map((item) => {return {value:item}})
}

const SinglePost = ({ data, nav, modify, deletePost, approve, reject }) => {

  const tableColumns = [
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <Link to={`/main/user/${record.student_email}`}>{text}</Link>
      }
    },
    {
      title: 'Email',
      dataIndex: 'student_email',
      key: 'student_email',
    },
    {
      title: 'Year of Graduation',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Major',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'Apply Method',
      dataIndex: 'is_online',
      key: 'is_online',
      render: (text, record) => {
        return text === 1 ? 'Online Profile' : 'Send CV'
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">{record.status === 'Pending'?<>
          <a href={true} onClick={() => approve(record.id)}>Accept</a>
          <a href={true} onClick={() => reject(record.id)}>Reject</a>
          </>:<>{record.status+'ed'}</>}
        </Space>
      ),
    },
  ]

  return (
  <div style={{ minWidth: '100%', maxWidth: '100%', padding: '15px', marginBottom: '10px', marginTop: '10px', }}>
    <div style={{ backgroundColor: data.company_color ? data.company_color : data.student_color }} className='postcard-avatar'>
      {nameToShort(data.name)}
    </div>
    <div style={{ float: 'left', marginLeft: '15px' }}>
      <Title style={{ marginBottom: '0px' }} level={5}>{data.company_name}</Title>
      <Title style={{ marginBottom: '0px', marginTop: '0px' }} level={4}>{data.title}</Title>
    </div>
    <div style={{ float: 'right', marginTop: '13px' }}>
      <Tooltip title='Modify Post'><Button shape='circle' className='comment-reply-button' onClick={() => modify(data.id)}><EditOutlined /></Button></Tooltip>
      <Tooltip title='Delete Post'><Button shape='circle' style={{ marginLeft: '10px' }} className='comment-reply-button'>
        <Popconfirm
        title="Are you sure to delete this post?"
        onConfirm={() => deletePost(data.id)}
        okText="Yes"
        cancelText="No"
      ><CloseOutlined /></Popconfirm></Button></Tooltip>
      <Tooltip title='Go to Post'><Button shape='circle' style={{ marginLeft: '10px' }} className='comment-reply-button'><ArrowRightOutlined onClick={() => nav(`/main/post/${data.id}`)} /></Button></Tooltip>
    </div>
    <div style={{ marginLeft: '50%', marginTop: '10px', verticalAlign: 'top' }}>
      <div style={{ display: 'inline-block', textAlign: 'center' }}>
        <Title level={5} style={{ marginBottom: '0px' }}>{data.applicants.length}</Title>
        <Text type='secondary'>Applicants</Text>
      </div>
    </div>
    <Collapse style={{ marginTop: '20px' }}>
      <Panel header="All Applicants" key="1">
        <Table columns={tableColumns} dataSource={data.applicants} pagination={false} />
      </Panel>
    </Collapse>
  </div >)
}
export default function Posts() {

  const [showForm, setShowForm] = React.useState(false);
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [allPosts, setAllPosts] = React.useState(null);
  const [allApplicants, setAllApplicants] = React.useState(null);
  const [allPostWithApplicants, setAllPostWithApplicants] = React.useState(null);
  const [currentModifyId, setCurrentModifyId] = React.useState(null);

  React.useEffect(() => {
    new Api('getAllMyApplicants', [], handleApplicantsInfo)
    new Api('getAllMyPosts', [], handlePostInfo);
  }, [])

  const handlePostInfo = (res) => {
    if (res.status === 'ok') {
      setAllPosts(res.result)
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  const handleApplicantsInfo = (res) => {
    if (res.status === 'ok') {
      setAllApplicants(res.result)
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  React.useEffect(() => {
    setAllPostWithApplicants(deriveAllPostWithApplicants(allPosts, allApplicants))
  }, [allPosts, allApplicants])


  const deriveAllPostWithApplicants = (posts, applicants) => {
    if (posts !== null && applicants !== null) {
      var postWithApplicants = []
      for (let i = 0; i < posts.length; i++) {
        var postObj = posts[i];
        postObj.applicants = []
        for (let j = 0; j < applicants.length; j++) {
          if (applicants[j].post_id === postObj.id) {
            postObj.applicants.push(applicants[j])
          }
        }
        postWithApplicants.push(postObj)
      }
      return postWithApplicants;
    }
    else {
      return null
    }

  }

  const handleOk = () => {
    if (currentModifyId !== null) {
      var values = form.getFieldsValue();
      if (!values['job-title'] || !values['company-name']  || !values['job-description'] || !values['job-requirements'] || !values['apply-deadline']){
        message.error({content:'Please fill in every required field!', key:"message"})
        return
      }
      new Api('createPost', [
        values['job-title'],
        values['company-name'],
        false,
        '',
        values['job-description'],
        values['job-requirements'],
        values['job-start-date']?values['job-start-date'].format('yyyy-MM-DD').toString():null,
        values['job-end-date']?values['job-end-date'].format('yyyy-MM-DD').toString():null,
        values['estimated salary'],
        values['apply-start-time']?values['apply-start-time'].format('yyyy-MM-DD').toString():null,
        values['apply-deadline']?values['apply-deadline'].format('yyyy-MM-DD').toString():null
      ], handleDoModifyResult)
      message.loading({content:'Please wait...', key:"message"})
    }
    else {
      var values = form.getFieldsValue();
      if (!values['job-title'] || !values['company-name']  || !values['job-description'] || !values['job-requirements'] || !values['apply-deadline']){
        message.error({content:'Please fill in every required field!', key:"message"})
        return
      }
      new Api('createPost', [
        values['job-title'],
        values['company-name'],
        false,
        '',
        values['job-description'],
        values['job-requirements'],
        values['job-start-date']?values['job-start-date'].format('yyyy-MM-DD').toString():null,
        values['job-end-date']?values['job-end-date'].format('yyyy-MM-DD').toString():null,
        values['estimated salary'],
        values['apply-start-time']?values['apply-start-time'].format('yyyy-MM-DD').toString():null,
        values['apply-deadline']?values['apply-deadline'].format('yyyy-MM-DD').toString():null
      ], handleCreateCallback)
      message.loading({content:'Please wait...', key:"message"})
    }
  };

  const handleCreateCallback = (res) => {
    if (res.status === 'ok'){
      message.success({content:'Post Created!', key:'message'})
      new Api('getAllMyApplicants', [], handleApplicantsInfo)
      new Api('getAllMyPosts', [], handlePostInfo);
      setAllPostWithApplicants(null);
      setShowForm(false);
    }
    else{
      message.error({content:res.status, key:'message'})
    }
  }

  const handleCancel = () => {
    setShowForm(false);
    setCurrentModifyId(null);
  };

  const deletePost = (id) => {
    message.loading({ content: 'Please wait...', key: "message" })
    new Api('deletePost', [id], handleDelete);
  }

  const handleDelete = (res) => {
    if (res.status === 'ok') {
      message.success({ content: 'Post deleted!', key: 'message' })
      new Api('getAllMyApplicants', [], handleApplicantsInfo)
      new Api('getAllMyPosts', [], handlePostInfo);
      setAllPostWithApplicants(null);
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  const requestCreate = () => {
    form.setFieldsValue({
      'job-title':'',
      'company-name':'',
      'job-description':'',
      'job-requirements':'',
      'job-start-date':undefined,
      'job-end-date':undefined,
      'estimated salary':undefined,
      'apply-start-time':undefined,
      'apply-deadline':undefined
    })
    setShowForm(true);
  }

  const requestModify = (id) => {
    var postData = allPosts.filter((item) => id === item.id)[0]
    console.log(postData.salary, postData.end_date)
    form.setFieldsValue({
      'job-title':postData.title,
      'company-name':postData.company_name,
      'job-description':postData.des,
      'job-requirements':postData.requirement,
      'job-start-date':moment(postData.start_date),
      'job-end-date':moment(postData.end_date),
      'estimated salary':parseInt(postData.salary),
      'apply-start-time':moment(postData.apply_start),
      'apply-deadline':moment(postData.end_date)
    })
    setCurrentModifyId(id)
    setShowForm(true);
  }

  const handleDoModifyResult = (res) => {
    if (res.status === 'ok') {
      message.success({ content: 'Post modified!', key: "message" })
      setCurrentModifyId(null);
      setShowForm(false);
      new Api('getAllMyApplicants', [], handleApplicantsInfo);
      new Api('getAllMyPosts', [], handlePostInfo);
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  const approve = (id) => {
    message.loading({content:'Please wait...', key:'message'})
    new Api('acceptApplicant', [id], approveRejectCallback)
  }

  const reject = (id) => {
    message.loading({content:'Please wait...', key:'message'})
    new Api('rejectApplicant', [id], approveRejectCallback)
  }

  const approveRejectCallback = (res) => {
    if (res.status === 'ok'){
      message.success({content:'Operation completed!', key:'message'})
      new Api('getAllMyApplicants', [], handleApplicantsInfo);
      new Api('getAllMyPosts', [], handlePostInfo);
    }
    else{
      message.error({content:res.status, key:'message'})
    }
  }

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%', paddingBottom:'50px' }}>
      {allPostWithApplicants === null ? <><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /></> : <>
        <div className='theme-box' style={{ width: '100%', padding: '15px 30px 15px 30px' }}>
        {allPostWithApplicants.length === 0?<><Empty style={{marginTop:'100px', marginBottom:'100px'}} description="You don't have any post yet! Click on the lower button to create your first post!"/></>:<>
          {allPostWithApplicants.map((item) => {
            return <><SinglePost data={item} nav={nav} modify={requestModify} deletePost={deletePost} approve={approve} reject={reject}></SinglePost><Divider style={{ marginTop: '0px' }}></Divider></>
          })}</>}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button shape='round' onClick={requestCreate}>Post New Position</Button>
        </div>
        <Modal width={1000} title="Create/Update Post" visible={showForm} onOk={handleOk} onCancel={handleCancel}>
          <CreateModifyForm form={form} />
        </Modal></>}
    </div>
  )
}
