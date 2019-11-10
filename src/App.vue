<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <loading v-if="loading" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loading from "./views/Loading";
export default {
  components: {
    Loading
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>
<style lang="stylus">
body
  background-color: #f5f5f5
</style>