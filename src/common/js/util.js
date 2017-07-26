 function isNull(str) {
     if (str == "")
         return true;
     var regu = "^[ ]+$";
     var re = new RegExp(regu);
     return re.test(str);
 }
 export default {
     IP: /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/,
     isIP(strIP) {
         if (isNull(strIP))
             return false;
         var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g // 匹配IP地址的正则表达式
         if (re.test(strIP)) {
             if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256)
                 return true;
         }
         return false;
     },
     isIPs(strIP) {
         if (isNull(strIP))
             return false;
         var re = /^(\d+)\.(\d+)\.(\d+)\.\[(\d+)\-(\d+)\]$/g // 匹配IP地址的正则表达式
         if (re.test(strIP)) {
             if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256 && RegExp.$5 < 256 && RegExp.$4 < RegExp.$5)
                 return true;
         }
         return false;
     },
     //主机名
     isNode(strNode) {
         if (isNull(strNode))
             return false;
         var re = /^[a-zA-Z][a-zA-Z0-9]*$/g // 匹配主机名的正则表达式
         if (re.test(strNode)) {
             return true;
         }
         return false;
     },
     //端口号
     isPort(strPort) {
         if (isNull(strPort))
             return false;
         var re = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
         if (re.test(strPort)) {
             return true;
         }
         return false;
     },
     getSessionData(type) {
         return JSON.parse(sessionStorage.getItem(type) || '""');
     },
     setSessionData(type, data) {
         sessionStorage.setItem(type, JSON.stringify(data));
     },
     getLocalData(type) {
         return JSON.parse(localStorage.getItem(type) || '""');
     },
     setLocalData(type, data) {
         localStorage.setItem(type, JSON.stringify(data));
     },
     //在固定日期上添加几秒
     addSeconds: function(date, value) {
         date.setSeconds(date.getSeconds() + value);
         return date;
     },
     /* 说明：时间格式处理(年/月/日 时:分:秒)
      *  返回值类型：对象
      */
     formatDate: function(DateIn) {
         var Year = 0;
         var Month = 0;
         var Day = 0;
         var Hour = 0;
         var Minute = 0;
         var Second = 0;
         var CurrentDate = "";
         var CurrentHms = ""; //当前时分秒

         //初始化时间
         Year = DateIn.getYear() + 1900;
         Month = DateIn.getMonth() + 1;
         Day = DateIn.getDate();
         Hour = DateIn.getHours();
         Minute = DateIn.getMinutes();
         Second = DateIn.getSeconds();

         CurrentDate = Year + "/";
         if (Month >= 10) {
             CurrentDate = CurrentDate + Month + "/";
         } else {
             CurrentDate = CurrentDate + "0" + Month + "/";
         }
         if (Day >= 10) {
             CurrentDate = CurrentDate + Day;
         } else {
             CurrentDate = CurrentDate + "0" + Day;
         }

         if (Hour >= 10) {
             CurrentDate = CurrentDate + " " + Hour;
             CurrentHms = CurrentHms + Hour;
         } else {
             CurrentDate = CurrentDate + " 0" + Hour;
             CurrentHms = CurrentHms + " 0" + Hour;
         }

         if (Minute >= 10) {
             CurrentDate = CurrentDate + ":" + Minute;
             CurrentHms = CurrentHms + ":" + Minute;
         } else {
             CurrentDate = CurrentDate + ":0" + Minute;
             CurrentHms = CurrentHms + ":0" + Minute;
         }

         if (Second >= 10) {
             CurrentDate = CurrentDate + ":" + Second;
             CurrentHms = CurrentHms + ":" + Second;
         } else {
             CurrentDate = CurrentDate + ":0" + Second;
             CurrentHms = CurrentHms + ":0" + Second;
         }
         return {
             CurrentDate: CurrentDate, // 年/月/日 时：分：秒
             CurrentHms: CurrentHms // 时：分：秒
         };
     },
     jumpPage: function(url) {
         window.open(url, '_blank', 'menubar=0,location=1,resizable=1,scrollbars=1,width=1280,height=768');
     }
 }