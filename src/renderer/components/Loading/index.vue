<template>
  <div class="loadingBox">
    <vue-loading type="spiningDubbles" color="#c45c66" :size="option"></vue-loading>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
export default {
  components: {
    VueLoading,
  },
  data() {
    return {
      option: { width: '100px', height: '100px' },
    };
  },
};
</script>

<style lang="scss" scoped>
.loadingBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
