<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <ul v-if="value">
      <li v-for="item in getFiles" :key="item.cinemaId">
        <div class="left">
          <div class="nowrap">{{item.name}}</div>
          <p class="nowrap">{{item.address}}</p>
        </div>
        <div class="right">
          <div>￥{{item.lowPrice/100}} 起</div>
          <p>距离</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    if (this.$store.state.filesList.length === 0) {
      this.$store.dispatch('getFileList', this.$store.state.cityId)
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
    },
    onCancel () {
      // console.log('取消')
      this.$router.back()
    }
  },
  computed: {
    getFiles () {
      console.log(this.$store.state.filesList)
      return this.$store.state.filesList.filter(x => x.name.includes(this.value))
    }
  }
}
</script>

<style lang="scss" scoped>
li{
    display: flex;
    justify-content: space-between;
    // height: 2.8125rem;
    padding: .9375rem;
    // border-bottom: .0625rem solid #ededed;
    // line-height: 1.3125rem;
    .left{
      width: 13.25rem;
    }
    .right{
      width: 4.375rem;
      text-align: center;
      div{
        color: #ff5f16;
      }
    }
    div{
      font-size: .9375rem;
    }
    p{
      color: gray;
      font-size: .75rem;
    }
  }
  .nowrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
