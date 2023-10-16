<template>
  <div>
      <file-swiper v-if="datalist.length">
        <file-swiper-item class="fileSwiperItem" v-for="item in datalist" :key="item.id">
          <img :src="item.img" alt="">
        </file-swiper-item>
      </file-swiper>
      <file-header></file-header>
  </div>
</template>
<script>
import fileSwiper from '@/components/films/FileSwiper.vue'
import fileSwiperItem from '@/components/films/FileSwiperItem.vue'
import fileHeader from '@/components/films/FileHeader.vue'
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // if (from.meta.detail) {
      //   vm.$nextTick(() => {
      //     setTimeout(() => {
      //       console.log('vm', vm.$store.state.scrollTop)
      //       window.scrollTo(0, vm.$store.state.scrollTop)
      //     }, 1000)
      //   })
      // }
    })
  },
  mounted () {
    axios({
      url: 'api1/ajax/movieOnInfoList'
      // url: 'https://i.maoyan.com/ajax/movieOnInfoList'
    }).then((res) => {
      this.datalist = res.data.movieList
    })
  },
  components: {
    fileSwiper,
    fileSwiperItem,
    fileHeader
  }
}
</script>
<style lang="scss" scoped>
.fileSwiperItem{
  img{
    width: 100%;
    // height: 100%;
  }
}
// .sticky{
//   position: sticky;
//   top:0px;
// }

</style>
