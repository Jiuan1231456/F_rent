import { defineStore } from "pinia";

export default defineStore('dataStore',{
    state: () => ({  // 存放全域變數的地方
        page:1,  // 讀取當頁頁碼
        loginObj:{},  // 存放房東登入資訊
        roomObj:{},// 存放當前點擊的房間資訊
        findConctractRoomObj:{},//找出該契約的房間
        oneContractObj:{},//存放單一筆房間契約的資訊
        registerObj:{},//存放註冊資訊
        billObj: {},  // 存放歷史帳單的單筆帳單(之後要顯示明細)
        monthBill:{}, // 存放當期帳單  
        perBill:{}, // 存放單期帳單的單筆帳單(之後要輸入用電量)
        finalBill:{}, // 存放輸入完用電量的帳單
        billToContract:{}, // 找出該帳單的契約
        tenantData:{}, // 房客登入(房客的電話和身分證字號)
    }),
    getters:{  // 返回變數或數據
        getPage:(state) => state.page,
        getLoginObj:(state) => state.loginObj,
        getRoomObj:(state) => state.roomObj,
        getFindConctractRoomObj:(state)=>state.findConctractRoomObj,
        getoneContractObj:(state)=>state.oneContractObj,
        getRegisterObj:(state)=>state.registerObj,
        getBillObj: (state) => state.billObj,
        getMonthBill:(state) => state.monthBill,
        getPerBill:(state) => state.perBill,
        getFinalBill:(state) => state.finalBill,
        getBillToContract:(state) => state.billToContract,
        getTenantData:(state) => state.tenantData,
    },
    actions:{   // 處理數據
        setPage(params){
        this.page = params
        },
        setLoginObj(obj){
        this.loginObj = obj
        },
       setRoomObj(detail){ //把資料存到pinia中的函數 getRoomIndex(i)被點擊時 對應的index會存到(i)
        this.roomObj = detail
        },
        setFindConctractRoomObj(obj){
        this.findConctractRoomObj=obj;
        },
        setOneContractObj(obj){
        this.oneContractObj=obj
        },
        setRegisterObj(obj){
        this.registerObj=obj
        },
        setBillObj(obj) {
        this.billObj = obj;
        },
        setMonthBill(obj){
        this.monthBill = obj;
        },
        setPerBill(obj){
        this.perBill = obj;
        },
        setFinalBill(obj){
        this.finalBill = obj;
        },
        setBillToContract(obj){
        this.billToContract = obj;
        },
        setTenantData(obj){
        this.tenantData = obj
        },       
        }
    }
)