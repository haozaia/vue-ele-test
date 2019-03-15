<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input style="width: 200px;" v-model="paipinnum"  class="filter-item" placeholder="拍品编号">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleUserList">搜索</el-button>
      <el-button class="filter-item" type="primary" @click="dialogFormVisible = true" icon="el-icon-circle-plus-outline">添加</el-button>
    </div>

    <el-container>
      <el-main>
        <el-table  style="font-size: 12px;line-height: 24px;padding: 0" :data="tableData" stripe @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column label="拍品编号" width="70">
            <template slot-scope="scope">{{ scope.row.loLotsNumber }}</template>
          </el-table-column>

          <el-table-column label="拍品类型" width="70">
            <template slot-scope="scope">{{ scope.row.loLotsType }}</template>
          </el-table-column>


          <el-table-column label=" 截拍时间" width="160">
            <template slot-scope="scope">{{ scope.row.loEndtime }}</template>
          </el-table-column>

          <el-table-column label="拍品描述" width="200">
            <template slot-scope="scope">{{ scope.row.loLotsdescribe }}</template>
          </el-table-column>

          <el-table-column label="起拍价" width="80">
            <template slot-scope="scope">{{ scope.row.loClap }}</template>
          </el-table-column>

          <el-table-column  label="加价" width="50">
            <template slot-scope="scope">{{ scope.row.loAddprice }}</template>
          </el-table-column>
          <el-table-column  label="件数" width="50">
            <template slot-scope="scope">{{ scope.row.loNumber }}</template>
          </el-table-column>
          <el-table-column  label="是否包邮" width="100">
            <template slot-scope="scope">{{ scope.row.loIsexpress}}</template>
          </el-table-column>

          <el-table-column  label="保证金比例" width="120">
            <template slot-scope="scope">{{ scope.row.loMarginRadio }}</template>
          </el-table-column>

          <el-table-column  label="状态" width="50">
            <template slot-scope="scope">
            <span v-if="scope.row.loIsexpress==0" style="color:red;">上架</span>
            <span v-if="scope.row.loIsexpress==1" style="color:green;">下架</span>
            </template>
          </el-table-column>

          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="small">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>

            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="sizes, prev, pager, next"
          :total=totals>
        </el-pagination>
      </el-main>
    </el-container>

    <el-dialog title="拍品新增" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="拍品描述:">
          <el-input v-model="sizeForm.loLotsdescribe"></el-input>
        </el-form-item>
        <el-form-item label="拍品分类:">
          <el-select v-model="sizeForm.loLotsType" placeholder="请选择拍品分类">
            <el-option label="黄金" value="0"></el-option>
            <el-option label="字画" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开拍时间:">
          <el-col :span="11">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期" v-model="sizeForm.loBegintime" style="width: 300px" ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-col :span="11">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期" v-model="sizeForm.loEndtime" style="width: 300px" ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="起拍价格:">
          <el-input v-model="sizeForm.loClap"></el-input>
        </el-form-item>
        <el-form-item label="加价幅度:">
          <el-input v-model="sizeForm.loAddprice"></el-input>
        </el-form-item>
        <el-form-item label="拍品件数:">
          <el-input v-model="sizeForm.loNumber"></el-input>
        </el-form-item>
        <el-form-item label="是否包邮:">
          <el-radio-group v-model="sizeForm.loIsexpress" size="medium">
            <el-radio  label="0">包邮</el-radio>
            <el-radio label="1">不包邮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="保证金额:">
          <el-input v-model="sizeForm.loMargin"></el-input>
        </el-form-item>
        <el-form-item label="拍品图片:">
          <el-upload
            class="upload-demo"
            action="http://192.168.0.151:8080/aiLots/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="10"
            :on-success="uploadsuccess"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="mini" type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <span slot="tip" class="el-upload__tip">&nbsp;&nbsp;&nbsp;&nbsp; 只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <el-carousel height="300px">
        <el-carousel-item v-for="(item, index) in imgList" :key="item">
          <img v-bind:src="item">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        paipinnum:'',
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        pagesize: 10,
        totals:0,
        dialogVisible:true,
        dialogFormVisible: false,
        sizeForm: {
          loLotsdescribe: '',
          loLotsType: '',
          loBegintime: '',
          loEndtime: '',
          loClap: '',
          loAddprice: '',
          loNumber: '',
          loIsexpress: '',
          loMargin: '',
          liImgAddress:''
        },
        formLabelWidth: '120px',
        fileList: [],
        imgList: [ 'http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg','http://pic44.nipic.com/20140723/19276212_171901262000_2.jpg','http://pic9.nipic.com/20100824/2531170_082435310724_2.jpg','http://pic.58pic.com/58pic/13/40/15/83V58PICyKZ_1024.jpg']
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        this.pagesize = size;
        this.handleUserList();
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        this.currentPage = currentPage;
        this.handleUserList();
      },
      formSubmit () {
        let reg=/,$/gi;
        this.sizeForm.liImgAddress=this.sizeForm.liImgAddress.replace(reg,"");
        this.http.post('/aiLots/addAiLots', this.sizeForm)
          .then(res => {
            alert(res)
            this.dialogFormVisible =false
            window.reload()
          });
      },
      handleUserList() {
        let prams = {
          page: this.currentPage,
          rows: this.pagesize,
          loLotsNumber: this.paipinnum
        };
        this.http.get('/aiLots/getAiLotsByLotsId', prams)
          .then(res => {
            this.tableData = res.data.data;
            this.totals =res.data.total
            console.log(this.totals)
          });
      },
      uploadsuccess(response, file, fileList){
        this.sizeForm.liImgAddress+=response.msg +','
      },
      handleRemove(file, fileList) {
        console.log(typeof (file.response.msg), fileList );
      },
      handlePreview(file) {
        console.log(111);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    mounted() {
      this.handleUserList()

    }

  };
</script>

<style>

</style>
