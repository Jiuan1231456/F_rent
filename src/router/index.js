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
     {//房間列表
      path: '/roomList',
      name: 'roomList',
      component: () => import('../views/RoomList.vue')
    },
    {// 產生當期帳單
      path: '/generatebill',
      name: 'generatebill',
      component: () => import('../views/BillGenerate.vue')
    },
    {// 帳單明細
      path: '/BillDetail',
      name: 'BillDetail',
      component: () => import('../views/BillDetail.vue')
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
    {
      path: '/roomdetail',
      name: 'roomdetail',
      component: () => import('../views/RoomDetail.vue')
    },
    {
      path: '/addroom',
      name: 'addroom',
      component: () => import('../views/AddRoom.vue')
    },
    {//帳單列表
      path: '/lookupbill',
      name: 'lookupbill',
      component: () => import('../views/BillList.vue')
    },
    // {
    //   path: '/ ContractPreview',
    //   name: 'ContractPreview',
    //   component: () => import('../views/ContractPreview.vue')
    // },
    //查看契約詳情
    {
      path: '/Contract_Detail',
      name: 'Contract_Detail',
      component: () => import('../views/Contract_Detail.vue'),
      props: true // 允許通過路由傳參
    },
     {//當期帳單計算(輸入用電量的頁面)
      path: '/billFinalDetail',
      name: 'billFinalDetail',
      component: () => import('../views/BillFinalDetail.vue')
    },
  ]

})


export default router
