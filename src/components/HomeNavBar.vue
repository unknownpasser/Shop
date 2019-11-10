<template>
  <div class="navbar van-hairline--bottom">
    <div
      class="navbar-item"
      v-for="item in navbars"
      :key="item._id"
    >
      <img :src="item.imgurl" class="item-img">
      <span>{{item.wtitle}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeNavBar",
  data() {
    return {
      navbars: []
    };
  },
  mounted() {
    this.http
      .get("/navbars")
      .then(Response => {
        let res = Response.data;
        this.navbars = res;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang='stylus' scoped>
navbar
.navbar
  width: auto
  display: flex
  flex-flow: row wrap
  font-size: 0.8rem
  color: #333
  padding-bottom: 2%
  overflow: hidden
  background-color #fff
  .navbar-item
    padding-left: 2.5%
    padding-right: 2.5%
    padding-top: 2%
    width: 20%
    text-align: center
    .item-img
      width: 3rem
      height: 3rem
      display: block
      margin: 0 auto
      padding-bottom 0.5rem
</style>