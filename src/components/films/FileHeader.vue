<template>
<div class="fileHeader" ref="refBox">
  <ul class="sticky">
    <router-link to="/files/nowPlaying" custom v-slot="{navigate,isActive}">
      <li @click="navigate"><span :class="isActive? 'active':''">正在热映</span></li>
    </router-link>
    <router-link to="/files/comingSoon" custom v-slot="{navigate,isActive}">
      <li @click="navigate"><span :class="isActive? 'active':''">即将上映</span></li>
    </router-link>
  </ul>
  <keep-alive><router-view></router-view></keep-alive>
</div>
</template>
<script>
export default {
}
</script>

<style lang="scss" scoped>
.fileHeader{
  width: 100%;
  ul{
    display: flex;
    height: 3.0625rem;
    line-height: 3.0625rem;
    li{
      flex: 1;
      // align-self: center;
      text-align: center;
      span{
        padding-bottom: .75rem;
      }
      .active{
        color: #ff5f16;
        border-bottom: 1px solid #ff5f16;
      }
    }
  }
}
.sticky{
  position: sticky;
  top:0px;
  background-color: #fff;
}
</style>
