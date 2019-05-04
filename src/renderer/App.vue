<template>
  <div id="app">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import Menu from './components/menu';
  export default {
    name: 'electron-app',
    components: {
      Menu,
    },
  };
</script>

<style>
  /* CSS */
  *{
    margin: 0;
    padding: 0;
  }
  ul,li{
    list-style: none;
  }
  body{
    font-family: 'Microsoft YaHei';
  }
</style>
