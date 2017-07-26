<template>
  <div class="flow-case-list">
	<ul class="composite-tabs nav nav-tabs nav-tabs-icon clearfix">
		<li class="tab-li active" >
			<a href="#/formflow/composite/flow-caselist" class="tab-li-a ">
				<i class="tab-icon icon-start png_bg"></i>
				<span>发起合成</span>
			</a>
		</li>
        <li class="tab-li" >
            <a href="/formflow/agency-task?type=todo" class="tab-li-a">
                <i class="tab-icon icon-daiban png_bg"></i>
                <span>我的待办</span>
            </a>
        </li>
        <li class="tab-li" >
            <a href="/formflow/mysynthetic-combat" class="tab-li-a">
                <i class="tab-icon icon-zuozhan png_bg"></i>
                <span>我的合成作战</span>
            </a>
        </li>
        <li class="tab-li" >
            <a href="/formflow/agency-task?type=done" class="tab-li-a">
                <i class="tab-icon icon-yiban png_bg"></i>
                <span>已办事项</span>
            </a>

        </li>

        <li class="tab-li" >
            <a href="/formflow/draftbox?type=1" class="tab-li-a">
                <i class="tab-icon icon-trash png_bg"></i>
                <span>草稿箱</span>
            </a>
        </li>
		<li class="tab-li " >
			<router-link to="/formflow/composite/flow-caselist2?type=1" class="tab-li-a">
				<i class="tab-icon icon-allot png_bg"></i>
				<span>战果分配</span>
			</router-link>
		</li>
        <li class="apply-flow-btn">
        	<a href="javascript:;" id="apply-flow-btn" class="flow-btn btn btn-icon-blue">
	            <i class="icon-base icon-btn-add icon-24 png_bg"></i>
	            <span class="btn-icon-text">发起合成作战申请</span>
	        </a>
        </li>
        
    </ul>

    <div class="tab-content">
        <div class="staus-tab clearfix">
            <span class="pull-left time-title" id="ce-shi">战果级别：</span>
            <ul class="staus-con clearfix pull-left">
                <li data-index="" class="li-time-tab" :class="{active: statusIndex=== 0}" @click="changeStatus(0)">全部</li>
                <li data-index="0" class="li-time-tab" :class="{active: statusIndex=== 1}" @click="changeStatus(1)"> 大要案</li>
                <li data-index="1" class="li-time-tab" :class="{active: statusIndex=== 2}" @click="changeStatus(2)">侵财类</li>
				<li data-index="2" class="li-time-tab" :class="{active: statusIndex=== 3}" @click="changeStatus(3)">非侵财类</li>
            </ul>
         
        </div>
    	<div class="time-tabs clearfix">
                <span class="pull-left time-title">案发时间：</span>
                <ul class="time-tab clearfix pull-left">
                    <li data-index="0" class="li-time-tab active">全部</li>
                    <li data-index="1" class="li-time-tab ">今天</li>
                    <li data-index="2" class="li-time-tab ">最近三天</li>
                    <li data-index="3" class="li-time-tab">最近一周</li>
                    <li data-index="4" class="li-time-tab">最近一月</li>
                    <li data-index="5" class="li-time-tab">自定义</li>
                </ul>
                <div id="time-input" style="display: none">
                    <div class="form-group pull-left">
                        <input  type="text" id="startTime" class="form-control Wdate-second">
                    </div>
                    <span class="fen-ge pull-left"></span>
                    <div class="form-group pull-left">
                        <input type="text" id="endTime" class="form-control Wdate-second">
                    </div>
                    <a id="time-btn" href="javascript:;" class="btn btn-icon-blue pull-left ml10">
                        <span class="btn-icon-text">确定</span>
                    </a>
                </div>

    	</div>
		
    </div>
	<div class="search-con clearfix">
			<div class="form-group clearfix">
				<span class="form-title">编号：</span>
				<input id="caseNum" v-model="caseNum" class="form-control" placeholder="请输入案件编号" value="">
			</div>
			<div class="form-group clearfix">
				<span class="form-title">名称：</span>
				<input id="caseName" v-model="caseName"   class="form-control" placeholder="请输入案件名称" value="">
			</div>
			<a href="javascript:;" id="query-button" class="btn btn-icon-blue" @click="chageData()">
				<i class="icon-base icon-24 icon-btn-query png_bg"></i>
				<span class="btn-icon-text">查询</span>
			</a>
		</div>
 	<div class="list-con">
            <div class="table-box">
                <el-table :data="caseList.list" style="width: 100%">
                    <el-table-column prop="" label="" type="index" width="60"> </el-table-column>
                    <el-table-column prop="caseNum" label="编号" >
                    </el-table-column>
                    <el-table-column prop="caseName" label="案件名称">
                    </el-table-column>
                    <el-table-column prop="handlingUserName" label="办案人" align="center"></el-table-column>
                    <el-table-column prop="caseHappeningDate" label="案发时间" align="center" ></el-table-column>
                    <el-table-column prop="caseStatus" label="状态" align="center"> </el-table-column>   
                    <el-table-column prop="" label="合成作战单">  </el-table-column>   
                     <el-table-column prop="" label="操作">        
                    </el-table-column>
                </el-table>
                 <el-pagination align="right" 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50]"
                    :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                    :total="caseList.totalRow">
                </el-pagination>
            </div>
	</div>
</div>
</template>


<script>
    export default {
        name: 'flow-caselist',
        mounted() {

            var type = this.$route.query.type || 0;
            AJAX.getCooperationCaseInfo({
                type: type
            }).then(res => {
                this.caseList = res.body.data;
            });


        },
        data() {
            return {
                statusIndex: 0,
                caseList: [],
                currentPage: 1,
                pageSize: 10,
                caseNum: '',
                caseName: '',
                caseCategories: ''
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                pageSize = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                AJAX.getCooperationCaseInfo({
                    type: 0,
                    pageNumber: val,
                    pageSize: this.pageSize
                }).then(res => {

                    this.caseList = res.body.data;

                });
            },


            chageData() {
                var param = {
                    type: 0,
                    pageNumber: this.currentPage,
                    pageSize: this.pageSize,

                };
                param.caseNum = this.caseNum;
                param.caseNameStr = this.caseName;
                var statusIndex = this.statusIndex - 1 < 0 ? '' : (this.statusIndex - 1 + '');
                if (statusIndex && statusIndex !== '') {
                    param.caseCategories = statusIndex;
                }
                AJAX.getCooperationCaseInfo(param).then(res => {

                    this.caseList = res.body.data;

                });
            },
            changeStatus(index) {
                this.statusIndex = index;

                this.chageData()
            }

        }
    }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .main {
        padding-top: 50px;
    }
    
    .flow-case-list {
        padding: 20px 20px 20px 20px;
        position: relative;
        //padding-right: 340px;
        padding-top: 70px;
        .composite-tabs {
            position: relative;
            .apply-flow-btn {
                position: absolute;
                right: 0;
                top: 0;
            }
            .tab-li {
                .icon-start {
                    background-position: -185px -1px;
                }
                .icon-daiban {
                    background-position: -38px -91px;
                }
                .icon-zuozhan {
                    background-position: -185px -77px;
                }
                .icon-yiban {
                    background-position: -38px -150px;
                }
                .icon-anjian {
                    background-position: -57px -17px;
                }
                .icon-trash {
                    background-position: -56px -36px;
                }
                .icon-allot {
                    background-position: -184px -39px;
                }
                &.active {
                    .icon-start {
                        background-position: -185px -20px;
                        *background-position: -181px -20px;
                    }
                    .icon-allot {
                        background-position: -184px -58px;
                    }
                }
            }
        }
        .search-input {
            .searchg-icon {
                background-position: -16px 0;
                width: 24px;
                height: 24px;
                cursor: pointer;
                position: absolute;
                right: 35px;
                background-color: #dedede;
                margin-top: 4px;
            }
            input {
                height: 30px;
                line-height: 30px;
                border-radius: 4px;
                padding: 0 8px;
                margin-right: 10px;
                top: 4px;
                width: 280px;
                float: right;
                padding-right: 30px;
            }
        }
        .tab-content {
            padding: 5px 10px;
            background-color: #fff;
            ;
            border: 1px solid #dedede;
            border-top: 0;
            .staus-tab,
            .time-tabs {
                padding: 10px 0;
                border-bottom: 0px dashed #dedede;
            }
            .staus-tab {
                border-bottom: 1px dashed #dedede;
                .li-time-tab {
                    cursor: pointer;
                    margin-left: 8px;
                    padding: 0 8px;
                    line-height: 26px;
                    float: left;
                    _display: inline;
                    border-radius: 4px;
                }
            }
            .staus-tab .li-time-tab:hover,
            .time-tab .li-time-tab.hover {
                //          background-color:#e7e7e7;
                color: #0baafc;
            }
            .staus-tab .li-time-tab.active {
                background-color: #40a4ff;
                color: #ffffff;
            }
        }
        .search-con {
            margin: 10px 0 -11px 0;
            border: 1px solid #dedede;
            background: #fff;
            color: #666;
            position: relative;
            padding: 8px 10px;
            .form-group {
                float: left;
                _display: inline;
                margin-right: 10px
            }
            .form-title {
                line-height: 28px;
                color: #666;
            }
        }
        .list-con {
            .table-box {
                .name-active {
                    color: #0981c7;
                    cursor: pointer;
                }
                .reminder-btn {
                    .icon-btn-rem {
                        background-position: -72px -22px;
                    }
                    &:hover {
                        background-color: #FF5E52;
                        color: #fff;
                        .icon-btn-rem {
                            background-position: -72px -41px;
                        }
                    }
                }
                .evaluate-btn {
                    .evaluate-icon {
                        display: inline-block;
                        vertical-align: text-bottom;
                        width: 16px;
                        height: 16px;
                        cursor: pointer;
                        *zoom: 1;
                        overflow: hidden;
                        background: url("/static/image/five-pointed.png") -14px 0 no-repeat;
                    }
                    &:hover {
                        background-color: #00a0e9;
                        color: #FFFFFF;
                        .evaluate-icon {
                            background: url("/static/image/five-pointed.png") 0 0 no-repeat;
                        }
                    }
                }
                .coo-btn {
                    position: relative;
                    margin-right: 5px;
                    .coo-icon {
                        display: inline-block;
                        vertical-align: text-bottom;
                        _vertical-align: middle;
                        width: 16px;
                        height: 16px;
                        cursor: pointer;
                        *zoom: 1;
                        overflow: hidden;
                        background: url("/static/image/base-new.png") -73px 3px no-repeat;
                        margin-right: 5px;
                    }
                    &:hover {
                        background-color: #00a0e9;
                        color: #FFFFFF;
                        border-color: #00a0e9;
                        .coo-icon {
                            background-position: -73px -10px;
                        }
                    }
                }
                .dist-btn {
                    .dist-icon {
                        width: 19px;
                        height: 19px;
                        cursor: pointer;
                        *zoom: 1;
                        overflow: hidden;
                        background-position: -56px -127px;
                        margin-right: 5px;
                    }
                    &:hover {
                        background-color: #f3982d;
                        color: #FFFFFF;
                        .dist-icon {
                            background-position: -56px -145px;
                        }
                    }
                }
                .check-btn {
                    position: relative;
                    .check-icon {
                        *zoom: 1;
                        width: 17px;
                        height: 14px;
                        cursor: pointer;
                        overflow: hidden;
                        background-position: -56px -93px;
                        margin-right: 5px;
                        vertical-align: middle;
                    }
                    &:hover {
                        background-color: #4eaf38;
                        color: #FFFFFF;
                        .check-icon {
                            background-position: -56px -113px;
                        }
                    }
                }
            }
        }
    }
</style>