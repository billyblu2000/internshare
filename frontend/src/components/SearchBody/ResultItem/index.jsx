import React from 'react';
import { Divider, Typography } from 'antd';
import './index.css'
import Ribbon from 'antd/lib/badge/Ribbon';

export default function ResultItem() {
  return (
    <div className='search-result-box'>
      <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div style={{ verticalAlign: 'top', justifyContent: 'space-between', display: 'flex', paddingRight: '20px' }}>
          <div style={{ display: 'inline-block' }}>
            <div style={{ backgroundColor: '#003a8c' }} className='search-result-avatar'>
              B
            </div>
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <Typography.Title level={5} style={{ marginBottom: '0px' }}>InternSHare<span className='postdetail-tag' style={{ backgroundColor: '#fa8c16' }}>Official</span></Typography.Title>
              <Typography.Title level={4} style={{ marginTop: '0px', marginBottom: '0px' }}>Frontend Developer</Typography.Title>
            </div>
          </div>
          <Divider type='vertical' style={{ display: 'inline-block', height: '50px', backgroundColor: '#DFDFDF' }}></Divider>
          <div style={{textAlign:'center'}}>
            <div>¥3000-4000</div>
            <div>4-16</div>

          </div>
          <Divider type='vertical' style={{ display: 'inline-block', height: '50px', backgroundColor: '#DFDFDF' }}></Divider>
          <div>
            <div><span className='postdetail-tag'>frontend</span><span className='postdetail-tag' style={{backgroundColor:'#aa2871'}}>summer</span></div>
            <div style={{ marginTop: '5px' }}><span className='postdetail-tag' style={{backgroundColor:'#582754'}}>internet</span></div>
          </div>
        </div>
      </div>
      <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '10px' }}>
        <Typography.Paragraph ellipsis={{ rows: 3 }}>Job Description: test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test test testtesttest testtest test </Typography.Paragraph>
      </div>
    </div>
  )
}
