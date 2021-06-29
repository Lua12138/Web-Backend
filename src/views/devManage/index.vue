<template>
  <div class="devGroupManage">
		<div class="nav">
			<Input v-model="sendData.identifiers" placeholder="请输入imei" style="width: 300px" />
			<Button type="primary" icon="ios-search" style="margin-left: 10px;" @click="search">imei查询</Button>
			<el-select v-model="sendData.groupName" @change='search' placeholder="请选择" style="margin-left: 20px;width: 300px;">
					<el-option
					  label="全部分组"
					  value="">
					</el-option>
					<el-option
			      v-for="item in groupList"
			      :label="item.name"
			      :value="item.name">
			    </el-option>
			</el-select>
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
					  label="ID"
					  width="100">
					</el-table-column>
				  <el-table-column
				    prop="identifier"
				    sortable
				    label="imei"
				    width="180">
				  </el-table-column>
				  <el-table-column
				    prop="groupName"
				    sortable
				    label="分组名称"
				    width="250">
				  </el-table-column>
					<el-table-column
					  prop="version"
					  sortable
					  label="版本"
					  width="100">
					</el-table-column>
					<el-table-column align="center" label="在线状态" min-width="80">
					  <template slot-scope="scope">
					    <div v-if="scope.row.online" class="light"></div>
					    <div v-else class="dark"></div>
					  </template>
					</el-table-column>
					<el-table-column  sortable label="在线时间" width="200">
					  <template slot-scope="scope">
					    <span>{{ scope.row.online_ts | timeHendel }}</span>
					  </template>
					</el-table-column>
					<el-table-column  sortable label="离线时间" min-width="200">
					  <template slot-scope="scope">
					    <span>{{ scope.row.offline_ts | timeHendel }}</span>
					  </template>
					</el-table-column>
				  <el-table-column
				    align='center'
				    label="操作"
				    width="180">
				  	<template slot-scope="scope">
							<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: space-around;">
								<Button type="warning" @click="groupClick(scope.row.identifier)">修改分组</Button>
							</div>
				  	</template>
				  </el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination
					@size-change="rowsChange"
					@current-change="pageChange"
					:current-page="sendData.page+1"
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
		  width="20%">
		  <el-select v-model="group" placeholder="请选择" style="width: 100%;">
		      <el-option
		        v-for="item in groupList"
		        :label="item.name"
		        :value="item.id">
		      </el-option>
		    </el-select>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addGroup">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
import {add2Groups,deviceGroups,vDeviceses,searchvDeviceses} from '@/api/index.js'

export default{
	name:'devGroupManage',
	data(){
		return{
			dialogVisible:false,
			groupText:'',
			group:'',
			imei:'',
			groupList:[],
			tableData:[],
			totalRows:0,
			sendData:{
				page:0,
				rows:20,
				groupName:'',
				identifiers:''
			}
		}
	},
	watch:{
		input(){
			if(this.input == ''){
				this.sendData.rows = 20
				this.getvDeviceses()
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
		
		this.getvDeviceses()
	},
	methods:{
		addGroup(){
			add2Groups({
				groupId:this.group,
				identifiers:this.imei
			}).then(res => {
				this.$message.success('请求已发送')
				this.getvDeviceses()
				this.dialogVisible = false
			})
		},
		groupClick(imei){
			this.imei = imei
			this.dialogVisible = true
		},
		search(){
			this.sendData.page = 0
			this.getvDeviceses()
		},
		pageChange(page){
			this.sendData.page = page-1
			this.getvDeviceses()
		},
		rowsChange(rows){
			this.sendData.rows = rows
			this.getvDeviceses()
		},
		getvDeviceses(){
			vDeviceses(this.sendData).then(res => {
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
	}
</style>
