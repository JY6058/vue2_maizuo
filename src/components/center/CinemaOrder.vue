<template>
  <div>{{$store.state.user}}-电影订单</div>
</template>

<script>
import request from '@/utils/request'
export default {
  mounted () {
    request.get('http://127.0.0.1:3000/maizuo/order').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err.response.data)
    })
  }
}
</script>

<style>

</style>
