<template>
  <div class="info">
    <div v-if="info" class="img" :style="{backgroundImage:`url(${info?.poster})`}">
    </div>
    <!-- <div class="img">
      <img :src="info?.poster" alt="">
    </div> -->
    <!-- :class="ifhidden?'ifhidden':''" -->
    <detail-header v-model="chuanzhi" :ishidden="ifhidden">{{info?.name}}</detail-header>
    <div class="content">
      <h3>{{info?.name}}</h3>
      <p>{{info?.category}}</p>
      <p>{{info?.premiereAt|moment}}</p>
      <p>{{info?.nation}} | {{info?.runtime}}分钟</p>
      <div :class="isHidden?'enter-hidden tell':'leave-hidden tell'">
        <p>{{info?.synopsis}}</p>
      </div>
      <div class="arrow"><van-icon :name="isHidden?'arrow-down':'arrow-up'" @click="isHidden = !isHidden"/></div>
    </div>
    <div class="actors">
      <h3 >演职人员</h3>
      <detai-swiper :key="datalist.length" class="detaiSwiper" :slidesPerView="4" name="swiper1">
        <detail-swiper-item v-for="(data,index) in datalist" :key="index">
          <div>
            <img :src="data.avatarAddress" alt="" class="actorsImg">
            <p>{{data.name}}</p>
            <p>{{data.role}}</p>
          </div>
        </detail-swiper-item>
      </detai-swiper>
    </div>
    <div class="photos">
      <h3>剧照</h3>
      <detai-swiper :key="photos.length" class="detaiSwiper" :slidesPerView="2.4" name="swiper2">
        <detail-swiper-item v-for="(data,index) in photos" :key="index" class="photoItem">
          <div @click="handlePreview(index)" class="photoImg">
            <img :src="data" alt="">
          </div>
        </detail-swiper-item>
      </detai-swiper>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import http from '@/utils/http.js'
import detaiSwiper from '@/components/details/DetailSwiper.vue'
import detailSwiperItem from '@/components/details/DetailSwiperItem.vue'
import detailHeader from '@/components/details/DetailHeader.vue'
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      info: null,
      isHidden: true,
      ifhidden: true,
      datalist: [],
      photos: [],
      chuanzhi: 'zhuanzhi'
    }
  },
  components: {
    detaiSwiper,
    detailSwiperItem,
    detailHeader
  },
  filters: {
    moment (time) {
      const year = new Date(time * 1000).getFullYear()
      const month = new Date(time * 1000).getMonth() + 1
      const day = new Date(time * 1000).getDate()
      return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
    }
  },
  created () {
    // console.log(this.$route)
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=9597632`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.info = res.data.data.film
      this.datalist = res.data.data.film.actors
      this.photos = res.data.data.film.photos
    })
  },
  mounted () {
    window.onscroll = () => {
      // console.log(document.documentElement.scrollTop)
      if (document.documentElement.scrollTop || document.body.scrollTop > 50) {
        this.ifhidden = false
      } else {
        this.ifhidden = true
      }
    }
    sessionStorage.setItem('jyjy', '11111111')
    localStorage.setItem('jyjy', '22222222')
  },
  destroyed () {
    window.onscroll = null
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.photos,
        startPosition: index,
        closeable: true
        // closeIconPosition: top-left
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.info{

  // .ifhidden{
  //   display: none;
  // }
  .img{
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 13.125rem;
  }
  // .img{
  //   height: 13.125rem;
  //   img{
  //   width: 100px;
  // }
  // }
  .content{
    // overflow: hidden;
    height: auto;
    padding: .625rem;
    // transition: all 1s;
    p{
      margin: .3125rem 0;
      color: gray;
    }
    .tell{
      overflow: hidden;
      max-height: 62.5rem;
      margin-top: .3125rem;
      font-size: 1rem;
      line-height: 1.125rem;
      transition: all 1s ease;
    }
    .arrow{
      text-align: center;
      color: gray;
    }
    .enter-hidden{
      max-height: 2.5rem;
    }
    .leave-hidden{
      max-height: 12.5rem;

    }
  }
}
.actors,.photos{
  padding: .625rem;
  h3{
    margin:.3125rem
  }
  .detaiSwiper{
    height: 9.0625rem;
    // img{
    //   height: 6.875rem;
    // }
    p{
      color: gray;
      font-size: .75rem;
      text-align: center;
    }
  }
}
.actors .actorsImg{
  height: 6.875rem;
}
.photos{
  .detaiSwiper{
    .photoItem{
      width: 9.375rem;
    }
    .photoImg{
      display: flex;
      align-items: center;
      overflow: hidden;
      width: 9.375rem;
      height: 6.25rem;
      line-height: 6.25rem;
      img{
        width: 9.375rem;
      }
    }
  }
}

</style>
