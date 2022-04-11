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
        params:['email', 'password', 'confirPW', 'major', 'year'],
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

    serverGet = (url) => {
        var myCallBack = this.callback;
        var log = this.log;
        axios.get(url).then(function (response) {
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

    constructGetUrl = () => {
        var path = this.base + this.config.path;
        var paramsString = '';
        for (let i = 0; i<this.config.params.length; i++){
            paramsString = paramsString + '&' + this.config.params[i] + '=' + this.params[i];
        }
        if (paramsString !== ''){
            path = path + '?' + paramsString.slice(1);
        }
        return path;
    }

    request = () => {
        if (this.config.method === 'get'){
            this.serverGet(this.constructGetUrl());
        }
        else if (this.config.method === 'post'){
            var data = {};
            for (let i = 0; i<this.params.length; i++){
                data[this.config.params[i]] = this.params[i];
            }
            this.serverPost(this.config.path, data)
        }

    }
}