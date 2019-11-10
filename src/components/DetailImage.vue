<template>
  <div>
    <van-swipe class="swipe" @change="onChange">
      <van-swipe-item
        class="van-hairline--top-bottom"
        @click="clickImg"
        v-for="item in imageList"
        :key="item"
      >
        <img class="detail-img" :src="item">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { ImagePreview, Swipe, SwipeItem} from "vant";

export default {
  name: "DetailImage",
  data() {
    return {
      previewIndex: 0
    };
  },
  props: {
    imageList: Array
  },
  methods: {
    clickImg() {
      ImagePreview({
        images: this.imageList,
        startPosition: this.previewIndex
      });
    },
    onChange(index) {
      this.previewIndex = index;
    },
  },

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  }
};
</script>
<style lang='stylus' scoped>
.swipe
  width: auto
  height: 100vw
  .detail-img
    width: 100%
</style>