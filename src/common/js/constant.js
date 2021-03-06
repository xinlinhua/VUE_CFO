/*
 *  菜单配置说明，MENUIDS为显示的菜单，以及配置菜单位置。MENU_LIST为菜单配置型，
 *  数组长度必须大于或等于登录接口返回菜单的数组长度
 *  配置controller时 topbar.init(req, res, menuid);menuid 必须和这里id一致
 *
 * */

var constant = {
    MENUIDS: [0, 1, 58, 5, 6, 50, 51, 59,
        2, 55, 56,
        46, 47,
        3, /*8, 14,*/ /*16,*/ 17, /*18,*/ /*19,*/
        /*9, 20,*/
        21, 22, 53,
        /*11,*/
        26, 52, 13, 35, 48,
        4, /*36,*/ 42, 44, 43, 37, 38, 39, /*40, 41,*/ 45, 49, 36, 41, 57, 54
    ],
    MENU_LIST: [{
            id: 0,
            fid: 0,
            name: '首页',
            url: '/home'
        }, {
            id: 1,
            fid: 1,
            name: '合成作战',
            tag: 'flow'
        }, {
            id: 2,
            fid: 2,
            name: '数据统计',
            tag: 'statistics'
        }, {
            id: 3,
            fid: 3,
            name: '研判分析',
            tag: 'analysis'
        }, {
            id: 4,
            fid: 4,
            name: '系统管理',
            tag: 'manage'
        }, {
            id: 5,
            fid: 1,
            name: '我的待办',
            url: '/formflow/agency-task',
            icon: 'anency'
        }, {
            id: 6,
            fid: 1,
            name: '我的合成作战',
            url: '/formflow/mysynthetic-combat',
            icon: 'zuozhan'
        }, {
            id: 7,
            fid: 1,
            name: '案件列表',
            url: '/formflow/composite/flow-caselist',
            icon: 'caselist'
        }, {
            id: 8,
            fid: 3,
            name: '车辆应用',
            url: '',
            icon: 'cars'
        }, {
            id: 9,
            fid: 3,
            name: '视频侦查',
            url: '',
            icon: 'videospy'
        }, {
            id: 10,
            fid: 3,
            name: '涉案视频库',
            url: '',
            icon: 'involvedVideos'
        }, {
            id: 11,
            fid: 3,
            name: '人脸应用',
            url: '',
            icon: 'face'
        }, {
            id: 12,
            fid: 3,
            name: '情报分析',
            url: '',
            icon: ''
        }, {
            id: 13,
            fid: 3,
            name: '工具下载',
            url: '',
            icon: 'tools'
        }, {
            id: 14,
            fid: 8,
            name: '轨迹查车',
            url: '/judgement/vehicle/search?by=trajectory',
            icon: ''
        }, {
            id: 15,
            fid: 8,
            //name: '车牌搜车',
            name: '通行记录导出',
            //url: '/judgement/vehicle/search?by=number',
            url: '/judgement/vehicle/passRecord',
            icon: ''
        }, {
            id: 16,
            fid: 8,
            //name: '车型搜车',
            name: '非机动车查询',
            //url: '/judgement/vehicle/search?by=model',
            url: '/judgement/vehicle/nonMotorized-search',
            icon: ''
        }, {
            id: 17,
            fid: 3,
            name: '多维搜车',
            url: '/judgement/vehicle/frequency-analysis',
            icon: 'cars',
            toolicon: 'vehicle'
        }, {
            id: 18,
            fid: 8,
            name: '行车轨迹',
            url: '/judgement/vehicle/search?by=track',
            icon: ''
        }, {
            id: 19,
            fid: 8,
            name: '昼伏夜出',
            url: '/judgement/vehicle/nocturnal',
            icon: ''
        }, {
            id: 20,
            fid: 9,
            name: '实时视频查看',
            url: '/judgement/videoDetect/live',
            icon: ''
        }, {
            id: 21,
            fid: 3,
            name: '智能检索',
            url: '/judgement/videoDetect/search',
            icon: 'videosearch',
            toolicon: 'videosearch'
        }, {
            id: 22,
            fid: 3,
            name: '视频处理',
            url: '/judgement/videoDetect/process',
            icon: 'videoprocess',
            toolicon: 'videodetect'
        }, {
            id: 23,
            fid: 10,
            name: '视图库',
            url: '',
            icon: ''
        }, {
            id: 24,
            fid: 10,
            name: '案件统计',
            url: '',
            icon: ''
        }, {
            id: 25,
            fid: 10,
            name: '串并案统计',
            url: '',
            icon: ''
        }, {
            id: 26,
            fid: 3,
            name: '动态比对',
            url: '/face/face-find',
            icon: 'facestatic',
            toolicon: 'facetrack'
        }, {
            id: 27,
            fid: 11,
            name: '人脸比对',
            url: '/face/face-retrieve?type=compare',
            icon: ''
        }, {
            id: 28,
            fid: 11,
            name: '布控预警',
            url: '/face/face-grab',
            icon: ''
        }, {
            id: 29,
            fid: 11,
            name: '人脸技战法',
            url: '',
            icon: ''
        }, {
            id: 30,
            fid: 12,
            name: '情报录入',
            url: '',
            icon: ''
        }, {
            id: 31,
            fid: 12,
            name: '情报统计',
            url: '',
            icon: ''
        }, {
            id: 32,
            fid: 12,
            name: '发起合成作战',
            url: '',
            icon: ''
        }, {
            id: 33,
            fid: 12,
            name: '合成作战统计',
            url: '',
            icon: ''
        }, {
            id: 34,
            fid: 12,
            name: '大数据分析',
            url: '',
            icon: ''
        }, {
            id: 35,
            fid: 3,
            name: '工具下载',
            url: '/tool/toolDownload',
            icon: 'tools'
        }
        /*, {
             id: 36,
             fid: 4,
             name: '组织用户',
             url: '',
             icon: 'organizational'
             }*/
        , {
            id: 36,
            fid: 4,
            name: '日志管理',
            url: '/platform/logger/view',
            icon: 'logger'
        }, {
            id: 37,
            fid: 4,
            name: '字典管理',
            url: '/platform/config/datadictionary',
            icon: 'dictionary'
        }, {
            id: 38,
            fid: 4,
            name: '流程管理',
            url: '/platform/processManagement/processConfiguration',
            icon: 'process'
        }, {
            id: 39,
            fid: 4,
            name: '地图配置',
            url: '/platform/config/mapManagement',
            icon: 'mapManagement'
        }, {
            id: 40,
            fid: 4,
            name: '数据统计',
            url: '',
            icon: ''
        }, {
            id: 41,
            fid: 4,
            name: '运维管理',
            url: '/platform/monitor/cpu',
            icon: 'yunwei'
        }, {
            id: 42,
            fid: 4,
            name: '组织管理',
            url: '/platform/manager/organizational',
            icon: 'organizational'
        }, {
            id: 43,
            fid: 4,
            name: '用户管理',
            url: '/platform/manager/user',
            icon: 'users'
        }, {
            id: 44,
            fid: 4,
            name: '角色管理',
            url: '/platform/manager/role',
            icon: 'role'
        }, {
            id: 45,
            fid: 4,
            name: '公告管理',
            url: '/platform/message/notice',
            icon: 'notice'
        }, {
            id: 46,
            fid: 46,
            name: '案件管理',
            tag: 'case'

        }, {
            id: 47,
            fid: 46,
            name: '案件列表',
            url: '/case-manager/case-list',
            icon: 'caselist'
        }, {
            id: 48,
            fid: 3,
            name: '监控点管理',
            url: '/case-manager/moniter-manager',
            icon: 'moniter'
        }, {
            id: 49,
            fid: 4,
            name: '系统参数',
            url: '/platform/config/parameter',
            icon: 'operation'
        }, {
            id: 50,
            fid: 1,
            name: '已办事项',
            url: '/formflow/agency-task?type=done',
            icon: 'yiban'
        }, {
            id: 51,
            fid: 1,
            name: '草稿箱',
            url: '/formflow/draftbox?type=1',
            icon: 'draftbox'
        }, {
            id: 52,
            fid: 3,
            name: '静态比对',
            url: '/face/face-retrieve',
            icon: 'facestatic',
            toolicon: 'facesearch'
        }, {
            id: 53,
            fid: 3,
            name: '摘要列表',
            url: '/judgement/videoDetect/videoList',
            icon: 'videolist'
        }, {
            id: 54,
            fid: 4,
            name: '人脸设置',
            url: '/face/faceManagement',
            icon: 'facestatic'
        }, {
            id: 55,
            fid: 2,
            name: '案件统计',
            url: '/dataStatistics/caseStatistics',
            icon: 'casestatistics',
            toolicon: 'casestatistics'
        }, {
            id: 56,
            fid: 2,
            name: '合成作战统计',
            url: '/datastatistics/flow-statistics',
            icon: 'flowstatistics',
            toolicon: 'flowstatistics'
        }, {
            id: 57,
            fid: 4,
            name: '链接管理',
            url: '/platform/linkSetting/source',
            icon: 'links'

        }, {
            id: 58,
            fid: 1,
            name: '发起合成',
            url: '/formflow/composite/flow-caselist/0',
            icon: 'startflow'
        }, {
            id: 59,
            fid: 1,
            name: '战果分配',
            url: '/formflow/composite/flow-caselist/1',
            icon: 'allot'
        }
    ],
    NUM_PER_COL: 6
};

module.exports = constant;