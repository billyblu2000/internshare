import { apis } from './Api';
var Mock = require('mockjs')

const rules = [
    {
        name: 'login',
        template: {
            'status|1': ['success', 'failed']
        }
    },
    {
        name: 'registerStudentStep1',
        template: {
            'status|1': ['success', 'failed']
        }
    },
    {
        name: 'registerStudentStep2',
        template: {
            'status|1': ['success', 'failed']
        }
    },
    {
        name: 'registerStudentStep3',
        template: {
            'status|1': ['success', 'failed']
        }
    },
    {
        name: 'searchSuggestions',
        template: () => {
            var arr = [];
            for (let i = 0; i <= Math.random() * 10; i++) {
                arr.push(Mock.Random.city());
            }
            return arr;
        }
    },
    {
        name: 'recommendJobPost',
        template: {
            status: 'ok',
            'result|10': [{
                "id|+1": 1,
                "publisher_name": '@name',
                "publisher_color": '@color',
                "title": '@string(5,10)',
                "date": '@date',
                "description": '@paragraph(10)',
                "company": '@string(5, 10)',
                "student_email": '@email',
                "requirement": '@paragraph(10)',
            }]
        }
    },
    {
        name: 'getUser',
        template: {
            status: 'ok',
            name: '@name',
            color: '@color',
        }
    },
    {
        name: 'checkApplyStatus',
        template: {
            status: 'ok',
            'result|0-10': [{
                "id|+1": 1,
                "publisher_name": '@name',
                "publisher_color": '@color',
                "status": '@pick(["Pending", "Accept", "Reject"])',
                "title": "@string(5,10)",
                "company_name": "@string(5,10)",
                "start": "@date",
                "end": "@date",
                "post_id":1
            }]
        }
    },
    {
        name: 'search',
        template: {
            "status": "ok",
            "result|10": [
                {
                    "Datetime": "@date",
                    "apply_end": "@date",
                    "apply_start": "@date",
                    "color": "@color",
                    "company_email": null,
                    "company_name": "@string(5,10)",
                    "des": "@paragraph(10)",
                    "end_date": "@date",
                    "id|+1": 1,
                    "is_company": '@boolean',
                    "name": "@string(5,10)",
                    "requirement": "@paragraph(10)",
                    "salary": "@natrual",
                    "start_date": "@date",
                    "student_email": "@email",
                    "title": "@string(5,10)",
                }
            ]
        }
    },
    {
        name: 'jobInfo',
        template: {
            status: 'ok',
            result: {
                "id|+1": 1,
                "is_company": false,
                "publisher_name": '@name',
                "publisher_color": '@color',
                "student_email": "@email",
                "Datetime": "@date",
                "des": "@paragraph(10)",
                "requirement": "@paragraph(10)",
                "start_date": "@date",
                "end_date": "@date",
                "company_name": "@string(5, 10)",
                "title": "@string(5, 10)",
                "apply_start": "@date",
                "apply_end": "@date",
                "salary": "@natural(1000, 5000)",
            }
        }
    },
    {
        name: 'apply',
        template: {
            status: 'ok'
        }
    },
    {
        name: 'getProfile',
        template: {
            status: 'ok',
            "result": {
                "id": "@natural",
                "email": "@email",
                "name": "@name",
                "cv_id": "@natural",
                "color": "@color",
                "year": "@natural(2021,2025)",
                "major": "@string(5,10)",
                "project": "@paragraph(10)",
                "internship": "@paragraph(10)",
                "education": "@paragraph(10)",
                "awards": "@paragraph(10)",
                "activity": "@paragraph(10)",
                "skills": "@paragraph(10)",
                "public": "@natural(0,1)",
            }
        }
    },
    {
        name: 'deleteApplication',
        template: {
            status: "ok"
        }
    },
    {
        name: 'updateProfile',
        template: {
            status: "ok"
        }
    },
    {
        name: 'getAllMyPosts',
        template: {
            status: 'ok',
            'result|0-10': [{
                "id|+1": 1,
                "is_company": 0,
                "company_email": "",
                "student_email": "@email",
                "Datetime": "@date",
                "des": "@paragraph",
                "requirement": "@paragraph",
                "start_date": "@date",
                "end_date": "@date",
                "company_name": "@string(5, 10)",
                "title": "@string(5, 10)",
                "apply_start": "@date",
                "apply_end": "@date",
                "salary": "@natural(2000,5000)",
                "color": "@color",
                "name": "@name"
            }]
        }
    },
    {
        name: 'getAllMyApplicants',
        template: {
            status: 'ok',
            "result|8-10": [{
                "create_time": "@date",
                "id|+1": 1,
                "is_online": null,
                "major": "@string(5, 10)",
                "name": "@string(5, 10)",
                "post_id|+1": 1,
                "status": "@pick(Pending, Accept, Reject)",
                "student_email": "@email",
                "year": '@natural(2022,2025)',
            }]
        }
    },
    {
        name: 'deletePost',
        template: {
            status: 'ok'
        }
    },
    {
        name: 'acceptApplicant',
        template: {
            status: 'ok'
        }
    },
    {
        name: 'rejectApplicant',
        template: {
            status: 'ok'
        }
    },
    {
        name: 'createPost',
        template: {
            status: 'ok'
        }
    },
    {
        name: 'jobComment',
        template: {
            status: 'ok',
            'comment|8-10': [{
                "color": "@color",
                "company_email": null,
                "name": "@name",
                "content": "@paragraph(1,10)",
                "datetime": "@date",
                "descendent|0-8": [{
                    "color": "@color",
                    "company_email": null,
                    "name": "@name",
                    "content": "@@paragraph(1,10)",
                    "datetime": "@date",
                    "id|+1": 1,
                    "job_post_id": 3,
                    "like": '@natural(0, 100)',
                    "student_email": "@email",
                }],
                "id|+1": 1,
                "job_post_id": 3,
                "like": '@natural(0, 100)',
                "student_email": "@email",
            }]
        }
    },
    {
        name:'likeComment',
        template:{
            status:'ok'
        }
    },
    {
        name:'createComment',
        template:{
            status:'ok'
        }
    },
    {
        name:'updatePost',
        template:{
            status:'ok'
        }
    }
]

var data = []
Mock.setup({
    timeout: '600-1000'
});
for (let i = 0; i < rules.length; i++) {
    var { path, method } = apis[rules[i].name];
    if (method === 'get') {
        var regpath = ''
        for (let j = 0; j < path.length; j++) {
            if (path.substr(j, 1) === '/') {
                regpath = regpath + '\\/';
            }
            else {
                regpath = regpath + path.substr(j, 1);
            }
        }
        data.push(Mock.mock(RegExp(regpath + '\\?+'), method, rules[i].template))
    }
    data.push(Mock.mock(path, method, rules[i].template))
}
export default data;