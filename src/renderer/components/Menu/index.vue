<template>
  <div class="menu">
    <ul>
      <li v-for="(item,index) in list" :class="{active:curRoute===item.path}" :key="item.name" @click="handleMenu(item,index)">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{ name: '首页', path: '/' }, { name: '音乐', path: '/music' }],
    };
  },
  computed: {
    curRoute() {
      return this.$route.path;
    },
  },
  mounted() {
    console.log(this.$route.path, '---');
  },
  methods: {
    handleMenu(item, index) {
      this.isActive = index;
      this.$router.push({ path: item.path });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu{
  background: #4aa9a4;
  width: 100%;
  height: 40px;
  ul{
    display: flex;
    li{
      height: 40px;
      line-height: 40px;
      width: 80px;
      text-align: center;
      transition: all 0.5s ease-out;
      &:hover{
        background: #3e8480;
        cursor: pointer;
      }
      span{
        color: #ffffff;
        font-size:14px; 
      }
    }
    .active{
      background: #3e8480;
    }
  }
}
</style>



