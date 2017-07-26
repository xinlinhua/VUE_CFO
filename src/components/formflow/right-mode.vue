<template>
    <div style="height: 100%;">
<i class="right-change" @click="changeT0ggle"></i>
<div class="combat-right background-bgf">
	<div class="combat-right-content">
		<!--<div class="toggle"><i class="toggle-icon png_bg"></i></div>-->

		<div class="right-content">
			<div class="dispose-con clearfix">
				<div class="pull-left icon png_bg"></div>
				<div class="pull-left ml20">
					<h6>部门接收的合成单{{message}}</h6>
					<span class="number"  id="dealStatic"></span>
				</div>
			</div>
			<div class="source-con clearfix border-color1">
				<div class="pull-left icon png_bg"></div>
				<div class="pull-left ml20">
					<h6>部门发起的合成单</h6>
					<span class="number" id="sendStatic"></span>
				</div>
			</div>
			<div class="feedback-con">
				<p class="head">
					<i class="icon png_bg"></i>
					<span>案件数量统计</span>
				</p>
				<div id="feedback-echart"></div>
			</div>
			<div class="statistics-con">
				<p class="head">
					<i class="icon png_bg"></i>
					<span>破案率统计</span>
				</p>
				<div id="statist-echart"></div>
			</div>
		</div>
	</div>
</div>
</div>
</template>


<script>
    import '../../../static/lib/echarts/echarts-all.js'
    export default {
        name: 'right-mode',
         props: ['message'],
        mounted() {
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
                    var casefinishLeftEchart = echarts.init(document.getElementById('statist-echart'));
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
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0.5)'
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
                        x: 20,
                        y: 40,
                        x2: 40,
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
                            barWidth: 15,
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

                                ],
                                itemStyle: {
                                    normal: {
                                        color: '#03A9F4'
                                    }
                                }
                            }

                        }

                    ]
                };
            }

            function pieOption(a, b) {

                return {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0.5)'
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

                    series: [{
                            name: '破案率统计',
                            type: 'pie',
                            // selectedMode: 'multiple',
                            radius: ['40%', '70%'],
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
            var caseEchart = echarts.init(document.getElementById('feedback-echart'));


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
        },
        data() {
            return {

            }
        },
        methods: {
            changeT0ggle() {

                if ($('.right-change').css('right') === '320px') {
                    $('.right-change').animate({
                        'right': '0'
                    }, 300);
                    $('.combat-right').animate({
                        'width': '0'
                    }, 300);

                    $('.agency, .draftbox , .flow-case-list, .synthetic').animate({
                        'padding-right': '20px'
                    }, 300);
                    $(this).addClass('right-change-toggle');
                } else {
                    $('.right-change').animate({
                        'right': '320px'
                    }, 300);
                    $('.combat-right').animate({
                        'width': '320px'
                    }, 300);
                    $('.agency, .draftbox , .flow-case-list, .synthetic').animate({
                        'padding-right': '340px'
                    }, 300);

                    $(this).removeClass(' right-change-toggle');
                }

            }

        },
        computed: {

        }
    }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    //右边的内容
    .toggle-icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(/static/image/base-new.png) no-repeat;
        background-position: -109px -151px;
        margin-top: 3px;
        cursor: pointer;
    }
    
    .right-change {
        width: 10px;
        height: 70px;
        z-index: 900;
        top: 45%;
        right: 320px;
        background: url(/static/image/huntsman/slider-right.png) center center no-repeat;
        position: absolute;
        cursor: pointer;
        background-color: #fff
    }
    
    .right-change-toggle {
        background: url(/static/image/huntsman/slider.png) center center no-repeat;
    }
    
    .combat-right {
        position: fixed;
        _position: absolute;
        _top: ~"expression(eval(document.documentElement.scrollTop))";
        top: 0;
        right: 0;
        width: 320px;
        height: 100%;
        overflow-y: auto;
        border-left: 1px #DEDEDE solid;
        //overflow-x: hidden;
        .combat-right-content {
            padding-top: 50px;
            .right-content {
                padding: 20px;
                .source-con,
                .dispose-con {
                    padding-bottom: 10px;
                    .icon {
                        width: 40px;
                        height: 40px;
                        background: url(/static/image/combat-icon.png) no-repeat;
                        margin-left: 20px;
                    }
                    h6 {
                        font-size: 12px;
                        color: #666;
                        font-weight: normal;
                    }
                    .number {
                        font-size: 20px;
                        color: #03a9f4;
                        display: block;
                        height: 24px;
                    }
                    .number:hover {
                        //text-decoration: underline;
                    }
                }
                .source-con {
                    border-bottom: 1px solid #dedede;
                    margin-bottom: 10px;
                    padding-bottom: 15px;
                    .icon {
                        background-position: 0 0;
                    }
                }
                .dispose-con {
                    border-bottom-style: solid;
                    padding-bottom: 14px;
                    .icon {
                        background-position: -40px 0;
                    }
                }
                .feedback-con,
                .statistics-con {
                    height: 250px;
                    width: 100%;
                    #feedback-echart,
                    #statist-echart {
                        width: 300px;
                        height: 210px;
                    }
                    .head {
                        .icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: middle;
                            overflow: hidden;
                            margin-right: 4px;
                            background: url("/static/image/base-new.png") no-repeat;
                        }
                    }
                }
                .feedback-con {
                    .head {
                        font-size: 14px;
                        padding: 10px 0;
                        .icon {
                            background-position: -1px -103px;
                        }
                    }
                }
                .statistics-con {
                    .head {
                        font-size: 14px;
                        padding: 10px 0;
                        .icon {
                            background-position: -1px -123px;
                        }
                    }
                }
            }
        }
    }
    
    //战果分配的弹框start
    .allot-content {
        font-size: 12px;
        color: #666666;
        padding: 20px;
        .title {
            margin-top: -14px;
            line-height: 38px;
            .title-head {
                color: #333333;
            }
            .score {
                color: #f3982d;
                font-style: normal;
            }
        }
        .form-group {
            margin: 5px 0;
        }
        .branch-list-content {
            background-color: #eeeeee;
            border-style: solid;
            padding: 4px 6px 4px 10px;
            border-radius: 4px;
            line-height: 28px;
            margin-bottom: 6px;
            .branch-left-title {
                span {
                    font-size: 14px;
                    color: #333333;
                }
                .icon-title {
                    height: 10px;
                    background-position: -164px -20px;
                }
            }
            .branch-right-title {
                position: relative;
                .form-control {
                    width: 40px;
                }
                &.hover {
                    .add-minus {
                        display: block;
                    }
                }
            }
            .add-minus {
                position: absolute;
                top: 0;
                right: 0;
                border-style: solid;
                height: 28px;
                width: 22px;
                border-radius: 0 4px 4px 0;
                z-index: 11;
                display: none;
                .arrow-box {
                    display: block;
                    height: 10px;
                    text-align: center;
                    cursor: pointer;
                    .arrow {
                        display: block;
                        width: 9px;
                        height: 4px;
                        margin: 5px 0 0 8px;
                        background: url(/static/image/base-new.png) no-repeat;
                    }
                }
                .arrow-up {
                    border-bottom-style: solid;
                    .arrow {
                        background-position: -166px -31px;
                    }
                    &:hover,
                    &.active {
                        .arrow {
                            background-position: -176px -31px;
                        }
                    }
                }
                .arrow-down {
                    .arrow {
                        background-position: -166px -38px;
                    }
                    &:hover,
                    &.active {
                        .arrow {
                            background-position: -176px -38px;
                        }
                    }
                }
            }
        }
        .branch-list.branch-list-more {
            background-color: #FFFFFF;
            border-style: solid;
            border-radius: 4px;
            margin-bottom: 10px;
            .branch-list-content {
                border-width: 0;
                border-bottom-width: 1px;
            }
            .accordion {
                margin: 10px;
                .accordion-heading {
                    line-height: 14px;
                }
                .accordion-inner {
                    position: relative;
                    .list {
                        .control-label {
                            width: 8%;
                            text-align: right;
                            margin-right: 10px;
                            color: #999999;
                        }
                        .form-text {
                            //width:88%;
                            margin-right: 20px;
                        }
                        .form-file {
                            width: 87%;
                        }
                        a.form-text {
                            text-decoration: underline;
                        }
                        a.form-full,
                        a.file-con {
                            text-decoration: underline;
                            font-size: 14px;
                            &:hover {
                                .icon-dowmload {
                                    background-position: -19px -60px;
                                }
                            }
                        }
                    }
                }
                .evaluate {
                    position: absolute;
                    right: 6px;
                    top: 8px;
                    li {
                        width: 18px;
                        height: 18px;
                        margin-right: 4px;
                        background: url("/static/image/five-pointed.png") no-repeat;
                        background-position: 0 -15px;
                        &.active {
                            background-position: 0 -34px;
                        }
                    }
                }
                .comment {
                    position: relative;
                    margin-left: 54px;
                    .comment-btn {
                        color: #00a0e9;
                        cursor: pointer;
                    }
                    .comment-con {
                        position: absolute;
                        width: 180px;
                        padding: 8px 10px;
                        right: 0;
                        top: 26px;
                        border-style: solid;
                        border-radius: 5px;
                        box-shadow: 0 4px 5px -1px rgba(0, 0, 0, 0.4);
                        display: none;
                        .comment-arrow {
                            position: absolute;
                            width: 12px;
                            height: 7px;
                            background-position: -166px -46px;
                            top: -6px;
                            right: 7px;
                        }
                    }
                }
            }
        }
    }
    
    //战果分配的弹框end
</style>