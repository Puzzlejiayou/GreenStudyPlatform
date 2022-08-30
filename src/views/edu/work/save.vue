<template>
<div class="app-container">
    <div v-if="this.$route.params.id">作业编辑</div>
    <div v-else>作业添加</div>
 <el-form label-width="120px">
<el-form-item label="课程名称" v-if="!this.$route.params.id">
    <el-select
            v-model="work.courseName"
            placeholder="请选择"
            @change="courseNameChanged">
            <el-option
                v-for="course in courseInfo"
                :key="course.id"
                :label="course.title"
                :value="course.title"/>
    </el-select>
</el-form-item>
<el-form-item label="课程id" hidden="true" v-if="!this.$route.params.id">
<el-input v-model="work.courseId"/>
</el-form-item>
<el-form-item label="类型" hidden="true" v-if="!this.$route.params.id">
<el-input v-model="work.type"/>
</el-form-item>
<el-form-item label="问题" v-if="!this.$route.params.id">
<el-input v-model="work.question"/>
</el-form-item>
<el-form-item label="得分" v-if="this.$route.params.id">
<el-input v-model="work.score"/>
</el-form-item>
<el-form-item>
<el-button :disabled="saveBtnDisabled" type="primary"
@click="saveOrUpdate">保存</el-button>
</el-form-item>
</el-form>
</div>
</template>
<script>
import work from "@/api/edu/work"

export default {
  data() {
    return {
        work:{
            courseName: '',
            courseId:'',
            question:'',
            type:'question'
        },
        courseInfo:{
                id:'',
                title: '',
                subjectId: '',//二级分类id
                subjectParentId:'',//一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: 'https://edu478.oss-cn-hangzhou.aliyuncs.com/05254.jpg',
                price: 0
            },
        saveBtnDisabled:false,
    }
  },
  created() {
    this.init()
    this.getCourseList()
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
    this.work = {}
    }
   },
   getInfo(id){
    work.getWorkInfo(id)
    .then(response => {
        this.work = response.data.work
    })
   },
   getCourseList(){
    work.getCourseInfo()
    .then(response => {
        this.courseInfo = response.data.list
    })
   },
   saveOrUpdate(){
    //判断路径是否有id值
    if (!this.work.id) {
        this.saveWork()
    }else{
        this.updateWork()
    }
   },
   updateWork() {
    work.updateWorkInfo(this.work)
    .then(response => {
          return this.$message({
            type: 'success',
            message: '修改成功!'
        })
    }).then(response => {
        //路由跳转
        this.$router.push({path:'/edu/work/list'})
    }).catch(response => {
        this.$message({
            type: 'error',
            message: '修改失败'
        }) 
    })
   },
   saveWork(){
    this.work.type = 'question'
    work.addWork(this.work)
    .then(response => {
          return this.$message({
            type: 'success',
            message: '保存成功!'
        })
    }).then(response => {
        //路由跳转
        this.$router.push({path:'/edu/work/list'})
    }).catch(response => {
        this.$message({
            type: 'error',
            message: '保存失败'
        }) 
    })
   },
    courseNameChanged(value) {
            //value就是一级分类id值
            //遍历所有的分类，包含一级和二级
            for(var i=0;i<this.courseInfo.length;i++) {
                //每个一级分类
                var course1 = this.courseInfo[i]
                //判断：所有一级分类id 和 点击一级分类id是否一样
                if(value === course1.title) {
                    //从一级分类获取里面所有的二级分类
                    this.work.courseId = course1.id
                    console.log(this.work.courseId)
                }
            }
        },
  }
}
</script>