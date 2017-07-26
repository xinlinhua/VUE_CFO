<template>
  <div class="login-con">
   <div class="login-img login">
     <div class="g-msc m-msc3">
       <div class="g-wid1000">
         <ul class="animatecircles">
           <li class="ancir1"> <img class="circleimg1" src="/static/image/login/ring1.png"></li>
           <li class="ancir2"> <img class="circleimg2" src="/static/image/login/ring2.png"></li>
           <li class="ancir3"> <img class="circleimg3" src="/static/image/login/ring3.png"></li>
           <li class="ancir4"> <img class="circleimg4" src="/static/image/login/ring3.png"></li>
           <li class="ancir5"> <img class="circleimg5" src="/static/image/login/ring3.png"></li>
         </ul>
       </div>
       <div class="login-btn" v-on:click="login">
       	<input type="button" class="btn-success btn-lg btn-block" id="sub" value="" >
       </div>
     </div>
       <div class="login-input" >
       	<input type="text" placeholder="请输入用户名" class="user" v-model="userName" id="userName" autocomplete="off"  >
       	<input type="password" placeholder="请输入密码" class="password" v-model="password" id="password" autocomplete="off" @keyup.enter="login">
       </div>
   </div>
  </div>
</template>
<script>
    import '../../static/lib/canvas-login.js'
    import constant from '../common/js/constant.js'
    export default {
        name: 'login',


        data() {
            return {
                remember: false,
                userName: '',
                password: '',
                step: ''
            }
        },
        mounted() {
            var config = {
                vx: 4,
                vy: 4,
                height: 2,
                width: 2,
                count: 100,
                color: "121, 162, 185",
                stroke: "100,200,180",
                dist: 6000,
                e_dist: 20000,
                max_conn: 10
            };

            //CanvasParticle(config);
        },
        methods: {
            login() {
                 console.log(this.$ajax);
                if (this.userName === '' || this.password === '') {
                    this.$message({
                        message: '用户名或密码不能为空',
                        type: 'warning'
                    });
                    return;
                }


                let req = {
                    userName: this.userName,
                    password: this.password,
                    type: 1


                };
               
                 AJAX.login(req).then(res => {
                    var data = res.body;

                    if (data.resultCode === '200') {
                        sessionStorage.setItem('menuList', JSON.stringify(data.data.menus));

                        this.$router.push('/home');
                    } else {
                        this.$message({
                            message: data.resultMessage,
                            type: 'warning'
                        })
                    }

                }, function() {

                })


            }
        }
    }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @charset "utf-8";
    .login-con {
        background: #00152a url(/static/image/login/login-bg.png);
        background-size: cover;
        min-width: 800px;
        overflow-y: hidden;
        min-height: 600px;
        height: 100%;
    }
    
    ol,
    ul {
        list-style: none;
    }
    
    li {
        list-style-type: none;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    
    img {
        border: 0;
    }
    
    a {
        &:link,
        &:visited {
            outline: 0;
            color: #666;
            text-decoration: none;
        }
        &:hover {
            color: #ff8d33;
        }
    }
    
    .login-img {
        background: url(/static/image/login/Login-img.png);
        width: 960px;
        height: 480px !important;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -280px;
        margin-left: -480px;
        overflow: hidden;
        .login-input {
            position: absolute;
            bottom: 147px;
            left: 288px;
            height: 50px;
            *top: 280px;
            z-index: 2;
            .user {
                height: 40px;
                line-height: 40px;
                border: 0;
                outline: none;
                font-size: 14px;
                width: 160px;
            }
            .password {
                height: 40px;
                line-height: 40px;
                border: 0;
                outline: none;
                font-size: 14px;
                width: 160px;
                margin-left: 75px;
            }
            input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
            }
        }
    }
    
    .footer {
        background: url(/static/image/login/footer.png) center center no-repeat;
        width: 850px;
        height: 36px;
        position: absolute;
        left: 50%;
        margin-left: -425px;
        bottom: 20px;
    }
    
    .login-btn {
        background: url(/static/image/login/login-btn.png);
        position: absolute;
        right: 109px;
        top: 267px;
        width: 68px;
        height: 68px;
        z-index: 2;
        &:hover {
            background-position: 0 -68px;
        }
        input {
            width: 100%;
            height: 68px;
            opacity: 0;
            filter: alpha(opacity=0);
            cursor: pointer;
        }
    }
    
    .g-msc {
        width: 100%;
        overflow: hidden;
    }
    
    .g-wid1000 {
        width: 1000px;
        height: 400px;
        margin: 0 auto;
        position: absolute;
    }
    /*火狐*/
    
    @keyframes rotate {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    /* Safari 和 Chrome */
    
    @-webkit-keyframes rotate {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    /*IE*/
    
    @-ms-keyframes rotate {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    /*火狐*/
    
    @-moz-keyframes rotate {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    
    .m-msc3 .animatecircles {
        li {
            position: absolute;
            &.ancir1 {
                left: 142px;
                top: 88px;
            }
            &.ancir2 {
                right: 124px;
                top: 242px;
            }
            &.ancir3 {
                left: 113px;
                top: 192px;
            }
            &.ancir4 {
                left: 22px;
                top: 327px;
            }
            &.ancir5 {
                right: 69px;
                top: 124px;
            }
        }
        img {
            display: inline-block;
            -moz-animation: rotate 5s infinite linear;
            -webkit-animation: rotate 5s infinite linear;
            animation: rotate 5s infinite linear;
            &.circleimg1 {
                width: 60px;
            }
            &.circleimg2 {
                width: 118px;
            }
            &.circleimg3,
            &.circleimg4,
            &.circleimg5 {
                width: 24px;
            }
        }
    }
</style>