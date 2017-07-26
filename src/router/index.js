import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Login from 'components/Login'
import Home from 'components/Home'
import Topbar from 'components/topbar'
import FlowCaselist from 'components/formflow/flow-caselist'
import notFoundPage from 'components/error'
//import FlowScorelist from 'components/flow-scorelist'
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        /*{
                path: '/',
                name: 'Hello',
                component: Hello
            }, */
        { path: '*', component: notFoundPage },
        { path: '/', redirect: '/login' }, {
            path: '/login',
            component: Login
        },
        /*{
                   path: '/topbar',
                   component: Topbar,
                   children: []
               },*/
        {
            path: '/home',
            id: 0,
             meta: {
                id: 0,
                fid: 0
            },
            components: {
                default: Topbar,
                main: Home
            }
        }, {
            path: '/formflow/composite/flow-caselist/:type',
            meta: {
                id: 58,
                fid: 1
            },
            components: {
                default: Topbar,
                main: FlowCaselist
            }
        }
    ]
})