<template>
  <div>
    <van-nav-bar class="cartheader">
      <van-icon
        name="arrow-left"
        slot="left"
        size="1.5rem"
        color="#fff"
        @click="back"
      />
      <span slot="title" size="1.5rem" color="#fff">购物车</span>
      <span
        slot="right"
        style="font-size:1rem;color:#fff"
        @click="switchDelete"
      >{{deleteflag == true?'完成':'编辑'}}</span>
    </van-nav-bar>
    <van-checkbox-group
      v-model="result"
      class="checkbox-wrapper"
    >
      <div
        class="goods-card"
        v-for="item in cartsList"
        :key="item.goodsId"
      >
        <van-card
          :num="item.num"
          :desc="item.skuname+'的简介'"
          :price="item.price/100"
          :title="item.skuname"
          :thumb="item.imgurl"
        >
          <van-stepper
            v-model="item.num"
            slot="num"
            v-if="deleteflag!=true"
            @change="setNum({goodsId:item.goodsId,num:item.num})"
          />
        </van-card>
        <van-checkbox
          :name="deleteflag?item.deleteStatus:item.chooseStatus"
          class="checkbox-item"
          @click="setList(item.goodsId,item.chooseStatus)"
        ></van-checkbox>
      </div>
    </van-checkbox-group>
    <div class="footer"></div>
    <van-submit-bar
      :price="deleteflag?deletetotal:total"
      :button-text="deleteflag==true?'删除':'结算'"
      label="共："
      @submit="onSubmit"
    >
      <van-checkbox
        v-model="flag"
        class="bar-checkbox"
        @click="selectAll"
      >{{txtAll}}</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import {
  Card,
  SubmitBar,
  Stepper,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  NavBar,
  Icon,
  Dialog
} from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Cart",
  components: {
    [Card.name]: Card,
    [SubmitBar.name]: SubmitBar,
    [Stepper.name]: Stepper,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog
  },
  computed: {
    ...mapState(["loading", "cartsList", "token"]),
    total() {
      let sum = 0;
      this.cartsList.forEach(item => {
        if (item.chooseStatus == true) {
          sum = sum + item.price * item.num;
        }
      });
      return sum;
    },
    deletetotal() {
      let sum = 0;
      this.cartsList.forEach(item => {
        if (item.deleteStatus == true) {
          sum = sum + item.price * item.num;
        }
      });
      return sum;
    }
  },
  data() {
    return {
      result: [true],
      flag: true,
      deleteflag: false,
      txtAll: "全选",
      submitTxt: "结算"
    };
  },
  activated() {
    this.http.get("/carts/list").then(Response => {
      let res = Response.data;
      if (
        this.cartsList.length != res.msg.length ||
        this.cartsList[0].userId != res.msg[0].userId
      ) {
        this.setCartsList(res.msg);
      }
      let tempflag = true;
      this.cartsList.forEach(item => {
        if (this.deleteflag == true) {
          if (item.deleteStatus == false) {
            tempflag = false;
          }
        } else {
          if (item.chooseStatus == false) {
            tempflag = false;
          }
        }

        if (tempflag == true) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
    });
    this.deleteflag = false;
  },
  mounted() {},
  methods: {
    ...mapMutations([
      "offLoading",
      "setCartsList",
      "setCartsListNum",
      "setCartsListStatus",
      "setCartsListAllStatus",
      "deleteCartsList"
    ]),
    back() {
      this.$router.go(-1);
    },
    switchDelete() {
      this.deleteflag = !this.deleteflag;
      let temp = true;
      this.cartsList.forEach(item => {
        if (this.deleteflag == true) {
          if (item.deleteStatus == false) {
            temp = false;
          }
        } else {
          if (item.chooseStatus == false) {
            temp = false;
          }
        }
      });
      if (temp == true) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    selectAll() {
      this.setCartsListAllStatus({
        deleteflag: this.deleteflag,
        allflag: this.flag
      });
    },
    setList(goodsId) {
      this.setCartsListStatus({
        deleteflag: this.deleteflag,
        goodsId: goodsId
      });
      let temp = true;
      this.cartsList.forEach(item => {
        if (this.deleteflag == true) {
          if (item.deleteStatus == false) {
            temp = false;
          }
        } else {
          if (item.chooseStatus == false) {
            temp = false;
          }
        }
      });
      if (temp == true) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    setNum(val) {
      this.setCartsListNum(val);
    },
    onSubmit() {
      let goodsIdList = [];
      this.cartsList.forEach(item => {
        if (this.deleteflag == true) {
          if (item.deleteStatus == true) {
            goodsIdList.push(item.goodsId);
          }
        } else {
          if (item.chooseStatus == true) {
            goodsIdList.push(item.goodsId);
          }
        }
      });
      this.http
        .post("/carts/delete", {
          goodsIdlist: goodsIdList
        })
        .then(Response => {
          let res = Response.data;
          this.deleteCartsList(goodsIdList);
        });
      if (this.deleteflag == false) {
        this.$dialog
          .alert({
            title: "购买成功",
            message: "花费" + this.total + "元,物品Id为" + goodsIdList
          })
          .then(() => {
            this.$router.push("/");
          });
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../assets/varibles.styl'
.cartheader >>> .van-nav-bar__title
  color: #fff
.cartheader
  z-index: 0
  background: $bgColor
.goods-card
  width: auto
  display: flex
  flex-flow: row-reverse nowrap
  position: relative
  margin-bottom: 2px
  .checkbox-item
    width: 12vw
    display: flex
    justify-content: space-around
    align-items: center
    background: #fff
  .van-card
    flex: auto
    background-color: #fff
.footer
  width: auto
  height: 10vh
.bar-checkbox
  padding-left: 3.5vw
</style>