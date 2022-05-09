import axios from "axios";
import { showRespond } from "../config";
import { baseurl } from "../config";
import { message } from "antd";

export const apis = {
    'login': {
        path: '/api/login',
        method: 'post',
        params: ['email', 'password'],
    },
    'registerStudentStep1': {
        path: '/api/login/student/sendemail',
        method: 'post',
        params: ['email']
    },
    'registerStudentStep2': {
        path: '/api/login/student/verify',
        method: 'get',
        params: ['email', 'code'],
    },
    'registerStudentStep3': {
        path: '/api/login/register/student',
        method: 'post',
        params: ['email', 'password', 'confirPW', 'major', 'year', 'name'],
    },
    'searchSuggestions': {
        path: '/api/homepage/searchsuggestions',
        method: 'post',
        params: ['content']
    },
    'search': {
        path: '/api/search/jobpost',
        method: 'post',
        params: ['filter', 'pagenumber']
    },
    'recommendJobPost': {
        path: '/api/homepage/recommendpost/jobs',
        method: 'get',
        params: [],
    },
    'checkApplyStatus': {
        path: '/api/homepage/applystatus',
        method: 'post',
        params: []
    },
    'jobInfo': {
        path: '/api/job/detailedinfo',
        method: 'post',
        params: ['jobpost_id', 'method', 'publisher']
    },
    'jobComment': {
        path: '/api/job/getpostcomment',
        method: 'post',
        params: ['jobpostid']
    },
    'createComment': {
        path: '/api/job/create/comment',
        method: 'post',
        params: ['content', 'id', 'target_id']
    },
    'updateComment': {
        path: '/api/job/update/comment',
        method: 'post',
        params: ['comment_id', 'new_content'],
    },
    'deleteComment': {
        path: '/api/job/delete/comment',
        method: 'post',
        params: ['comment_id'],
    },
    'likeComment': {
        path: '/api/job/like/comment',
        method: 'post',
        params: ['comment_id']
    },
    'apply': {
        path: '/api/job/apply',
        method: 'post',
        params: ['jobpost_id']
    },
    'deleteApplication': {
        path: '/api/apply/cancel',
        method: 'post',
        params: ['application_id']
    },
    'getProfile': {
        path: '/api/profile/get',
        method: 'post',
        params: ['email']
    },
    'updateCV': {
        path: '/api/profile/update',
        method: 'post',
        params: [],
    },
    'downloadCV': {
        path: '/api/profile/download',
        method: 'post',
        params: ['cv_id'],
    },
    'getUser': {
        path: '/api/profile/getname',
        method: 'get',
        params: []
    },
    'changePrivacy': {
        path: '/api/profile/changesvisibility',
        methd: 'get',
        params: ['status']
    },
    'getAllMyPosts': {
        path: '/api/mypost/get',
        method: 'get',
        params: []
    },
    'createPost': {
        path: '/api/mypost/create',
        method: 'post',
        params: ['post_title',
            'company_name',
            'is_Company',
            'company_email',
            'job_description',
            'job_requirements',
            'job_start_date',
            'job_end_date',
            'estimate_salary',
            'apply_start_date',
            'apply_end_date']
    },
    'getAllMyApplicants':{
        path:'/api/mypost/viewall',
        method:'post',
        params:[],
    },
    'deletePost':{
        path:'/api/mypost/delete',
        method:'post',
        params:['job_id']
    },
    'updatePost':{
        path:'',
        method:'',
        params:[]
    },
    'acceptApplicant':{
        path:'/api/mypost/accept/application',
        method:'post',
        params:['application_id']
    },
    'rejectApplicant':{
        path:'/api/mypost/reject/application',
        method:'post',
        params:['application_id']
    },
    'updateProfile':{
        path: '/api/profile/update',
        method:'post',
        params:['project_experience', 
        'internship_experience', 
        'education_background', 
        'awards', 
        'activities', 
        'skills', 
        'public']
    }
}

export default class Api {

    constructor(name, params, callback, log = showRespond, base = baseurl, file = null) {
        this.name = name;
        this.config = apis[name];
        this.params = params;
        this.callback = callback;
        this.log = log;
        this.base = base;
        this.request();
    }

    serverGet = (url, params) => {
        var myCallBack = this.callback;
        var log = this.log;
        axios.get(url, { params: params }).then(function (response) {
            myCallBack(response.data, response);
            if (log) {
                console.log('GET ' + url);
            }
        })
            .catch(function (error) {
                console.log('GET ' + url + ': ' + error);
            });
    }
    serverPost = (url, data) => {
        var myCallBack = this.callback;
        var log = this.log;
        axios.post(url, data, {headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then(function (response) {
            myCallBack(response.data, response);
            if (log) {
                console.log('POST ' + url);
            }
        })
            .catch(function (error) {
                if (error.toString() === 'Error: Request failed with status code 500') {
                    message.error({ content: 'Sorry, something wrong happends to the server..', key: 'message' })
                }
                console.log('POST ' + url + ': ' + error);
            });
    }

    constructParams = () => {
        var params = {}
        for (let i = 0; i < this.config.params.length; i++) {
            params[this.config.params[i]] = this.params[i]
        }
        return params
    }

    request = () => {
        if (this.config.method === 'get') {
            this.serverGet(this.config.path, this.constructParams());
        }
        else if (this.config.method === 'post') {
            this.serverPost(this.config.path, this.constructParams());
        }

    }
}