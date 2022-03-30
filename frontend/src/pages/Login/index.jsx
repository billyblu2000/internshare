import React from 'react';
import { Tabs, Form, Input, Button, AutoComplete, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import './index.css';
import RegisterForm from './RegisterForm';
import ForgetPasswordForm from './ForgetPasswordForm';
import { checkLogin, setCookie } from '../../utils/user'
import Api from '../../utils/Api'

const { TabPane } = Tabs;
const { Option } = AutoComplete;

const emailRules = [
  { required: true, message: 'Please enter your email' },
  { type: 'email', message: 'Please enter a valid email' }
]
const passwordRules = [
  { required: true, message: 'Please enter your password' },
]

export default function Login() {

  const [focusElement, setFocusElement] = React.useState('')
  const [autoCompleteResult, setAutoCompleteResult] = React.useState([]);
  const [forgetPasswordState, setForgetPasswordState] = React.useState(false);
  const [form] = Form.useForm();
  const loggedIn = checkLogin();

  const handleSearch = (value) => {
    let res = [];

    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['nyu.edu'].map((domain) => `${value}@${domain}`);
    }
    setAutoCompleteResult(res);
  };

  const tryLogin = (values) => {
    message.loading({ content: 'Logging in...', key: 'message' });
    new Api('login', [values['email'], values['password']], handleLoginResponse);
  }
  const handleLoginResponse = (res) => {
    console.log(res)
    if (res.status === 'success'){
      message.success({ content: 'Logged in!', key: 'message' });
    }
    else{
      message.error({ content: res.status, key: 'message' });
    }
    
  }

  const loginForm = (
    <>
      {forgetPasswordState ? <ForgetPasswordForm /> :
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ marginLeft: '15%', marginRight: '15%', marginTop: '10px' }}
          onFinish={(values) => tryLogin(values)}
          onFinishFailed={({ errorFields }) => message.error({ content: errorFields[0].errors[0], key: 'message' })}
        >
          <div className='login-label'>Email</div>
          <Form.Item
            label="Email"
            name="email"
            noStyle
            rules={emailRules}
          >
            <div className={focusElement === 'login-email' ? 'login-input-focus' : 'login-input'}>
              <AutoComplete
                onSearch={handleSearch}
                bordered={false}
                allowClear
                onBlur={() => setFocusElement('')}
                onFocus={() => setFocusElement('login-email')}
                onSelect={(value) => form.setFieldsValue({ 'email': value })}
                style={{ padding: '0px', width: '100%', textAlign: 'center' }}

              >
                {autoCompleteResult.map((email) => (
                  <Option key={email} value={email}>
                    {email}
                  </Option>
                ))}
              </AutoComplete>
            </div>
          </Form.Item>

          <div className='login-label'>Password</div>
          <Form.Item
            label="Password"
            name="password"
            noStyle
            rules={passwordRules}
          >
            <div className={focusElement === 'login-password' ? 'login-input-focus' : 'login-input'}>
              <Input.Password
                placeholder=""
                bordered={false}
                allowClear
                onBlur={() => setFocusElement('')}
                onFocus={() => setFocusElement('login-password')}
                style={{ fontSize: '20px', textAlign: 'center' }}
              />
            </div>

          </Form.Item>

          <Link to='/login/'>
            <div style={{ marginTop: '43px', float: "left", }} onClick={() => setForgetPasswordState(true)}
              className='login-forgot-password'>Forgot Password?</div>
          </Link>

          <Form.Item style={{ marginTop: '40px', float: 'right' }}>
            <Button type="primary" htmlType="submit" shape='round' size='medium'>
              &nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;
            </Button>
          </Form.Item>


        </Form>}
    </>);




  return (
    <>
      {loggedIn ? <Navigate to='/main/home/' /> :
        <div className='theme-box login-box' data-aos='flip-left'>
          <div className='login-top-img'>
            <Link to='/main/home/'><ArrowLeftOutlined className='login-back-home-botton'></ArrowLeftOutlined></Link>
            <img src='/logo/1.png' alt='logo' height='70px' style={{ userSelect: 'none' }} />
          </div>
          <Tabs defaultActiveKey="login-tab-login" centered style={{ marginTop: '20px' }} tabBarGutter={100} size='large'>
            <TabPane tab="Login" key="login-tab-login">
              {loginForm}
            </TabPane>
            <TabPane tab="Register" key="login-tab-register">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>}
      <div style={{ minHeight: '100px' }}></div>
    </>
  )
}

