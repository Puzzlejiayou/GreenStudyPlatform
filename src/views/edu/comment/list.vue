<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="commentQuery.nickname" placeholder="用户昵称" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="commentQuery.courseName" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="commentQuery.content" placeholder="评论内容" />
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="commentQuery.begin"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="commentQuery.end"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="courseName" label="课程名" width="80" />

      <el-table-column prop="nickname" label="用户昵称" />

      <el-table-column prop="content" label="评论内容" />

      <el-table-column prop="reply" label="回复" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/comment/reply/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">回复</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
import comment from "@/api/comment"

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      commentQuery: {},
      total: 0,
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    //调用
    this.getList();
  },
  methods: {
    getList(page=1) {
      this.page = page
      comment
        .getCommentListPage(this.page, this.limit, this.commentQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error);
        })
    },
    resetData(){
      this.commentQuery = {}

      this.getList()
    },
    removeDataById(id){
      this.$confirm('此操作将永久删除该评论记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$message({
              type: 'success',
              message: '删除成功!'
          })
            comment.deleteCommentById(id)
            .then(response => {
            this.getList()
            })
        })
    }
  },
}
</script>