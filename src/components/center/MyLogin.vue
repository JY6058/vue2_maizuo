<template>
  <div class="login">
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt="">
    </div>
    <div class="form">
      <form  v-if="whitchLogin" action="">
        <div class="group phone">
          <div class="icon"><van-icon name="phone" /></div>
          <input type="text" placeholder="手机号" v-model="phone" @input="getPhone">
          <div class="code" :style="{'color':color}" @click="getCode">{{codeTime}}</div>
        </div>
        <div class="group zhanghao">
          <div class="icon"><van-icon name="lock" /></div>
          <input type="text" placeholder="暂未开通短信服务，请输入6位数字" v-model="code">
        </div>
        <div class="changeLogin">
          <div class="left" @click="whitchLogin=true">手机号登录</div>
          <div class="right" @click="whitchLogin=false">密码登录</div>
        </div>
        <div class="submit group" @click="login">
          <span>登录</span>
        </div>
      </form>

      <form v-else action="">
        <div class="group phone">
          <div class="icon"><van-icon name="contact" /></div>
          <input type="text" placeholder="请输入账号" v-model="username" @input="getPhone">
        </div>
        <div class="group zhanghao">
          <div class="icon"><van-icon name="smile-o" /></div>
          <input type="text" placeholder="请输入密码" v-model="password">
        </div>
        <div class="changeLogin">
          <div class="left" @click="whitchLogin=true">手机号登录</div>
          <div class="right" @click="whitchLogin=false">密码登录</div>
        </div>
        <div class="submit group" @click="codeLogin">
          <span>登录</span>
        </div>
      </form>
    </div>
    <div class="register"><span @click="register">免费注册</span></div>
  </div>
</template>

<script>
import request from '../../utils/request.js'
import http from '../../utils/http.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      whitchLogin: true,
      phone: '',
      code: '',
      username: '',
      password: '',
      color: '#bdc0c5',
      codeTime: '获取验证码',
      ableClick: 'true',
      testCode: '',
      rules: {
        phone: {
          rule: /^1[3456789]\d{9}$/,
          msg: '手机号为11位数，且不能为空！'
        },
        code: {
          rule: /^\d{6}$/,
          msg: '验证码是6位数，且不能为空！'
        },
        username: {
          rule: /^(?!0)[a-zA-Z1-9][a-zA-Z0-9]{5,10}$/,
          msg: '6~11位字母或数字，不能以0开头！'
        },
        password: {
          rule: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
          msg: '密码由字母和数字组成，不少于6位！'
        }
      }
    }
  },
  methods: {
    login () {
      if (!this.rules.phone.rule.test(this.phone)) {
        Toast({
          message: this.rules.phone.msg,
          duration: 1000
        })
      } else if (!this.rules.code.rule.test(this.code)) {
        Toast({
          message: this.rules.code.msg,
          duration: 10000
        })
      } else {
        request.post('http://127.0.0.1:3000/maizuo/telLogin', { username: this.phone, password: this.code })
          .then(res => {
            console.log(res)
            if (res.data.ok === 1) {
              Toast({
                message: '登录成功',
                duration: 800
              })
              this.$store.commit('changeUser', this.phone)
              this.$router.replace(this.$route.query.redirect || '/center')
              this.phone = ''
              this.code = ''
            }
          })
      }
    },
    codeLogin () {
      if (!this.rules.username.rule.test(this.username)) {
        Toast({
          message: this.rules.username.msg,
          duration: 1000
        })
      } else if (!this.rules.password.rule.test(this.password)) {
        Toast({
          message: this.rules.password.msg,
          duration: 1000
        })
      } else {
        // 登录
        request.post('http://127.0.0.1:3000/maizuo/login', { username: this.username, password: this.password }).then(res => {
          console.log(res)
          if (res.data.ok === 1) {
            // 设置token
            // localStorage.setItem('')
            Toast({
              message: '登录成功',
              duration: 800
            })
            this.$store.commit('changeUser', this.username)
            this.$router.replace('/center')
          } else {
            Toast({
              message: '账号不存在或者密码错误！',
              duration: 800
            })
          }
        })
      }
    },
    register () {
      this.$router.replace('/register')
    },
    getPhone () {
      this.hidden = 'none'
      if (this.phone.length === 11) {
        this.color = 'black'
      } else {
        this.color = '#bdc0c5'
      }
    },
    getCode () {
      if (this.color === 'black' && this.ableClick) {
        if (!this.rules.phone.rule.test(this.phone)) {
          Toast({
            message: this.rules.phone.msg,
            duration: 1000
          })
          return
        }
        this.ableClick = false
        request.post('http://127.0.0.1:3000/maizuo/code', {
          phone: this.phone
        }).then(res => {
          console.log(res)
          // if (res.success) {

          // }
        }).catch(err => {
          console.log(err)
        })
        // http({
        //   url: '/gateway',
        //   method: 'POST',
        //   headers: {
        //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"16893359391143165675372545"}',
        //     'X-Host': 'mall.user.sms-code.send'
        //   },
        //   data: {
        //     type: '1', mobile: this.phone, imgKey: '', imgCode: ''
        //   }
        // }).then(res => {
        //   console.log(res)
        // })
        let time = 60
        this.codeTime = time + ' 秒后重发'
        const timer = setInterval(() => {
          time--
          this.codeTime = time + ' 秒后重发'
          if (time < 0) {
            clearInterval(timer)
            this.codeTime = '重新获取'
            this.ableClick = true
          }
        }, 1000)
      }
    }
    // throttle (fn, t) {
    //   let timer = null
    //   return function () {
    //     if (!timer) {
    //       timer = setTimeout(() => {
    //         fn()
    //         timer = null
    //       }, t)
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.logo{
  position: relative;
  height: 12.5rem;
  img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-1.875rem);
    width: 3.75rem;
    height: 3.75rem;
  }
}
.form{
  padding: 0 1.25rem;
  input{
    border: none;
  }
  input::-webkit-input-placeholder{
    color: #bdc0c5;
  }
  .group{
    margin: .3125rem 0;
    padding: 0 .125rem 0 .3125rem;
    // border-bottom: 1px solid #e6e6e6;
    height: 2.8125rem;
    line-height: 2.8125rem;
    font-size: 14px;
  }
  .changeLogin{
    display: flex;
    justify-content: space-between;
    color: #fa905e;
    font-size: 14px;
    padding: 0 .3125rem;
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
      width: 5rem;
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
.register{
  padding-right: 1.5625rem;
  text-align: right;
  font-size: .875rem;
}
</style>
