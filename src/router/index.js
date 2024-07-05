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
    {
      path: '/lookupbill',
      name: 'lookupbill',
      component: () => import('../views/LookupBill.vue')
    },
  ]
})

export default router
