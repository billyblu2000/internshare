export const env = 'dev';
export const baseurl = 'http://127.0.0.1';
export var useMock = false;
if (useMock === null){
    useMock = env === 'dev'? true:false;
}
export const showRespond = env === 'dev'? true: false;
export const grayGradient = ['#FFFFFF', 'rgba(235, 236, 237, 1)', '#E6E6E6', '#C4C4C4'];
export const primary = '#57068C';
export const colorGradient = ['#D78BFE', '#57068C', '#1D032F'];

export const lightBackground = grayGradient[1];
export const darkBackground = colorGradient[2];