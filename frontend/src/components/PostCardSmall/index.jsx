import React from 'react';
import { Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';
import { nameToShort } from '../../utils/utils';
const { Title, Text } = Typography;

export default function PostCardSmall({ data }) {
  var title = data.title;
  var company = data.company;
  var des = data.description;
  if (title.length >= 6){
    title = title.slice(0,7) + '..'
  }
  if (company.length >= 6){
    company = company.slice(0,7) + '..'
  }
  if (des.length >= 20){
    des = des.slice(0, 20) + '..'
  }
  return (
    <Link to={`/main/post/${data.id}`}>
          <div style={{ width:'100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }} className='theme-box-hoverable'>
            <div style={{ backgroundColor: data.publisher_color }} className='postcardsmall-avatar'>
              {nameToShort(data.publisher_name)}
            </div>
            <div style={{ display:'inline-block',verticalAlign:'top', marginLeft: '15px' }}>
              <div><Title style={{ marginBottom: '0px' }} level={5}>{company}<Divider type="vertical" style={{ backgroundColor: 'gray' }} />{title}</Title></div>
              <div><Text style={{ marginTop: '0px', width:'100%' }} ellipsis>{des}</Text></div>
            </div>
          </div>
    </Link>

  )
}
