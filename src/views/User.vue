<template>
  <div>
    <shop-header :headerTitle="headerTitle" />
    <div class="user-info">
      <img
        src="../assets/images/userpic.jpg"
        class="picture"
      />
      <div class="avatar">
        <img
          src="../assets/images/avatar.jpg"
          class="avatar-img"
        />
      </div>
      <div class="name">{{name}}</div>
    </div>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="pending-payment" />待付款
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" />待收货
      </van-col>
      <van-col span="8">
        <van-icon name="gold-coin-o" />余额
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link></van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        icon="location-o"
        title="地址管理"
        is-link
        @click="onAddressList"
      ></van-cell>
      <van-cell
        icon="shopping-cart-o"
        title="我的购物车"
        is-link
        @click="onCart"
      ></van-cell>
    </van-cell-group>
    <van-button
      type="danger"
      size="large"
      class="logout"
      @click="logout"
      block
    >退出登录</van-button>
  </div>
</template>
<script>
import ShopHeader from "../components/ShopHeader";
import { Row, Col, Icon, Cell, CellGroup, Button } from "vant";
import { mapMutations, mapState } from "vuex";
export default {
  name: "User",
  components: {
    "shop-header": ShopHeader,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  computed: {
    ...mapState(["token"])
  },
  data() {
    return {
      headerTitle: "我的",
      name: ""
    };
  },
  activated() {
    this.http
      .post("/users/userhome")
      .then(Response => {
        let res = Response.data;
        if (res.code == "0") {
          this.name = res.msg.name;
        } else {
          this.$router.replace("/login");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    logout() {
      this.setToken("");
      this.$router.replace("/login");
    },
    onAddressList() {
      if (this.token) {
        this.$router.push("/addressList");
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "登录后可以添加地址"
          })
          .then(() => {
            this.$router.replace("/login");
          })
          .catch(() => {});
      }
    },
    onCart() {
      if (this.token) {
        this.$router.push("/cart");
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "请登录"
          })
          .then(() => {
            this.$router.replace("/login");
          })
          .catch(() => {});
      }
    },
    ...mapMutations(["setToken"])
  }
};
</script>
<style lang='stylus' scoped>
.user-info
  width: 100%
  height: 50vw
  position: relative
  overflow: hidden
  .picture
    width: 100%
    height: 50vw
  .avatar
    width: 20vw
    height: 20vw
    position: absolute
    left: 0
    right: 0
    bottom: 18vw
    margin: auto
    border-radius: 50%
    overflow: hidden
    .avatar-img
      width: 100%
      height: 20vw
  .name
    position: absolute
    left: 0
    right: 0
    bottom: 11vw
    margin: auto
    text-align: center
.re
  width: 100px
  height: 100px
  background-color: red
.user-links
  padding: 15px 0
  font-size: 12px
  text-align: center
  background-color: #fff
  .van-icon
    display: block
    font-size: 24px
.user-group
  margin-bottom: 20px
.logout
  margin: 50px auto
  width: 90vw
</style>