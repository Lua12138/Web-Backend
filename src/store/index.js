import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLoading: false, // 全局 loading
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'devGroupManage', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-albums', // icon类型
                text: '设备分组管理', // 文本内容
            },
            {
                name: 'taskModuleManage', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'logo-buffer', // icon类型
                text: '任务模板管理', // 文本内容
            },
            {
                name: 'devManage', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-tablet-portrait', // icon类型
                text: '设备管理', // 文本内容
            },
            {
                name: 'taskLog', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-card-outline', // icon类型
                text: '任务日志', // 文本内容
            },
            // {
            //     text: '二级菜单',
            //     type: 'ios-paper',
            //     children: [
            //         {
            //             type: 'ios-grid',
            //             name: 't1',
            //             text: '表格',
            //             // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
            //             // hidden: true,
            //         },
            //         {
            //             size: 18, // icon大小
            //             type: 'md-arrow-forward', // icon类型
            //             text: '外链',
            //             url: 'https://www.baidu.com',
            //             isExternal: true, // 外链 跳到一个外部的 URL 页面
            //         },
            //         {
            //             text: '三级菜单',
            //             type: 'ios-paper',
            //             children: [
            //                 {
            //                     type: 'ios-notifications-outline',
            //                     name: 'msg',
            //                     text: '查看消息',
            //                 },
            //                 {
            //                     type: 'md-lock',
            //                     name: 'password',
            //                     text: '修改密码',
            //                 },
            //                 {
            //                     type: 'md-person',
            //                     name: 'userinfo',
            //                     text: '基本资料',
            //                 },
            //                 {
            //                     size: 18, // icon大小
            //                     type: 'md-arrow-forward', // icon类型
            //                     text: '外链',
            //                     url: 'https://www.baidu.com',
            //                     isExternal: true, // 外链 跳到一个外部的 URL 页面
            //                 },
            //             ],
            //         },
            //     ],
            // },
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        },
    },
})

export default store
