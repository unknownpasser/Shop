<template>
  <div>
    <shop-header :headerTitle="headerTitle" />
    <van-address-edit
      :area-list="areaList"
      show-delete
      :address-info="addressInfo"
      show-search-result
      :search-result="searchResult"
      @save="saveAddress"
      @delete="deleteAddress"
    />
  </div>
</template>
<script>
import ShopHeader from "./ShopHeader";
import { AddressEdit, Toast } from "vant";
import areaList from "vant/packages/area/demo/area.js";

export default {
  name: "AddressEdit",
  components: {
    ShopHeader,
    [AddressEdit.name]: AddressEdit,
    [Toast.name]: Toast
  },
  data() {
    return {
      areaList,
      headerTitle: "地址编辑",
      searchResult: [],
      addressInfo: {}
    };
  },
  activated() {
    let aid = this.$route.query.aid;
    if (aid) {
      this.http
        .get("/addressinfo", {
          params: {
            aid: aid
          }
        })
        .then(Response => {
          let res = Response.data;
          if (res.code == "0") {
            this.addressInfo = res.msg;
          } else {
            this.$router.replace("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.addressInfo = {};
    }
  },
  methods: {
    saveAddress(content) {
      this.http
        .post("/saveaddress", { content: content })
        .then(Response => {
          let res = Response.data;
          this.$toast.success("保存成功");
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteAddress(content) {
      this.http
        .post("/deleteaddress", { aid: content._id })
        .then(Response => {
          let res = Response.data;
          this.$toast.success("删除成功");
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang='stylus' scoped></style>