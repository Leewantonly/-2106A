import axios from 'axios'
import a from './env'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
const http = axios.create({
    baseURL: a.prad.baseURL,
    timeout: 5000
})
http.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
}, error => {
    return error
})
http.interceptors.response.use(res => {
    NProgress.done()
    const arr = [200, 201, 204]
    if (arr.includes(res.data.meta.status)) {
        Message({
            message: res.data.meta.msg,
            type: 'success'
        })
    } else {
        Message({
            message: res.data.meta.msg,
            type: 'error'
        })
    }

    return res.data.data
}, error => {
    return error
})
export default http
