<template>
  <div>
    <div
      class="recommend"
      v-for="(items,index) in recommends"
      :key="index"
    >
      <div class="recommend-title">{{items.title}}</div>
      <div class="recommend-list">
        <div
          class="recommend-item"
          v-for="item in items.content"
          :key="item.id"
        >
          <div class="recommend-item-title">
            <div>{{item.ctitle}}</div>
            <span class="title-wz">{{item.ctitle_wz}}</span>
          </div>
          <div>
            <img
              :src="item.imgurl"
              class="recommend-item-img"
            >
            <img
              :src="item.imgurl_1"
              class="recommend-item-img"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  data() {
    return {
      recommends: []
    };
  },
  mounted() {
    this.http
      .get("/recommends")
      .then(Response => {
        let res = Response.data;
        this.recommends = res;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style lang='stylus' scoped>
.recommend-title
  width: 100%
  height: 2.4rem
  line-height: 2.4rem
  background-color: #f5f5f5
  text-align: center
.recommend-list
  width: auto
  display: flex
  flex-flow: row wrap
  overflow: hidden
  justify-content space-between
  background-color: #f5f5f5
  .recommend-item
    width: 49.7%
    box-sizing: border-box
    padding-left: 0.5rem
    padding-top: 0.2rem
    background-color: #ffffff
    margin-bottom: 0.4%
    .title-wz
      display: -webkit-box
      height: 12px
      font-size: 12px
      padding: 5px 0.5rem 0 0
      overflow: hidden
      -webkit-line-clamp: 1
      -webkit-box-orient: vertical
      word-break: break-word
      color: #999
    .recommend-item-img
      width: 18vw
      padding: 0.5rem 0.5rem 0 0.5rem
</style>