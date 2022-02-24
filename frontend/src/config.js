export const env = 'dev';
export const baseurl = 'http://127.0.0.1'
export var useMock = null;
if (useMock === null){
    useMock = env === 'dev'? true:false;
}