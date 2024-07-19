<script>
import { defineComponent } from "vue";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import Swal from 'sweetalert2';

export default defineComponent({
    data() {
        return {
            owner_account: "",
            owner_pwd: "",
            showPopup: false, // 控制彈窗顯示
            isLoginForm: true, // 控制顯示登入表單還是註冊表單
            owner_identity: "",
            owner_name: "",
            owner_email: "",
            owner_phone: "",
            owner_role: "", // 用戶角色：房東或房客
            verificationCode:"",//驗證碼
            loggedIn: false, // 增加登入狀態的判斷
        };
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', 'registerObj'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage', 'setLoginObj', 'setRegisterObj','setTenantData']),
        login() {
            const loginObj1 = {
                owner_account: this.owner_account,
                owner_pwd: this.owner_pwd
            };
            const loginObj2 = {
                tenantPhone: this.owner_account,
                tenantIdentity: this.owner_pwd,
            };
            const url = this.owner_role === 'landlord' 
                        ? "http://localhost:8080/rent/login" 
                        : "http://localhost:8080/bill/tenantList";

            // 發送登入請求
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials:'include',
                body: JSON.stringify(url === "http://localhost:8080/rent/login"?loginObj1:loginObj2)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                url === "http://localhost:8080/rent/login"?this.setLoginObj(data):this.setTenantData(data);
                // this.setLoginObj(data);
                if (data.code === 200) {
                    Swal.fire({
                        title: "登入成功!",
                        text: "您現在已成功登入帳號",
                        icon: "success",
                        didClose: () => {
                            this.$router.push(url === "http://localhost:8080/rent/login"?'/Overview':'/TenantBillFirst')
                            }
                    });
                    
                    this.showPopup = false; // 登入成功後關閉彈窗
                    this.loggedIn = true; // 設置登入狀態為已登入
                    sessionStorage.setItem("當前帳號", this.loginObj.ownerAccount); // 將帳號放入session
                } else if (data.code === 400) {   
                    Swal.fire({
                        icon: "error",
                        title: "登入失敗",
                        text: "帳號或密碼有問題，請重新輸入"
                    });
                }
            })
            .catch(error => {
                console.error("登入請求發生錯誤", error);
                Swal.fire({
                    icon: "error",
                    title: "登入失敗",
                    text: "系統發生錯誤，請稍後再試"
                });
            });
        },
        logout() {
            fetch("http://localhost:8080/rent/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Logout failed");
                }
                sessionStorage.removeItem("當前帳號"); // 清除当前账号信息
                this.loggedIn = false; // 重置登录状态
                console.log("Logout successful");
                this.$router.push('/emptyRoomList')
            })
            .catch(error => {
                console.error("Logout request failed:", error);
            });
        },
        //註冊方法
        register() {
            let registerObj1 = {
                owner_account: this.owner_account,
                owner_pwd: this.owner_pwd,
                owner_email: this.owner_email,
                owner_phone: this.owner_phone,
                owner_identity: this.owner_identity,
                owner_name: this.owner_name,
                owner_role: this.owner_role//判定房東或房客
            };

            // 檢查所有字段是否都有值
            if (!this.owner_account || !this.owner_pwd || !this.owner_email || 
                !this.owner_phone || !this.owner_identity || !this.owner_name ) {
                Swal.fire({
                    icon: "error",
                    title: "註冊失敗",
                    text: "所有的資料都是必填"
                });
                return;
            }

            console.log('看送出的資料有沒有吃到:', registerObj1); // 印出來看有沒有吃到輸入資料
 // 發送註冊請求
 fetch("http://localhost:8080/rent/account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials:'include',
                body: JSON.stringify(registerObj1),
            })
            .then(res => {
                if (!res.ok) {
                    console.error('Response status:', res.status);
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.setRegisterObj(data);
                if (data.code === 200) {
                    // 註冊成功後顯示驗證碼輸入視窗
                    // 註冊成功後顯示驗證碼輸入視窗
                    this.showPopup = false; // 先關閉註冊彈窗
                    this.showVerificationPopup(); // 顯示驗證碼輸入視窗
                    Swal.fire({
                        title: "註冊成功!",
                        text: "請輸入您收到的驗證碼進行驗證。",
                        icon: "success"
                    });
                } else if (data.code === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "註冊失敗",
                        text: "發生錯誤，請稍後再試"
                    });
                }
            })
            .catch(error => {
                console.error('註冊請求發生錯誤:', error);
                Swal.fire({
                    icon: "error",
                    title: "註冊失敗",
                    text: "系統發生錯誤，請稍後再試"
                });
            });
        },
        // 顯示驗證碼輸入表單
        showVerificationPopup() {
            this.showPopup = true;
            this.isLoginForm = false; // 顯示驗證碼輸入表單
        },
        //驗證碼驗證方法
        verifyCode() {

            let testObj={
                ownerAccount: this.owner_account,
                verificationCode:this.verificationCode
            }
            console.log("送進的驗證資料",testObj)
            fetch("http://localhost:8080/rent/verifyEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify(testObj)
            })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    Swal.fire({
                        title: "驗證成功!",
                        text: "您的帳號已成功註冊。",
                        icon: "success",
                        didClose: () => {
                            this.$router.push('/emptyRoomList')
                            }
                    });
                    console.log("送出的驗證資料",data)
                    this.showPopup = false; // 註冊成功後關閉彈窗
                    this.loggedIn = false; // 設置登入狀態為已登入
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "驗證失敗",
                        text: "驗證碼錯誤或已過期，請重新嘗試"
                    });
                }
            })
            .catch(error => {
                console.error("驗證碼驗證請求發生錯誤", error);
                Swal.fire({
                    icon: "error",
                    title: "驗證失敗",
                    text: "系統發生錯誤，請稍後再試"
                });
            });
        },
        // 彈出視窗事件
        customizeWindowEvent() {
            this.owner_account = "";
            this.owner_pwd = "";
            this.showPopup = true;
            this.isLoginForm=true;
            
        },
        closePopup(e) {
            // 只檢查點擊的目標是否包含 'close' 類別
            if (e.target.classList.contains('close')) {
                this.showPopup = false;
            }
        },
        toggleForm() {
            this.isLoginForm = !this.isLoginForm;
        }
    },
    mounted() {
        this.setPage(1);
        this.loggedIn = sessionStorage.getItem("當前帳號") ? true : false;
        window.addEventListener('click', this.closePopup);
    },
    beforeUnmount() {
        window.removeEventListener('click', this.closePopup);
    }
});
</script>

<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

    <div id="window-container" v-if="showPopup">
       
        <div class="form">
        <!-- close按鈕，點擊時會觸發closePopup方法 -->
        <button @click="closePopup" type="button" class="close" aria-label="Close"></button>
        
<!-- 註冊表單 -->
            <form v-if="!isLoginForm" class="register-form">
                <h5>註冊會員</h5>
                <label>帳號</label>
                <input v-model="owner_account" type="text" placeholder="3-10位英數混合帳號" />
                <label>真實姓名</label>
                <input v-model="owner_name" type="text" placeholder="朴敘俊" />
                <label>身分證字號</label>
                <input v-model="owner_identity" type="text" placeholder="A111111111" />
                <label>E-mail</label>
                <input v-model="owner_email" type="email" placeholder="xxx@mail.com" />
                <label>連絡電話</label>
                <input v-model="owner_phone" type="tel" placeholder="09xx-xxx-xxx" />
                <label>密碼</label>
                <input v-model="owner_pwd" type="text" placeholder="6-10位英數密碼" />
                <button type="button" @click="register">送出註冊資料</button>
                <p class="message"><a href="#" @click.prevent="toggleForm">登入</a></p>
            </form>

              <!-- //驗證碼輸入  -->
            <div v-if="!loggedIn && !isLoginForm">
                <h2>驗證您的郵箱</h2>
                <form @submit.prevent="verifyCode()">
                    <div class="form-group">
                        <label for="verification_code">輸入帳號</label>
                        <input type="text" id="owner_account" v-model="this.owner_account" required>
                        <label for="verification_code">輸入驗證碼</label>
                        <input type="text" id="verification_code" v-model="this.verificationCode" required>
                    </div>
                    <button type="submit" class="btn btn-primary" @click="verifyCode()">驗證</button>
                </form>
            </div>

            <form v-else class="login-form">
                <h5>會員登入</h5>
                <div class="form-group">
                    <label for="owner_role">身份</label>
                    <select id="owner_role" v-model="owner_role" required>
                        <option value="">請選擇身分</option>
                        <option value="landlord">房東</option>
                        <option value="tenant">房客</option>
                    </select>
                </div>
                <input v-model="owner_account" type="text" placeholder="帳號/電話" />
                <input v-model="owner_pwd" type="password" placeholder="密碼" />
                <button @click.prevent="login">登入</button>
                <p class="message">尚未加入會員? <a href="#" @click.prevent="toggleForm">註冊</a></p>
            </form>
        </div>
    </div> 

    <div class="aa" v-bind="isLoginForm">
        <!-- 表單結束 -->
        <!-- v-if不能綁button，只能綁在div上 -->
        <div v-if="!this.loggedIn "  class="loginregister">
            <button class="login" @click="customizeWindowEvent" key="login">登入/註冊</button>
        </div>
        <!-- 登入後顯示的按鈕區域 -->
        <div v-else class="loggedin-buttons" key="button">
            <p v-if="this.owner_role==='landlord'">親愛的房東&nbsp;&nbsp;{{loginObj.ownerAccount}}&nbsp;&nbsp;&nbsp; 已登入~</p>
            <p v-else>親愛的房客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 已登入~</p>
            <RouterLink to="AdjustAccount" class="editaccount">修改帳戶資訊</RouterLink>
            <button  class="logout" @click="logout">登出</button>
        </div>
    </div>
    
</template>

<style scoped>

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 100%;
    position: relative;
    z-index: 1000;
}

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
    z-index: 1000;
}

.triangle {
    position: fixed;
    width: 380px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0);
    top: 1.2%;
    left: 39%;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 80px solid #e9dfc8;
    /* box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24); */
}

.form {
    position: relative;
    z-index: 1;
    background: #e9dfc8;
    max-width: 360px;
    margin: 0 auto 0px;
    padding: 40px;
    text-align: center;
    z-index: 1000;
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24); */
    .close{
        position: absolute;
        right: 5px;
        top: -10px;
        width: 20px;
        height: 20px;
        opacity: 0.3;
        }
        .close:hover {
        opacity: 1;
        }
        .close:before, .close:after {
        position: absolute;
        left: 15px;
        top:0;
        content: ' ';
        height: 30px;
        width: 2px;
        background-color: #d4b4b4;
        }
        .close:before {
        transform: rotate(45deg);
        }
        .close:after {
        transform: rotate(-45deg);
        }

    }

.form input {
    font-family: 'Noto Serif TC', serif;
    outline: 0;
    background: #bdb499;
    width: 100%;
    border: 0;
    margin: 15px 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    z-index: 1000;
}

.form button {
  font-family: "Noto Serif TC", serif;
  text-transform: uppercase;
  outline: 0;
  background: #4d4129;
  width: 100%;
  border: 0.3;
  padding: 15px;
  margin: 15px 0;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1000;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #4d5139;
}

.form .message a {
    color: #4D5139;
    text-decoration: none;
    font-size: 16px;
}

    label {
    font-family: 'Noto Serif TC', serif;
    font-size: 16px;
    color: #887a53;
    font-weight: normal;
    z-index: 1000;
}

.form h5 {
    font-weight: normal;
    color: #4D5139;
    text-decoration: underline;
    font-size: 20px;
    padding-top: 5%;
    font-weight: 800;
    z-index: 1000;
}

.logout {
    position: absolute;
    right: 5%;
    border: none;
    background-color: transparent;
    color: #433a2f;
    font-weight: 500;
    z-index: 1000;
    &:hover {
        color: #a08b71;
    }
}

.login {
    position: absolute;
    right: 5%;
    border: none;
    background-color: transparent;
    color: #433a2f;
    font-weight: 500;
    z-index: 1000;
    &:hover {
        color: #a08b71;
    }
}

.loggedin-buttons{
    position: absolute;
    right: 5%;
    border: none;
    padding-top: 0.5%;
    background-color: transparent;
    color: #433a2f;
    font-weight: 500;
    justify-content: space-around;
    display: flex;
    z-index: 1000;
    &:hover {
        color: #a08b71;
    }
    p {
    position: relative;
    right: 150px;
    background-color: rgba(255, 166, 0, 0);
}
}
.editaccount{
    position: fixed;
    position: relative;
    right: 60px;
    background-color: rgba(0, 0, 0, 0);
    color: #433a2f;
    z-index: 1000;
}




</style>