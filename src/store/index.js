import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/http.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer (val) {
      return {
        cityName: val.cityName,
        cityId: val.cityId,
        user: val.user
      }
    }
  })],
  state: {
    cityName: '深圳',
    cityId: '440300',
    filesList: [],
    isShow: true,
    scrollTop: 100,
    isLogin: false,
    user: '请先登录',
    userImg: 'https://mall.s.maizuo.com/e915e2c990c30f8efa9e30bc75da41ee.jpg'
  },
  getters: {
  },
  mutations: {
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, id) {
      state.cityId = id
    },
    changeFilesList (state, list) {
      state.filesList = list
    },
    changeShow (state, data) {
      state.isShow = data
    },
    changeScrollTop (state, data) {
      state.scrollTop = data
    },
    changeLogin (state, data) {
      state.isLogin = data
    },
    changeUser (state, name) {
      state.user = name
    },
    changeImg (state, url) {
      state.userImg = url
    }
  },
  actions: {
    getFileList (store, id) {
      return http({
        url: `/gateway?cityId=${id}&ticketFlag=1&k=5780541`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log(res.data.data.cinemas)
        store.commit('changeFilesList', res.data.data.cinemas)
        // this.$nextTick(() => {
        //   new BetterScroll('.box', {
        //     scrollbar: {
        //       fade: true
        //     }
        //   })
        // })
      })
    }
  },
  modules: {
  }
})
