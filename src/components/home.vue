<template>
  <div class="home">
   <div id="scrollDiv">
    <ul>
        <li></li>
    </ul>
    <div class="close-btn"></div>
</div>
<!--案件流转start-->
<div class="flow-box">
    <i class="flow-icon png_bg"></i>
    <div class="flow-bg"></div>
    <div class="flow" id="flowContent">
        <div class="flow-head clearfix">
            <span class="pull-left">流转事项（<span id="itemLength">0</span>）</span>
            <i class="pull-right icon-arrows png_bg"></i>
        </div>
        <div class="flow-content">
            <ul class="flow-list">
            </ul>
            <div class="cut-iocn">
                <span class="prev-icon"></span>
                <span class="next-icon"></span>
            </div>
        </div>
    </div>
</div>
<!--案件流转end-->
<!--常用工具-->
<div class="often-tool" title="常用工具">
    <i class="often-tool-icon png_bg" @click="openToolFun($event)"></i>
    <div class="tool">
        <div class="tool-bg"></div>
        <div class="tool-wrap">
            <div class="tool-head clearfix">
                <span class="pull-left">快捷操作</span>
                <i class="pull-right icon-arrows png_bg" title="关闭" @click="openToolCloseFun($event)"></i>
                <i class="pull-right icon-setting png_bg mr10" id="setAdd-btn" title="设置" @click="dialogToolVisible=true"></i>
            </div>
            <div class="tool-content">
                <div class="tool-content-top">
                    <ul class="tool-list clearfix" id="alreadyMenu_content" >
                        <li v-for="(alreadyMenu,index) in toolList.alreadyMenus " class="tool-list-li " :class="!!alreadyMenu.toolicon ? 'li-'+alreadyMenu.toolicon : '' " @click='gotoToolMenu(alreadyMenu.url)' :data-info='JSON.stringify(alreadyMenu)'>
                            <span class="span-img"><i class="icon png_bg"></i></span>
                            <span class="span-text" :title="alreadyMenu.name">{{alreadyMenu.name}}</span>
                            <a href="javascript:;" class=" png_bg"></a>
                        </li>
                    </ul>
                    <div class="cut-iocn"  style="display: none">
                        <span class="prev-icon"></span>
                        <span class="next-icon"></span>
                    </div>

                </div>
                <div class="tool-content-bottom">
                    <ul class="link-list clearfix" id="alreadyLink_content">
                        <li class="link-list-li" v-for="alreadyLink in toolList.alreadyLinks" @click="gotoToolLink(alreadyLink.link)">
                            <i class="icon-link png_bg"></i>
                            <span :title='alreadyLink.name'>{{alreadyLink.name}}</span>
                        </li>
                    </ul>
                    <div class="cut-iocn" style="display: none">
                        <span class="prev-icon"></span>
                        <span class="next-icon"></span>
                    </div>
                    <div class="page-con" >

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<div class="content">
    <div class="content-top clearfix">
        <div class="top-box top-l pull-left">
            <div class="top-head top-tab clearfix">
                <div data-id="0" class="top-tab-page pull-left clearfix" :class="{active:currid === 0}" v-on:click="checkLeftTab(0)">
                    <i class="icon icon-daiban png_bg"></i>待办工作<span class="number"></span><a href="javascript:;"
                                                                                              url="/formflow/agency-task?type=todo"
                                                                                              class="more png_bg"
                                                                                              title="更多"></a>
                </div>
                <div data-id="1" class="top-tab-page pull-left" :class="{active:currid === 1}"  v-on:click="checkLeftTab(1)">
                    <i class="icon icon-yiban png_bg"></i>已办事项<span class="number"></span><a href="javascript:;"
                                                                                             url="/formflow/agency-task?type=done"
                                                                                             class="more png_bg"
                                                                                             title="更多"></a>
                </div>
            </div>
            <div class="top-tab-con">
                <table class="table-list">
                    <thead>
                    <th style="width:15%;"></th>
                    <th style="width:60%;"></th>
                    <th style="width:25%;text-align:right;"></th>
                    </thead>
                    <tbody>
                       <tr v-if="currid === 0" v-for="(item,index) in todoList">
                          <td class="list-number">{{index+1}}</td>
                          <td :data-index="index">
                              <p class="list-title">{{item.caseName}} - {{item.cooperationBaseId}}</p>
                              <span class="list-time">发布于：{{item.originateTime}}</span>
                          </td>
                          <td class="list-last">{{item.staffName}}</td>
                      </tr>
                      <tr v-if="currid === 1" v-for="(itemr,index) in doneList">
                          <td class="list-number">{{index+1}}</td>
                          <td :data-index="index">
                              <p class="list-title">{{itemr.caseName}} - {{itemr.cooperationBaseId}}</p>
                              <span class="list-time">发布于：{{itemr.originateTime}}</span>
                          </td>
                          <td class="list-last">{{itemr.staffName}}111</td>
                      </tr>
                    </tbody>
                </table>
            </div>
            <div class="tap-tab-con">

            </div>
        </div>
        <div class="top-box top-c pull-left">
            <div class="top-head"><i class="icon icon-yifa png_bg"></i>合成作战申请单<span class="number">0</span><a
                        href="/formflow/mysynthetic-combat" class="more png_bg" title="更多"></a></div>
            <div class="top-tab-con">
                <table class="table-list">
                    <thead>
                    <th style="width:15%;"></th>
                    <th style="width:60%;"></th>
                    <th style="width:25%;"></th>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in sendList">
                          <td class="list-number">{{index+1}}</td>
                          <td :data-index="index">
                              <p class="list-title">{{item.caseName}} - {{item.id}}</p>
                              <span class="list-time">发布于&nbsp;&nbsp;{{item.createTime}}</span>
                          </td>

                          <td class="list-last"><i class="icon-radius icon-green"></i>{{item.status}}</td>
                      </tr>  
                    </tbody>
                </table>
            </div>
        </div>
        <div class="top-box top-r pull-left">
            <div class="top-head"><i class="icon icon-case-list png_bg"></i>最新案件<span class="number">{{caseList.length}}</span><a
                        href="/formflow/composite/flow-caselist" class="more png_bg" title="更多"></a></div>
            <div class="top-tab-con">
                <table class="table-list">
                    <thead>
                    <th style="width:10%;"></th>
                    <th style="width:45%;"></th>
                    <th style="width:25%;"></th>
                    <th style="width:20%;"></th>
                    </thead>
                    <tbody>
                      <tr  v-for="(item, index) in caseList">
                        <td class="list-number">{{index+1}}</td>
                        <td>
                            <p class="list-title" :data-id="index" :title="item.caseName">{{item.caseName}}</p>
                            <span class="list-time">发布于&nbsp;&nbsp;{{item.caseHappeningDate}}</span>
                        </td>

                        <td class="case-name">
                           
                            <a v-if="item.canStartCooperation === 1"  :data-id="index" href="javascript:;" id="coo-btn"  class="coo-btn btn btn-icon-white ">
                                <i class="coo-icon icon-24 png_bg"></i>
                                <span class="btn-icon-text">发起合成</span>
                            </a>
                           
                        </td>

                        <td class="list-last"><i class="icon-radius icon-red"></i>{{statusObj[item.caseStatus] || '其他'}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="content-bottom">
        <div class="bottom-l pull-left">
            <div class="content-bottom-head">
                <i class="pull-left png_bg icon icon-quality"></i><span class="pull-left">案件统计</span><a
                        href="/dataStatistics/caseStatistics" class="more png_bg" title="更多"></a>
            </div>
            <div id="left-echart"></div>
        </div>
        <div class="bottom-r pull-left">
            <div class="content-bottom-head">
                <i class="pull-left png_bg icon icon-statistics"></i><span class="pull-left">破案率统计</span><a
                        href="/dataStatistics/caseStatistics?type=finish" class="more png_bg" title="更多"></a>
            </div>
            <div id="right-echart"></div>
        </div>
    </div>

</div>
<el-dialog title="快捷操作设置" :close-on-click-modal=false  custom-class="tool-dialog" :visible.sync="dialogToolVisible">
    <div class="short-content">
        <div class="short-content-top clearfix">
            <div class="short-content-top-left pull-left" >
                <h6 class="title title-sub">已添加工具</h6>

                <ul class="tool-list clearfix" id="alreadyMenusSet_content">
                     <li v-for="alreadyMenu in toolList.alreadyMenus" class="tool-list-li " :class="!!alreadyMenu.toolicon ? 'li-'+alreadyMenu.toolicon : '' " :data-url="alreadyMenu.url" >
                        <span class="span-img"><i class="icon png_bg"></i></span>
                        <span class="span-text" :title="alreadyMenu.name" >{{alreadyMenu.name}}</span>
                        <a href="javascript:;" class="item-delect png_bg" title="取消订阅" @click="delToolMenus(alreadyMenu)"></a>
                    </li>
                </ul>
            </div>
            <div class="short-content-top-right pull-left"  >
                <h6 class="title">添加工具</h6>
                <ul class="tool-list clearfix" id="availableMenusSet_content">
                     <li v-for="availableMenu in toolList.availableMenus" class="tool-list-li "  :class="!!availableMenu.toolicon ? 'li-'+availableMenu.toolicon : '' " >
                        <span  class="span-img"><i class="icon png_bg"></i></span>
                        <span class="span-text" :title="availableMenu.name">{{availableMenu.name}}</span>
                        <a href="javascript:;" class="item-add png_bg"  title="新增订阅" @click="addToolMenus(availableMenu)"></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="short-content-bottom clearfix" style="border-bottom:0;">
            <div class="short-content-bottom-left pull-left">
                <div class="clearfix">
                    <span class="title title-sub">已添加链接</span>
                    <div class="page-con pull-right" >

                    </div>
                </div>
                <ul class="link-list clearfix"  id="alreadyLinksSet_content">
                     <li v-for="alreadyLink in toolList.alreadyLinks" class="link-list-li" >
                        <span class="link-text" :title="alreadyLink.name">{{alreadyLink.name}}</span>
                        <i class="link-icon png_bg" @click="delToolLinks(alreadyLink)"></i>
                    </li>
                </ul>
                <div class="cut-iocn"  style="display: none">
                    <span class="prev-icon"></span>
                    <span class="next-icon"></span>
                </div>

            </div>
            <div class="short-content-bottom-right pull-left" >
                <div class="clearfix">
                    <span class="title">添加链接</span>
                    <div class="page-con pull-right" >

                    </div>
                </div>
                <ul class="link-list clearfix" id="availableLinksSet_content">
                    <li v-for="availableLink in toolList.availableLinks"  class="link-list-li" >
                        <span class="link-text" :title="availableLink.name">{{availableLink.name}}</span>
                        <i class="link-icon png_bg" @click="addToolLinks(availableLink)"></i>
                    </li>
                </ul>
                <div class="cut-iocn"   style="display: none">
                    <span class="prev-icon"></span>
                    <span class="next-icon"></span>
                </div>

            </div>
        </div>
 </div>
 <div slot="footer" class="dialog-footer">
    <el-button @click="clearBtn" >取 消</el-button>
    <el-button type="primary" @click="subBtn" >确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>


<script>
    import '../../static/lib/echarts/echarts-all.js'
    import constant from '../common/js/constant.js'
    import util from 'common/js/util.js';
    export default {
        name: 'login',
        mounted() {
            console.log(111);

            AJAX.getCooperationCaseInfo({
                type: 0
            }).then(res => {

                this.caseList = res.body.data.list;


            });

            var todoObj = {

                pageNumber: 1,
                pageSize: 5
            };

            var sendObj = {
                isDraft: 0,
                pageNumber: 1,
                pageSize: 5
            };
            AJAX.findSendList(sendObj).then(res => {

                this.sendList = res.body.data.list;

            });

            AJAX.findTodoList(todoObj).then(res => {

                this.todoList = res.body.data.list;
            })

            AJAX.findDoneList(todoObj).then(res => {
                this.doneList = res.body.data.list;
            })


            AJAX.caseStats({
                startTime: '2016-05-01',
                endTime: '2017-05-25'
            }).then(res => {

                initCaseEchart(res.body.data);
            })
            AJAX.totalStats({
                startTime: '2016-05-01',
                endTime: '2017-05-25'
            }).then(res => {
                var dataList = res.body.data;

                if (res.body.resultCode === '200') {
                    var xd = ['已侦破', '未侦破'];
                    var yd = [];
                    var firstCount = +dataList.totalNum - parseInt(dataList.breakNum),
                        nextCount = dataList.breakNum;
                    var dataarr = [nextCount, firstCount];
                    _.each(xd, function(item, index) {
                        yd.push({
                            name: item,
                            value: dataarr[index],
                            count: dataList.totalNum
                        })
                    });
                    var casefinishLeftEchart = echarts.init(document.getElementById('right-echart'));
                    casefinishLeftEchart.setOption(pieOption(xd, yd));
                }
            })


            function barOption(xData, yData) {
                return {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'item'
                    },

                    legend: {
                        data: [],
                        y: 40
                    },

                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    grid: {
                        y: 80,
                        show: false
                    },
                    // calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: xData,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        //name: '案件数(起)',
                        axisLine: {
                            show: false
                        }
                    }],
                    series: [{
                            name: '案件数量',
                            type: 'bar',
                            data: yData,
                            barWidth: 25,
                            itemStyle: {
                                normal: {
                                    color: '#03A9F4'
                                }
                            },
                            markPoint: {
                                data: [{
                                        type: 'max',
                                        name: '最大值'
                                    }

                                ]
                            }
                        }

                    ]
                };
            }

            // var rightEchart = echarts.init(document.getElementById('right-echart'));
            function pieOption(a, b) {

                return {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    animation: false,
                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    /* legend: {
                     orient: 'vertical',
                     x: 'left',
                     y: 'center',
                     data: a
                     },*/
                    series: [{
                            name: '破案率统计',
                            type: 'pie',
                            // selectedMode: 'multiple',
                            radius: ['45%', '70%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                            //position: 'out'
                                    },
                                    labelLine: {
                                        show: true
                                    }
                                }
                            },
                            data: b


                        }

                    ]
                }

            }
            var caseEchart = echarts.init(document.getElementById('left-echart'));

            function initCaseEchart(dataList) {

                if (dataList.length > 0) {
                    var edata = formatFlowworkData(dataList);
                    caseEchart.setOption(barOption(edata.xdata, edata.ydata));
                }

            }

            function formatFlowworkData(data) {

                var obj = {},
                    xarr = [],
                    rexarr = [];
                //doneReceivedStatics doneSendStatics receivedStatics sendStatics
                var xdata = _.pluck(data, 'ym');
                var ydata = _.pluck(data, 'totalNum');
                obj.ydata = ydata;
                obj.xdata = xdata;
                return obj;
            }
            this.getAlreadyMenus();

        },
        data() {
            return {
                statusObj: {
                    '0': '已出警',
                    '1': '已受理',
                    '2': '已立案',
                    '3': '已处罚',
                    '4': '已侦破',
                    '99': '其他'
                },
                currid: 0, // 左边焦点，0：待办
                caseList: [],
                todoList: [],
                doneList: [],
                sendList: [],
                toolList: {
                    toolData: [],
                    alreadyMenus: [],
                    availableMenus: [],
                    alreadyLinks: [],
                    availableLinks: []
                },
                dialogToolVisible: false
            }
        },
        methods: {
            checkLeftTab(tab) {

                this.currid = tab;
            },

            openToolFun(event) {

                $(event.currentTarget).toggleClass('open');

                if ($(event.currentTarget).hasClass('open')) {
                    $('.tool').stop(true, true).animate({
                        "width": "380px",
                        opacity: 1
                    }, "fast", "swing");
                } else {
                    $('.tool').stop(true, true).animate({
                        "width": "0",
                        opacity: 0
                    }, "fast", "swing");
                }
                event.stopPropagation();
                event.preventDefault();

            },
            openToolCloseFun(event) {


                $('.often-tool-icon ').toggleClass('open');
                if ($(event.currentTarget).hasClass('open')) {
                    $('.tool-bg').css('display', 'block');
                    $('.tool').stop(true, true).animate({
                        "width": "380px",
                        opacity: 1
                    }, "fast", "swing");
                } else {
                    $('.tool').stop(true, true).animate({
                        "width": "0",
                        opacity: 0
                    }, "fast", "swing");
                }
                event.stopPropagation();
                event.preventDefault();

            },

            getAlreadyMenus() {
                AJAX.getAlreadyMenus().then(res => {
                    this.toolList.toolData = res.body.data;
                    var alreadyMenusMap = [],
                        availableMenusMap = [];
                    this.toolList.toolData.alreadyMenus.forEach((item) => {
                        var respId = item.id;

                        var menu = constant.MENU_LIST[item.parentId];

                        if (item.parentId !== 47 && item.parentId !== 7) {
                            alreadyMenusMap.push({
                                respId: respId,
                                id: menu.id,
                                name: menu.name,
                                icon: menu.icon,
                                url: menu.url,
                                toolicon: menu.toolicon
                            });
                        } else if (item.parentId === 47 && item.name === '新建案件') {
                            alreadyMenusMap.push({
                                respId: respId,
                                id: 47,
                                name: '新建案件',
                                icon: '',
                                toolicon: 'addcase',
                                url: '/case-manager/case-list?type=edit'
                            });
                        } else if (item.parentId === 47 && item.name === '案件流转') {
                            alreadyMenusMap.push({
                                respId: respId,
                                id: 47,
                                name: '案件流转',
                                icon: '',
                                toolicon: 'casereverse',
                                url: '/case-manager/case-list'
                            });
                        } else if (item.parentId === 7 && item.name === '发起合成') {
                            alreadyMenusMap.push({
                                respId: respId,
                                id: 0,
                                name: '发起合成',
                                icon: '',
                                toolicon: 'addflow',
                                url: '/formflow/apply'
                            });
                        }


                    });
                    this.toolList.toolData.availableMenus.forEach((item) => {
                        var respId = item.id;
                        var menu = constant.MENU_LIST[item.parentId];
                        if (item.parentId !== 47 && item.parentId !== 7) {
                            availableMenusMap.push({
                                respId: respId,
                                id: menu.id,
                                name: menu.name,
                                icon: menu.icon,
                                url: menu.url,
                                toolicon: menu.toolicon
                            });
                        } else if (item.parentId === 47 && item.name === '新建案件') {
                            availableMenusMap.push({
                                respId: respId,
                                id: 47,
                                name: '新建案件',
                                toolicon: 'addcase',
                                icon: '',
                                url: '/case-manager/case-list?type=edit'
                            });
                        } else if (item.parentId === 47 && item.name === '案件流转') {
                            availableMenusMap.push({
                                respId: respId,
                                id: 47,
                                name: '案件流转',
                                toolicon: 'casereverse',
                                icon: '',
                                url: '/case-manager/case-list'
                            });
                        } else if (item.parentId === 7 && item.name === '发起合成') {
                            availableMenusMap.push({
                                respId: respId,
                                id: 0,
                                name: '发起合成',
                                icon: '',
                                toolicon: 'addflow',
                                url: '/formflow/apply'
                            });
                        }


                    });
                    this.toolList.toolData.alreadyMenusMap = alreadyMenusMap;
                    this.toolList.toolData.availableMenusMap = availableMenusMap;
                    this.toolList.alreadyLinks = $.extend(true, [], this.toolList.toolData.alreadyLinks) || [];

                    this.toolList.availableLinks = _.clone(this.toolList.toolData.availableLinks) || [];
                    this.toolList.alreadyMenus = _.clone(this.toolList.toolData.alreadyMenusMap) || [];
                    this.toolList.availableMenus = _.clone(this.toolList.toolData.availableMenusMap) || [];

                })
            },
            gotoToolMenu(url) {

                this.$router.push(url);
            },
            gotoToolLink(url) {
                util.jumpPage(url);
            },
            delToolMenus(menu) {
                this.toolList.alreadyMenus = _.filter(this.toolList.alreadyMenus, (item) => {
                    return item.id !== menu.id;
                })
                this.toolList.availableMenus.push(menu);
            },
            addToolMenus(menu) {
                this.toolList.availableMenus = _.filter(this.toolList.availableMenus, (item) => {
                    return item.id !== menu.id;
                })
                this.toolList.alreadyMenus.push(menu);
            },
            delToolLinks(link) {

                this.toolList.alreadyLinks = _.filter(this.toolList.alreadyLinks, (item) => {
                    return item.id !== link.id;
                })
                this.toolList.availableLinks.push(link);
            },
            addToolLinks(link) {
                this.toolList.availableLinks = _.filter(this.toolList.availableLinks, (item) => {
                    return item.id !== link.id;
                })
                this.toolList.alreadyLinks.push(link);
            },
            clearBtn() {
                this.dialogToolVisible = false;
                this.toolList.alreadyLinks = $.extend(true, [], this.toolList.toolData.alreadyLinks) || [];

                this.toolList.availableLinks = _.clone(this.toolList.toolData.availableLinks) || [];
                this.toolList.alreadyMenus = _.clone(this.toolList.toolData.alreadyMenusMap) || [];
                this.toolList.availableMenus = _.clone(this.toolList.toolData.availableMenusMap) || [];
            },
            subBtn() {

                var param = {
                    menuIds: '',
                    linkIds: ''
                };
                var menuIds = _.pluck(this.toolList.alreadyMenus, 'respId').join(',');
                var linkIds = _.pluck(this.toolList.alreadyLinks, 'id').join(',');
                param.menuIds = menuIds;
                param.linkIds = linkIds;
                AJAX.updateMenuSet(param).then((res) => {
                    if (res.body.resultCode === '200') {
                        this.dialogToolVisible = false;
                        this.getAlreadyMenus();
                    }
                })

            }
        }
    }
</script>
.


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .home {
        background-size: cover;
        min-width: 800px;
        overflow-y: hidden;
        min-height: 600px;
    }
    
    #scrollDiv {
        position: fixed;
        _position: absolute;
        overflow: hidden;
        top: 50px;
        left: 0;
        right: 0;
        width: 100%;
        height: 20px;
        padding: 10px 0;
        z-index: 999;
        background-color: #fffeee;
        color: #d35c5c;
        display: none;
        box-shadow: 0 0 5px #ccc;
    }
    
    #scrollDiv li {
        text-align: left;
        line-height: 22px;
    }
    
    #scrollDiv .close-btn {
        position: absolute;
        width: 18px;
        height: 18px;
        top: 12px;
        right: 15px;
        background: url("/static/image/base.png") 0 -32px no-repeat;
        cursor: pointer;
        &:hover {
            background-position: 0 -144px;
        }
    }
    
    //常用工具的图标样式
    .tool-list {
        .tool-list-li {
            text-align: center;
            float: left;
            _display: inline;
            margin: 10px 7px 6px;
            cursor: pointer;
            position: relative;
            span {
                display: block;
            }
            .span-text {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 53px;
                margin: 0 auto;
            }
            &:hover .span-text {
                color: #03a9f4;
            }
            .span-img {
                width: 40px;
                height: 40px;
                *zoom: 1;
                overflow: hidden;
                border-radius: 3px;
                margin: 0 auto 6px;
                _margin: 0 0 6px;
                .icon {
                    width: 32px;
                    height: 32px;
                    margin-top: 5px;
                    background: url("/static/image/home/icon-bg.png") no-repeat;
                }
            }
            .item-delect,
            .item-add {
                position: absolute;
                width: 16px;
                height: 16px;
                overflow: hidden;
                *zoom: 1;
                background: url("/static/image/base-new.png") no-repeat;
                background-position: -128px -18px;
                top: -9px;
                right: 3px;
            }
            .item-delect:hover {
                background-position: -128px 0;
            }
            .item-add {
                background-position: -128px -54px;
            }
            .item-add:hover {
                background-position: -128px -36px;
            }
        }
        .li-addcase {
            .span-img {
                background-color: #1cbcff;
                .icon {
                    background-position: 0 0;
                }
            }
        }
        .li-addflow {
            .span-img {
                background-color: #ffa222;
                .icon {
                    width: 28px;
                    background-position: -34px 0;
                }
            }
        }
        .li-videodetect {
            .span-img {
                background-color: #33cccc;
                .icon {
                    background-position: -64px 0;
                }
            }
        }
        .li-videosearch {
            .span-img {
                background-color: #ce69e0;
                .icon {
                    background-position: -96px 0;
                }
            }
        }
        .li-facesearch {
            .span-img {
                background-color: #559ced;
                .icon {
                    background-position: -32px -32px;
                }
            }
        }
        .li-vehicle {
            .span-img {
                background-color: #78bc53;
                .icon {
                    background-position: 0 -32px;
                }
            }
        }
        .li-casestatistics {
            .span-img {
                background-color: #00a0e9;
                .icon {
                    background-position: -64px -32px;
                }
            }
        }
        .li-flowstatistics {
            .span-img {
                background-color: #ff5e52;
                .icon {
                    background-position: -128px 0;
                }
            }
        }
        .li-facetrack {
            .span-img {
                background-color: #48c399;
                .icon {
                    background-position: -160px 0;
                }
            }
        }
        .li-casereverse {
            .span-img {
                background-color: #ffa222;
                .icon {
                    background-position: -96px -32px;
                }
            }
        }
        .li-caseReverse {
            .span-img {
                background-color: #ffb830;
                .icon {
                    background-position: -32px -32px;
                }
            }
        }
    }
    
    .tool-dialog {
        width: 786px !important;
    }
    
    //案件流转start
    .cut-iocn {
        .prev-icon,
        .next-icon {
            position: absolute;
            width: 20px;
            height: 40px;
            background: url("/static/image/home/cut-icon.png") no-repeat;
            top: 50%;
            cursor: pointer;
            margin-top: -14px;
        }
        .prev-icon {
            background-position: 0 0;
            left: 10px;
            &:hover,
            &.active {
                background-position: -46px 0;
            }
        }
        .next-icon {
            background-position: -23px 0;
            right: 10px;
            &:hover,
            &.active {
                background-position: -69px 0;
            }
        }
    }
    
    .flow-box {
        position: fixed;
        _position: absolute;
        right: 20px;
        bottom: 86px;
        width: 36px;
        height: 36px;
        z-index: 111;
        display: none;
        .flow-icon {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 36px;
            height: 36px;
            cursor: pointer;
            z-index: 1001;
            zoom: 1;
            background: url("/static/image/home/flow-icon.png") no-repeat;
            background-position: 0 0;
            &:hover {
                background-position: -36px 0;
            }
            &.open {
                background-position: -72px 0;
            }
        }
        .flow-bg {
            width: 270px;
            height: 266px;
            position: absolute;
            background-color: #000000;
            opacity: 0.8;
            filter: alpha(opacity=80);
            right: 0;
            bottom: 36px;
            z-index: 998;
            border-radius: 5px 5px 0 5px;
            padding: 0 20px;
            display: none;
        }
        .flow {
            width: 270px;
            height: 266px;
            position: absolute;
            right: 0;
            bottom: 36px;
            z-index: 999;
            border-radius: 5px 5px 0 5px;
            padding: 0 20px;
            color: #999999;
            display: none;
            .flow-head {
                padding: 12px 0 10px;
                .icon-arrows {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    background: url("/static/image/home/icon.png") no-repeat;
                    background-position: -15px 0;
                    cursor: pointer;
                }
            }
            .flow-content {
                .flow-list-li {
                    padding: 6px 4px;
                    border-bottom: 1px dashed #555555;
                    line-height: 20px;
                    cursor: pointer;
                    .list-li-top {
                        color: #cccccc;
                        width: 262px;
                    }
                }
                .flow-list-li:hover,
                .flow-list-li.hover {
                    background-color: #272727;
                    .list-li-top {
                        color: #03a9f4;
                    }
                }
            }
        }
    }
    
    //案件流转end
    //常用工具css
    .often-tool {
        position: fixed;
        _position: absolute;
        right: 20px;
        bottom: 50px;
        width: 32px;
        height: 32px;
        z-index: 111;
        .often-tool-icon {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 46px;
            height: 46px;
            cursor: pointer;
            z-index: 1001;
            zoom: 1;
            background: url("/static/image/home/tool-icon.png") no-repeat;
            background-position: 0 0;
        }
        .often-tool-icon:hover {
            background-position: -46px 0;
        }
        .often-tool-icon.open {
            background-position: -92px 0;
        }
        .tool {
            width: 0;
            height: 355px;
            position: absolute;
            right: 48px;
            bottom: 0;
            z-index: 999;
            color: #CCCCCC;
            border-radius: 4px;
            overflow: hidden;
            opacity: 0;
            .tool-bg,
            .tool-wrap {
                width: 100%;
                height: 100%;
                position: absolute;
                right: 0;
                bottom: 0;
            }
            .tool-bg {
                background-color: #000000;
                opacity: 0.8;
                filter: alpha(opacity=80);
                z-index: 997;
            }
            .tool-wrap {
                z-index: 998;
                .tool-content-top,
                .tool-content-bottom {
                    position: relative;
                    width: 340px;
                    margin: 0 auto;
                    .prev-icon {
                        left: -10px;
                    }
                    .next-icon {
                        right: -10px;
                    }
                }
                .tool-head {
                    margin: 0 20px;
                    padding: 12px 0 10px;
                    .icon-setting {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: url("/static/image/home/icon.png") no-repeat;
                        background-position: 0 0;
                        cursor: pointer;
                        &:hover {
                            background-position: 0 -16px;
                        }
                    }
                    .icon-arrows {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: url("/static/image/home/icon.png") no-repeat;
                        background-position: -16px 0;
                        cursor: pointer;
                        &:hover {
                            background-position: -16px -16px;
                        }
                    }
                }
                .tool-content {
                    margin: 0 20px;
                    .tool-list {
                        border-bottom: #505050 dashed 1px;
                        height: 180px;
                        overflow-y: auto;
                        position: relative;
                        .li-add-btn {
                            .span-img {
                                border: #808080 dashed 1px;
                                .icon {
                                    width: 13px;
                                    height: 13px;
                                    margin-top: 13px;
                                    background: url("/static/image/home/icon.png") no-repeat;
                                    background-position: -50px -2px;
                                }
                            }
                        }
                    }
                    .link-list {
                        height: 80px;
                        padding: 10px 10px 10px 20px;
                        .link-list-li {
                            cursor: pointer;
                            float: left;
                            _display: inline;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 145px;
                            height: 30px;
                            line-height: 30px;
                            margin-right: 10px;
                            .icon-link {
                                display: inline-block;
                                width: 15px;
                                height: 15px;
                                margin-right: 4px;
                                background: url("/static/image/home/icon.png") -32px 0px;
                                opacity: 0.5;
                                position: relative;
                                top: 2px;
                            }
                            &:hover {
                                color: #03a9f4;
                            }
                            &:hover .icon-link {
                                opacity: 1;
                            }
                        }
                    }
                    .page-con {
                        margin-top: 5px;
                        .page-icon-list {
                            position: relative;
                            float: left;
                            left: 50%;
                            .page-icon {
                                float: left;
                                _display: inline;
                                width: 10px;
                                height: 10px;
                                margin-right: 4px;
                                background: url("/static/image/home/cut-dian-icon.png") 0px 0px;
                                position: relative;
                                cursor: pointer;
                                right: 50%;
                                &:hover,
                                &.hover {
                                    background-position: -10px 0px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    //常用工具css end
    .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        overflow: hidden;
        *zoom: 1;
        background: url("/static/image/base-new.png") no-repeat;
    }
    
    .content {
        width: 1290px;
        margin: 0 auto;
        padding-top: 110px;
        .content-top {
            .top-box {
                width: 418px;
                height: 306px;
                border: #dedede solid 1px;
                background-color: #FFFFFF;
                overflow: hidden;
                border-radius: 4px;
                .top-head {
                    //height: 50px;
                    //height:30px;
                    line-height: 30px;
                    font-size: 14px;
                    border-bottom: 1px solid #DEDEDE;
                    padding: 9px 20px;
                    _padding: 12px 20px;
                    position: relative;
                    overflow: hidden;
                    *zoom: 1;
                    .number {
                        font-size: 18px;
                        font-weight: bold;
                        margin-left: 15px;
                        color: #666;
                    }
                    .icon-yifa {
                        background-position: -1px -70px;
                        margin-right: 10px;
                    }
                    .icon-case-list {
                        background-position: -1px -86px;
                        margin-right: 10px;
                    }
                }
                .top-tab {
                    border-width: 0;
                    padding: 0;
                    .top-tab-page {
                        padding: 9px 15px;
                        _padding: 12px 15px;
                        border-bottom: #dedede solid 1px;
                        width: 179px;
                        //height: 29px;
                        line-height: 29px;
                        border-left: #dedede solid 1px;
                        margin-left: -1px;
                        position: relative;
                        overflow: hidden;
                        *zoom: 1;
                        cursor: pointer;
                        .icon-daiban {
                            background-position: -1px -1px;
                            margin-right: 10px;
                        }
                        .icon-yiban {
                            background-position: -1px -38px;
                            margin-right: 10px;
                        }
                        &.active {
                            color: #00a0e9;
                            border-bottom-color: #FFFFFF;
                            .icon-daiban {
                                background-position: -1px -20px;
                                margin-right: 10px;
                            }
                            .icon-yiban {
                                background-position: -1px -54px;
                            }
                        }
                    }
                }
                .top-tab-con {
                    .table-list {
                        width: 100%;
                        .coo-btn {
                            position: relative;
                            padding: 0 8px;
                            .coo-icon {
                                display: inline-block;
                                vertical-align: text-bottom;
                                _vertical-align: middle;
                                width: 16px;
                                height: 16px;
                                cursor: pointer;
                                *zoom: 1;
                                overflow: hidden;
                                background: url("/static/image/base-new.png") -73px 4px no-repeat;
                                margin-right: 0px;
                            }
                            &:hover {
                                background-color: #00a0e9;
                                border: 1px #00a0e9 solid;
                                color: #FFFFFF;
                                .coo-icon {
                                    background-position: -73px -8px;
                                }
                            }
                        }
                        tr {
                            &:hover,
                            &.hover {
                                .list-number {
                                    border-left: 4px #02a9f5 solid;
                                }
                                td {
                                    background-color: #f7f9fd;
                                }
                                .list-title {
                                    color: #02a9f5;
                                }
                            }
                        }
                        td {
                            border-bottom: 1px solid #DEDEDE;
                            vertical-align: middle;
                            padding: 6px 4px;
                            .icon-radius {
                                display: inline-block;
                                width: 7px;
                                height: 7px;
                                overflow: hidden;
                                *zoom: 1;
                                margin-right: 4px;
                                vertical-align: middle;
                                background: url("/static/image/base-new.png") no-repeat;
                                &.icon-red {
                                    background-position: -1px -141px;
                                }
                                &.icon-orange {
                                    background-position: -1px -150px;
                                }
                                &.icon-green {
                                    background-position: -1px -159px;
                                }
                            }
                        }
                        .list-title {
                            width: 175px;
                            height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            cursor: pointer;
                            font-size: 13px;
                        }
                        .list-number,
                        .list-time {
                            color: #999999;
                        }
                        .list-number {
                            padding-left: 20px;
                            border-left: transparent solid 4px; //                     _border-left-width:0; 
                            _border-left-color: #fff;
                            _filter: chroma(color=#fff);
                        }
                        .list-last {
                            text-align: left;
                            padding-right: 20px;
                        }
                    }
                }
            }
            .top-c {
                margin: 0 15px;
            }
        }
        .content-bottom {
            height: 386px;
            margin-top: 15px;
            .bottom-l,
            .bottom-r {
                border: #dedede solid 1px;
                height: 370px;
                background-color: #FFFFFF;
                border-radius: 4px;
                .content-bottom-head {
                    height: 45px;
                    line-height: 45px;
                    border-bottom: #DEDEDE solid 1px;
                    padding: 0 20px;
                    font-size: 14px;
                    position: relative;
                    .bottom-head-more {
                        text-align: right;
                        color: #999999;
                        line-height: 24px;
                        _line-height: 28px;
                        font-size: 34px;
                        cursor: pointer;
                    }
                    .icon-quality {
                        background-position: -1px -103px;
                        margin-right: 10px;
                        margin-top: 15px;
                    }
                    .icon-statistics {
                        background-position: -1px -123px;
                        margin-right: 10px;
                        margin-top: 15px;
                    }
                }
            }
            .bottom-l {
                width: 853px;
                margin-right: 15px;
                #left-echart {
                    width: 853px;
                    height: 320px;
                }
            }
            .bottom-r {
                width: 416px;
                #right-echart {
                    width: 418px;
                    height: 320px;
                }
            }
        }
    }
    
    //快捷操作设置弹框
    .short-content {
        padding: 20px;
        .short-content-top,
        .short-content-bottom {
            border-bottom: #DEDEDE dashed 1px;
            position: relative;
            .short-content-top-left,
            .short-content-top-right,
            .short-content-bottom-left,
            .short-content-bottom-right {
                position: relative;
                width: 50%;
                _width: 48%;
                float: left;
                _display: inline;
                .title {
                    font-size: 12px;
                    color: #666666;
                    font-weight: normal;
                }
                .title-sub {
                    color: #2e8ded
                }
                .tool-list {
                    padding-left: 10px;
                    .tool-list-li {
                        margin: 10px 5px 0 0;
                        _margin: 10px 5px 0 0;
                        font-size: 12px;
                        width: 62px;
                        .span-img {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
        .short-content-top {
            height: 200px;
        }
        .short-content-bottom {
            .short-content-bottom-left,
            .short-content-bottom-right {
                height: 140px;
                .title {
                    line-height: 50px;
                }
                .link-list {
                    width: 98%;
                    margin-left: 10px;
                    .link-list-li {
                        float: left;
                        _display: inline;
                        height: 22px;
                        line-height: 22px;
                        width: 152px;
                        margin-right: 6px;
                        margin-bottom: 6px;
                        padding: 0 6px;
                        cursor: pointer;
                        font-size: 12px;
                        .link-text {
                            float: left;
                            _display: inline;
                            width: 140px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .link-icon {
                            float: left;
                            _display: inline;
                            *zoom: 1;
                            overflow: hidden;
                            vertical-align: middle;
                        }
                    }
                }
                .cut-iocn .prev-icon,
                .cut-iocn .next-icon {
                    margin-top: 4px;
                }
            }
            .short-content-bottom-left {
                .link-list {
                    .link-list-li {
                        border: #dedede dashed 1px;
                        .link-text {
                            margin-right: 4px;
                        }
                        .link-icon {
                            width: 8px;
                            height: 2px;
                            background: url("/static/image/base-new.png") no-repeat;
                            background-position: -111px -134px;
                            margin-top: 10px;
                        }
                    }
                    .link-list-li:hover {
                        border-color: #ff5e52;
                        .link-icon {
                            background-position: -111px -139px;
                        }
                    }
                }
            }
            .short-content-bottom-right {
                .link-list {
                    .link-list-li {
                        border: #dedede solid 1px;
                        .link-text {
                            margin-left: 4px;
                        }
                        .link-icon {
                            width: 8px;
                            height: 8px;
                            background: url("/static/image/base-new.png") no-repeat;
                            background-position: -76px -1px;
                            margin-top: 7px;
                        }
                    }
                    .link-list-li:hover {
                        background-color: #00a0e9;
                        border-color: #00a0e9;
                        color: #FFFFFF;
                        .link-icon {
                            background-position: -76px -13px;
                        }
                    }
                }
            }
        }
        .page-con {
            margin-top: 20px;
            margin-right: 30px;
            .page-icon-list {
                position: relative;
                float: left;
                left: 50%;
                .page-icon {
                    float: left;
                    _display: inline;
                    width: 10px;
                    height: 10px;
                    margin-right: 4px;
                    background: url("/static/image/home/cut-dian-icon.png") 0px 0px;
                    position: relative;
                    cursor: pointer;
                    right: 50%;
                    &:hover,
                    &.hover {
                        background-position: -10px 0px;
                    }
                }
            }
        }
    }
    
    //快捷操作设置弹框end
    //更多
    .more {
        position: absolute;
        top: 50%;
        margin-top: -10px;
        right: 15px;
        cursor: pointer;
        width: 24px;
        height: 20px;
        background: url("/static/image/icon-more.png") no-repeat;
        -webkit-transition: all .2s ease-in-out;
        -moz-transition: all .2s ease-in-out;
        -o-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
        -ms-transition: all .2s ease-in-out;
    }
    
    .more:hover {
        background-position: 0 -20px;
        -webkit-transition: all .2s ease-in-out;
        -moz-transition: all .2s ease-in-out;
        -o-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
        -ms-transition: all .2s ease-in-out;
    }
    
    .layui-layer-dialog .layui-layer-content {
        overflow: hidden;
    }
    /*案件流转首页-start*/
    
    .case-circle-content {
        padding: 20px;
        .form-group {
            vertical-align: middle;
            margin: 5px 20px 5px 0;
            .control-label {
                display: inline-block;
                font-weight: 100;
                font-size: 14px;
                text-align: right;
                padding-right: 10px;
                line-height: 28px;
                width: 80px;
                color: #666;
            }
            input.form-control {
                border: 1px solid #dedede;
                height: 28px;
                line-height: 28px;
                padding: 0 10px;
                width: 250px;
            }
            textarea {
                border: #DEDEDE solid 1px;
                height: 90px;
                resize: none;
                padding: 8px;
                line-height: 20px;
                width: 255px;
            }
        }
    }
    /*案件流转首页-end*/
</style>