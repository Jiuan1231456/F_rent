import { defineStore } from "pinia";

export default defineStore('dataStore',{
    state: () => ({  // 存放全域變數的地方
        page:1,  // 讀取當頁頁碼
        loginObj:{},  // 存放房東登入資訊
        billObj:{}, // 存放單一租客的單筆(一期)帳單
        
    }),
    getters:{  // 返回變數或數據
      getPage:(state) => state.page,
      getLoginObj:(state) => state.loginObj,
      getBillObj:(state) => state.billObj
    },
    actions:{   // 處理數據
       setPage(params){
        this.page = params
       },
       setLoginObj(obj){
        this.loginObj = obj
       },
       setBillObj(obj){
        this.billObj = obj
       }
        }
    }
)