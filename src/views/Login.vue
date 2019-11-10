<template>
  <div>
    <shop-header :headerTitle="headerTitle" />
    <van-cell-group class="input-field">
      <van-field
        v-model="username"
        clearable
        label="账号"
        left-icon="contact"
        placeholder="请输入账号"
      />

      <van-field
        v-model="password"
        clearable
        left-icon="contact"
        type="password"
        label="密码"
        placeholder="请输入密码"
      >
        <span slot="left-icon" class="iconfont">&#xe672;</span>
      </van-field>
    </van-cell-group>
    <div class="button-area">
      <van-button
        type="primary"
        class="login-button"
        @click="login"
      >登录</van-button>
      <van-button
        plain
        type="primary"
        class="login-button"
        @click="logon"
      >注册</van-button>
    </div>
  </div>
</template>
<script>
import { Field, CellGroup, Button, Toast } from "vant";
import ShopHeader from "../components/ShopHeader";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    ShopHeader,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      headerTitle: "登录",
      username: "",
      password: ""
    };
  },
  methods: {
    logon() {
      this.$router.push("/logon");
    },
    login() {
      if (this.username == null || this.username == "") {
        this.$toast("请输入账号!");
      } else if (this.password == null || this.password == "") {
        this.$toast("请输入密码!");
      } else {
        this.http
          .post("/users/logincheck", {
            username: this.username,
            password: this.password
          })
          .then(Response => {
            let res = Response.data;
            if (res.code == "0") {
              this.setToken(res.msg.token);
              this.$router.replace("/user");
            } else {
              this.$toast("账号或密码错误!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    ...mapMutations(["setToken"])
  }
};
</script>
<style lang='stylus' scoped>
.input-field
  margin-top: 30%
  margin-bottom: 10%
.button-area
  display: flex
  flex: 1
  flex-flow: column wrap
  justify-content: space-around
  align-items: center
  .login-button
    width: 50%
    margin-bottom: 5%
</style>