import axios from 'axios';

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: 'http://127.0.0.1:8888'+ url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+localStorage.getItem('logintoken'),
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                data=JSON.stringify(data)
                return data
            }
        ]
    }).then(res => res.data);
};
// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
        url: 'http://127.0.0.1:8888'+ url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+localStorage.getItem('logintoken'),
        },
        data:params,
        traditional: true,
        transformRequest: [
            function(data) {
                data=JSON.stringify(data)
                return data
            }
        ]
    }).then(res => res.data);
};
const sp = (method, url, params) => {
    return axios({
        method: method,
        url: 'http://127.0.0.1:8888'+ url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer'+localStorage.getItem('logintoken'),
        },
        data:params,
        traditional: true,
        transformRequest: [
            function(data) {
                data=JSON.stringify(data)
                return data
            }
        ]
    }).then(res => res.data);
};
// 上传
const upLoad = (method, url, params) => {
    return axios({
        method: method,
        url: 'http://127.0.0.1:8888'+ url,
        headers: {
            'Authorization': 'Bearer'+localStorage.getItem('logintoken'),

        },
        data:params,
    }).then(res => res.data);
};
export {
    loginreq,
    req,
    sp,
    upLoad
}