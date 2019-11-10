<template>
  <div>
    <van-nav-bar class="shopheader">
      <van-icon
        name="arrow-left"
        slot="left"
        size="1.5rem"
        color="#fff"
        @click="back"
      />
      <span
        slot="title"
        size="1.5rem"
        color="#fff"
      >{{headerTitle}}</span>
      <van-icon
        name="user-o"
        slot="right"
        size="1.5rem"
        color="#fff"
        @click="onUser"
        v-if="$route.path!='/login' && $route.path!='/user' && $route.path!='/cart' && $route.path!='/logon'"
      />
    </van-nav-bar>
  </div>
</template>
<script>
import { NavBar, Icon } from "vant";
import { mapState } from "vuex";
export default {
  name: "ShopHeader",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      showArrow: true
    };
  },
  props: {
    headerTitle: String
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onUser() {
      if (this.token) {
        this.$router.push("/user");
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../assets/varibles.styl'
.shopheader >>> .van-nav-bar__title
  color: #fff
.shopheader
  z-index: 0
  background: $bgColor
</style>