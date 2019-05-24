<template>
  <div id="music">
    <div class="searchBox">
      <div class="search">
        <input v-model="txt" type="text" placeholder="请输入要搜索的歌曲">
        <button @click="search">搜索</button>
      </div>
      <p class="hotBox">
        <i>热门歌曲：</i>
        <span v-for="item in list" :key="item" @click="handleSelect(item)">{{item}}</span>
      </p>
    </div>
    <div class="musicList">
      <ul>
        <li v-for="(item,index) in musicList">
          <div class="pic" :class="{active:isActive===index}" @click="playMusic(item,index)">
            <img :src="item.pic" alt>
            <div class="loading">
              <template v-if="isActive===index">
                <vue-loading type="bars" color="#e27170" :size="option"></vue-loading>
              </template>
              <template v-else>
                <img src="@/assets/play.png" style="width:50px;height:50px;opacity:0.65" alt>
              </template>
            </div>
          </div>
          <p style="text-align:center">
            <span style="color:#e27170">{{item.title}}</span>
            <br>
            <span>{{item.author}}</span>
          </p>
        </li>
      </ul>
      <div class="audioBox">
        <audio :src="musicUrl" autoplay controls loop></audio>
      </div>
    </div>
    <Loading v-show="isShow"></Loading>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import Loading from '@/components/Loading';

export default {
  components: {
    VueLoading,
    Loading,
  },
  data() {
    return {
      isShow: false,
      musicList: [],
      musicUrl: '',
      isActive: -1,
      txt: '',
      list: [
        '心如止水',
        '黎明前的黑暗',
        '东西',
        '三妻四妾',
        '护花使者',
        '年少有为',
      ],
      option: { width: '50px', height: '50px' },
    };
  },
  mounted() {
    // console.log(this.$Message);
    this.getMusicList();
    const alertOfflineStatus = () => {
      this.$Message('亲，已经断网了哦', 3000);
    };
    const alertOnlineStatus = () => {
      this.$Message('网络已连接', 3000);
    };
    window.addEventListener('offline', alertOfflineStatus);
    window.addEventListener('online', alertOnlineStatus);
  },
  methods: {
    async getMusicList(name = '心如止水') {
      this.isShow = true;
      const res = await this.$axios({
        url: 'https://api.apiopen.top/searchMusic',
        method: 'GET',
        params: { name },
      });
      this.isShow = false;
      if (res.status !== 200) {
        try {
          console.log(res.data.message);
        } catch (err) {
          console.log(err);
        }
        return;
      }
      this.musicList = res.data.result;
      this.isActive = -1;
    },
    // 获取单歌曲的url地址
    async getUrl(id) {
      this.$insProgress.start();
      const res = await this.$axios({
        url: 'https://api.imjad.cn/cloudmusic',
        method: 'GET',
        params: {
          type: 'song',
          br: 128000,
          id,
        },
      });
      this.$insProgress.finish();
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
    // 搜素歌曲
    search() {
      // console.log(this.txt);
      const name = this.txt;
      if (!name.trim()) {
        alert('请输入需要搜素的歌曲');
        return;
      }
      this.getMusicList(name);
      this.txt = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss"; // scss的引入不用（）和less的有点不同
</style>