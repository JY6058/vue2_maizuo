<template>
  <div class="swiper-container swiper" :class="name">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
</div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  props: {
    slidesPerView: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'swiper1'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 30,
      freeMode: true
    })
    // new Swiper('.swiper2', {
    //   slidesPerView: 2,
    //   spaceBetween: 30,
    //   freeMode: true
    // })
  }
}
</script>
<style scoped>
.swiper-container {
  width: 100%;
  height: 11rem;

    /* height: 34.6875rem; */
  }
</style>
