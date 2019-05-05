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

<style lang="scss">
/* CSS */
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
input,
button {
  outline: none;
  border: none;
}
body {
  font-family: "Microsoft YaHei";
  //滚动条整体部分
  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    background: #fcfae9;
  }
  //滚动条里面可以拖动的那个
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #2089a5;
    background-image: -webkit-linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.4) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.4) 0,
      hsla(0, 0%, 100%, 0.4) 75%,
      transparent 0,
      transparent
    );
  }
  // 外层轨道
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}
</style>
