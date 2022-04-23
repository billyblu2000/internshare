import React, { Component } from 'react';
import { AutoComplete, Input, Tree, Divider, Typography, Checkbox, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.css'
import Api from '../../utils/Api';
import ResultItem from './ResultItem';
import filterTreeData from  '../../static/english_categories.json';

const treeData = loadTreeData(filterTreeData)
const searchData = [
  {}, {}, {}, {}
]
export default class SearchBody extends Component {

  state = {
    sugOptions:[],
    filterChecked:treeData.map(item => item.key)
  }

  onFilterCheck = (checkedKeys, e) => {
    this.setState({filterChecked:e.checkedNodes.map(item => item.key)})
  }

  onClearFilterCheck = () => {
    this.setState({filterChecked:[]})
  }

  onSelectAllFilterCheck = () => {
    this.setState({filterChecked:treeData.map(item => item.key)})
  }

  onSearch = (value) => {
    const setSugOptions = (res) => {
      if (res === []) {
        this.setState({ sugOptions: [] })
      }
      else {
        var sugList = res.map(item => { return { key: 'search-sug-key' + Math.random(), value: item } });
        this.setState({ sugOptions: sugList })
      }
    }
    new Api('searchSuggestions', [value], setSugOptions);
  }

  render() {
    return (
      <div style={{ marginTop: '80px', paddingLeft: '5%', paddingRight: '5%' }}>
        <div style={{ display: 'inline-block', width: '25%', verticalAlign: 'top', minWidth: '300px', position: 'absolute' }}>
          <AutoComplete
            style={{ width: '100%', fontSize: '20px', zIndex: 1 }}
            className='searchpage-search-ref'
          onSearch={this.onSearch}
          options={this.state.sugOptions}
          >
            <Input bordered={false}
              style={{ border: '1px solid rgba(128, 128, 128, 0.336)', borderRadius: '25px', backgroundColor: 'white', height: '40px', fontSize: '28px', paddingLeft: '15px' }}
              onPressEnter={this.search}
              prefix={<SearchOutlined style={{ fontSize: '20px', marginRight: '5px', color: 'gray' }} />}
              placeholder="type to search positions">
            </Input>
          </AutoComplete>
          <div className='theme-box' style={{ padding: '15px', minHeight: '355px', maxHeight: '355px' }}>
            <Typography.Title level={5} style={{ textAlign: 'center' }}>Category Filter</Typography.Title>
            <div style={{ maxHeight: '255px', minHeight: '255px', overflow: 'auto', }}>
              <Tree
                checkable
                // onSelect={onSelect}
                // onCheck={onCheck}
                treeData={treeData}
                defaultCheckedKeys={treeData.map(item => item.key)}
                onCheck={this.onFilterCheck}
                checkedKeys={this.state.filterChecked}
              />
            </div>
            <Divider style={{ margin: '0px', }}></Divider>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '15px', marginBottom: '20px' }}>
              <div className='search-filter-button' onClick={this.onClearFilterCheck}>Clear All</div>
              <div className='search-filter-button' onClick={this.onSelectAllFilterCheck}>Select All</div>
              <div className='search-filter-button'>Apply</div>
            </div>
          </div>
          <div className='theme-box' style={{ padding: '15px 30px 15px 30px', minHeight: '180px', maxHeight: '180px', marginTop: '5px' }}>
            <Typography.Title level={5} style={{ textAlign: 'center' }}>Other Search Options</Typography.Title>
            <div style={{ color: 'rgba(0, 0, 0, 0.649)', marginTop: '10px' }}>Publisher Type</div>
            <div style={{ textAlign: 'center', marginTop: '5px' }} >
              <Checkbox.Group options={[{ label: 'Student Post', value: 'student post' }, { label: 'Official Post', value: 'official post' }]} defaultValue={['student post', 'official post']} />
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.649)', marginTop: '10px' }}>Sort By</div>
            <div style={{ textAlign: 'center' }} >
              <Radio.Group style={{ textAlign: 'center', marginTop: '5px' }}>
                <Radio value='relevance'>Relevance</Radio>
                <Radio value='popularity'>Popularity</Radio>
                <Radio value='date'>Date</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div style={{ display: 'inline-block', width: '67%', marginLeft: '30%', verticalAlign: 'top', minWidth: '200px' }}>
          <div className='theme-box' style={{ minHeight: '1000px', padding: '10px 20px 10px 20px' }}>
            {searchData.map(() => <><ResultItem></ResultItem><Divider style={{marginTop:'0px',marginBottom:'0px'}}></Divider></>)}
          </div>
        </div>
      </div>
    )
  }
}
function loadTreeData(originalData){
  var newData = originalData.children.map(item => {
    var category = {title:item.name, key: 'filter-data-first-'+item.name, children:[]};
    category.children = item.children.map(subItem => {
      var subCategory = {title:subItem.name, key:'filter-data-second-'+subItem.name, children:[]};
      subCategory.children = subItem.children.map(subSubItem => {
        return {title: subSubItem, key: 'filter-data-third-' + subSubItem}
      })
      return subCategory;
    })
    return category;
  })
  return newData;
}