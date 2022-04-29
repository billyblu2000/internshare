import React from 'react'
import { Typography, Divider, Button, Tooltip, Collapse, Space, Table, Form, Input, DatePicker, Select, Modal } from 'antd'
import { EditOutlined, CloseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './index.css'

const { Title, Text } = Typography;
const { Panel } = Collapse;

const tableColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text,record) => {
      return <a>{text}</a>
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
    dataIndex: 'method',
    key: 'method',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Approve</a>
        <a>Reject</a>
      </Space>
    ),
  },
]

const data = [
  {
    key:'1',
    username:'Billy',
    email:'ly1387@nyu.edu',
    year:'2023',
    major:'Computer Science',
    method:'PDF'
  },
  {
    key:'2',
    username:'Lucy',
    email:'lucy@nyu.edu',
    year:'2023',
    major:'Computer Science',
    method:'Online'
  }
]

const form = (
  <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
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
        <Input.TextArea rows={6}/>
      </Form.Item>
      <Form.Item
        label="Job Requirements"
        name="job-requirements"
        rules={[{ required: true, message: 'Please input the job requirements!' }]}
      >
        <Input.TextArea rows={6}/>
      </Form.Item>
      <Form.Item
        label="Apply Start Time"
        name="apply-start-time"
      >
        <DatePicker bordered={false} />
        <DatePicker bordered={false} picker='time'/>
      </Form.Item>
      <Form.Item
        label="Apply Deadline"
        name="apply-deadline"
        rules={[{ required: true, message: 'Please input the apply deadline!' }]}
      >
        <DatePicker bordered={false} />
        <DatePicker bordered={false} picker='time'/>
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
        label="Tags"
        name="tags"
      >
        <Select
    mode="multiple"
    showArrow
    defaultValue={['gold', 'cyan']}
    style={{ width: '100%' }}
    options={[{value:'gold'}, {value:'cyan'}, {value:'1'}, {value:'2'}, {value:'3'}, {value:'4'}, {value:'5'}]}
  />
      </Form.Item>
    </Form>
)

const singlePost = (
  <div style={{ minWidth: '100%', maxWidth: '100%', padding: '15px', marginBottom: '10px', marginTop: '10px' }}>
    <div style={{ backgroundColor: '#602929' }} className='postcard-avatar'>
      LY
    </div>
    <div style={{ float: 'left', marginLeft: '15px' }}>
      <Title style={{ marginBottom: '0px' }} level={5}>InternSHare</Title>
      <Title style={{ marginBottom: '0px', marginTop: '0px' }} level={4}>Frontend Developer</Title>
    </div>
    <div style={{ float: 'right', marginTop: '13px' }}>
      <Tooltip title='Modify Post'><Button shape='circle' className='comment-reply-button'><EditOutlined /></Button></Tooltip>
      <Tooltip title='Delete Post'><Button shape='circle' style={{ marginLeft: '10px' }} className='comment-reply-button'><CloseOutlined /></Button></Tooltip>
      <Tooltip title='Go to Post'><Button shape='circle' style={{ marginLeft: '10px' }} className='comment-reply-button'><ArrowRightOutlined /></Button></Tooltip>
    </div>
    <div style={{ marginLeft: '40%', marginTop: '10px', verticalAlign:'top' }}>
      <div style={{ display: 'inline-block', textAlign: 'center'}}>
        <Title level={5} style={{marginBottom:'0px'}}>20</Title>
        <Text type='secondary'>Applicants</Text>
      </div>
      <div style={{ display: 'inline-block', marginLeft:'20%', textAlign: 'center' }}>
        <Title level={5} style={{marginBottom:'0px'}}>12</Title>
        <Text type='secondary'>Comments</Text>
      </div>
    </div>
    <Collapse style={{marginTop:'20px'}}>
      <Panel header="All Applicants" key="1">
      <Table columns={tableColumns} dataSource={data} pagination={false}/>
      </Panel>
    </Collapse>
  </div >
)
export default function Posts() {

  const [showForm, setShowForm] = React.useState(false)

  const handleOk = () => {
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>
      <div className='theme-box' style={{ width: '100%', padding: '15px 30px 15px 30px' }}>
        {singlePost}
        <Divider style={{ marginTop: '0px' }}></Divider>
        {singlePost}
        <Divider style={{ marginTop: '0px' }}></Divider>
        {singlePost}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button shape='round' onClick={() => setShowForm(true)}>Post New Position</Button>
      </div>
      <Modal width={1000} title="Create/Update Post" visible={showForm} onOk={handleOk} onCancel={handleCancel}>
        {form}
      </Modal>
    </div>
  )
}
