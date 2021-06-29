<template>
  <div class="devGroupManage">
		<div class="nav">
			<Input v-model="sendData.identifiers" placeholder="请输入分组名称" style="width: 300px" />
			<Button type="primary" icon="ios-search" @click="search" style="margin-left: 10px;">查询</Button>
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
					  prop="id"
					  sortable
					  label="id"
					  width="100">
					</el-table-column>
				  <el-table-column
				    prop="taskIdentifier"
				    sortable
				    label="本次任务的唯一标识符"
				    width="200">
				  </el-table-column>
					<el-table-column
					  prop="taskTemplateId"
					  sortable
					  label="任务模板ID"
					  width="120">
					</el-table-column>
					<el-table-column
					  prop="taskName"
					  sortable
					  label="任务名称"
					  width="200">
					</el-table-column>
					<el-table-column
					  prop="status"
					  sortable
					  label="任务当前状态"
					  width="140">
					</el-table-column>
					<el-table-column
					  prop="deviceVersion"
					  sortable
					  label="任务关联的设备版本号"
					  width="200">
					</el-table-column>
					<el-table-column
					  prop="deviceOnlineStatus"
					  sortable
					  label="	任务关联的设备在线状态"
					  width="200">
					</el-table-column>
					<el-table-column
					  prop="deviceIdentifier"
					  sortable
					  label="	任务关联设备的唯一标识符"
					  width="220">
					</el-table-column>
					<el-table-column
					  prop="deviceId"
					  sortable
					  label="	任务关联的设备ID"
					  width="200">
					</el-table-column>
					<el-table-column
					  prop="deviceIPv4"
					  sortable
					  label="任务关联的设备IPv4地址"
					  width="200">
					</el-table-column>
				  <el-table-column
				    align='center'
				    label="任务开始执行的时间"
				    sortable
				    min-width="200">
						<template slot-scope="scope">
						  <span>{{scope.row.createAt|timeHendel}}</span>
						</template>
				  </el-table-column>
					<el-table-column
					  align='center'
					  label="任务完成时间"
					  sortable
					  min-width="200">
						<template slot-scope="scope">
						  <span>{{scope.row.doneAt|timeHendel}}</span>
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
  </div>
</template>

<script>
import {findAllByDeviceIdentifier,viewTaskLogs} from '@/api/index.js'

export default{
	name:'devGroupManage',
	data(){
		return{
			tableData:[],
			totalRows:0,
			sendData:{
				identifiers:'',
				page:0,
				rows:20
			}
		}
	},
	created() {
		this.getviewTaskLogs()
	},
	methods:{
		search(){
				this.sendData.page = 0
				this.getviewTaskLogs()
		},
		pageChange(page){
			this.sendData.page = page-1
			this.getviewTaskLogs()
		},
		rowsChange(rows){
			this.sendData.rows = rows
			this.getviewTaskLogs()
		},
		getviewTaskLogs(){
			viewTaskLogs(this.sendData).then(res => {
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
	}
</style>
