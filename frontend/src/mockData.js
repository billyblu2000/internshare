import { baseurl } from './config'
var Mock = require('mockjs')

const rules = [
    {
        url:'/test/',
        type:'get',
        template: '@string("lower", 5)'
    },
]

var data = []
for (let i = 0; i<rules.length; i++){
    data.push(Mock.mock(baseurl + rules[i].url, rules[i].type, rules[i].template))
}
export default data;