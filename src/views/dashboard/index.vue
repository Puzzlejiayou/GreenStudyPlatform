<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎回来！{{ name }}</div>
    <div>
      现在时间：
     	<el-button>
           <span>{{newDate}}</span>
        </el-button>
        </div>
    <iframe allowtransparency="true" frameborder="0" width="565" height="98" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=1&v=0&d=3&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=565&h=98&align=right"></iframe>
      <div class="block">
    <span class="demonstration"></span>
    <el-image :src="src"></el-image>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
   data() {
      return {
        value: new Date(),
        newDate: new Date(),
        src: 'https://img.zcool.cn/community/016c6b5542879e0000019ae94110b0.jpg@2o.jpg'
      }
    },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // 挂载时间
mounted () {
    let that = this
    this.timer = setInterval(function () {
      that.newDate = new Date().toLocaleString()
    })
},
// 销毁时清除计时器
beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer)
    }
},
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
