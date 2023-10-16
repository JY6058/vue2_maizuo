<template>
  <div class="coming">
    <file-item v-for="item in datalist" :key="item.filmId" :dataObj="item"></file-item>
  </div>
</template>
<script>
import http from '@/utils/http.js'
import fileItem from '@/components/films/FileItem.vue'
export default {
  components: {
    fileItem
  },
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=9088277`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
    })
  },
  methods: {
    handleChangePage (id) {
      // console.log(id)
      this.$router.push(`/files/nowPlaying/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.coming{
  padding: 0 .9375rem;
}
</style>
