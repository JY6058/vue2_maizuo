<template>
  <div class="swiper-container swiper">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
</div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  mounted () {
    new Swiper('.swiper', {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }

      // 如果需要前进后退按钮
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev'
      // }

      // 如果需要滚动条
      // scrollbar: {
      //   el: '.swiper-scrollbar'
      // }
    })
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
