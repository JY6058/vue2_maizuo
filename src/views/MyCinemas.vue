<template>
  <div class="cinema">
    <div class="navbar">
      <van-nav-bar title="影院" @click-left="onClickLeft" @click-right="onClickRight">
        <template #left>
          {{$store.state.cityName}}<van-icon name="arrow-down" color="black" size="12px"/>
        </template>
        <template #right>
          <van-icon name="search" size="18" color="black"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="box" :style="{height:height}">
      <ul>
      <li v-for="item in $store.state.filesList" :key="item.cinemaId">
        <div class="left">
          <div class="nowrap">{{item.name}}</div>
          <p class="nowrap">{{item.address}}</p>
        </div>
        <div class="right">
          <div>￥{{item.lowPrice/100}} 起</div>
          <p>距离未知</p>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
import http from '@/utils/http.js'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      height: '0px'
      // locationMsg: '当前城市：北京市'
      // datalist: []
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(this.$refs)
    // this.scrollTop = this.$store.state.scrollTop
    next()
  },
  computed: {
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 96 + 'px'
    // this.getCurrentCity()
    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=5780541`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   console.log(res.data.data.cinemas)
    //   this.datalist = res.data.data.cinemas
    //   this.$nextTick(() => {
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: true
    //         // mouseWheel: true,
    //         // probeType: 3
    //       }
    //     })
    //   })
    // })
    if (this.$store.state.filesList.length === 0) {
      this.$store.dispatch('getFileList', this.$store.state.cityId).then(res => {
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  },
  updated () {
    // this.$nextTick(() => {
    //   new BetterScroll('.box', {
    //     scrollbar: {
    //       fade: true
    //     }
    //   })
    // })
  },
  methods: {
    onClickLeft () {
      // console.log('onClickLeft')
      this.$router.push('/city')
    },
    onClickRight () {
      // console.log('right')
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
<style lang="scss" scoped>
.nowrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.box{
  position: relative;
  overflow: hidden;
  li{
    display: flex;
    justify-content: space-between;
    height: 2.8438rem;
    border-bottom: 1px solid #ededed;
    padding: .9375rem;
    .left{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 17.5rem;
      div{
        font-size: .9375rem;
      }
      p{
        font-size: .75rem;
        color:#797d82;
      }
    }
    .right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 4.375rem;
      text-align: center;
      div{
        font-size: .9375rem;
        color: #ff5f16;
      }
      p{
        font-size: .6875rem;
        color: #797d82;
      }
    }
  }
}
</style>
