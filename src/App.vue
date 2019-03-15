<template>
  <div id="app">
    <el-container style=" border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
           <el-menu   router>
                <el-menu-item index="first1" >日消费明细</el-menu-item>
                <el-menu-item index="/">日消费清单</el-menu-item>
                <el-menu-item index="monthly">月消费清单</el-menu-item>
                <el-menu-item index="yearly">年消费清单</el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
          <el-main :style="height">
            <!--<el-table :data="tableData" stripe >
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>-->
                      	<router-view></router-view>
          </el-main>

        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20)
          .fill(item),
        height: {height:''}
      };
    },
    created() {
      this.hh();
    },
    methods: {
      hh() {
        this.height.height = window.innerHeight - 122 + 'px';
      }
    }
  };
</script>
<style>
  .el-input{
    width: 300px;
  }
  .el-col-11{
    width: 129px;
  }
  .el-col-2{
    text-align: center;
  }
  .el-input--small{
    width: 147px;
  }
  *{
    margin:0;
    padding:0;
  }
  html,body{
    width:100%;
    height:100%;
  }
  ul{list-style:none}
  a{text-decoration: none;}
  img{vertical-align:top;border:none}

  .clearf:after,
  .clearf:before{
    content:"";
    display:block;
    clear:both;
  }
</style>

<style scoped>
  .el-header,.el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
