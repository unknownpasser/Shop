<template>
  <div>
    <div class="home-header">
      <van-icon
        name="wap-nav"
        class="wap"
        size="1.5rem"
        color="#fff"
      />
      <div class="header-search iconfont">&#xe69f;点击进行搜索</div>
      <van-icon
        name="user-o"
        class="user"
        size="1.5rem"
        color="#fff"
        @click="onUser"
      />
    </div>
    <van-swipe
      :autoplay="3000"
      class="swipe van-hairline--bottom .ignore"
    >
      <van-swipe-item
        v-for="item in swipes"
        :key="item._id"
        class="swipe-item"
      >
        <img v-lazy="item.imgurl" class="swipe-item-img">
      </van-swipe-item>
    </van-swipe>
    <home-nav-bar/>
    <home-recommend/>
    <home-goods/>
  </div>
</template>
<script>
import { Icon, Swipe, SwipeItem } from "vant";
import HomeNavBar from "../components/HomeNavBar";
import HomeRecommend from "../components/HomeRecommend";
import HomeGoods from "../components/HomeGoods";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    HomeNavBar,
    HomeRecommend,
    HomeGoods
  },
  data() {
    return {
      swipes: [],
      list: []
    };
  },
  computed:{
    ...mapState(["token"])
  },
  mounted() {
    this.http
      .get("/swipes")
      .then(Response => {
        let res = Response.data;
        this.swipes = res;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    onUser() {
      if (this.token) {
        this.$router.push("/user");
      }else{
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../assets/varibles.styl'
img[lazy='loading']
  width: auto
  height: 43.75vw
.home-header
  width: auto
  height: 2.4rem
  background: $bgColor
  display: flex
  flex: 1
  justify-content: space-around
  align-items: center
  .wap
    width: 1.5rem
  .header-search
    width: 75%
    height: 1.6rem
    text-align: center
    background: #fff
    border-radius: 0.2rem
    line-height: 1.6rem
    color: #ccc
  .user
    width: 1.8rem
.swipe
  width: auto
  height: 43.75vw
  .swipe-item-img
    width: 100%
</style>