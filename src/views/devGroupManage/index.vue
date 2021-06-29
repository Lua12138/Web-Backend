<template>
  <div class="devGroupManage">
		<div class="nav">
			<Button type="primary" icon="md-add" @click="addGroup">新增分组</Button>
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
				    min-width="100">
				  </el-table-column>
					<el-table-column
				    prop="id"
				    sortable
				    label="ID"
				    min-width="100">
				  </el-table-column>
				  <el-table-column
				    align='center'
				    label="操作"
				    width="250">
				  	<template slot-scope="scope">
							<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: space-around;">
								<Button type="info" @click="addDev(scope.row.id)">添加</Button>
								<Button type="warning" @click="updetaDev(scope.row.id,scope.row.name)">修改</Button>
								<Button type="error" @click="delDev(scope.row.id,scope.row.name)">删除</Button>
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
					:page-sizes="[9999]"
					:page-size="sendData.rows"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalRows">
				</el-pagination>
			</div>
		</div>
  </div>
</template>

<script>
import {delGroup,add2Groups,deviceGroups,addDeviceGroups,updataDeviceGroups} from '@/api/index.js'

export default{
	name:'devGroupManage',
	data(){
		return{
			tableData:[],
			totalRows:0,
			sendData:{
				name:'',
				page:0,
				rows:9999
			}
		}
	},
	created() {
		this.getdeviceGroups()
	},
	methods:{
		updetaDev(id,name){
			this.$prompt('修改分组：'+ name, '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			}).then(({ value }) => {
			  updataDeviceGroups({
					groupId:id,
					groupName:value
				}).then(res => {
					this.getdeviceGroups()
					this.$message.success('请求已发送')
				})
			}).catch(() => {
			  this.$message({
			    type: 'info',
			    message: '取消输入'
			  });       
			});
		},
		delDev(id,name){
			this.$confirm('此操作将删除分组：'+ name +', 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				delGroup({
					groupId:id
				}).then(res => {
					this.$message.success('请求已发送')
					this.getdeviceGroups()
				})
			}).catch(() => {
			  this.$message({
			    type: 'info',
			    message: '已取消'
			  });
			});
		},
		addDev(id){
			this.$prompt('请输入设备imei，使用,分隔', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			}).then(({ value }) => {
			  add2Groups({
					groupId:id,
					identifiers:value.replace(/\s*/g,"")
				}).then(res => {
					this.$message.success('请求已发送')
				})
			}).catch(() => {
			  this.$message({
			    type: 'info',
			    message: '取消输入'
			  });       
			});
		},
		addGroup(){
			this.$prompt('请添加分组', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			}).then(({ value }) => {
			  addDeviceGroups({
					groupName:value
				}).then(res => {
					this.getdeviceGroups()
					this.$message.success('请求已发送')
				})
			}).catch(() => {
			  this.$message({
			    type: 'info',
			    message: '取消输入'
			  });       
			});
		},
		pageChange(page){
			this.sendData.page = page-1
			this.getdeviceGroups()
		},
		rowsChange(rows){
			this.sendData.rows = rows
			this.getdeviceGroups()
		},
		getdeviceGroups(){
			deviceGroups(this.sendData).then(res => {
				this.tableData = res.content
				this.totalRows = res.content.length
			})
		}
	}
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
