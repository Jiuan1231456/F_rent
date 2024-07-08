import { defineStore } from "pinia";

export default defineStore('dataStore',{
    state: () => ({  // 存放全域變數的地方
        page:1,  // 讀取當頁頁碼
        loginObj:{},  // 存放房東登入資訊
        roomDetail:{},// 存放當前點擊的房間資訊
    }),
    getters:{  // 返回變數或數據
      getPage:(state) => state.page,
      getLoginObj:(state) => state.loginObj,
      getRoomD:(state) => state.roomDetail,
    },
    actions:{   // 處理數據
       setPage(params){
        this.page = params
       },
       setLoginObj(obj){
        this.loginObj = obj
       },
       setRoomD(detail){ //把資料存到pinia中的函數 getRoomIndex(i)被點擊時 對應的index會存到(i)
        this.roomDetail = detail
       },
        }
    }
)