<template>
  <div id="topbar" class="topbar">
  <div class="brand png_bg"></div>
  <div class="nav js-nav clearfix">
        <router-link v-for="navobj in menuList " :key="navobj.id" :to="navobj.url" :class="{active: navobj.current}" :data-tag="navobj.tag" :data-id="navobj.id">{{navobj.name}}</router-link>
    </div><div class="menu-box">
      <div class="menu-list" style="display: none">
             <ul v-for="(navList,index) in menuList" v-if="!!navList.tag" :class="'ul-div clearfix menu-'+navList.tag" style="display: none">
                <li class="ul-div-li" v-for="(subNavList,index) in navList.children" >
                    <router-link  :to='subNavList.url'  :class="subNavList.current?'li-icon menu-icon-' + subNavList.icon + 'icon-active' : 'li-icon menu-icon-' + subNavList.icon"  ></router-link>  
                    <router-link  :to='subNavList.url' :data-type="subNavList.current ? 'active': ''" :class="subNavList.current? 'li-text active' : 'li-text' ">{{subNavList.name}}</router-link>                  
                </li> 
             </ul>
      </div>
    </div>
  

    <ul class="manager clearfix">
      <li id="logout" title="退出系统" @click="logout">
        <span class="line-bg"></span>
        <a href="javascript:void(0)" class="icon icon-logout png_bg"></a>
      </li>
    <li class="version" id="version" title="关于系统" >
      <span class="line-bg"></span>
      <a href="javascript:void(0)" class="icon version-icon png_bg"></a>
    </li>
    <li class="tooldownload" title="工具下载">
        <span class="line-bg"></span>
        <a href="/tool/toolDownload" class="icon tooldownload-icon png_bg"></a>
      </li>
      <li class="message-pan js-alarm" title="消息">
        <span class="line-bg"></span>
        <a href="/platform/message/notice" class="icon iocn-pan png_bg"></a>
        <!--<span class="icon message-count png_bg"></span>-->
      </li>
      <li id="userInfo">
        <span class="line-bg"></span>
        <div class="portrait">
          <img src="" onerror="" id="small-head-pic" width="20" height="20" class="png_bg"/>
          <span class="name" title=""><i class="arrow-icon"></i></span>
        </div>
        <div class="person-content">
          <i class="arrow-position"></i>
          <div class="upload-photo">
            <div id="use-man" class="upload-img pull-left">
              <img id="big-head-pic" src="/static/image/head/0default.png" width="80" height="80">
              <div class="img-modal">
                <div class="modal-bg"></div>
                <span class="title">更改头像</span>
              </div>
            </div>
            <div class="case-number pull-left">
              <div class="case-number-top mb10">
                <a class="number" href="javascript:;"></a>
                <p class="title">部门接收的合成单</p>
              </div>
              <div class="case-number-bottom">
                <a class="number" href="javascript:;"></a>
                <p class="title">部门发起的合成单</p>
              </div>

            </div>
          </div>
          <div class="operation-content clearfix" >
            <!--<div class="person pull-left">
              <i class="icon icon-person png_bg"></i>
              <p>个人信息</p>
            </div>-->
            <div id="changePwd" class="amend-password pull-left">
              <i class="icon icon-password png_bg"></i>
              <p>修改密码</p>
             </div>
            <a href="/tool/toolDownload"  class="my-tool pull-left" style="color:#666">
              <i class="icon icon-tool png_bg"></i>
              <p>我的工具</p>
            </a>
          </div>
          <a href="javascript:;" id="logoutbtn" class="btn-icon-blue logout">
            <i class="icon icon-logout png_bg"></i>
            <span>退出系统</span>
          </a>
        </div>
      </li>
      <li class="volume">
        <span class="today mr5">访问量：{{accessCount}}</span>
        <span>总访问量：{{accessTotalCount}}</span>
      </li>
    </ul>
   <!--  <router-view></router-view> -->
</div>


</template>

<script>
    import constant from '../common/js/constant.js'
    export default {
        name: 'topbar',
        mounted() {

            var menus = JSON.parse(sessionStorage.getItem('menuList'));
            this.menuList = this.createMenu(menus).navList || [];
     
            this.menuList[0].current = true;
            setTimeout(() => {
                this.loadMenu();
            }, 300);
            this.loginStatistics();
            this.setMenuFun();
        },
       
        data() {
            return {
                menuList: [],
                accessTotalCount: 0,
                accessCount: 0
            }
        },
        watch: {
        '$route' (to, from) {
                // 对路由变化作出响应...
                this.setMenuFun();
            }
        },
        methods: {
            setMenuFun(){
                 console.log(this.$route);
                let current = this.$route.meta;
                 console.log(current);
                 _.map(this.menuList,(menu)=>{
                        this.$set(menu,'current', menu.id  === current.fid);
                        _.map(menu.children,(item)=>{
                           // item.current = item.id  === current.id;
                            this.$set(item,'current', item.id  === current.id);
                        })
                 })
                  console.log(this.menuList)
            },
            loginStatistics() {
                AJAX.loginStatistics().then((res) => {
                    this.accessTotalCount = res.body.data.accessTotalCount;
                    this.accessCount = res.body.data.accessCount;
                })
            },
            eldership(id) {
                var ship = 0;
                while (constant.MENU_LIST[id].fid !== id) {
                    id = constant.MENU_LIST[id].fid;
                    ship++;
                }
                return {
                    id: id,
                    ship: ship
                };
            },
            
            createMenu(list) {

                var ids = [];

                constant.MENUIDS.forEach(function(id) {
                    //所有用户默认有的权限
                    if (id === 0) {
                        ids.push(id);
                        return false;
                    }

                    list.forEach(function(item) {
                        if (item.menuId === id) {
                            ids.push(id);
                        }
                    });
                });

                //赋值url地址
                var navList = [],
                    nav = {},
                    subNav = {},
                    col = [],
                    colnum = 0,
                    menu = {};

                ids.forEach((id, index) => {
                    var suffix = index;
                    while (!constant.MENU_LIST[ids[suffix]].url && suffix < ids.length - 1) {
                        suffix++;
                    }
                    menu = constant.MENU_LIST[id];
                    var elder = this.eldership(id);
                    if (elder.ship === 0) {
                        if (colnum > 0) {
                            subNav.children.push(col);
                            col = [];
                            colnum = 0;
                        }
                        nav = {
                            id: menu.id,
                            name: menu.name,
                            url: constant.MENU_LIST[ids[suffix]].url,
                            tag: menu.tag || '',
                            children: []
                        };
                        navList.push(nav);
                    } else if (elder.ship === 1) {
                        if (colnum > 0) {
                            subNav.children.push(col);
                            col = [];
                            colnum = 0;
                        }
                        subNav = {
                            id: menu.id,
                            name: menu.name,
                            url: constant.MENU_LIST[ids[suffix]].url,
                            icon: menu.icon,
                            children: []
                        };
                        nav.children.push(subNav);
                    } else {
                        var leafNav = {
                            id: menu.id,
                            name: menu.name,
                            url: constant.MENU_LIST[ids[suffix]].url,
                            icon: menu.icon
                        };
                        colnum++;
                        col.push(leafNav);
                        if (colnum % constant.NUM_PER_COL === 0 || index === ids.length - 1) {
                            subNav.children.push(col);
                            col = [];
                            colnum = 0;
                        }
                    }
                });

                return {
                    navList: navList,
                    ids: ids
                };
            },
            loadMenu() {
                var $box = $('.menu-box');
                var $bar = $('#topbar');
                var $nav = $('.js-nav');
                var timeouter = 0;
                var curTag = '';

                $box.children().each((index, item) => {

                    //三级菜单选中时，需要把图标高亮
                    $(item).find('li .li-text').each((idx, el) => {
                        var active = $(el).attr('data-type') || false;
                        if (active) {
                            $(el).parent().find('.li-icon').addClass('icon-active')
                        }
                    });
                    $(item).find('li .li-text').on('mouseenter', function() {
                        var isactive = $(this).attr('data-type') || false;
                        if (!isactive) {

                            $(this).parent().find('.li-icon').addClass('icon-active')

                        }
                    });
                    $(this).find('li .li-text').on('mouseleave', function() {
                        var isactive = $(this).attr('data-type') || false;
                        if (!isactive) {
                            $(this).parent().find('.li-icon').removeClass('icon-active');
                        }
                    });

                });

                $nav.children().each(function(index, item) {
                    var tag = $(item).data('tag');

                    $(item).on('mouseenter', function() {
                        $(this).addClass('hover').siblings().removeClass('hover');

                        if (curTag && curTag === tag) {
                            return;
                        }

                        clearTimeout(timeouter);
                        if (tag) {

                            var curNav = $box.find('.menu-' + tag);
                            curNav.show().siblings().hide();
                            $box.find('.menu-list').show();
                            $box.stop(true, true).slideDown();
                        } else {
                            $box.stop(true, true).slideUp();
                            $box.find('.menu-' + curTag).hide();
                        }
                        curTag = tag;
                    });
                });
                $bar.on('mouseleave', function() {
                    clearTimeout(timeouter);
                    $box.stop(true, true);
                    timeouter = setTimeout(function() {
                        $box.stop(true, true).slideUp();
                        $box.find('.menu-' + curTag).hide();
                        curTag = '';
                        $nav.children().each(function() {
                            $(this).removeClass('hover');
                        });
                    }, 100);
                });

                $box.find('.menu').each(function(index, item) {
                    $(item).on('mouseenter', function() {
                        var match = $(this).attr('class').match(/menu-(\w+)/);
                        //$nav.find('[data-tag=' + match[1] + ']').triggerHandler('mouseenter');
                    });
                });
                //动态计算菜单-平台管理的位置
                $(window).on('resize', function() {
                    $('.sub-nav .menu-platform').css({
                        'padding-right': $('body').width() - 905
                    });
                }).triggerHandler('resize');

                // doubleScreen($bar);
            },
            logout() {
                this.$confirm('确定要退出【合成作战平台】吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    AJAX.logout().then(res => {

                        this.$router.replace('/login');
                    })
                }).catch(() => {

                });

            },
            menuFocus(data) {
                return data.id === 0;

            }
        },
        computed: {
            getCurrentInde: function() {

                return this.$router.id;
            }
        }
    }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>