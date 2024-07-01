import { defineStore } from "pinia";

export default defineStore('dataStore',{
    state: () => ({  // 存放全域變數的地方
        page:1,
    }),
    getters:{  // 返回變數或數據
        getPage:(state) => `現在位置:${state.page}`,
    },
    actions:{   // 處理數據
        setPage(params){
        this.page = params
        }
        }
    }
)