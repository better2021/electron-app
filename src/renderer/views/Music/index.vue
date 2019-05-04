<template>
  <div id="music">
    <div class="searchBox">
      <input type="text">
      <button>搜素</button>
      <p class="hotBox">
        <i>热门歌曲：</i>
        <span v-for="item in list" :key="item" @click="handleSelect(item)">{{item}}</span>
      </p> 
    </div>
    <div class="musicList">
      <ul>
        <li v-for="(item,index) in musicList">
          <div class="pic" :class="{active:isActive===index}" @click="playMusic(item,index)">
            <img :src="item.pic" alt="">
            <div class="loading">
              <template v-if="isActive===index">
                <vue-loading type="bars" color="#e27170" :size="option"></vue-loading>
              </template>
              <template v-else>
                <img src="@/assets/play.png" style="width:50px;height:50px;opacity:0.65" alt="">
              </template>
            </div>
          </div>
          <p>
            <span>{{item.title}}</span>
            <span>{{item.author}}</span>
          </p>   
        </li>
      </ul>
      <div class="audioBox">
        <audio :src="musicUrl" autoplay controls></audio>
      </div>
    </div>
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
      musicList: [],
      musicUrl: '',
      isActive: -1,
      list: ['心如止水', '黎明前的黑暗', '东西', '三妻四妾', '护花使者', '年少有为'],
      option: { width: '50px', height: '50px' },
    };
  },
  mounted() {
    this.getMusicList();
  },
  methods: {
    async getMusicList(name = '心如止水') {
      const res = await this.$axios({
        url: 'https://api.apiopen.top/searchMusic',
        method: 'GET',
        params: { name },
      });
      // console.log(res);
      if (res.status !== 200) {
        try {
          console.log(res.data.message);
        } catch (err) {
          console.log(err);
        }
        return;
      }
      this.musicList = res.data.result;
    },
    // 获取单歌曲的url地址
    async getUrl(id) {
      const res = await this.$axios({
        url: 'https://api.imjad.cn/cloudmusic',
        method: 'GET',
        params: {
          type: 'song',
          br: 128000,
          id,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        try {
          console.log(res.data.message);
        } catch (err) {
          console.log(err);
        }
        return;
      }
      this.musicUrl = res.data.data[0].url;
    },
    // 播放歌曲
    playMusic(item, index) {
      // console.log(item.songid);
      const id = item.songid;
      this.getUrl(id);
      this.isActive = index;
      console.log(this.isActive);
    },
    // 选择歌曲
    handleSelect(item) {
      console.log(item);
      this.getMusicList(item);
    },
  },
};
</script>

<style lang="scss" scoped>
#music{
  background: #fcfae9;
  .searchBox{
    padding:0 20px;
    text-align: center;
    .hotBox{
      margin: 10px auto;
      span{
        font-size:12px;
        display: inline-block;
        padding: 2px 5px;
        margin: 0 5px;
        border-radius:3px;
        cursor: pointer;  
        color: #ffffff;
        background: #2089a5;
      }
    }
  }
  .musicList{
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li{
        width: 24%;
        box-sizing: border-box;
        .pic{
          position: relative;
          margin: 10px;
          border-radius:50%; 
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
          .loading{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .active{
          img{
            animation: goMove 8s linear infinite;
            filter: blur(6px);
          }
        }
        p{
          span{
            font-size: 12px;
          }
        }
      }
    }
    .audioBox{
      margin:10px 0;
      text-align: center;
    }
  }
}

@keyframes goMove
{
  0%   {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>