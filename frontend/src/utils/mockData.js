var Mock = require('mockjs')

const rules = [
    {
        url:'/api/login',
        method:'post',
        template:{
            'status|1':['success', 'failed']
        }
    },
]

var data = []
Mock.setup({
    timeout: '200-600'
});
for (let i = 0; i<rules.length; i++){
    data.push(Mock.mock(rules[i].url, rules[i].method, rules[i].template))
}
export default data;