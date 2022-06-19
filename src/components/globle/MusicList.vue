<template>
  <!-- 此为音乐的列表 -->
  <div class="list">
    <van-loading type="spinner" color="#1989fa" :vertical='true' v-if='$store.state.loading' />
    <lazy-component>
      <div class="listItem" v-for="(item,index) in musicList" :key="item.id" v-lazy="img">
        <div class="left" @click="playMusic(index)">
          <span class="index"> {{ index + 1 }} </span>
          <div class="value">
            <div class="van-ellipsis"> {{ item.name }} </div>
            <div class="author van-ellipsis">
              <p v-for="item1 in item.ar" :key="item1">
                {{ item1.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="right">
          <van-icon class="mv" name="video-o" size=".5rem" v-if="item.mv !== 0"/>
          <van-icon name="wap-nav" size=".5rem"/>
        </div>
      </div>
    </lazy-component>
  </div>
</template>

<script>
export default {
  props: ['musicList','playMusic','loadShow'],
  setup() {
    const img = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F999f97003a59c1837a6f0286d0cb2d210aa252fb4689-2RIv1X_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658200347&t=24dfb35338b535ae8782b3a034c2bf62'
    return {img}
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-bottom: 1.2rem;
}
.listItem {
    height: .7rem;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem;
    .left {
      display: flex;
      justify-content: space-between;
      .index {
        width: .3rem;
        text-align: center;
        line-height: .7rem;
      }
      .value {
        width: 200px;
        margin-left: .4rem;
        display: flex;
        flex-direction: column;
        .author {
          display: flex;
          justify-content: flex-start;
          p {
            margin: 0 .1rem 0 0;
            padding: 0;
            font-size: .2rem;
          }
        }
      }
    }
    .right{
      .mv {
        margin-right: .3rem;
      }
    }
  }
</style>