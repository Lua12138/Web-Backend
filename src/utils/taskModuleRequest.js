import axios from 'axios'
import { Message } from 'view-design'
import router from '@/router'
import { showLoading, closeLoading } from '@/utils/loading'
import { resetTokenAndClearUser } from '@/utils'

const taskModuleRequest = axios.create({
    baseURL: 'http://47.111.76.53:30001/api/v2',
    timeout: 60000,
		headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
})

taskModuleRequest.interceptors.request.use(config => {
    showLoading()
    if (localStorage.getItem('token')) {
        config.headers.Authentication = localStorage.getItem('token')
    }

    return config
}, (error) => Promise.reject(error))

taskModuleRequest.interceptors.response.use(response => {
    closeLoading()
    const res = response.data
    // 这里是接口处理的一个示范，可以根据自己的项目需求更改
    // 错误处理
    if (res.status === -403) {
        Message.error({
            content: res.message + ',请重新登录',
        })

        //resetTokenAndClearUser()
        //router.push('login')

        return Promise.reject()
    }

    // 如果接口正常，直接返回数据
    return res
}, (error) => {
    closeLoading()
    if (error.name == 'Error') {
        Message.error({
            content: error,
        })
    } else {
        Message.error({
            content: error.response.data.data || error.message,
        })
    }

    return Promise.reject(error)
})

export default taskModuleRequest
