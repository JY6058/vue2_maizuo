<template>
  <div class="nowPlaying">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad">
          <file-item v-for="item in datalist" :key="item.filmId" :dataObj="item"></file-item>
        </van-list>
  </div>
</template>
<script>
import http from '@/utils/http.js'
// import { Toast } from 'vant'
import fileItem from '@/components/films/FileItem.vue'
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      index: 1
    }
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.scrol)
    next()
  },
  mounted () {
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,
    //   loadingType: 'spinner'
    // })
    this.onLoad()
    window.addEventListener('scroll', this.scrol)
  },
  methods: {
    onLoad () {
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.index}&pageSize=10&type=1&k=3788370`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        console.log(res.data.data.films)
        if (res.data.data.films.length < 1) {
          this.finished = true
        }
        this.datalist = this.datalist.concat(res.data.data.films)
        this.loading = false
        // Toast.clear()
      })
      this.index++
    },
    scrol () {
      console.log(document.documentElement.scrollTop)
      this.$store.commit('changeScrollTop', document.documentElement.scrollTop)
    }
  },
  components: {
    fileItem
  }
}
</script>
<style lang="scss" scoped>
.nowPlaying{
  padding: 0 .9375rem;
}
</style>
