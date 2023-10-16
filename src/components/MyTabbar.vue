<template>
  <van-tabbar v-show="$store.state.isShow" class="tabbar" v-model="active" active-color="#ff5f16">
        <van-tabbar-item name="files" icon="video-o">
          <router-link to="/files">电影</router-link>
        </van-tabbar-item>
        <van-tabbar-item name="cinemas" icon="vip-card-o">
          <router-link to="/cinemas">影院</router-link>
        </van-tabbar-item>
        <van-tabbar-item name="center" icon="user-o">
          <router-link to="/center">我的</router-link>
        </van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
  data () {
    return {
      active: 'files'
    }
  },
  mounted () {
    const tabbarActive = window.location.hash
    // console.log(tabbarActive.substring(2))
    const hash = tabbarActive.substring(2)
    if (hash === 'files' || hash === 'cinemas' || hash === 'center') {
      this.active = hash
    }
  }
}
</script>
<style lang="scss" scoped>
.tabbar{
  height: 3.125rem;
}
</style>
