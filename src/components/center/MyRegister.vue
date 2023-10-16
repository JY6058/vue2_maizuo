<template>
  <div class="form">
    <form action="">
        <div class="group phone">
          <div class="icon"><van-icon name="manager" /></div>
          <input type="text" placeholder="手机号/用户名" v-model="username">
        </div>
        <div class="group zhanghao">
          <div class="icon"><van-icon name="lock" /></div>
          <input type="text" placeholder="密码" v-model="password1">
        </div>
        <div class="group zhanghao">
          <div class="icon"><van-icon name="lock" /></div>
          <input type="text" placeholder="确认密码" v-model="password2">
        </div>
        <div class="submit group" @click="register">
          <span>注册</span>
        </div>
    </form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import request from '../../utils/request.js'
export default {
  data () {
    return {
      username: '',
      password1: '',
      password2: '',
      rules: {
        username: {
          rule: /^(?!0)[a-zA-Z1-9][a-zA-Z0-9]{5,10}$/,
          msg: '6~11位字母或数字，不能以0开头！'
        },
        password1: {
          rule: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
          msg: '初始密码由字母和数字组成，不少于6位！'
        },
        password2: {
          rule: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
          msg: '确认密码由字母和数字组成，不少于6位！'
        }
      }
    }
  },
  methods: {
    register () {
      // 前端验证表单
      if (!this.rules.username.rule.test(this.username)) {
        Toast({
          message: this.rules.username.msg,
          duration: 1000
        })
      } else if (!this.rules.password1.rule.test(this.password1)) {
        Toast({
          message: this.rules.password1.msg,
          duration: 1000
        })
      } else if (!this.rules.password2.rule.test(this.password2)) {
        Toast({
          message: this.rules.password2.msg,
          duration: 1000
        })
      } else if (this.password1 !== this.password2) {
        Toast({
          message: '密码不一致！',
          duration: 1000
        })
      } else {
        request.get('http://127.0.0.1:3000/maizuo/register', { params: { username: this.username } }).then(res => {
          // console.log(res)
          if (res.data.length !== 0) {
            Toast({
              message: '账号已存在',
              duration: 800
            })
            // this.username = ''
            // this.password1 = ''
            // this.password2 = ''
          } else {
            request.post('http://127.0.0.1:3000/maizuo/register', { username: this.username, password: this.password1 }).then(res => {
            // console.log(res.data)
              if (res.data.ok === 1) {
                Toast({
                  message: '注册成功，请登录！',
                  duration: 800
                })
                setTimeout(() => {
                  this.$router.replace('/login')
                }, 500)
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  margin-top: 6.25rem;
  height: 18.75rem;
  padding: 0 1.25rem;
  input{
    border: none;
  }
  .group{
    margin: .3125rem 0;
    padding: 0 .125rem 0 .3125rem;
    // border-bottom: 1px solid #e6e6e6;
    height: 2.8125rem;
    line-height: 2.8125rem;
    font-size: 14px;
  }
  .phone{
    display: flex;
    // justify-content: space-between;
    input{
      flex: 1;
    }
    .icon{
      width: 1.25rem;
    }
    .code{
      text-align: center;
      width: 4.5rem;
      line-height: 2.8125rem;
    }
  }
  .zhanghao{
    display: flex;
    input{
      flex: 1;
    }
    .icon{
      width: 1.25rem;
    }
  }
  .submit{
    margin-top: 1.25rem;
    height: 2.8125rem;
    line-height: 2.8125rem;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
  }
}
</style>
