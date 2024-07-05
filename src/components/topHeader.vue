<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";

export default {
    data() {
        return {
        //在 data 方法中定義 showPopup 和 showForm 兩個狀態變量來控制顯示和隱藏。
        showPopup: false,
        showForm: false,
        };
    },
    methods: {
        //顯示彈跳視窗
        customizeWindowEvent() {
        this.showPopup = true;
        },
        //在點擊彈窗外部時關閉彈窗
        closePopup(event) {
        if (event.target.id === 'window-container') {
            this.showPopup = false;
        }
        },
        //點擊連結時切換表單的顯示和隱藏
        toggleForm() {
        this.showForm = !this.showForm;
        },
    },
};
</script>

<template>
<!-- 房東登入 -->

    <div id="window-container">
    <div class="window-content">
<!-- <span>You can display content here!</span> -->

<!-- 表單-->
    <div class="login-page">
    <div class="form">
        <form class="register-form">
        <h5>註冊會員</h5>  
        <label>E-mail</label>
        <input type="text" placeholder="xxx@mail.com"/>
        <label>連絡電話</label>
        <input type="tel" placeholder="09xx-xxx-xxx"/>
        <label>密碼</label>
        <input type="password" placeholder="6-8位英數密碼"/>
        <label>再次輸入密碼</label>
        <input type="password" placeholder="請再次輸入密碼"/>
        <button>註冊</button>

        <p class="message"> <a href="#">登入</a></p>
        </form>
        <form class="login-form">
        <h5>會員登入</h5>
        <input type="text" placeholder="E-Mail / 電話"/>
        <input type="password" placeholder="密碼"/>
        <button>登入</button>

        <p class="message">尚未加入會員? <a href="#">註冊</a></p>
        </form>
    </div>
    </div>
                    
    <!--   表單結束                 -->
                    </div>
                </div>
    


        <button onclick="customizeWindowEvent()">Click Me</button>





<!-- 房客登入 -->











    <div>
        <div id="window-container" @click="closePopup" v-show="showPopup">
        <!-- 其他彈窗內容 -->
        </div>

        <div class="message">
        <a href="#" @click.prevent="toggleForm">Toggle Form</a>
        </div>

        <form v-show="showForm">
        <!-- 表單內容 -->
        </form>
    </div>
</template>

<style scoped lang="scss">
    #window-container{
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
        
    #window-pop{
        background: white;
        width:30%;
        z-index: 1;
        margin: 12% auto;
        overflow: auto;
        border-radius: 20px;
    }
            
    .window-content {
        width: auto;
        height: 200px;
        line-height: 200px;
        overflow:auto;
        text-align: center;
    }

    span {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
    }

    /*表單*/

    .login-page {
    width: 360px;
    padding: 8% 0 0;
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
    margin:15px 0;
    color: #FFFFFF;
    font-size: 16px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    }
    .form button:hover,.form button:active,.form button:focus {
    /*   background: #4D5139; */
    }
    /* .form .message {
    margin: 15px 0 0;
    color: #4D5139;
    font-size: 12px;
    } */
    .form .message a {
    color: #4D5139;
    text-decoration: none;
    font-size: 16px
    }
    .form .register-form {
    display: none;
    }
    /* .container {
    position: relative;
    z-index: 1;
    max-width: 300px;
    margin: 0 auto;
    }
    .container:before, .container:after {
    content: "";
    display: block;
    clear: both;
    }
    .container .info {
    margin: 50px auto;
    text-align: center;
    }
    .container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
    }
    .container .info span {
    color: #4d4d4d;
    font-size: 12px;
    }
    .container .info span a {
    color: #000000;
    text-decoration: none;
    }
    .container .info span .fa {
    color: #EF3B3A;
    } */
    label{
    font-family: 'Noto Serif TC', serif;
    font-size:16px;
    color:#4D5139;
    font-weight:normal;
    }
    .form h5{
    font-weight:normal;
    color:#4D5139;
    text-decoration:underline;
    font-size:20px;
    }
    body {
    /*   background: #76b852; /* fallback for old browsers 
    background: rgb(141,194,111);
    background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%); */
    font-family: 'Noto Serif TC', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;      
}



</style>