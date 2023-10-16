<template>
  <div class="fileItem"  @click="handleChangePage(dataObj.filmId)">
    <div class="img">
      <img :src="dataObj.poster" alt="">
    </div>
    <div class="content">
      <div class="title">{{dataObj.name}}</div>
      <div class="label">主演：
        <span v-for="(data,index) in dataObj.actors" :key="index">{{data.name}}&nbsp;</span>
      </div>
      <div class="info">类别：{{dataObj.category}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['dataObj'],
  methods: {
    handleChangePage (id) {
      console.log(`${window.location.hash.slice(1)}/${id}`)
      this.$router.push(`${window.location.hash.slice(1)}/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.fileItem{
  display: flex;
  padding: .3125rem;
  border-bottom: 1px solid #ededed;
    .img{
      width: 4.125rem;
      img{
        width: 4.125rem;
      }
    }
    .content{
      // width: 229px;
      width: 15.625rem;
      padding: .625rem;
      div{
        margin-bottom: .125rem;
      }
      .title{
        font-size: 1.125rem;
      }
      .label{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: gray;
      }
      .info{
        color: gray;
      }
    }
}
</style>
