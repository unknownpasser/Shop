<template>
  <div>
    <shop-header :headerTitle="title" />
    <van-search
      @search="Search"
      background="#2bcc70"
      placeholder="请输入搜索关键词"
      v-model="value"
    ></van-search>
    <van-list
      class="goods-list"
      v-if="goods.length"
    >
      <div
        :key="item._id"
        @click="goDetail(item._id)"
        class="list-item"
        v-for="item in goods"
      >
        <img
          :src="item.imgurl"
          class="item-img"
        />
        <span class="item-title">{{item.name}}</span>
        <p>
          <span class="price">¥{{item.price}}</span>
        </p>
      </div>
    </van-list>
  </div>
</template>
<script>
import ShopHeader from "../components/ShopHeader";
import { Search, List } from "vant";
export default {
  name: "Search",
  components: {
    ShopHeader,
    [Search.name]: Search,
    [List.name]: List
  },
  data() {
    return {
      title: "搜索",
      value: "",
      goods: []
    };
  },
  methods: {
    Search() {
      this.http
        .get("/search", {
          params: {
            keyword: this.value
          }
        })
        .then(Response => {
          let res = Response.data;
          this.goods = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goDetail(gid) {
      this.$router.push({ path: "/detail", query: { gid } });
    }
  }
};
</script>
<style lang='stylus' scoped>
.goods-list {
  width: 100%;
  display: flex;
  flex: 3;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: #f5f5f5;

  .list-item {
    width: 49.5vw;
    height: 72vw;
    box-sizing: border-box;
    margin-bottom: 1vw;
    overflow: hidden;
    background-color: #fff;

    .item-img {
      display: block;
      width: 100%;
    }

    .item-title {
      display: -webkit-box;
      height: 31px;
      font-size: 13px;
      padding: 5px 5px 0 5px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-word;
      line-height: 16px;
    }

    .price {
      color: #f23030;
      padding: 0 5px;
    }
  }
}
</style>