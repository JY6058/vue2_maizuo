<template>
  <div class="user">
    <div class="top">
      <div class="imgPosition">
        <img :src="$store.state.userImg" alt="">
        <!-- <input type="file" @change="changeImg" class="uploadImg"> -->
      </div>
      <router-link to="/user" custom v-slot="{navigate}">
        <div class="username" @click="navigate">{{$store.state.user}}</div>
      </router-link>
    </div>
    <router-link to="/user/order" custom v-slot="{navigate}">
      <div class="item" @click="navigate">
        <van-icon name="cart" color="orange"/>
        <span>电影订单</span>
      </div>
    </router-link>
    <router-link to="/user/redPacket" custom v-slot="{navigate}">
      <div class="item" @click="navigate">
        <van-icon name="balance-o" color="red"/>
        <span>组合红包</span>
      </div>
    </router-link>
    <router-link to="/user/help" custom v-slot="{navigate}">
      <div class="item" @click="navigate">
        <van-icon name="phone-circle-o" color="black"/>
        <span>帮助与客服</span>
      </div>
    </router-link>
    <router-link to="/user/setting" custom v-slot="{navigate}">
      <div class="item" @click="navigate">
        <van-icon name="setting"/>
        <span>设置</span>
      </div>
    </router-link>
  </div>
</template>
<script>
import axios from 'axios'
import { Uploader } from 'vant'
export default {
  mounted () {
    // axios.get('http://127.0.0.1:3000').then(res => {
    //   console.log(res.data)
    // })
  },
  methods: {
    handleLogin () {
      setTimeout(() => {
        // 存token
        localStorage.setItem('token', '后端返回的token')
        this.$router.push(this.$route.query.direction)
      }, 2000)
    }
    // changeImg (e) {
    //   const fd = new FormData()
    //   fd.append('img', e.target.files[0])
    //   console.log(e.target.files)
    //   this.$store.commit('changeImg', 'https://mall.s.maizuo.com/78af52f09c161cf29325ff8282b12673295e27b8-e3b2-4a2d-a520-124f86a110a2')
    // }
  }
}
</script>
<style lang="scss" scoped>
.top{
  display: flex;
  align-items: center;
  height: 9.75rem;
  padding: 1.375rem 0 0 1.375rem;
  background: url('https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png');
  background-size: cover;
  color: white;
  font-size: 16px;
  img{
    width: 4.1875rem;
    height: 4.1875rem;
    border-radius: 50%;
  }
  .username{
    margin-left: 1.25rem;
  }
}
.item{
  border-bottom: 1px solid #f4f4f4;
  height: 3.125rem;
  padding: 0 .9375rem;
  line-height: 3.125rem;
  span{
    margin-left: .9375rem;
  }
}
.imgPosition{
  position: relative;

}
.uploadImg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  opacity: 0;
  font-size: 0;
}
</style>
