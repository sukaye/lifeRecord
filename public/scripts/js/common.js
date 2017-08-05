function getPath() {
    var fullPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var index = fullPath.indexOf(pathName);
    var host = fullPath.substring(0, index);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return host
        //return host + projectName;
}


//js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPath + projectName);
}


// add for $.put()  and $.delete()
jQuery.each(["put", "delete"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});
