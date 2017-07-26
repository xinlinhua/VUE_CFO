// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'

import axios from 'axios'

import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import './service.js'
Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.$ajax = axios;
Vue.http.interceptors.push(function(request, next) {
    // 请求发送前的处理逻辑
    next(function(response) {
        // 请求发送后的处理逻辑
        // 根据请求的状态，response参数会返回给successCallback或errorCallback     
        // debugger     
        //判断是否超时
        if (response.body.resultCode === '401') {
            Message.warning("登陆超时，请重新登陆！");
            router.replace('/login');
        } else {
            return response
        }

    });
});

Vue.http.options.emulateJSON = true;
import 'common/less/common.less'
import 'common/less/base.less'

//路由拦截器
router.beforeEach((to, from, next) => {

        next();
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})