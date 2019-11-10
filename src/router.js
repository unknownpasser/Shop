import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "components" */ './views/Home.vue')
const Detail = () => import(/* webpackChunkName: "components" */ './views/Detail.vue')
const AddressEdit = () => import(/* webpackChunkName: "components" */ './components/AddressEdit.vue')
const AddressList = () => import(/* webpackChunkName: "components" */ './components/AddressList.vue')
const Login = () => import(/* webpackChunkName: "components" */ './views/Login.vue')
const User = () => import(/* webpackChunkName: "components" */ './views/User.vue')
const Cart = () => import(/* webpackChunkName: "components" */ './views/Cart.vue')
const Test = () => import(/* webpackChunkName: "components" */ './views/Test.vue')
const Logon = () => import(/* webpackChunkName: "components" */ './views/Logon.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      naem: 'detail',
      component: Detail
    },
    {
      path: '/test',
      naem: 'test',
      component: Test
    },
    {
      path: "/addressList",
      name: 'addressList',
      component: AddressList,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/addressEdit",
      name: 'addressEdit',
      component: AddressEdit,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    },
    {
      path: "/logon",
      name: 'logon',
      component: Logon
    },
    {
      path: "/user",
      name: 'user',
      component: User,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/cart",
      name: 'cart',
      component: Cart,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/test",
      name: 'test',
      component: Test,
    }
  ]
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({ path: '/', replace: true })
    }
  } else {
    next()
  }
})


export default router;