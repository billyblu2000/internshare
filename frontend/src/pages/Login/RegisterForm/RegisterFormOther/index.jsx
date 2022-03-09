import React from 'react'
import { Input, Select } from 'antd';
import './index.css'
const { Option } = Select;

export default function RegisterFormOther({setUsername, setPassword, setMajor, setYear, setRePassword}) {

    const [focus, setFocus] = React.useState(false)

    return (
        <div style={{ width: '70%', paddingLeft: '10%', paddingRight: '10%', overflow: 'auto' }}>
            <div className='login-register-label' id='login-register-username-label'>User Name</div>
            <div className={focus === 'username' ? 'login-input-focus' : 'login-input'}>
                <Input
                    placeholder=""
                    bordered={false}
                    allowClear
                    onBlur={() => setFocus('')}
                    onFocus={() => setFocus('username')}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ fontSize: '20px', textAlign: 'center' }}
                />
            </div>
            <div className='login-label' id='login-register-password-label'>Password</div>
            <div className={focus === 'password' ? 'login-input-focus' : 'login-input'}>
                <Input.Password
                    placeholder=""
                    bordered={false}
                    allowClear
                    onBlur={() => setFocus('')}
                    onFocus={() => setFocus('password')}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ fontSize: '20px', textAlign: 'center' }}
                />
            </div>
            <div className='login-label' id='login-register-repassword-label'>Re-enter Password</div>
            <div className={focus === 'repassword' ? 'login-input-focus' : 'login-input'}>
                <Input.Password
                    placeholder=""
                    bordered={false}
                    allowClear
                    onBlur={() => setFocus('')}
                    onFocus={() => setFocus('repassword')}
                    onChange={(e) => setRePassword(e.target.value)}
                    style={{ fontSize: '20px', textAlign: 'center' }}
                />
            </div>

            <div className='login-label' id='login-register-major-label'>Major</div>
            <div className={focus === 'major' ? 'login-input-focus' : 'login-input'}>
                <Select
                    showSearch
                    bordered={false}
                    style={{ width: '100%' }}
                    placeholder="Select a Major"
                    optionFilterProp="children"
                    onBlur={() => setFocus('')}
                    onFocus={() => setFocus('major')}
                    onChange={(value) => setMajor(value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Data Science">Data Science</Option>
                    <Option value="Business and Finance">Business and Finance</Option>
                </Select>
            </div>
            <div className='login-label' id='login-register-year-label'>Graduation Year</div>
            <div className={focus === 'year' ? 'login-input-focus' : 'login-input'}>
                <Select
                    bordered={false}
                    style={{ width: '100%' }}
                    placeholder="Select a Year"
                    optionFilterProp="children"
                    onBlur={() => setFocus('')}
                    onFocus={() => setFocus('year')}
                    onChange={(value) => setYear(value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                </Select>
            </div>
            <div style={{ marginTop: '20px' }}></div>

        </div>
    )
}
