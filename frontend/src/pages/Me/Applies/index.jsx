import React from 'react'
import { Typography, Steps, Divider, Button, Tooltip, message, Skeleton, Popconfirm, Empty } from 'antd'
import { SendOutlined, EllipsisOutlined, CloseOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from '../../../utils/Api';
import { nameToShort } from '../../../utils/utils';


const { Title } = Typography;
const { Step } = Steps;


const SinglePost = ({ data, handleApplyInfo }) => {

  const cancel = (id) => {
    message.loading({ content: 'Please wait...', key: 'message' })
    new Api('deleteApplication', [id], cancleCallback);
  }

  const cancleCallback = (res) => {
    if (res.status === 'ok') {
      message.success({ content: 'Application Deleted!', key: 'message' })
      new Api('checkApplyStatus', [], handleApplyInfo);
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  return (
    <div style={{ minWidth: '100%', maxWidth: '100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }}>
      <div style={{ backgroundColor: data.publisher_color }} className='postcard-avatar'>
        {nameToShort(data.publisher_name)}
      </div>
      <div style={{ float: 'left', marginLeft: '15px' }}>
        <Title style={{ marginBottom: '0px' }} level={5}>{data.company_name}</Title>
        <Title style={{ marginBottom: '0px', marginTop: '0px' }} level={4}>{data.title}</Title>
      </div>
      <div style={{ float: 'right', marginTop: '13px' }}>
        <Tooltip title='Cancel Application'>
          <Popconfirm
            title="Are you sure to cancel this application?"
            onConfirm={() => cancel(data.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button shape='circle' size='small' className='comment-reply-button'><CloseOutlined /></Button>
          </Popconfirm></Tooltip>

        <Tooltip title='Go to Post'><Button shape='circle' style={{ marginLeft: '10px' }} size='small' className='comment-reply-button'><ArrowRightOutlined /></Button></Tooltip>
      </div>
      <div style={{ marginLeft: '40%', maxWidth: '40%', marginTop: '10px' }}>
        <Steps>
          <Step status="finish" title="Apply Sent" icon={<SendOutlined />} />
          {getStepEleAccordingToStatus(data.status)}
        </Steps>
      </div>

    </div>)
}

function getStepEleAccordingToStatus(status) {
  if (status === 'Pending') {
    return <Steps.Step status="process" title="Pending" icon={<EllipsisOutlined />} />
  }
  else if (status === 'Accept') {
    return <Steps.Step status="finish" title="Accepted" icon={<CheckOutlined style={{ color: 'green' }} />} />
  }
  else if (status === 'Reject') {
    return <Steps.Step status="finish" title="Rejected" icon={<CloseOutlined style={{ color: 'red' }} />} />
  }
  else {
    return <Steps.Step status="process" title={status} icon={<EllipsisOutlined />} />
  }

}
export default function Applies() {

  var starting = React.useRef(true);
  const [applies, setApplies] = React.useState(null);

  React.useEffect(() => {
    if (starting.current) {
      starting.current = false;
      new Api('checkApplyStatus', [], handleApplyInfo)
    }
  })

  const handleApplyInfo = (res) => {
    if (res.status === 'ok') {
      setApplies(res.result)
    }
    else {
      message.error({ content: res.status, key: "message" })
    }
  }

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%', paddingBottom:'50px' }}>{applies === null ? <><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /></> : <>
      <div className='theme-box' style={{ width: '100%', padding: '15px 30px 15px 30px' }}>
        {applies.length === 0?<><Empty style={{marginTop:'100px', marginBottom:'100px'}} description="You don't have any applications yet! Click on the lower button to search for jobs!"/></>:<>
        {applies.map((item) => {
          return <><SinglePost data={item} handleApplyInfo={handleApplyInfo}></SinglePost><Divider></Divider></>
        })}</>}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to='/main/search'><Button shape='round'>Apply more Positions</Button></Link>
      </div></>}
    </div>

  )
}
