<template>
  <div>
    <el-form :model="searchObject" :inline="true" class="demo-form-inline">
      <el-form-item label="订单编号" :rules="[{ type: 'number', message: '年龄必须为数字值'}]">
        <el-input v-model="searchObject.orderNo">订单编号</el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="searchObject.courseTitle">课程名称</el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="searchObject.nickname">用户名</el-input>
      </el-form-item>
      <el-form-item label="手机号码" :rules="[{ type: 'number', message: '年龄必须为数字值'}]">
        <el-input v-model="searchObject.mobile">用户手机</el-input>
      </el-form-item>
      <el-form-item label="订单时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择起始日期"
            v-model="searchObject.beginDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            v-model="searchObject.endDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>

    <el-table :data="orderList" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="订单编号" width="180">
        <template slot-scope="scope">{{scope.row.orderNo}}</template>
      </el-table-column>
      <el-table-column label="订单金额(人民币/元)" width="180">
        <template slot-scope="scope">{{Number(scope.row.totalFee)}}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="180">
        <template slot-scope="scope">
          <p v-if="scope.row.status === 1">
            <font color="green">订单已完成支付</font>
          </p>
          <p v-else>
            <font color="red">订单未完成支付</font>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="下单用户昵称" width="180">
        <template slot-scope="scope">{{scope.row.nickname}}</template>
      </el-table-column>
      <el-table-column label="下单用户手机" width="180">
        <template slot-scope="scope">{{scope.row.mobile}}</template>
      </el-table-column>
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">{{scope.row.courseTitle}}</template>
      </el-table-column>
      <el-table-column label="下单日期" width="180">
        <template slot-scope="scope">{{ scope.row.gmtCreate }}</template>
      </el-table-column>
      <el-table-column label="下单日期" width="180">
        <template slot-scope="scope">
          <p v-if="scope.row.status === 1">{{ scope.row.gmtModified }}</p>
          <p v-else>--</p>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import orderApi from "@/api/order";
export default {
  data() {
    return {
      listLoading: false,
      page: 1,
      limit: 10,
      total: 0,
      searchObject: {},
      orderList: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      this.page = page;
      this.listLoading = true;

      orderApi
        .getOrderList(this.page, this.limit, this.searchObject)
        .then((response) => {
          this.listLoading = false;
          this.total = response.data.total;
          this.orderList = response.data.rows;
        });
    },
    change(oldv, newv) {
      console.log(oldv);
      console.log(newv);
    },
  },
  watch: {
    searchObject: {
      handler(n, o) {
        this.fetchData(1);
      },
      deep: true,
      //immediate: true
    },
  },
};
</script>