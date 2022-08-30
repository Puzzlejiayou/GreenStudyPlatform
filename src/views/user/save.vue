<template>
<div class="app-container">
    <div v-if="this.$route.params.id">用户编辑</div>
    <div v-else>用户添加</div>
 <el-form label-width="120px">
<el-form-item label="用户昵称">
<el-input v-model="user.nickname"/>
</el-form-item>
<el-form-item label="手机号">
<el-input v-model="user.mobile"/>
</el-form-item>
<el-form-item v-if="this.$route.params.id" label="密码">
<el-input v-model="user.password" value=""/>
</el-form-item>
<el-form-item v-else label="密码">
<el-input v-model="user.password"/>
</el-form-item>
<!-- 教师头像：TODO -->
<el-form-item label="用户头像">
<!-- 头衔缩略图 -->
<pan-thumb :image="user.avatar"/>
<!-- 文件上传按钮 -->
<el-button type="primary" icon="el-icon-upload"
@click="imagecropperShow=true">更换头像
</el-button>
<!--
v-show：是否显示上传组件
:key：类似于id，如果一个页面多个图片上传控件，可以做区分
:url：后台上传的url地址
@close：关闭上传组件
@crop-upload-success：上传成功后的回调 -->
<image-cropper
v-show="imagecropperShow"
:width="300"
:height="300"
:key="imagecropperKey"
:url="BASE_API+'/eduoss/fileoss'"
field="file"
@close="close"
@crop-upload-success="cropSuccess"/>
</el-form-item>

<el-form-item>
<el-button :disabled="saveBtnDisabled" type="primary"
@click="saveOrUpdate">保存</el-button>
</el-form-item>
</el-form>
</div>
</template>
<script>
import user from "@/api/user"
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
        user:{
            nickname: '',
            mobile: '',
            password: '',
            avatar: ''
        },
        saveBtnDisabled:false,
        imagecropperShow:false,
        imagecropperKey:0,
        BASE_API:process.env.BASE_API
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
   cropSuccess(data){ //上传成功的方法
    this.imagecropperShow = false
    this.user.avatar = data.url
    //上传组件初始化
    this.imagecropperKey = this.imagecropperKey + 1
   },
   close(){ //关闭上传弹框的方法
    this.imagecropperShow = false
    //上传组件初始化
    this.imagecropperKey = this.imagecropperKey + 1
   },
   init(){
    //判断路径是否有id值
    console.log('created')
    if (this.$route.params && this.$route.params.id) {
    const id = this.$route.params.id
    this.getInfo(id)
    }else{
    this.user = {}
    }
   },
   getInfo(id){
    user.getUserInfo(id)
    .then(response => {
        this.user = response.data.user
    })
   },
   saveOrUpdate(){
    //判断路径是否有id值
    if (!this.user.id) {
        this.saveUser()
    }else{
        this.updateUser()
    }
   },
   updateUser() {
    user.updateUserInfo(this.user)
    .then(response => {
          return this.$message({
            type: 'success',
            message: '修改成功!'
        })
    }).then(response => {
        //路由跳转
        this.$router.push({path:'/user/list'})
    }).catch(response => {
        this.$message({
            type: 'error',
            message: '修改失败'
        }) 
    })
   },
   saveUser(){
    user.addUser(this.user)
    .then(response => {
          return this.$message({
            type: 'success',
            message: '保存成功!'
        })
    }).then(response => {
        //路由跳转
        this.$router.push({path:'/user/list'})
    }).catch(response => {
        this.$message({
            type: 'error',
            message: '保存失败'
        }) 
    })

   }

  }
}
</script>