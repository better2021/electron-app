<template>
  <div id="music">
    <div class="searchBox">
      <input type="text">
      <button>搜素</button>
    </div>
    <div class="musicList">
      <ul>
        <li v-for="item in musicList">
          <div class="pic">
            <img :src="item.pic" alt="">
          </div>
          <p>
            <span>{{item.title}}</span>
            <span>{{item.author}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicList: [],
    };
  },
  mounted() {
    this.getMusicList();
  },
  methods: {
    async getMusicList() {
      const res = await this.$axios({
        url: 'https://api.apiopen.top/searchMusic',
        method: 'GET',
        params: { name: '心如止水' },
      });
      console.log(res);
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      this.musicList = res.data.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.music{
  .searchBox{

  }
  .musicList{
    ul{
      display: flex;
      li{
        .pic{
          img{
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
