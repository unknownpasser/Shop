<template>
  <div class="detail">
    <div class="detail-title">{{gname}}</div>
    <div class="detail-price">
      <span class="rmb">¥</span>
      {{price}}
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailTitle",
  props: {
    gname: String,
    price: [Number, String]
  }
};
</script>
<style lang='stylus' scoped>
.detail
  background-color #fff
  .detail-title
    padding: 0.5rem
  .detail-price
    color: #f23030
    font-size: 18px
    padding: 0.5rem
    .rmb
      color: #f23030
      font-size: 12px
</style>