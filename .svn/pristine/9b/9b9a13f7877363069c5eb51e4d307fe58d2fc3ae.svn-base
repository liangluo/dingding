<template>
    <div>

        <mt-search v-model="value"  @input.native.capture="onseacrch" ref="mtsearch">
            <mt-cell v-for="(item,index) in result" :key="index" :value="item.KJDWMC" :title="item.KJDWID"  @click.native.capture="clickitem(item)"></mt-cell>
        </mt-search>

    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import dingWISDK from "../../../lib/ding-web.js";
import { OPENAPIHOST, misHost } from "../../../lib/env.js";
export default {
  data() {
    return {
      value: "",
      result: []
    };
  },
  created() {},
  mounted() {
    this.getComlist("","");
    this.$refs.mtsearch = true
  },
  watch: {},
  beforeRouteLeave(to, from, next) {

    // 设置下一个路由的 meta
    to.meta.keepAlive = true; // 让 A 不缓存，即刷新
    next();
  },
  methods: {
    getComlist(KJDWID, KJDWMC) {
              Indicator.open({
  text: '加载中...',
  spinnerType: 'fading-circle'
});
      var _this = this;
      const data = {
        mimeType: "json",
        misUrl: misHost + "/ERPService/simuerp.asmx/GetKJDWList",
        KJDWID: KJDWID ? KJDWID : "",
        KJDWMC: KJDWMC ? KJDWMC : ""
      };
      const misCom = {
        url: OPENAPIHOST + "/http/15109",
        data: JSON.stringify(data),
        method: "post",
        headers: { "Content-Type": "application/json" }
      };
      dingWISDK
        .publicSub(misCom)
        .then(response => {
          if (response.data.code == 200) {
               Indicator.close();
            _this.result = response.data.data;
          }else{
               Indicator.close();
              _this.result = []
          }
        })
        .catch(err => {
          this.ddAlert(err);
        });
    },
    onseacrch(e) {
      this.getComlist("", e.target.value);
    },
    clickitem(item) {
      sessionStorage.setItem("cominf", JSON.stringify(item));
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.mint-search-list{
  display: block !important
}
</style>
