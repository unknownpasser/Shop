<template>
  <div>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="gid"
      :close-on-click-overlay="closeOnClickOverlay"
      :initial-sku="initialSku"
      :hide-stock="hide_stock"
      @stepper-change="saveNum"
      ref="sku"
    >
      <van-button
        slot="sku-actions"
        type="primary"
        bottom-action
        @click="addCart"
      >确认</van-button>
    </van-sku>
    <van-goods-action>
      <van-goods-action-mini-btn
        icon="cart-o"
        text="购物车"
        :info="infoNum"
        ref="ok"
        @click="goShopping"
      />
      <van-goods-action-big-btn
        @click="showSku"
        text="加入购物车"
      />
      <van-goods-action-big-btn
        @click="onBuy"
        primary
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>
<script>
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Sku,
  Button,
  Dialog,
  Toast
} from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  name: "DetailAction",
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Sku.name]: Sku,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  props: {
    imgurl: String,
    gid: String,
    price: Number,
    skuname: String
  },
  computed: {
    ...mapState(["Num", "token", "cartsList"]),
    sku() {
      return {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "类型", // skuKeyName：规格类目名称
            v: [
              {
                id: this.gid, // skuValueId：规格值 id
                name: this.skuname, // skuValueName：规格值名称
                imgUrl: this.imgurl // 规格类目图片，只有第一个规格类目可以定义图片
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: this.gid, // skuId，下单时后端需要
            price: this.price * 100, // 价格（单位分）
            s1: this.gid, // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 666
          }
        ],
        price: this.price + ".00", // 默认价格（单位元）
        stock_num: 666
      };
    },
    goods() {
      return {
        // 商品标题
        title: this.skuname,
        // 默认商品 sku 缩略图
        picture: this.imgurl
      };
    },
    initialSku() {
      return {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: this.gid,
        // 初始选中数量
        selectedNum: this.Num
      };
    }
  },
  data() {
    return {
      showBase: false,
      closeOnClickOverlay: true,
      hide_stock: true,
      infoNum: 0
    };
  },
  mounted() {
    this.infoNum = this.cartsList.length;
  },
  methods: {
    showSku() {
      this.showBase = !this.showBase;
    },
    onBuy() {
      if (this.token) {
        this.$toast.success(
          "购买成功,物品Id:" + this.$refs.sku.getSkuData().goodsId
        );
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "请登录"
          })
          .then(() => {
            this.$router.replace("/login");
          })
          .catch(() => {});
      }
    },
    addCart() {
      let newSkuData = {};
      newSkuData.goodsId = this.$refs.sku.getSkuData().goodsId;
      newSkuData.num = this.$refs.sku.getSkuData().selectedNum;
      newSkuData.price = this.$refs.sku.getSkuData().selectedSkuComb.price;
      newSkuData.skuname = this.skuname;
      newSkuData.imgurl = this.imgurl;
      if (this.token) {
        this.http
          .post("/carts/add", {
            skuData: newSkuData
          })
          .then(Response => {
            let res = Response.data;
            if (res.code != "0") {
              this.$dialog
                .confirm({
                  title: "提示",
                  message: "请登录"
                })
                .then(() => {
                  this.$router.replace("/login");
                })
                .catch(() => {});
            } else {
              this.showBase = false;
              this.$toast.success("已加入购物车");
              if (res.msg) {
                this.infoNum = this.infoNum + 1;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "请登录"
          })
          .then(() => {
            this.$router.replace("/login");
          })
          .catch(() => {});
      }
    },
    ...mapMutations(["setNum"]),
    saveNum(num) {
      this.setNum(num);
    },
    goShopping() {
      this.$router.push("/cart");
    }
  }
};
</script>
<style lang='stylus' scoped></style>