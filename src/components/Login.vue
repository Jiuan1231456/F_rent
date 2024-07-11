<script>
import { defineComponent } from 'vue';
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import Swal from 'sweetalert2'


export default defineComponent({
    data() {
        return {
        owner_account: "",
        owner_pwd: "",
        showPopup: false, // 控制彈窗顯示
        isLoginForm: true, // 控制顯示登入表單還是註冊表單
        owner_account:"",
        owner_pwd:"",
        owner_identity:"",
        owner_name:"",
        owner_email:"",
        owner_phone:"",
        registerList:[],//存放註冊資訊
        };
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj','registerObj'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage', 'setLoginObj','setRegisterObj']),
        login() {
            const loginObj1 = {
                owner_account: this.owner_account,
                owner_pwd: this.owner_pwd
            };
            // 發送登入請求
            fetch("http://localhost:8080/rent/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(loginObj1)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setLoginObj(data);
                console.log('pinia裡的', this.loginObj);
                if(data.code===200){
                    Swal.fire({
                        title:"登入成功!",
                        text:"您現在已成功登入帳號",
                        icon:"success"
                        });
                        this.showPopup = false; // 登入成功後關閉彈窗
                    } else if(data.code===400){   
                        Swal.fire({
                            icon: "error",
                            title: "登入失敗",
                            text: "帳號或密碼有問題，請重新輸入"
                        });
                    }

                })
                .catch(error=>{
                    console.error("登入請求發生錯誤",error);
                    Swal.fire({
                        icon: "error",
                        title: "登入失敗",
                        text: "系統發生錯誤，請稍後再試"
                    })
            });
        },
        register(){
            let registerObj1 = {
                ownerAccount: this.owner_account,
                ownerPwd: this.owner_pwd,
                ownerEmail: this.owner_email,
                ownerPhone: this.owner_phone,
                ownerIdentity: this.owner_identity,
                ownerName: this.owner_name
            };
                // 檢查所有字段是否都有值
            if (!this.owner_account || !this.owner_pwd || !this.owner_email || 
                !this.owner_phone || !this.owner_identity || !this.owner_name) {
                Swal.fire({
                    icon: "error",
                    title: "註冊失敗",
                    text: "所有的資料都是必填"
                });
                return;
            }
            console.log('看送出的資料有沒有吃到:', registerObj1); // 印出來看有沒有吃到輸入資料
            // url
            fetch("http://localhost:8080/rent/account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerObj1),
            })
            .then(res => {
                if (!res.ok) {
                    console.error('Response status:', res.status); // 增加這一行
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.setRegisterObj(data);
                console.log('pinia裡的', this.registerObj);
                if (data.code === 200) {
            Swal.fire({
                title: "註冊成功!",
                text: "您的帳號已成功註冊",
                icon: "success"
            });
            this.showPopup = false; // 註冊成功後關閉彈窗
        } else if (data.code === 400) {
            Swal.fire({
                icon: "error",
                title: "註冊失敗",
                text: "發生錯誤，請稍後再試"
            });
        }
                
            })
            .catch(error => {
                console.error('fetch有問題:', error);
                Swal.fire({
                    icon: "error",
                    title: "註冊失敗",
                    text: "系統發生錯誤，請稍後再試"
                });
            });
        },

        customizeWindowEvent() {
        this.showPopup = true;
        },
        closePopup(e) {
        if (e.target.id === "window-container") {
            this.showPopup = false;
        }
        },
        toggleForm() {
        this.isLoginForm = !this.isLoginForm;
        }
    },
        
        
    mounted() {
        this.setPage(1);
        window.addEventListener('click', this.closePopup);
    },
    beforeUnmount() {
        window.removeEventListener('click', this.closePopup);
    }
});
</script>

<template>
    <div id="window-container" v-if="showPopup">
        <div class="window-content">
        <!-- 表單 -->
        <div class="login-page">
            <div class="form">
                <form v-if="!isLoginForm" class="register-form">
                    <h5>註冊會員</h5>
                    <label>帳號</label>
                        <input v-model="owner_account" type="text" placeholder="3-10位英數混合帳號" />
                        <label>真實姓名</label>
                        <input v-model="owner_name" type="text" placeholder="朴敘俊" />
                        <label>E-mail</label>
                        <input v-model="owner_email" type="email" placeholder="xxx@mail.com" />
                        <label>連絡電話</label>
                        <input v-model="owner_phone" type="tel" placeholder="09xx-xxx-xxx" />
                        <label>密碼</label>
                        <input v-model="owner_pwd" type="text" placeholder="6-10位英數密碼" />
                        <button type="button" @click.prevent="register">註冊確認</button>
                    <p class="message"><a href="#" @click.prevent="toggleForm">登入</a></p>
                </form>
                <form v-else class="login-form">
                    <h5>會員登入</h5>
                    <input v-model="owner_account" type="text" placeholder="帳號/電話" />
                    <input v-model="owner_pwd" type="password" placeholder="密碼" />
                    <button @click.prevent="login">登入</button>
                    <p class="message">尚未加入會員? <a href="#" @click.prevent="toggleForm">註冊</a></p>
                </form>
            </div>
        </div>
        <!-- 表單結束 -->
        </div>
    </div>

    <button class="login" @click="customizeWindowEvent">登入&nbsp;/&nbsp;註冊</button>
</template>

<style scoped>
#window-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    }

.window-content {
    background: white;
    width: 30%;
    border-radius: 20px;
    overflow: auto;
    }

    .login-page {
    width: 100%;
    padding: 8% 0;
    margin: auto;
    }

.form {
    position: relative;
    z-index: 1;
    background: #FFFCF5;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

.form input {
    font-family: 'Noto Serif TC', serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 15px 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
}

.form button {
    font-family: 'Noto Serif TC', serif;
    text-transform: uppercase;
    outline: 0;
    background: #445251;
    width: 100%;
    border: 0.3;
    padding: 15px;
    margin: 15px 0;
    color: #FFFFFF;
    font-size: 16px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.form button:hover,
.form button:active,
.form button:focus {
    background: #4D5139;
}

    .form .message a {
    color: #4D5139;
    text-decoration: none;
    font-size: 16px;
}

    label {
    font-family: 'Noto Serif TC', serif;
    font-size: 16px;
    color: #4D5139;
    font-weight: normal;
}

    .form h5 {
    font-weight: normal;
    color: #4D5139;
    text-decoration: underline;
    font-size: 20px;
}

body {
    font-family: 'Noto Serif TC', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.login{
    position: absolute;
    right: 5%;
    border: none;
    background-color: transparent;
    color: #433a2f;
    font-weight: 500;
    &:hover{
        color: #a08b71;
    }
}

</style>
