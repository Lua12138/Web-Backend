import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../components/404.vue'),
    },
    { path: '/', redirect: '/devGroupManage' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    devGroupManage: {
        path: 'devGroupManage',
        name: 'devGroupManage',
        meta: { title: '设备分组管理' },
        component: () => import('../views/devGroupManage/index.vue'),
    },
    taskModuleManage: {
        path: 'taskModuleManage',
        name: 'taskModuleManage',
        meta: { title: '任务模板管理' },
        component: () => import('../views/taskModuleManage/index.vue'),
    },
    devManage: {
        path: 'devManage',
        name: 'devManage',
        meta: { title: '任务管理' },
        component: () => import('../views/devManage/index.vue'),
    },
    taskLog: {
        path: 'taskLog',
        name: 'taskLog',
        meta: { title: '任务执行日志' },
        component: () => import('../views/taskLog/index.vue'),
    },
}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
