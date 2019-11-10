<template>
  <div>
    <van-checkbox-group v-model="result">
      <van-checkbox
        v-for="(item, index) in list"
        :key="index"
        :name="item"
      >复选框 {{ item }}</van-checkbox>
    </van-checkbox-group>
  </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from "vant";
export default {
  name: "test",
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      list: [0, 0, 0, 1],
      result: [0]
    };
  }
};
</script>
<style lang='stylus' scoped></style>