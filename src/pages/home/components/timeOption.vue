<template>
    <myDatepicker :date="startTime" :option="multiOption" :limit="limit"></myDatepicker>
</template>

<script>
import myDatepicker from 'vue-datepicker/vue-datepicker.vue';

export default {
  name: "PillDetail",
  components: {
    myDatepicker
  },
  data() {
    return {
      startTime: {
        // 相当于变量
        time: ""
      },
      multiOption: {
        type: "day",
        week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        month: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        format: "YYYY-MM-DD",
        inputStyle: {
          display: "inline-block",
          padding: "6px",
          "line-height": "20px",
          width: "160px",
          "font-size": "16px",
          border: "1px solid #ccc",
          // "box-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          "border-radius": "2px",
          color: "#5F5F5F",
          margin: "0"
        },
        color: {
          // 字体颜色
          header: "#35acff", // 头部
          headerText: "#fff" // 头部文案
        },
        buttons: {
          // button 文案

          clearTime:'清除',
          ok: "确定",
          cancel: "取消"
        },
        placeholder: "请选时间",
        dismissible: true
      },
      limit: [
        {
          type: "weekday",
          available: [1, 2, 3, 4, 5, 6, 0]
        },
        {
          type: "fromto",
          from: "2010-02-01",
          to: "2050-02-20"
        }
      ]
    };
  },
  mounted () {
   
  },
  watch:{

    
  },
  methods: {}
};
</script>

<style>

</style>
