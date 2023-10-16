<template>
  <div>{{$store.state.user}}-帮助客服</div>
</template>
<script>
import request from '@/utils/request'
export default {
  mounted () {
    request.get('http://127.0.0.1:3000/maizuo/help').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err.response.data)
    })
  }
}
</script>
