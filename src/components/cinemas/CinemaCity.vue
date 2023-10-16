<template>
  <div>
    <van-index-bar :index-list="computedList" @change="indexChange">
    <div v-for="data in cityList" :key="data.type">
      <van-index-anchor :index="data.type" />
      <van-cell v-for="item in data.data" :key="item.cityId" :title="item.name" @click="select(item)"/>
    </div>
  </van-index-bar>
  </div>
</template>

<script>
import http from '@/utils/http.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      cityList: []
    }
  },
  mounted () {
    http({
      url: '/gateway?k=4464912',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      console.log(res.data.data.cities)
      const response = res.data.data.cities
      for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i)
        const result = response.filter(x => x.pinyin.substring(0, 1).toUpperCase() === char)
        // console.log(result)
        if (result.length > 0) {
          this.cityList.push({
            type: char,
            data: result
          })
        }
      }
    })
  },
  computed: {
    computedList () {
      return this.cityList.map(x => x.type)
    }
  },
  methods: {
    indexChange (item) {
      Toast({
        message: item,
        duration: 50
      })
    },
    select (item) {
      // console.log(item)
      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      // this.$store.commit('changePlayingList', [])
      // this.$store.commit('finished', false)
      this.$store.dispatch('getFileList', this.$store.state.cityId)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.van-toast--html, .van-toast--text{
  min-width: 30px;
}
</style>
