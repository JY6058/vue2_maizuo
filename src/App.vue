<template>
  <div id="app">
    <router-view></router-view>
    <my-tabbar ref="jy"></my-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import MyTabbar from '@/components/MyTabbar.vue'
Vue.use(Vant)
export default {
  components: {
    MyTabbar
  }
}
</script>
<style lang="scss" >
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}
li{
  list-style: none;
}
#app{
  padding-bottom: 3.125rem;
}
</style>
