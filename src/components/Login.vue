<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" placeholder="用户名" clearable @on-blur="verifyAccount" />
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"
                @keyup.enter.native="submit" />
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
            <p class="account"><span
						 :class="{'red':!isUrl}"
						 @click="urlClick">修改接口地址</span></p>
        </div>
    </div>
</template>

<script>
	import {auth} from '@/api/index.js'
export default {
    name: 'login',
    data() {
        return {
            account: '',//admin
            pwd: '',//a.123!
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
						isUrl:localStorage.getItem('YUDAO_URL')
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
        this.bg.backgroundSize = '100% 100%'
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        verifyAccount() {
            if (this.account !== 'admin') {
                this.accountError = ''
            } else {
                this.accountError = ''
            }
        },
        verifyPwd() {
            if (this.pwd !== 'admin') {
                this.pwdError = ''
            } else {
                this.pwdError = ''
            }
        },
        urlClick(){
					this.$prompt('请填写接口地址', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					}).then(({ value }) => {
					  localStorage.setItem('YUDAO_URL',value)
						location.reload();
					}).catch(() => {
					  this.$message({
					    type: 'info',
					    message: '取消输入'
					  });       
					});
				},
        submit() {
            if (this.account !== '' && this.pwd !== '') {
							auth({
								username:this.account,
								password:this.pwd
							}).then(res => {
								if(res.status === 0){
									this.isShowLoading = true
									// 登陆成功 设置用户信息
									localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
									localStorage.setItem('userName', '域道科技')
									// 登陆成功 假设这里是后台返回的 token
									localStorage.setItem('token', 'f12138:'+res.content)
									console.log(this.redirect || '/')
									this.$router.push({ path: this.redirect || '/' })
								}else{
									this.$message.error(res.msg)
								}
							})
            } else {
                if (this.account === '') {
                    this.accountError = '请输入账号'
                }

                if (this.pwd === '') {
                    this.pwdError = '请输入密码'
                }
            }
        },
    },
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .account .red {
    color: red;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>
