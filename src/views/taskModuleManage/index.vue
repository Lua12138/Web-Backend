<template>
  <div class="devGroupManage">
		<div class="nav">
			<div>
				<Input v-model="sendData.name" placeholder="请输入分组名称" style="width: 300px" />
				<Button type="primary" icon="ios-search" style="margin-left: 10px;" @click="search">查询</Button>
			</div>
			<Button type="primary" icon="md-add" @click="addModule">新增模板</Button>
		</div>
		<div class="content">
			<div class="box">
				<el-table
				  align='center'
				  :data="tableData"
				  tooltip-effect="dark"
				  style="width:	100%;"
					height="100%"
				  ref="multipleTable">
				  <el-table-column
				    align='center'
				    type="selection"
				    width="50">
				  </el-table-column>
				  <el-table-column
				    prop="name"
				    sortable
				    label="名称"
				    width="200">
				  </el-table-column>
					<el-table-column
					  prop="priority"
					  sortable
					  label="任务优先级"
					  width="120">
					</el-table-column>
					<el-table-column
						prop="expired"
					  sortable
					  label="等待时间"
					  width="150">
					</el-table-column>
					<el-table-column
					  prop="timeout"
					  sortable
					  label="执行时长"
					  width="180">
					</el-table-column>
					<el-table-column
					  sortable
					  label="任务间隔起始时间"
					  width="180">
						<template slot-scope="scope">
							<span>{{scope.row.interval_timestamp|timeHendel}}</span>
						</template>
					</el-table-column>
					<el-table-column
					  prop="interval"
					  sortable
					  label="任务间隔时长"
					  width="180">
					</el-table-column>
					<el-table-column
					  sortable
					  label="启用状态"
					  min-width="100">
						<template slot-scope="scope">
						  <div v-if="scope.row.enabled" class="light"></div>
						  <div v-else class="dark"></div>
						</template>
					</el-table-column>
				  <el-table-column
				    align='center'
				    label="操作"
				    width="250">
				  	<template slot-scope="scope">
							<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: space-around;">
								<Button type="primary" @click="addTask(scope.row.id)">创建任务</Button>
								<Button type="warning" @click="upDataClick(scope.row)">修改</Button>
								<!-- <Button type="error"  @click="delClick(scope.row.id,scope.row.name)">删除</Button> -->
							</div>
				  	</template>
				  </el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination
					@size-change="rowsChange"
					@current-change="pageChange"
					:current-page="sendData.page-1"
					:page-sizes="[20,30,40,50,100,500]"
					:page-size="sendData.rows"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalRows">
				</el-pagination>
			</div>
		</div>
		
		<el-dialog
		  title="修改分组"
		  :visible.sync="dialogVisible"
		  width="40%">
		  <div class="item">
				<span class="title">任务名称</span>
		  	<Input v-model="from.name" placeholder="请输入任务名称"/>
		  </div>
			<div class="item">
				<span class="title">包名</span>
				<Input v-model="from.packageName" placeholder="请输入包名"/>
			</div>
			<div class="item">
				<span class="title">等待时间/毫秒，0为无限期等待，负数则要求终止当前任务</span>
				<Input v-model="from.expired" placeholder="等待时间"/>
			</div>
			<div class="item">
				<span class="title">任务优先级，数值越小越优先</span>
				<Input v-model="from.priority" type="number" placeholder="请输入任务优先级" />
			</div>
			<div class="item">
				<span class="title">参数,请输入json格式</span>
				<Input v-model="from.arguments" type="text" placeholder="请输入参数" />
			</div>
			<div class="item">
				<span class="title">任务执行时长/毫秒，0为永不超时</span>
				<Input v-model="from.timeout" type="number" placeholder="请输入任务执行时长" />
			</div>
			<div class="item">
				<span class="title">任务间隔起始时间</span>
				<el-date-picker
					v-model="from.interval_timestamp"
					type="datetime"
					placeholder="选择日期时间"
					default-time="12:00:00">
				</el-date-picker>
			</div>
			<div class="item">
				<span class="title">任务间隔时长/毫秒，0立即执行，正数为指定毫秒数后执行，负数为指定毫秒间隔后周期执行</span>
				<Input v-model="from.interval" type="number" placeholder="请输入任务间隔时长" />
			</div>
			<div class="item">
				<span class="title">脚本文件</span>
				<!-- <input type="file" name="" id="file" value="" /> -->
				<el-upload
				  class="upload-demo"
					:show-file-list="true"
				  drag
				  action=""
					:auto-upload="false"
					:on-change="changeFile"
					:on-remove="removeFile"
					:file-list="fileList"
					:limit='1'
				  multiple>
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				</el-upload>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addClick">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<el-dialog
		  title="创建任务"
		  :visible.sync="dialogVisibleTask"
		  width="40%">
				<el-radio v-model="radio" label="1">分组</el-radio>
				<el-radio v-model="radio" label="2">设备ID</el-radio>
				<el-select v-show="radio == 1" v-model="group" placeholder="请选择" style="width: 100%;margin-top: 20px;">
				    <el-option
				      v-for="item in groupList"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
				<div class="item" v-show="radio == 2" style="margin-top: 20px;">
					<span class="title">请输入设备ID，通过,分隔</span>
					<Input v-model="device_ids"  placeholder="请输入设备ID，通过,分隔" />
				</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisibleTask = false">取 消</el-button>
		    <el-button type="primary" @click="addTaskClick">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
import {updataTaskTemplates,createTask,deviceGroups,taskTemplates,addTaskTemplates,delTaskTemplates} from '@/api/index.js'

export default{
	name:'devGroupManage',
	data(){
		return{
			fileList:[],
			dialogVisible:false,
			dialogVisibleTask:false,
			nowId:'',
			radio:'1',
			groupList:[],
			group:'',
			device_ids:'',
			nowTaskId:'',
			tableData:[],
			totalRows:0,
			from:{
				name:'',
				arguments:'',
				packageName:'',
				expired:0,
				priority:0,
				timeout:0,
				interval_timestamp:new Date(),
				interval:0,
				file:''
			},
			name:'',
			sendData:{
				page:0,
				rows:20,
				name:''
			}
		}
	},
	watch:{
		name(){
			if(this.name == ''){
				this.gettaskTemplates()
			}
		}
	},
	created() {
			deviceGroups({
				page:0,
				rows:9999
			}).then(res => {
				this.groupList = res.content
			})
		
		this.gettaskTemplates()
	},
	methods:{
		removeFile(file,fileList){
			this.fileList = [];
			this.fileList = Object.assign(this.fileList,fileList)
		},
		changeFile(file,fileList){
			this.fileList = [];
			this.fileList = Object.assign(this.fileList,fileList)
			console.log(file)
			this.from.file = file.raw
		},
		addTask(id){
			this.nowTaskId = id;
			this.dialogVisibleTask = true
		},
		addTaskClick(){
			if(this.radio == 1){
				createTask({
					taskId:this.nowTaskId,
					groupId:this.group
				}).then(res => {
					this.$message.success('请求已发送')
					this.dialogVisibleTask = false
				})
			}else{
				createTask({
					taskId:this.nowTaskId,
					identifiers:this.device_ids
				}).then(res => {
					this.$message.success('请求已发送')
					this.dialogVisibleTask = false
				})
			}
		},
		search(){
			this.sendData.page = 0
			this.gettaskTemplates()
		},
		delClick(id,name){
			this.$confirm('此操作将删除任务模块：'+ name +', 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				delTaskTemplates(id).then(res => {
					this.$message.success('请求已发送')
					this.gettaskTemplates()
				})
			}).catch(() => {
			  this.$message({
			    type: 'info',
			    message: '已取消'
			  });
			});
		},
		upDataClick(data){
			this.nowId = data.id
			this.from.name = data.name
			this.from.packageName = data.packageName
			this.from.expired = data.expired
			this.from.priority = data.priority
			this.from.timeout = data.timeout
			this.from.interval_timestamp = data.interval_timestamp
			this.from.interval = data.interval
			this.from.arguments = JSON.stringify(data.arguments||{})
			this.dialogVisible = true
		},
		addClick(){
			//let file = document.getElementById('file').files[0]
			
			let formData = new FormData();
			if(this.from.name !== ''){formData.append("name",this.from.name);}
			if(this.from.file !== ''){
				formData.append("file",this.from.file);
			}
			if(this.from.packageName !== ''){formData.append("packageName",JSON.stringify(this.from.packageName));}
			if(this.from.arguments !== ''){
				formData.append("arguments",this.from.arguments);}
			if(this.from.expired !== ''){formData.append("expired",this.from.expired);}
			if(this.from.priority !== ''){formData.append("priority",this.from.priority);}
			if(this.from.timeout !== ''){formData.append("timeout",this.from.timeout);}
			if(this.from.interval_timestamp !== ''){formData.append("interval_timestamp",new Date(this.from.interval_timestamp).valueOf());}
			if(this.from.interval !== ''){formData.append("interval",this.from.interval);}

			if(this.nowId){
				updataTaskTemplates(this.nowId,formData).then(res => {
					this.dialogVisible = false
					this.$message.success('请求已发送')
					this.gettaskTemplates()
				})
			}else{
				addTaskTemplates(formData).then(res => {
					this.dialogVisible = false
					this.$message.success('请求已发送')
					this.gettaskTemplates()
				})
			}
		},
		addModule(){
			this.nowId = ''
			this.from = {
				name:'',
				packageName:'',
				expired:0,
				priority:0,
				timeout:0,
				interval_timestamp:new Date(),
				interval:0,
				arguments:'',
				file:''
			}
			this.dialogVisible = true
		},
		pageChange(page){
			this.sendData.page = page-1
			this.gettaskTemplates()
		},
		rowsChange(rows){
			this.sendData.rows = rows
			this.gettaskTemplates()
		},
		gettaskTemplates(){
			taskTemplates(this.sendData).then(res => {
				this.tableData = res.content.content
				this.totalRows = res.content.totalElements
			})
		}
	},
	filters: {
	  timeHendel(val) {
	    if (val === null) {
	      return "";
	    }
	    val = Number(val + "");
	    var date = new Date(val); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    // console.log('触发了时间格式方法'+ val)
	    var Y = date.getFullYear() + "-";
	    var M =
	      (date.getMonth() + 1 < 10
	        ? "0" + (date.getMonth() + 1)
	        : date.getMonth() + 1) + "-";
	    var D =
	      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
	    var h =
	      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
	    var m =
	      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
	      ":";
	    var s =
	      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	    // console.log('触发了时间格式方法'+ Y + M + D + h + m + s)
	    return Y + M + D + h + m + s;
	  },
	},
}
</script>

<style scoped lang="scss">
	.devGroupManage{
		position: relative;
		width: 100%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
		.nav{
			position: relative;
			width: 100%;
			height: 64px;
			padding: 15px 20px;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 4px;
			display: flex;
			justify-content: space-between;
		}
		.content{
			position: relative;
			width: 100%;
			height: calc(100% - 84px);
			margin-top: 20px;
			padding: 15px;
			box-sizing: border-box;
			background: #fff;
			border-radius: 4px;
			.box{
				position: relative;
				width: 100%;
				height: calc(100% - 60px);
				.light {
				  position: relative;
				  display: inline-block;
				  width: 10px;
				  height: 10px;
				  background: rgb(49, 201, 57);
				  border-radius: 50%;
				}
				.dark {
				  position: relative;
				  display: inline-block;
				  width: 10px;
				  height: 10px;
				  background: rgb(153, 153, 153);
				  border-radius: 50%;
				}
			}
			.page-box{
				position: relative;
				width: 100%;
				height: 70px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
		.item{
			position: relative;
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 20px;
			.title{
				position: relative;
				font-size: 14px;
				color: red;
			}
			.input{
				width: 100%;
			}
		}
	}
</style>
