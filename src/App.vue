<template>
  <div id="app-container">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <keep-alive :include="['injection','account']">
      <router-view> </router-view>
    </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@media screen and (min-width: 600px) {
}
</style>