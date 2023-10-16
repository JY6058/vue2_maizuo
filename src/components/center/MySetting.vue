<template>
  <div>{{$store.state.user}}-设置
    <div><button @click="exitLogin">退出登录</button></div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  mounted () {
    request.get('http://127.0.0.1:3000/maizuo/setting').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err.response.data)
    })
  },
  methods: {
    exitLogin () {
      this.$store.commit('changeUser', '请先登录')
      localStorage.removeItem('token')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
