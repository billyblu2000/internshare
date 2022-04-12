import axios from "axios";
import { showRespond } from "../config";
import { baseurl } from "../config";

export const apis = {
    'login': {
        path:'/api/login',
        method:'post',
        params:['email', 'password'],
    },
    'registerStudentStep1':{
        path:'/api/register/student/sendemail',
        method:'post',
        params:['email']
    },
    'registerStudentStep2':{
        path:'/api/register/student/verify',
        method:'get',
        params:['email','code'],
    },
    'registerStudentStep3':{
        path:'/api/register/student',
        method:'post',
        params:['email', 'password', 'confirPW', 'major', 'year', 'name'],
    },
    
}

export default class Api{

    constructor(name, params, callback, log=showRespond, base=baseurl){
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
        axios.get(url, {params:params}).then(function (response) {
            myCallBack(response.data);
            if (log){
                console.log('GET ' + url + ': ' + response.data);
            }
        })
        .catch(function (error) {
            console.log('GET ' + url + ': ' + error);
        });
    }
    serverPost = (url, data) => {
        var myCallBack = this.callback;
        var log = this.log;
        axios.post(url, data).then(function (response) {
            myCallBack(response.data);
            if (log){
                console.log('POST ' + url + ': ' + response.data);
            }
        })
        .catch(function (error) {
            console.log('POST ' + url + ': ' + error);
        });
    }

    constructParams = () => {
        var params = {}
        for (let i = 0; i<this.config.params.length; i++){
            params[this.config.params[i]] = this.params[i]
        }
        return params
    }

    request = () => {
        if (this.config.method === 'get'){
            this.serverGet(this.config.path, this.constructParams());
        }
        else if (this.config.method === 'post'){
            this.serverPost(this.config.path, this.constructParams());
        }

    }
}