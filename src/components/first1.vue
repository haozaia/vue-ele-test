    <template>
      <div class="app-container">

        <div class="filter-container">
          <div class="warning"><p>111</p></div>
          <el-input style="width: 200px;" v-model="paipinnum" class="filter-item" placeholder="拍品编号">
          </el-input>
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleUserList">搜索
          </el-button>
          <el-button class="filter-item" type="primary" size="small" @click="addForm"
                     icon="el-icon-circle-plus-outline">添加
          </el-button>
          <el-button class="filter-item" type="primary" size="small" @click="handledoubledel()"
                     icon="el-icon-circle-plus-outline">批量下架
          </el-button>
          <el-upload style="display: inline-block"
                     class="upload-demo"
                     action="http://192.168.0.151:8080/aiLots/uploadLotsExcel"
                     :on-remove="handleRemove"
                     :before-remove="beforeRemove"
                     :show-file-list="false"
                     :on-success="uploadexcel"
                     accept=".xls,.xlsx"
                     multiple
                     :limit="10"
                     :on-exceed="handleExceed"
                     :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>

        <el-container>
          <el-main>
            <el-table style="font-size: 12px;line-height: 24px;padding: 0" :data="tableData" stripe
                      @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column label="拍品编号" width="70" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loLotsNumber }}</template>
              </el-table-column>

              <el-table-column label="拍品类型" width="70" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loLotsType }}</template>
              </el-table-column>

              <el-table-column label=" 截拍时间" width="160" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loEndtime }}</template>
              </el-table-column>

              <el-table-column label="拍品描述" width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loLotsdescribe }}</template>
              </el-table-column>

              <el-table-column label="起拍价" width="80" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loClap }}</template>
              </el-table-column>

              <el-table-column label="加价" width="50" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loAddprice }}</template>
              </el-table-column>
              <el-table-column label="件数" width="50" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loNumber }}</template>
              </el-table-column>
              <el-table-column label="是否包邮" width="100" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loIsexpress}}</template>
              </el-table-column>

              <el-table-column label="保证金比例" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.loMarginRadio }}</template>
              </el-table-column>

              <el-table-column align="center" fixed="right" label="操作" width="150px">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleChange(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">下架</el-button>
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

        <el-dialog :title=title :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="sizeForm" label-width="90px" :rules="rules" size="mini" class="demo-ruleForm">
            <el-form-item label="拍品描述:" prop="loLotsdescribe">
              <el-input type="textarea" v-model="sizeForm.loLotsdescribe"></el-input>
            </el-form-item>
            <el-form-item label="拍品分类:" required="">
              <el-select  v-model="sizeForm.stTypeId"  @change="getChildlist" placeholder="请选择拍品分类">
                <el-option  v-for="(father,index) in parentssel"  :key="index" :label="father.tyName" :value="father.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拍品子类:" prop="loLotsType">
              <el-select v-model="sizeForm.loLotsType"   placeholder="请先选择拍品分类" >
                <el-option  v-for="(child,index) in childsel"  :key="index" :label="child.stSeenname" :value="child.id"></el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="开拍时间:" prop="loBegintime">
              <el-col :span="11">
                <el-date-picker type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期"
                                v-model="sizeForm.loBegintime" style="width: 300px" :picker-options="startDatePicker"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="结束时间:" prop="loEndtime">
              <el-col :span="11">
                <el-date-picker type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期"
                                v-model="sizeForm.loEndtime" style="width: 300px" :picker-options="endDatePicker"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="起拍价格:" prop="loClap">
              <el-input v-model="sizeForm.loClap"></el-input>
            </el-form-item>
            <el-form-item label="加价幅度:" prop="loAddprice">
              <el-input v-model="sizeForm.loAddprice"></el-input>
            </el-form-item>
            <el-form-item label="拍品件数:" prop="loNumber">
              <el-input v-model="sizeForm.loNumber"></el-input>
            </el-form-item>
            <el-form-item label="是否包邮:" prop="loIsexpress">
              <el-radio-group v-model="sizeForm.loIsexpress" size="medium">
                <el-radio :label="0" >包邮</el-radio>
                <el-radio :label="1" >不包邮</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="保证金额:" prop="loMargin">
              <el-input v-model="sizeForm.loMargin"></el-input>
            </el-form-item>
            <el-form-item label="拍品图片:">
              <el-upload
                class="upload-demo"
                action="http://192.168.0.151:8080/aiLots/upload"
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
            <el-button type="primary" @click="formSubmit('form')">确 定</el-button>
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

        <!-- 删除提示框 -->

        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>

          <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>

          <span slot="footer" class="dialog-footer">

          <el-button @click="delVisible = false">取 消</el-button>

          <el-button type="primary">确 定</el-button>

      </span>

        </el-dialog>


      </div>
    </template>

    <script>
      export default {
        data() {
          return {
            id:'',
            title:'',
            paipinnum: '',
            father:'',
            tableData: [],
            multipleSelection: [],
            currentPage: 1,
            pagesize: 10,
            totals: 0,
            dialogVisible: false,
            delVisible: false,
            dialogFormVisible: false,
            sizeForm: {
            },
            formLabelWidth: '120px',
            fileList: [],
            imgList: ['http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg', 'http://pic44.nipic.com/20140723/19276212_171901262000_2.jpg', 'http://pic9.nipic.com/20100824/2531170_082435310724_2.jpg', 'http://pic.58pic.com/58pic/13/40/15/83V58PICyKZ_1024.jpg'],
            parentssel: [],
            childsel: [],
            rules: {
              loLotsdescribe: [
                { required: true, message: '请填写拍品介绍', trigger: 'blur' }
              ],
              loLotsType: [
                { required: true, message: '请选择拍品类型', trigger: 'change' }
              ],
              loBegintime: [
                { type: 'string', required: true, message: '请选择开拍时间', trigger: 'change' }
              ],
              loEndtime: [
                { type: 'string', required: true, message: '请选择结束时间', trigger: 'change' }
              ],
              loClap: [
                { required: true, message: '请输入起拍价格', trigger: 'blur' }
              ],
              loAddprice: [
                { required: true, message: '请输入加价幅度', trigger: 'blur' }
              ],
              loNumber: [
                { required: true, message: '请输入拍品件数', trigger: 'blur' }
              ],
              loIsexpress: [
                { required: true, message: '请选择包邮类型', trigger: 'change' }
              ],
              loMargin: [
                { required: true, message: '请输入保证金额', trigger: 'change' }
              ]
            },
            startDatePicker: this.beginDate(),
            endDatePicker: this.processDate(),
          };
        },
        methods: {
          //新增弹窗
          addForm() {
            this.title = "添加拍品";
            this.sizeForm = {
              loLotsdescribe: '',
              loLotsType: '',
              loBegintime: '',
              loEndtime: '',
              loClap: '',
              loAddprice: '',
              loNumber: '',
              loIsexpress: '',
              loMargin: '',
              liImgAddress: '',
              stTypeId:''
            };
            this.dialogFormVisible = true;
          },
          //点击修改
          handleChange(id) {
            this.dialogFormVisible = true;
            this.id =id ;
            this.title = "修改拍品";
            let prmas={
              id : this.id
            }
            this.http.get('/aiLots/getAiLotsByIdEdit', prmas)
              .then(res => {
                this.sizeForm = res.data.data
              });
          },
          //操作多选
          handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
          },
          //初始时间限制
          beginDate(){
            const self = this
            return {
              disabledDate(time){
                if (self.sizeForm.loEndtime) {  //如果结束时间不为空，则小于结束时间
                  return new Date(self.sizeForm.loEndtime).getTime()- 8.64e7 < time.getTime()
                } else {
                  return time.getTime() < Date.now()- 8.64e7//开始时间不选时，结束时间最大值小于等于当天
                }
              }
            }
          },
          processDate() {
            const  self = this
            return {
              disabledDate(time) {
                if (self.sizeForm.loBegintime) {  //如果开始时间不为空，则结束时间大于开始时间
                  return new Date(self.sizeForm.loBegintime).getTime()- 8.64e7 > time.getTime()
                } else {
                  return time.getTime() < Date.now() - 8.64e7;//开始时间不选时，结束时间最大值小于等于当天
                }
              }
            }
          },

          //获取下拉数据
          getParenrlist(){
            this.http.get('/aiLots/getAiType','')
              .then(res => {
                this.parentssel =res.data.data
              });
          },
          getChildlist(val){
            console.log(val)
            let parms={
              id:val
            }
            this.http.get('/aiLots/getAiSeenTypeById',parms)
              .then(res => {
                this.childsel =res.data.data
              });
          },
          //操作每页条数
          handleSizeChange(size) {
            console.log(`每页 ${size} 条`);
            this.pagesize = size;
            this.handleUserList();
          },
          //获取当前页
          handleCurrentChange(currentPage) {
            console.log(`当前页: ${currentPage}`);
            this.currentPage = currentPage;
            this.handleUserList();
          },
          //点击提交
          formSubmit(form) {
            this.$refs[form].validate((valid) => {
              if (valid) {
                if (this.id == ''){
                  let reg = /,$/gi;
                  this.sizeForm.liImgAddress = this.sizeForm.liImgAddress.replace(reg, '');
                  this.http.post('/aiLots/addAiLots', this.sizeForm)
                    .then(res => {
                      this.dialogFormVisible = false;
                      this.handleUserList();
                      this.$message({
                        message: '新增成功!!!',
                        type: 'success'
                      });
                    });
                }else{
                  this.http.post('/aiLots/updateAiLots', this.sizeForm)
                    .then(res => {
                      this.dialogFormVisible = false;
                      this.handleUserList();
                      this.$message({
                        message: '修改成功!!!',
                        type: 'success'
                      });
                    });
                }

              }else {
                console.log('error submit!!');
                return false;
              }

            })
          },

          //列表获取
          handleUserList() {
            let prams = {
              page: this.currentPage,
              rows: this.pagesize,
              loLotsNumber: this.paipinnum
            };
            this.http.get('/aiLots/getAiLotsByLotsId', prams)
              .then(res => {
                this.tableData = res.data.data;
                this.totals = res.data.total;
                console.log(this.totals);
              });
          },
          //上传成功回调
          uploadsuccess(response) {
            this.sizeForm.liImgAddress += response.msg + ',';
            this.$message({
              message: response.msg,
              type:"info",
              showIcon: true
            });
          },
          uploadexcel(response) {
            this.$message({
              message: response.msg,
              type:"info",
              showIcon: true
            });
            this.handleUserList()
          },

          handleRemove(file, fileList) {
            this.sizeForm.liImgAddress = this.sizeForm.liImgAddress.replace(file.response.msg + ',', "");
            console.log(this.sizeForm.liImgAddress)
            // let msg ='';
            // for(var i =0;i<fileList.length;i++){
            //   msg += 1
            // }
          },
          //个数限制弹窗
          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },
          //多选下架
          handledoubledel() {
            const length = this.multipleSelection.length;
            let reg = /,$/gi;
            let double =''
            for (let i = 0; i < length; i++) {
              double+= this.multipleSelection[i].id +','
            }
            double = double.replace(reg, '');
            this.handleDelete(double)
          },
          //拍品下架
          handleDelete(data) {
            let delarr = {
              ids: data
            };
            console.log(data);
            this.http.post('/aiLots/downAiLots', delarr)
              .then(res => {
                this.$message({
                  message: res.data.msg
                });
              });
          },
          beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`)
          }
        },
        mounted() {
          this.handleUserList();
          this.getParenrlist();
        }
      };
    </script>
    <style scoped>
      .warning{
        padding: 8px 16px;
        background-color: #fff6f7;
        border-radius: 4px;
        border-left: 5px solid #fe6c6f;
        margin: 20px 0;
      }
      .tip{
        padding: 8px 16px;
        background-color: #ecf8ff;
        border-radius: 4px;
        border-left: 5px solid #50bfff;
        margin: 20px 0;
      }
    </style>
