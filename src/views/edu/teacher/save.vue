<template>
<div class="app-container">
    <div v-if="this.$route.params.id">教师编辑</div>
    <div v-else>教师添加</div>
 <el-form label-width="120px">
<el-form-item label="教师名称">
<el-input v-model="teacher.name"/>
</el-form-item>
<el-form-item label="教师排序">
<el-input-number v-model="teacher.sort" controls-position="right"
:min="0"/>
</el-form-item>
<el-form-item label="教师头衔">
<el-select v-model="teacher.level" clearable placeholder="请选择">
<!--
数据类型一定要和取出的json中的一致，否则没法回填
因此，这里value使用动态绑定的值，保证其数据类型是number
-->
<el-option :value="1" label="普通教师"/>
<el-option :value="2" label="高级教师"/>
</el-select>
</el-form-item>
<el-form-item label="教师资历">
<el-input v-model="teacher.career"/>
</el-form-item>
<el-form-item label="教师简介">
<el-input v-model="teacher.intro" :rows="10" type="textarea"/>
</el-form-item>
<!-- 教师头像：TODO -->
<el-form-item label="教师头像">
<!-- 头衔缩略图 -->
<pan-thumb :image="teacher.avatar"/>
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
import teacher from "@/api/edu/teacher"
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
        teacher:{
            name: '',
            sort: 0,
            level: 1,
            career: '',
            intro: '',
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
    this.teacher.avatar = data.url
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
    this.teacher = {}
    }
   },
   getInfo(id){
    teacher.getTeacherInfo(id)
    .then(response => {
        this.teacher = response.data.teacher
    })
   },
   saveOrUpdate(){
    //判断路径是否有id值
    if (!this.teacher.id) {
        this.saveTeacher()
    }else{
        this.updateTeacher()
    }
   },
   updateTeacher() {
    teacher.updateTeacherInfo(this.teacher)
    .then(response => {
          return this.$message({
            type: 'success',
            message: '修改成功!'
        })
    }).then(response => {
        //路由跳转
        this.$router.push({path:'/edu/teacher/list'})
    }).catch(response => {
        this.$message({
            type: 'error',
            message: '修改失败'
        }) 
    })
   },
   saveTeacher(){
    teacher.addTeacher(this.teacher)
    .then(response => {
          return this.$message({
            type: 'success',
            message: '保存成功!'
        })
    }).then(response => {
        //路由跳转
        this.$router.push({path:'/edu/teacher/list'})
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