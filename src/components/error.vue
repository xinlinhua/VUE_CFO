<template>
<div class="limitation-con clearfix">
    <div class="limitation-left">
    </div>
    <div class="limitation-right">
        <p class="first-p">很抱歉，你访问的页面不存在!</p>
        <p>请检查输入的地址是否正确！</p>
        <p class="return"><a href="#/home" class="btn btn-icon-blue js-back">返回首页</a></p>
    </div>
</div>

</template>

<script>
    export default {
        name: 'error',
        data() {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .limitation-con {
        position: absolute;
        width: 640px;
        height: 300px;
        left: 50%;
        top: 50%;
        margin-left: -320px;
        margin-top: -120px;
    }
    
    .limitation-left {
        width: 220px;
        height: 140px;
        margin: 0 auto;
        background: url(/static/image/error.png) center center no-repeat;
    }
    
    .limitation-right {}
    
    .limitation-right p {
        color: #999;
        font-size: 18px;
        text-align: center;
    }
    
    .limitation-right .first-p {
        margin-top: 20px;
        color: #666;
        font-size: 22px;
    }
    
    .limitation-right .return {
        text-align: center;
        margin-top: 40px;
    }
    
    .limitation-right .return a {
        display: inline-block;
        font-size: 12px;
        line-height: 30px;
        padding: 0px 20px;
    }
</style>