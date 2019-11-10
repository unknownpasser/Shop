<template>
  <div>
    <div class="detail-header">
      <van-icon
        name="arrow-left"
        class="back"
        size="18px"
        color="#ccc"
        @click="back"
      />
    </div>
    <detail-image :imageList="imageList"/>
    <detail-title :gname="gname" :price="price"/>
    <detail-list
      :imgurl="imgurl"
      :gid="gid"
      :price="price"
      :skuname="skuname"
    />
    <detail-action
      :imgurl="imgurl"
      :gid="gid"
      :price="price"
      :skuname="skuname"
    />
    <div class="footer"></div>
  </div>
</template>
<script>
import { Icon } from "vant";
import DetailImage from "../components/DetailImage";
import DetailTitle from "../components/DetailTitle";
import DetailList from "../components/DetailList";
import DetailAction from "../components/DetailAction";
export default {
  name: "Detail",
  components: {
    [Icon.name]: Icon,
    DetailImage,
    DetailTitle,
    DetailList,
    DetailAction
  },
  data() {
    return {
      gid: "",
      imageList: [],
      gname: "",
      price: null,
      imgurl: "",
      skuname: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.gid = this.$route.query.gid;
    this.http
      .get("/detail", {
        params: {
          gid: this.gid
        }
      })
      .then(Response => {
        let res = Response.data;
        this.imageList = res.imagePreview;
        this.gname = res.name;
        this.price = res.price;
        this.imgurl = res.imgurl;
        this.skuname = res.skuname;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang='stylus' scoped>
.detail-header
  width: auto
  height: 44px
  display: flex
  flex: 1
  align-items: center
  padding-left: 6px
  padding-right: 6px
  position: fixed
  z-index: 10
  .back
    width: 30px
    height: 30px
    line-height: 30px
    text-align: center
    border-radius: 50%
    background-color: rgba(0, 0, 0, 0.5)
.footer
  height: 80px
  background-color: #f5f5f5
</style>