import { defineStore } from "pinia";

export default defineStore('dataStore',{
    state: () => ({  // 存放全域變數的地方
        page:1,  // 讀取當頁頁碼
        loginObj:{},  // 存放房東登入資訊
    }),
    getters:{  // 返回變數或數據
      getPage:(state) => state.page,
      getLoginObj:(state) => state.loginObj,
    },
    actions:{   // 處理數據
       setPage(params){
        this.page = params
       },
       setLoginObj(obj){
        this.loginObj = obj
       },
        }
    }
)