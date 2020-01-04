import * as http_request from './request'

/**
 * 登录接口
 * @param {String} userName
 * @param {String} password
 * @return {Promise}
 */
export const login = ({userName,password}) => http_request.post('/api/login',{
    user_name: userName,
    password
}) 