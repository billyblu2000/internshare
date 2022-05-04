import React, { Component } from 'react'
import { Button, Divider, message, Steps } from 'antd'
import { UserOutlined, SolutionOutlined, MailOutlined, FileDoneOutlined } from '@ant-design/icons';
import Api from '../../../utils/Api';
import { apis } from '../../../utils/Api';
import { Navigate } from "react-router-dom";
import RegisterFormChooseAccountType from './RegisterFormChooseAccountType'
import RegisterFormEmail from './RegisterFormEmail'
import RegisterFormVerification from './RegisterFormVerification';
import RegisterFormOther from './RegisterFormOther';
import AnimatedIcon from '../../../utils/icons/AnimatedIcon';
import inactiveData from '../../../utils/icons/animation/31-check-solid-edited.json'

const { Step } = Steps;

export default class RegisterForm extends Component {

    state = {
        step: 0,
        type: '',
        email: '',
        code: '',
        username: '',
        password: '',
        repassword: '',
        major: '',
        year: '',
        nav:false,
    }

    nextStep = () => {
        if (this.state.step === 0) {
            if (this.state.type !== 'individual' && this.state.type !== 'company') {
                message.error({ content: 'Please select your identity', key: 'message' })
                return false;
            }
        }
        else if (this.state.step === 1) {
            if (this.state.email === '' || this.state.email === '@nyu.edu') {
                message.error({ content: 'Please enter your email (NetID)', key: 'message' });
                this.alert('login-register-email-label');
                return false;
            }
            if (this.state.email.slice(-8) !== '@nyu.edu' && this.state.type === 'individual') {
                message.error({ content: 'Sorry, you should use your NYU email', key: 'message' });
                this.alert('login-register-email-label');
                return false;
            }
            if (this.state.email.slice(-16) === '@nyu.edu@nyu.edu' && this.state.type === 'individual') {
                this.setState({ step: this.state.step + 1, email: this.state.email.slice(0, -8) });
                return true;
            }
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.email) === false) {
                message.error({ content: 'Please enter a valid email', key: 'message' });
                this.alert('login-register-email-label');
                return false;
            }
        }
        else if (this.state.step === 2) {
            if (this.state.code.length !== 6){
                message.error({ content: 'Please complete the verification code', key: 'message' });
                return false;
            }
        }
        else if (this.state.step === 3) {
            if (this.state.username === ''){
                message.error({ content: 'Please enter your username', key: 'message' });
                this.alert('login-register-username-label');
                return false;
            } 
            if (this.state.password === ''){
                message.error({ content: 'Please enter your password', key: 'message' });
                this.alert('login-register-password-label');
                return false;
            } 
            if (this.state.repassword === ''){
                message.error({ content: 'Please re-enter your password', key: 'message' });
                this.alert('login-register-repassword-label');
                return false;
            } 
            if (this.state.major === ''){
                message.error({ content: 'Please select your major', key: 'message' });
                this.alert('login-register-major-label');
                return false;
            } 
            if (this.state.year === ''){
                message.error({ content: 'Please select your graduation year', key: 'message' });
                this.alert('login-register-year-label');
                return false;
            } 
            if (this.state.password !== this.state.repassword){
                message.error({ content: 'The two passwords you entered are not identical', key: 'message' });
                this.alert('login-register-repassword-label');
                this.alert('login-register-password-label');
                return false;
            }
        }
        if (this.state.step === 0) {
            this.setState({ step: this.state.step + 1 })
        }
        else if (this.state.step === 1) {
            if (this.state.type === 'individual'){
                message.loading({ content: 'Please wait...', key: 'message' });
                new Api('registerStudentStep1', [this.state.email], this.handleResponse);
            }
        }
        else if (this.state.step === 2){
            if (this.state.type === 'individual'){
                message.loading({ content: 'Please wait...', key: 'message' });
                new Api('registerStudentStep2', [this.state.email, this.state.code], this.handleResponse)
            }
        }
        else if (this.state.step === 3){
            if (this.state.type === 'individual'){
                message.loading({ content: 'Please wait...', key: 'message' });
                new Api('registerStudentStep3', [this.state.email, this.state.password, this.state.repassword, this.state.major, this.state.year, this.state.username], this.handleResponse)
            }
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    handleResponse = (res, r) => {
        if (res.status === 'success'){
            message.loading({ content: 'Please wait...', key: 'message', duration:0.01 });
            if ((apis['registerStudentStep1'].path === r.config.url && this.state.step === 1) || 
                (apis['registerStudentStep2'].path === r.config.url && this.state.step === 2) || 
                (apis['registerStudentStep3'].path === r.config.url && this.state.step === 3) || 
                (apis[''].path === r.config.url && this.state.step === 0)){
                this.setState({ step: this.state.step + 1 });
            }
            
        }
        else{
            message.error({ content: res.status, key: 'message' });
        }
    }

    resendVerificationCode = () => {
        message.loading({ content: 'Please wait...', key: 'message' });
        new Api('registerStudentStep1', [this.state.email], this.handleResendVerificationResponse)
    }

    handleResendVerificationResponse = (res) => {
        if (res.status === 'success'){
            message.success({ content: 'Verification code sent!', key: 'message'});
        }
        else{
            message.error({ content: res.status, key: 'message' });
        }
    }

    onKeyDownchange = (e) => {
        if (e.keyCode === 13) {
            this.nextState()
        }
    }

    alert(label) {
        document.getElementById(label).setAttribute("class", 'login-label-error');
        setTimeout(() => {document.getElementById(label).setAttribute("class", 'login-label');}, 3200);
    }

    navToMain = () => {
        if (this.state.nav === false){
            setTimeout(() => this.setState({nav:true}), 1000);
        }
    }

    render() {
        if (this.state.step === 4){
            this.navToMain();
        }
        return (
            <div>
                {this.state.nav? <Navigate to='/main/home'/>:null}
                {this.state.step === 4 ? <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-around' }}><AnimatedIcon
                    width='100px'
                    speed={0.8}
                    height='100px'
                    initActive={false}
                    inactiveData={inactiveData}
                    toggleable={false} /></div> :
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Steps style={{ marginTop: '10px', width: '25%', marginLeft: '5%', maxHeight: '180px' }} size="small" direction="vertical" current={this.state.step}>
                                <Step title="Identity" icon={<UserOutlined />} />
                                <Step title="Email" icon={<MailOutlined />} />
                                <Step title="Verification" icon={<SolutionOutlined />} />
                                <Step title="Complete Info" icon={<FileDoneOutlined />} />
                            </Steps>
                            <Divider type='vertical' style={{ height: '190px' }}></Divider>
                            {this.state.step === 0 ? <RegisterFormChooseAccountType
                                type={this.state.type}
                                changeType={(type) => this.setState({ type: type })} /> : null}
                            {this.state.step === 1 ? <RegisterFormEmail
                                setEmail={(email) => this.setState({ email: email })}
                                identity={this.state.type}
                                nextStepFunc={this.nextStep} /> : null}
                            {this.state.step === 2 ? <RegisterFormVerification
                                nextStepFunc={this.nextStep}
                                setVerification={(code) => this.setState({ code: code })}
                                resendCallback={this.resendVerificationCode}
                                email={this.state.email} /> : null}
                            {this.state.step === 3 ? <RegisterFormOther
                                setUsername={(username) => this.setState({ username: username })}
                                setPassword={(password) => this.setState({ password: password })}
                                setMajor={(major) => this.setState({ major: major })}
                                setYear={(year) => this.setState({ year: year })}
                                setRePassword={(repassword) => this.setState({ repassword: repassword })}
                            /> : null}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '25px', marginBottom: '25px' }}>
                            <Button type='primary' shape='round' onClick={() => this.nextStep()}>Continue</Button>
                        </div>
                    </>
                }
            </div>
        )
    }
}
