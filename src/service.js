import Vue from 'vue'

import axios from 'axios'
// const host = '127.0.0.1:80';

/*//请求拦截器
 var interceptors = function() {
 Vue.http.interceptors.push(function(request, next) {
 // 请求发送前的处理逻辑
 next(function(response) {
 // 请求发送后的处理逻辑
 // 根据请求的状态，response参数会返回给successCallback或errorCallback
 return response
 });
 });
 };*/


window.AJAX = {
    //持久化安装信息存放目录

    //登录
    login(req) {
        return Vue.http.post('/CFO_Web/login', req);
    },
    //注销
    logout() {
        return axios.post('/CFO_Web/logout');
    },

    //待办事项
    findTodoList(req) {
        return Vue.http.post('/CFO_Web/cooperation/findTodoList', req);
    },
    //已办
    findDoneList(req) {
        return Vue.http.post('/CFO_Web/cooperation/findDoneList', req);
    },

    //已发
    findSendList(req) {
        return Vue.http.post('/CFO_Web/cooperation/findSendList', req);
    },

    //案件列表
    getCooperationCaseInfo(req) {
        return Vue.http.post('/CFO_Web/cooperation/getCooperationCaseInfo', req);
    },
    caseStats(req) {
        return Vue.http.post('/CFO_Web/case/stats', req);
    },

    totalStats(req) {
        return Vue.http.post('/CFO_Web/case/totalStats', req);
    },
    getAlreadyMenus() {
        return Vue.http.post('/CFO_Web/menu/getFastMenus');
    },
    updateMenuSet(req) {
        return Vue.http.post('/CFO_Web/menu/update', req);
    },
    loginStatistics(req) {
        return Vue.http.post('/CFO_Web/loginStatistics', req);
    }

}