import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/bill',
      name: 'bill',
      component: () => import('../views/Bill.vue')
    },
    {
      path: '/lookupBill',
      name: 'lookupBill',
      component: () => import('../views/LookupBill.vue')
    },
    {
      path: '/benefit',
      name: 'benefit',
      component: () => import('../views/Benefit.vue')
    },
    //租約列表管理
    {
      path: '/ContractList',
      name: 'ContractList',
      component: () => import('../views/ContractList.vue')
    },
    //新增租約
    {
      path: '/contractAdd',
      name: 'contractAdd',
      component: () => import('../views/ContractAdd.vue')
    },
    {//房間列表
      path: '/roomList',
      name: 'roomList',
      component: () => import('../views/RoomList.vue')
    },
    {//新增房間
      path: '/addRoom',
      name: 'addRoom',
      component: () => import('../views/AddRoom.vue')
    },
    {//單一房間詳細資訊
      path: '/roomDetail',
      name: 'roomDetail',
      component: () => import('../views/RoomDetail.vue')
    },
    {//編輯單一房間資訊
      path: '/editRoom',
      name: 'editRoom',
      component: () => import('../views/EditRoom.vue')
    },
    {//查看契約詳情
      path: '/Contract_Detail',
      name: 'Contract_Detail',
      component: () => import('../views/Contract_Detail.vue'),
      props: true // 允許通過路由傳參

    },
    // {//註冊
    //   path: '/Register',
    //   name: 'Register',
    //   component: () => import('../views/Register.vue'),
    //   props: true // 允許通過路由傳參

    // },
    {
      path: '/Cutcontract_Edit',
      name: 'Cutcontract_Edit',
      component: () => import('../views/Cutcontract_Edit.vue'),
      props: true // 允許通過路由傳參

    },

  ]
})

export default router
