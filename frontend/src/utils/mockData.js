import { apis } from './Api';
var Mock = require('mockjs')

const rules = [
    // {
    //     name:'login',
    //     template:{
    //         'status|1':['success', 'failed']
    //     }
    // },
    // {
    //     name:'registerStudentStep1',
    //     template:{
    //         'status|1':['success', 'failed']
    //     }
    // },
    // {
    //     name:'registerStudentStep2',
    //     template:{
    //         'status|1':['success', 'failed']
    //     }
    // },
    // {
    //     name:'registerStudentStep3',
    //     template:{
    //         'status|1':['success', 'failed']
    //     }
    // },
]

var data = []
Mock.setup({
    timeout: '200-600'
});
for (let i = 0; i<rules.length; i++){
    var {path, method} = apis[rules[i].name];
    if (method === 'get'){
        var regpath = ''
        for (let j=0; j< path.length; j++){
            if (path.substr(j,1) === '/'){
                regpath = regpath + '\\/';
            }
            else{
                regpath = regpath + path.substr(j,1);
            }
        }
        data.push(Mock.mock(RegExp(regpath + '\\?+'), method, rules[i].template))
    }
    data.push(Mock.mock(path, method, rules[i].template))
}
export default data;