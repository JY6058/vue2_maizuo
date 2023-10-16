import Vue from 'vue'
import VueRouter from 'vue-router'
import MyFiles from '@/views/MyFiles.vue'
import MyCinemas from '@/views/MyCinemas.vue'
import MyCenter from '@/views/MyCenter.vue'
import NowPlaying from '@/components/films/NowPlaying.vue'
import ComingSoon from '@/components/films/ComingSoon.vue'
import FileDetail from '@/components/films/FileDetail.vue'
import CinemaSearch from '@/components/cinemas/CinemaSearch.vue'
import CinemaCity from '@/components/cinemas/CinemaCity.vue'
import CinemaOrder from '@/components/center/CinemaOrder.vue'
import CombineMonney from '@/components/center/CombineMonney.vue'
import MyHelp from '@/components/center/MyHelp.vue'
import MySetting from '@/components/center/MySetting.vue'
import MyUser from '@/components/center/MyUser.vue'
import MyLogin from '@/components/center/MyLogin.vue'
import MyRegister from '@/components/center/MyRegister.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/files/nowPlaying'
  },
  {
    path: '/files',
    component: MyFiles,
    redirect: '/files/nowPlaying',
    children: [
      { path: 'nowPlaying', component: NowPlaying },
      { path: 'comingSoon', component: ComingSoon }
    ]
  },
  {
    path: '/files/comingSoon/:id',
    component: FileDetail,
    meta: {
      show: false,
      detail: true
    }
  },
  {
    path: '/files/nowPlaying/:id',
    component: FileDetail,
    meta: {
      show: false,
      detail: true
    }
  },
  {
    path: '/cinemas',
    component: MyCinemas
  },
  {
    path: '/cinemas/search',
    component: CinemaSearch,
    meta: {
      show: false
    }
  },
  {
    path: '/city',
    component: CinemaCity,
    meta: {
      show: false
    }
  },
  {
    path: '/user',
    component: MyUser,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/login',
    component: MyLogin
  },
  {
    path: '/register',
    component: MyRegister
  },
  {
    path: '/center',
    component: MyCenter
  },
  {
    path: '/user/order',
    component: CinemaOrder,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/user/redPacket',
    component: CombineMonney,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/user/help',
    component: MyHelp,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/user/setting',
    component: MySetting,
    meta: {
      isLogin: true
    }
  },
  {
    path: '*',
    redirect: '/files/nowPlaying'
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.show === false) {
    // console.log(store)
    store.commit('changeShow', false)
  } else {
    store.commit('changeShow', true)
  }
  if (to.meta.isLogin && !localStorage.getItem('token')) {
    if (to.fullPath === '/user') {
      next('/login')
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    store.commit('changeUser', '请先登录')
  } else {
    next()
  }
  // if (to.meta.isLogin === false && store.state.user === '请先登录') {
  //   if (to.fullPath === '/user') {
  //     next('/login')
  //   } else {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   }
  // } else {
  //   next()
  // }
})

export default router
