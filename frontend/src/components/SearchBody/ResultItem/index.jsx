import React from 'react';
import { Typography } from 'antd';
import './index.css'
import { Link } from 'react-router-dom';
import { nameToShort } from '../../../utils/utils';

export default function ResultItem({data}) {
  return (
    <Link to={`/main/post/${data.job_post_id}`}>
    <div className='search-result-box'>
      <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div style={{ verticalAlign: 'top', justifyContent: 'space-between', display: 'flex', paddingRight: '20px' }}>
          <div style={{ display: 'inline-block' }}>
            <div style={{ backgroundColor: data.color }} className='search-result-avatar'>
              {nameToShort(data.name)}
            </div>
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <Typography.Title level={5} style={{ marginBottom: '0px' }}>{data.company_name}
              {data.student_email?<></>:<span className='postdetail-tag' style={{ backgroundColor: '#fa8c16' }}>Official</span>}</Typography.Title>
              <Typography.Title level={4} style={{ marginTop: '0px', marginBottom: '0px' }}>{data.title}</Typography.Title>
            </div>
          </div>
          {/* <Divider type='vertical' style={{ display: 'inline-block', height: '50px', backgroundColor: '#DFDFDF' }}></Divider> */}
          <div style={{textAlign:'center', marginTop:'5px'}}>
            <div style={{fontSize:'10px', color:'black'}}>Apply Deadline</div>
            <div style={{fontSize:'16px', color:'black'}}>{data.apply_end}</div>

          </div>
          <div style={{textAlign:'center', marginTop:'5px'}}>
            <div style={{fontSize:'10px', color:'black'}}>Expected Salary</div>
            <div style={{fontSize:'16px', color:'black'}}>{data.salary}</div>

          </div>
          {/* <Divider type='vertical' style={{ display: 'inline-block', height: '50px', backgroundColor: '#DFDFDF' }}></Divider> */}
          <div>
            <div><span className='postdetail-tag'>tag3</span><span className='postdetail-tag' style={{backgroundColor:'#aa2871'}}>tag1</span></div>
            <div style={{ marginTop: '5px' }}><span className='postdetail-tag' style={{backgroundColor:'#582754'}}>tag2</span> <span className='postdetail-tag' style={{backgroundColor:'#421506'}}>tag4</span></div>
          </div>
        </div>
      </div>
      <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '10px' }}>
        <Typography.Paragraph ellipsis={{ rows: 3 }}>Job Description: {data.des} </Typography.Paragraph>
      </div>
    </div>
    </Link>
  )
}
