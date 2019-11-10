<template>
  <div>
    <div class="goods-title">更多商品</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      v-if="goods.length"
      class="goods-list"
    >
      <div
        class="list-item"
        v-for="item in glist"
        :key="item._id"
        @click="goDetail(item._id)"
      >
        <img :src="item.imgurl" class="item-img">
        <span class="item-title">{{item.name}}</span>
        <p>
          <span class="price">¥{{item.price}}</span>
        </p>
      </div>
    </van-list>
  </div>
</template>
<script>
import { List } from "vant";
export default {
  name: "HomeGoods",
  data() {
    return {
      goods: [],
      glist: [],
      gindex: 0,
      loading: false,
      finished: false,
      error: false
    };
  },
  components: {
    [List.name]: List
  },
  mounted() {
    this.http
      .get("/goods")
      .then(Response => {
        let res = Response.data;
        this.goods = res;
      })
      .catch(error => {
        this.error = true;
        console.log(error);
      });
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.glist.push(this.goods[this.gindex]);
          this.gindex = this.gindex + 1;
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.glist.length >= this.goods.length) {
          this.finished = true;
        }
      }, 500);
    },
    goDetail(gid) {
      this.$router.push({ path: "/detail", query: { gid } });
    }
  }
};
</script>
<style lang='stylus' scoped>
.goods-title
  width: 100%
  height: 2.4rem
  line-height: 2.4rem
  background-color: #f5f5f5
  text-align: center
.goods-list
  width: 100%
  display: flex
  flex: 3
  flex-flow: row wrap
  justify-content: space-around
  background-color: #f5f5f5
  .list-item
    width: 49.5vw
    height 72vw
    box-sizing: border-box
    margin-bottom: 1vw
    overflow: hidden
    background-color: #fff
    .item-img
      display: block
      width: 100%
    .item-title
      display: -webkit-box
      height: 31px
      font-size: 13px
      padding: 5px 5px 0 5px
      overflow: hidden
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      word-break: break-word
      line-height: 16px
    .price
      color: #f23030
      padding: 0 5px
</style>