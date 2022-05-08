import React, { Component } from 'react';
import { createBrowserHistory } from 'history'
import { AutoComplete, Input, Tree, Divider, Typography, Checkbox, Radio, message, Button, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.css'
import Api from '../../utils/Api';
import ResultItem from './ResultItem';
import filterTreeData from '../../static/english_categories.json';

const treeData = loadTreeData(filterTreeData)
export default class SearchBody extends Component {

  state = {
    sugOptions: [],
    filterChecked: treeData.map(item => item.key),
    keyword: '',
    pagenum: 0,
    searchResult: [],
    searching: false
  }

  history = createBrowserHistory();

  componentDidMount = () => {
    var path = window.location.pathname;
    var keyword = null;
    if (path.slice(-7, -1) !== 'search' || path.slice(-7, -1) !== 'earch/') {
      keyword = decodeURI(path.trim().split('/')[3]);
    }
    if (keyword) {
      this.setState({ keyword: keyword })
      new Api('search', [keyword, this.state.pagenum + 1], this.setResult)
      this.setState({ searching: true })
    }
    else {
      new Api('search', [' ', this.state.pagenum + 1], this.setResult)
      this.setState({ searching: true })
    }
  }

  setResult = (res) => {

    if (res.status === 'ok') {
      this.setState({
        searchResult: this.state.searchResult.concat(res.result),
        pagenum: this.state.pagenum + 1,
        searching: false
      })
      if (res.result.length === 0){
        message.info({content:'no more results!', key:'message'})
      }
    }
    else {
      message.error({ content: res.status, key: 'message' })
      this.setState({ searching: false })
    }
  }

  onFilterCheck = (checkedKeys, e) => {
    this.setState({ filterChecked: e.checkedNodes.map(item => item.key) })
  }

  onClearFilterCheck = () => {
    this.setState({ filterChecked: [] })
  }

  onSelectAllFilterCheck = () => {
    this.setState({ filterChecked: treeData.map(item => item.key) })
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

  search = (e) => {
    if (typeof (e) === 'object') {
      this.setState({ keyword: e.target.value, searching: true, pagenum: 0, searchResult: [] })
      new Api('search', [e.target.value, 1], this.setResult)
      this.history.push(`/main/search/${e.target.value}`)
    }
    if (typeof (e) === 'string') {
      this.setState({ keyword: e, searching: true, pagenum: 0, searchResult: [] })
      new Api('search', [e, 1], this.setResult)
      this.history.push(`/main/search/${e}`)
    }
  }

  loadNextPage = () => {
    new Api('search', [this.state.keyword, this.state.pagenum + 1], this.setResult)
    this.setState({searching:true})
  }

  render() {
    return (
      <div style={{ marginTop: '80px', paddingLeft: '5%', paddingRight: '5%' }}>
        <div style={{ display: 'inline-block', width: '25%', verticalAlign: 'top', minWidth: '300px', position: 'absolute' }}>
          <AutoComplete
            style={{ width: '100%', fontSize: '20px', zIndex: 1 }}
            className='searchpage-search-ref'
            onSearch={this.onSearch}
            onSelect={this.search}
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
        <div style={{ display: 'inline-block', width: '67%', marginLeft: '30%', verticalAlign: 'top', minWidth: '200px'}}>
          <div className='theme-box' style={{ minHeight: '1000px', padding: '10px 35px 30px 35px' }}>
            {this.state.searchResult.map((item) => <><ResultItem data={item}></ResultItem><Divider style={{ marginTop: '0px', marginBottom: '0px' }}></Divider></>)}
            {this.state.searching ? <><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /></> : <></>}
          </div>
          <div style={{ textAlign: 'center', marginTop:'30px' }}>          
          <Button onClick={this.loadNextPage} shape='round'>Load More</Button>
          </div>
        </div>
      </div>
    )
  }
}
function loadTreeData(originalData) {
  var newData = originalData.children.map(item => {
    var category = { title: item.name, key: 'filter-data-first-' + item.name, children: [] };
    category.children = item.children.map(subItem => {
      var subCategory = { title: subItem.name, key: 'filter-data-second-' + subItem.name, children: [] };
      subCategory.children = subItem.children.map(subSubItem => {
        return { title: subSubItem, key: 'filter-data-third-' + subSubItem }
      })
      return subCategory;
    })
    return category;
  })
  return newData;
}