<template>
  <div  class="top" :class="ishidden?'ishidden':''">
    <div class="title">
      <slot></slot>
      <div class="posi"><van-icon name="arrow-left" @click="$router.back()" /></div>
    </div>
    <div>这是v-model传值{{value}}</div>
  </div>
</template>
<script>
export default {
  props: {
    ishidden: {
      type: Boolean,
      default: true
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      ziji: this.value
    }
  }
}
</script>
<style lang="scss" scoped>
.top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  text-align: center;
  line-height: 2.5rem;
  .title{
    position: relative;
    // margin-right: 3.125rem ;
    .posi{
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.ishidden{
  display: none;
}
</style>
