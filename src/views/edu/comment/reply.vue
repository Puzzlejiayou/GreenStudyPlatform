<template>
<div class="app-container">
    <div>回复评论</div>
 <el-form label-width="120px">
<el-form-item label="课程名">
<el-input v-model="comment.courseName" disabled="true"/>
</el-form-item>
<el-form-item label="用户昵称">
<el-input v-model="comment.nickname" disabled="true"/>
</el-form-item>
<el-form-item label="评论内容">
<el-input v-model="comment.content" disabled="true"/>
</el-form-item>
<el-form-item label="回复">
<el-input v-model="comment.reply" :rows="10" type="textarea"/>
</el-form-item>
<el-form-item>
<el-button  type="primary" @click="reply">保存</el-button>
</el-form-item>
</el-form>
</div>
</template>
<script>
import comment from "@/api/comment"

export default {
  data() {
    return {
        comment:{
            courseName: '',
            nickname: '',
            content: '',
            reply: ''
        }
    }
  },
  created() {
    this.init()
  },
  watch: {//监听
    $route(to, from){//路由发生变化，方法就会执行
    this.init()
    }
  },
  methods: {
   init(){
    //判断路径是否有id值
    console.log('created')
    if (this.$route.params && this.$route.params.id) {
    const id = this.$route.params.id
    this.getInfo(id)
    }else{
    this.comment = {}
    }
   },
   getInfo(id){
    comment.getCommentInfo(id)
    .then(response => {
        this.comment = response.data.comment
    })
   },
   reply() {
    comment.updateComment(this.comment)
    .then(response => {
          return this.$message({
            type: 'success',
            message: '修改成功!'
        })
    }).then(response => {
        //路由跳转
        this.$router.push({path:'/edu/comment/list'})
    }).catch(response => {
        this.$message({
            type: 'error',
            message: '修改失败'
        }) 
    })
   },
  }
}
</script>