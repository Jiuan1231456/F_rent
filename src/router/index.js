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
  ]
})

export default router
