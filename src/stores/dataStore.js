import { defineStore } from "pinia";

export default defineStore('dataStore',{
    state: () => ({  // 存放全域變數的地方
        page:1,  // 讀取當頁頁碼
        loginObj:{},  // 存放房東登入資訊
        roomObj:{},
        oneContractObj:{},//存放單一筆房間契約的資訊
        registerObj:{},//存放註冊資訊
        perRegister:{}
    }),
    getters:{  // 返回變數或數據
        getPage:(state) => state.page,
        getLoginObj:(state) => state.loginObj,
        getRoomObj:(state)=>state.roomObj,
        getoneContractObj:(state)=>state.oneContractObj,
        getRegisterObj:(state)=>state.registerObj,
        getPerRegisterObj:(state)=>state.perRegisterObj,
    },
    actions:{   // 處理數據
        setPage(params){
        this.page = params
        },
        setLoginObj(obj){
        this.loginObj = obj
        },
        setRoomObj(obj) {
            this.roomObj = obj;
        },
        // 搜尋房間的方法
    pointRoom(a,b,c,d,e,f){
        let obj={
      
            rent_p:a,
            eleric_p:b,
            manage_p:c,
            water_p:d


        }
        fetch("http://localhost:8080/room/roomSearch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.obj)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // 第二層:篩選出當前account的問卷
                this.roomList = data.roomList.filter(item => item.account === this.loginObj.ownerAccount);
                
            })
        },
              //第三層:篩選取得特定房東的特定房間資訊
        getRoomInfo(index){
            this.selectIndex=index;
            console.log("選特定房東的特定房間資訊",this.roomList[index]);//印出來供看console
            this.setRoomObj(this.roomList[index]);
        
        },
    },

        setOneContractObj(obj){
        this.oneContractObj=obj
        },
        setRegisterObj(obj){
            this.registerObj=obj
        },
        setPerRegisterObj(obj){
            this.perRegisterObj=obj
            }
        }
    
)