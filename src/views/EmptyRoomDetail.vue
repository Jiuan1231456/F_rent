<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {
            ownerInfo: [],//儲存屋主資訊
        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', 'roomObj', 'registerObj']),
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),
        getOwnerInfo() {
            console.log("房東資料總筆數", this.registerObj.length)
            console.log("此房間擁有者的帳號", this.roomObj.account)
            for (let i = 0; i < this.registerObj.length; i++) {
                console.log(this.registerObj[i].ownerAccount)
                if (this.registerObj[i].ownerAccount === this.roomObj.account) {
                    this.ownerInfo.push(this.registerObj[i]);
                }
            }
            console.log(this.ownerInfo);
        },
        
        googleMapLink(address) {
            return `https://www.google.com/maps/embed/v1/place?key=AIzaSyDfjf8ZGHYP8eUFuI-64hjKxj2kJ-HWVy8&q=${encodeURIComponent(address)}`;
        }



    },
    created() {
        this.getOwnerInfo()
        console.log(this.ownerInfo[0].ownerName)

    },
    mounted() {
        this.setPage(21)
    }
}
</script>

<template>
    <div class="bigArea">
        <h1>房間詳細資訊</h1>
        <div class="headerArea">
            <div v-if="this.roomObj.photo">
                <img :src="'data:image/jpeg;base64,' + this.roomObj.photo" alt="Image">
            </div>
            <div class="map">
                <iframe :src="googleMapLink(this.roomObj.address)" width="600" height="450" style="border:0;"
                    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>

        <div class="ownerInfo">
            <img class="ownerPhoto" src="/public/images.png" alt="">
            <h4>屋主 : {{ this.ownerInfo[0].ownerName }} &emsp;&emsp;連絡電話 : {{ this.ownerInfo[0].ownerPhone }}</h4>
        </div>

        <div class="bodyArea">
            <h4>地址 : {{ this.roomObj.address }}&emsp;&emsp;&emsp;&emsp;
                樓層 : {{ this.roomObj.floor }}&emsp;&emsp;&emsp;&emsp;
                房號 : {{ this.roomObj.roomId }}</h4>
            <h4>租金 : {{ this.roomObj.rentP }}元/月&emsp;&emsp;&emsp;&emsp;
                押金 : {{ this.roomObj.deposit }}元&emsp;&emsp;&emsp;&emsp;
                違約金 : {{ this.roomObj.cutP }}元</h4>
            <h4>電費 : {{ this.roomObj.eletricP }}元/度&emsp;&emsp;&emsp;&emsp;
                水費 : {{ this.roomObj.waterP }}元/月&emsp;&emsp;&emsp;&emsp;
                管理費 : {{ this.roomObj.manageP }}元/月</h4>
            <h4 v-if="this.roomObj.parking">坪數 : {{ this.roomObj.acreage }}坪&emsp;&emsp;&emsp;&emsp;車位 : 有</h4>
            <h4 v-else>坪數 : {{ this.roomObj.acreage }}坪&emsp;&emsp;&emsp;&emsp;車位 : 無</h4>
            <h4>物件備註 : {{ this.roomObj.equip }}</h4>
            <h4>特色描述 : {{ this.roomObj.rOther }}</h4>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bigArea {
    width: 70%;
    margin: 4% -105px;
}

.headerArea {
    width: 100%;
    height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 600px;
        height: 450px;
        margin: 2%;
    }

    .map {
        width: 480px;
        height: 450px;
        border: solid 1px black;
        margin: 3%;
    }
}

.ownerInfo {
    width: 100%;
    height: 130px;
    padding: 2%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .ownerPhoto {
        width: 120px;
        height: 120px;
        margin-right: 20px;
    }
}

.bodyArea {
    h4 {
        margin: 2% 2%;
    }
}
</style>