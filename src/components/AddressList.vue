<template>
  <div class="addresslist">
    <shop-header :headerTitle="headerTitle"/>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      @select="onSelect"
      @add="add"
      @edit="edit"
    />
  </div>
</template>
<script>
import { AddressList } from "vant";
import ShopHeader from "./ShopHeader";
import { mapMutations } from "vuex";

export default {
  name: "AddressList",
  components: {
    [AddressList.name]: AddressList,
    ShopHeader
  },
  data() {
    return {
      headerTitle: "地址列表",
      chosenAddressId: "0",
      addressList: []
    };
  },
  activated() {
    this.http
      .get("/addresslist")
      .then(Response => {
        let res = Response.data;
        if (res.code == "0") {
          this.addressList = res.msg;
          this.addressList.forEach(item => {
            item.id = item._id;
            item.address =
              item.province + item.city + item.county + item.addressDetail;
          });
        } else {
          this.$router.replace("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onSelect(item, index) {
      this.setAddress(item.address);
      this.$router.go(-1);
    },
    add() {
      this.$router.push("/addressEdit");
    },
    edit(item) {
      let aid = item._id;
      this.$router.push({ path: "/addressEdit", query: { aid } });
    },
    ...mapMutations(["setAddress"])
  }
};
</script>
<style lang='stylus' scoped>
.addresslist >>> .van-address-list__add
  z-index: 0
</style>