<template>
  <div class="detail-sku">
    <!-- 商品规格选择 -->
    <van-cell-group class="cell-group">
      <van-cell
        :title="skuname"
        label="点击选择更多"
        icon="passed"
        @click="onSku"
      >
        <van-icon
          slot="right-icon"
          name="ellipsis"
          class="right-icon"
        />
      </van-cell>
    </van-cell-group>

    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="gid"
      :close-on-click-overlay="closeOnClickOverlay"
      :initial-sku="initialSku"
      :hide-stock="hide_stock"
      @stepper-change="saveNum"
      @add-cart="addCart"
      @buy-clicked="onBuy"
    ></van-sku>

    <van-cell
      :title="address"
      label="点击进行更改"
      icon="location-o"
      @click="onAddress"
      title-class="address"
    ></van-cell>
  </div>
</template>
<script>
import { Cell, CellGroup, Icon, Sku, Dialog, Stepper, Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  name: "DetailList",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Sku.name]: Sku,
    [Stepper.name]: Stepper
  },
  data() {
    return {
      showBase: false,
      closeOnClickOverlay: true,
      hide_stock: true
    };
  },
  props: {
    imgurl: String,
    gid: String,
    price: Number,
    skuname: String
  },
  computed: {
    ...mapState(["address", "token", "Num"]),
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
        selectedNum: 1
      };
    }
  },
  methods: {
    ...mapMutations(["setNum"]),
    onBuy(skuData) {
      this.$toast.success("购买成功,物品Id:" + skuData.goodsId);
    },
    addCart(skuData) {
      let newSkuData = {};
      newSkuData.goodsId = skuData.goodsId;
      newSkuData.num = skuData.selectedNum;
      newSkuData.price = skuData.selectedSkuComb.price;
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
    onSku() {
      this.showBase = !this.showBase;
    },
    saveNum(num) {
      this.setNum(num);
    },
    onAddress() {
      if (this.token) {
        this.$router.push("/addressList");
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "登录后可以添加地址"
          })
          .then(() => {
            this.$router.replace("/login");
          })
          .catch(() => {});
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
.cell-group
  padding-top: 0.8rem
  padding-bottom: 0.8rem
  background-color: #f5f5f5
.address
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  .right-icon
    font-size: 25px
</style>