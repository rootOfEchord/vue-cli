/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui';

function message(msg, isSuccess) {
    Message({
        message: msg,
        type: isSuccess ? 'success' : 'error',
        center: true
    })
}

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'api' : process.env.BASE_URL,
    timeout: 10000,
});

// post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.data.status === 1) {
            return response.data.data
        } else {
            handleCode(response.data)
        }
    },
    // 处理请求错误码    
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
            case 401:
                // router.replace({
                //     path: '/login',
                //     query: { redirect: router.currentRoute.fullPath }
                // });
                break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
            case 403:
                message('登录过期，请重新登录', 0)
                // 清除token                    
                localStorage.removeItem('token');
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    // router.replace({
                    //     path: '/login',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // });
                }, 1000);
                break;
                // 其他错误，直接抛出错误提示                
            default:
                return Promise.reject(error.response);
            }
        } else {
            return Promise.reject(error.response);
        }
    }
);

// 处理后台错误码
function handleCode(data) {
    switch (data.status) {
    case -1:
        //
        break;

    default:
        message(data.message, 0)
        break;
    }
}

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return axios.get(url, {
        params: params
    })
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return axios.post(url, QS.stringify(params))
}