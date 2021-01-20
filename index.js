let oPo = document.getElementById("top");
let oUl = document.getElementById("wrap");
let html = document.createDocumentFragment();
let sign = 0;
// 项目识别参数
let pen;
// 项目id(二级菜单点击改变)
window.projectId = 1;
// 页面识别参数
window.projectName = "landingpage";
// 上传图片识别窗口（img）
let punt;

// 添加ajax
function createdata({ url, data }) {
    var index = layer.load(1, {
        shade: [0.1, '#fff']
    });
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "JSON",
        timeout: 5000,
        async: true,
        success: function (data) {
            if (data.status === 1) {
                layer.alert(data.msg, {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
                doneMenu();
                donePage("GET", "https://licat.work/page_center/project/" + window.projectId + "/" + window.projectName)
            } else {
                layer.alert(data.msg, {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        },
        error: function (e) {
            console.log(e);
            layer.close(index);
        },
        complete:function(xhr,status){
            if(status === 'timeout'){
                layer.alert('请求超时', {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        }
    });
};
// 删除ajax
function deletedata(type, url) {
    var index = layer.load(1, {
        shade: [0.1, '#fff']
    });
    $.ajax({
        type: type,
        url: url,
        data: { _method: "DELETE" },
        dataType: "JSON",
        timeout: 5000,
        async: true,
        success: function (data) {
            if (data.status === 1) {
                layer.alert(data.msg, {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                doneMenu();
                donePage("GET", "https://licat.work/page_center/project/" + window.projectId + "/" + window.projectName);
                layer.close();
            } else {
                layer.alert(data.msg, {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close();
            }
        },
        error: function (e) {
            console.log(e);
        },
        complete:function(xhr,status){
            if(status == 'timeout'){
                layer.alert('请求超时', {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        }
    });
};
// 修改ajax
function changedata(url, formdata) {
    layer.confirm('您确定要修改吗？', {
        skin:'mine emd',
        btn: ['确认', '取消'] //按钮
    }, function (index) {
        // 序列化传递的参数
        function seque(obj) {
            var str = ["_method=put"];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    layer.close(index);
                    layer.alert(data.msg, {
                        skin: 'mine' //样式类名
                        , closeBtn: 0
                    });
                    doneMenu();
                    donePage("GET", "https://licat.work/page_center/project/" + window.projectId + "/" + window.projectName);
                }
            } else {
                layer.alert('error', {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        }
        xhr.send(seque(formdata));
    });
};
// 获取页面ajax
function donePage(type, url) {
    var index = layer.load(1, {
        shade: [0.1, '#fff']
    });
    $.ajax({
        type: type,
        url: url,
        timeout: 5000,
        async: true,
        success: function (result) {
            renderPagelist(result.data);
            layer.close(index);
        },
        error: function (e) {
            layer.alert(e, {
                skin: 'mine' //样式类名
                , closeBtn: 0
            });
            layer.close(index);
        },
        complete:function(xhr,status){
            if(status == 'timeout'){
                layer.alert('请求超时', {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        }
    });
};
// 获取项目ajax
function doneMenu() {
    var index = layer.load(1, {
        shade: [0.1, '#fff']
    });
    $.ajax({
        type: "GET",
        url: "https://licat.work/page_center/project",
        timeout: 5000,
        async: true,
        success: function (result) {
            rederMenulist(result.data);
            rederToplist(result.data);
            layer.close(index);
        },
        error: function (e) {
            layer.alert(e, {
                skin: 'mine' //样式类名
                , closeBtn: 0
            });
            layer.close(index);
        },
        complete:function(xhr,status){
            if(status == 'timeout'){
                layer.alert('请求超时', {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        }
    });
};
// 获取src ajax
function donePhoto({ formdata, needo }) {
    var index = layer.load(1, {
        shade: [0.1, '#fff']
    });
    $.ajax({
        type: "POST",
        url: "https://licat.work/page_center/uploadimg",
        data: formdata,
        timeout: 5000,
        success: function (data) {
            if (data.status === 1) {
                layer.alert(data.msg, {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
                needo();
            } else {
                layer.alert(data.msg, {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        },
        error: function (e) {
            console.log(e);
            layer.close(index);
        },
        complete:function(xhr,status){
            if(status == 'timeout'){
                layer.alert('请求超时', {
                    skin: 'mine' //样式类名
                    , closeBtn: 0
                });
                layer.close(index);
            }
        }
    });
};

// 卡片弹窗（添加or修改）
// 参数：标题，获取信息操作，landingpage/auditpage(请求)
function popup({title,btn,num,collect,change,replace}){
    if($(".ww").hasClass("orange")){
        punt = 2;
        let index = layer.open({
            type: 1,
            skin: 'mine exam gray',
            shade: 0.3,
            title: title + "审核页信息", //不显示标题
            content: $('.audit'),
            btn: btn,
            success:collect,
            yes:function (index) {
                if ($("#ll1").val() === '') {
                    $("#ll1").css("border-color","red");
                    layer.tips('请选择发布日期', $("#ll1"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if ($("#ll4").val() === '') {
                    $("#ll4").css("border-color","red");
                    layer.tips('请填写标题', $("#ll4"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if ($("#ll5").val() === '') {
                    $("#ll5").css("border-color","red");
                    layer.tips('请填写图片路径', $("#ll5"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if ($("#ll8").val() === '') {
                    $("#ll8").css("border-color","red");
                    layer.tips('请填写html代码', $("#ll8"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if (!$('#ll7 input:radio[name="status"]:checked').val()) {
                    layer.tips('请选择发布状态', $("#ll7"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else {
                    let form = document.getElementById("ll7");
                    let formdata = new Object();
                    let oLac = form.getElementsByTagName("input");
                    let oInp = document.querySelectorAll("#auditform input,textarea");
                    for (let i = 0; i < oInp.length; i++) {
                        if(oInp[i].name === 'photo'){
                            i = i + 1;
                        }
                        let name = oInp[i].name;
                        let value = oInp[i].value;
                        // 获取发布状态value值
                        if (i < oLac.length) {
                            if (oLac[i].checked) {
                                formdata[oLac[i].name] = oLac[i].value;
                            }
                        }
                        formdata[name] = value;
                    };
                    console.log(formdata);
                    formdata['projectid'] = window.projectId;
                    // 区分新增/编辑，landing/auditpage函数
                    layer.close(index);
                    $(".layui-layer-shade").remove();
                    replace(formdata);
                }
                return false;
            },
            btn2:function(){
                layer.confirm('您确定要删除吗？', {
                    skin:'mine emd',
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    deletedata("POST", "https://licat.work/page_center/auditpage/" + num);
                    layer.close(index);
                })
                return false
            },
        });
        if(window.screen.width <= 750){
            layer.full(index);
        }
    }else{
        punt = 1;
        let index = layer.open({
            type: 1,
            skin: 'mine gray',
            shade: 0.3,
            title: title + "落地页信息", //不显示标题
            content: $('.landing'),
            btn: btn,
            success: collect,
            // landingpage提交事件
            yes: function (index) {
                if ($("#ss1").val() === '') {
                    $("#ss1").css("border-color","red");
                    layer.tips('请选择发布日期', $("#ss1"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if ($("#ss2").val() === '') {
                    $("#ss2").css("border-color","red");
                    layer.tips('请填写作者', $("#ss2"), {
                        tips: [2, '#3595CC'],
                        // time: 2000
                    });
                } else if ($("#ss4").val() === '') {
                    $("#ss4").css("border-color","red");
                    layer.tips('请填写页面标题', $("#ss4"), {
                        tips: [2, '#3595CC'],
                        // time: 2000
                    });
                } else if ($("#ss6").val() === '') {
                    $("#ss6").css("border-color","red");
                    layer.tips('请填写页面描述', $("#ss6"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if ($("#ss5").val() === '') {
                    $("#ss5").css("border-color","red");
                    layer.tips('请填写图片路径', $("#ss5"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                }else if ($("#ss8").val() === '') {
                    $("#ss8").css("border-color","red");
                    layer.tips('请填写html代码', $("#ss8"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if (!$('input:radio[name="grade"]:checked').val()) {
                    layer.tips('请选择页面评级', $("#ss3"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else if (!$('#ss7 input:radio[name="status"]:checked').val()) {
                    layer.tips('请选择发布状态', $("#ss7"), {
                        tips: [2, '#3595CC'],
                        time: 2000
                    });
                } else {
                    let form1 = document.getElementById("ss3");
                    let form2 = document.getElementById("ss7");
                    let formdata = new Object();
                    let oLab = form1.getElementsByTagName("input");
                    let oLac = form2.getElementsByTagName("input");
                    let oInp = document.querySelectorAll("#landingform input,#landingform textarea");
                    for (let i = 0; i < oInp.length; i++) {
                        if(oInp[i].name === 'photo'){
                            i = i + 1;
                        }
                        let name = oInp[i].name;
                        let value = oInp[i].value;
                        // 获取页面评级value值
                        if (i < oLab.length) {
                            if (oLab[i].checked) {
                                formdata[oLab[i].name] = oLab[i].value;
                            }
                        }
                        // 获取发布状态value值
                        if (i < oLac.length) {
                            if (oLac[i].checked) {
                                formdata[oLac[i].name] = oLac[i].value;
                            }
                        }
                        formdata[name] = value;
                    };
                    console.log(formdata);
                    formdata['projectid'] = window.projectId;
                    layer.close(index);
                    $(".layui-layer-shade").remove();
                    change(formdata);
                }
            },
            btn2:function(index){
                layer.confirm('您确定要删除吗？', {
                    skin:'mine emd',
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    deletedata("POST", "https://licat.work/page_center/landingpage/" + num);
                    layer.close(index);
                })
                return false
            },
        });
        if(window.screen.width <= 750){
            layer.full(index);
        }
    }
    $(".myform input").focus(function(){
        $(this).removeAttr("style");
    })
};
// 卡片模板,修改卡片，html页面
function createCard(data) {
    function calculation() {
        if (data.status) {
            return "已发布"
        } else {
            return "未发布"
        }
    }
    let oDi = document.createElement("div");
    // let oImg = document.createElement("div");
    let oPh = document.createElement("img");
    let oLeve = document.createElement("div");
    let oAll = document.createElement("div");
    let oDi1 = document.createElement("div");
    let oDi2 = document.createElement("div");
    let oDi3 = document.createElement("div");
    let oDi4 = document.createElement("div");
    let oDi5 = document.createElement("div");
    let oBo = document.createElement("button");
    // oImg.className = "photo";
    oBo.className = "edit";
    oLeve.className = "leve";
    oAll.className = "all";
    oDi4.className = "cal";
    oBo.innerText = "✐";
    oDi1.innerText = "发布日期：" + data.releasedate;
    oDi4.innerText = calculation();
    oPh.src = data.screenshot ;
    // oImg.insertAdjacentElement("beforeend", oPh);
    oDi.insertAdjacentElement("beforeend", oPh);
    oAll.insertAdjacentElement("beforeend", oDi1);
    if (data.lastupdate) {
        oDi2.innerText = "修改日期：" + data.lastupdate;
        oAll.insertAdjacentElement("beforeend", oDi2);
    }
    if (data.author) {
        oDi3.innerText = "作者：" + data.author;
        oAll.insertAdjacentElement("beforeend", oDi3);
    }
    if (data.description) {
        oDi5.innerText = "简介：" + data.description;
        oAll.insertAdjacentElement("beforeend", oDi5);
    }
    if (data.grade) {
        oLeve.innerText = data.grade;
        oDi.insertAdjacentElement("beforeend", oLeve);
    }
    oDi.insertAdjacentElement("beforeend", oAll);
    oDi.insertAdjacentElement("beforeend", oDi4);
    oDi.insertAdjacentElement("beforeend", oBo);
    
    // 卡片事件
    if(window.screen.width <= 750){
        let oYo = document.createElement("button");
        oYo.className = "prew";
        oYo.innerText = "预 览";
        oDi.insertAdjacentElement("beforeend", oYo);
        oBo.isShow = 1;
        oDi.addEventListener("click",() => {
            if(oBo.isShow){
                oBo.style.transform = "scale(1)";
                oBo.style.transition = "all .5s";
                oBo.isShow = 0;
            }else{
                oBo.style.transform = "scale(0)";
                oBo.isShow = 1;
            }
        })
        oYo.addEventListener("click",(e) => {
            e.stopPropagation();
            let index = layer.open({
                type: 2,
                skin: 'mine',
                btn: [],
                title: data.title,
                shadeClose: true,
                shade: 0.8,
                area: ['320px', '568px'],
                content: "https://licat.work/page_center/" + window.projectName + "/" + data.id + "/view#development"
            });
            layer.full(index);
        })
    }else{
        // 审核页照片默认尺寸
        // if(window.projectName != "landingpage"){
        //     oImg.style.height = "74%"
        //     oDi.addEventListener("mouseover",() => {
        //         oImg.style.height = "100%"
        //     });
        //     oDi.addEventListener("mouseleave",() => {
        //         oImg.style.height = "74%"
        //     });
        // }
        // 打开html页面
        oDi.addEventListener("click", () => {
            layer.open({
                skin: 'mine',
                type: 2,
                // btn: [],
                title: data.title,
                shadeClose: false,
                shade: false,
                maxmin: true,
                area: ['320px', '568px'],
                content: "https://licat.work/page_center/" + window.projectName + "/" + data.id + "/view#development",
            });
        });
    }
    // 修改卡片
    oBo.addEventListener("click", (e) => {
        e.stopPropagation();
        popup({
            title: "修改",
            btn: ['提交','删除页面'],
            num: data.id,
            collect: function () {
                $(".myform input").removeAttr("style");
                $(".myform").css("paddingTop","20px");
                if($(".ww").hasClass("orange")){
                    $("#ppImg").css("display","none");
                    let form = document.getElementById("ll7")
                    let oLac = form.getElementsByTagName("input");
                    let oInp = document.querySelectorAll("#auditform input,textarea");
                    for (let key in data) {
                        // 单选框checked
                        for (let i = 0; i < oLac.length; i++) {
                            if (key === oLac[i].name) {
                                if (data[key] === Number(oLac[i].value)) {
                                    oLac[i].checked = true;
                                }
                            }
                        }
                        // 遍历输入框
                        for (let i = 0; i < oInp.length; i++) {
                            if (key === oInp[i].name) {
                                oInp[i].value = data[key];
                            }
                        }
                    };
                    $("#ppImg").css("display","block");
                    $("#ppImg").attr("src",$("#ll5").val());
                }else{
                    let form1 = document.getElementById("ss3");
                    let form2 = document.getElementById("ss7");
                    let oLab = form1.getElementsByTagName("input");
                    let oLac = form2.getElementsByTagName("input");
                    let oInp = document.querySelectorAll("#landingform input,textarea");
                    // 获取卡片信息到弹窗
                    for (let key in data) {
                        // 单选框checked
                        for (let i = 0; i < oLab.length; i++) {
                            if (key === oLab[i].name) {
                                if (data[key] === oLab[i].value) {
                                    oLab[i].checked = true;
                                }
                            }
                        }
                        for (let i = 0; i < oLac.length; i++) {
                            if (key === oLac[i].name) {
                                if (data[key] === Number(oLac[i].value)) {
                                    oLac[i].checked = true;
                                }
                            }
                        }
                        // 遍历输入框
                        for (let i = 0; i < oInp.length; i++) {
                            if (key === oInp[i].name) {
                                oInp[i].value = data[key];
                            }
                        }
                    };
                    $("#preImg").css("display","block");
                    $("#preImg").attr("src",$("#ss5").val());
                }   
            },
            change: function (formdata) {
                changedata("https://licat.work/page_center/landingpage/" + data.id, formdata)
            },
            replace: function (formdata) {
                changedata("https://licat.work/page_center/auditpage/" + data.id, formdata)
            },
            cleanaudit:function(){
                layer.confirm('您确定要删除吗？', {
                    skin:'mine emd',
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    deletedata("POST", "https://licat.work/page_center/auditpage/" + data.id);
                    layer.close(index);
                })
                return false
            },
            cleanlanding:function(index){
                layer.confirm('您确定要删除吗？', {
                    skin:'mine emd',
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    deletedata("POST", "https://licat.work/page_center/landingpage/" + data.id);
                    layer.close(index);
                })
                return false
            }
        })
    });
    return oDi
};


// 刷新卡片区，post添加卡片
function renderPagelist(list) {
    let containerE = document.getElementById("cardtain");
    containerE.innerHTML = "";
    list.forEach(e => {
        containerE.insertAdjacentElement("beforeend", createCard(e));
    });
    containerE.insertAdjacentHTML("beforeend", "<div id=add><div class='lose1'></div><div class='lose2'></div></div>");
    // 添加卡片
    $("#add").on("click", () => {
        pen = 0;
        popup({
            title: "添加",
            btn: '提交',
            collect: function () {
                $(".myform").css("paddingTop","0px");
                $(".dele").addClass("hide");
                $(".myform input").removeAttr("style");
                // 清除文本信息
                if($(".ww").hasClass("orange")){
                    let oInp = document.querySelectorAll("#auditform input,textarea");
                    for(let i = 0; i<oInp.length;i++){
                        // 默认日期
                        if(oInp[i].name === 'releasedate'){
                            let date = new Date;
                            // 月份
                            if(date.getMonth() < 10){
                                var month = "0" + (date.getMonth() + 1);
                            }else{
                                var month = date.getMonth() + 1;
                            }
                            // 日期
                            if(date.getDate() < 10){
                                var day = "0" + date.getDate();
                            }else{
                                var day = date.getDate();
                            }
                            let ddd = date.getFullYear() + "-" + month + "-" + day;
                            let ddt = ddd.toString();
                            oInp[i].value = ddt;
                            i = i + 1;
                        }
                        oInp[i].value ='';
                    }
                    $("#ppImg").attr("src","#");
                    $("#ppImg").css("display","none");
                    $(".audit input[type='radio']").prop('checked', false);
                }else{
                    let oInp = document.querySelectorAll("#landingform input,textarea");
                    for(let i = 0; i<oInp.length;i++){
                        // 默认日期
                        if(oInp[i].name === 'releasedate'){
                            let date = new Date;
                            if(date.getMonth() < 10){
                                var month = "0" + (date.getMonth() + 1);
                            }else{
                                var month = date.getMonth() + 1;
                            }
                            if(date.getDate() < 10){
                                var day = "0" + date.getDate();
                            }else{
                                var day = date.getDate();
                            }
                            let ddd = date.getFullYear() + "-" + month + "-" + day;
                            let ddt = ddd.toString();
                            oInp[i].value = ddt;
                            i = i + 1;
                        }
                        oInp[i].value ='';
                    }
                    $("#preImg").attr("src","#");
                    $("#preImg").css("display","none");
                    $(".landing input[type='radio']").prop('checked', false);
                }
            },
            // 添加落地页
            change: function (formdata) {
                createdata({
                    url: "https://licat.work/page_center/landingpage", data: formdata,
                });
            },
            // 添加审核页
            replace: function (formdata) {
                createdata({
                    url: "https://licat.work/page_center/auditpage",
                    data: formdata,
                });
            }
        });
    });
    return containerE;
};
// 刷新导航栏,post添加项目
function rederMenulist(data) {
    // 清除原有导航栏
    oUl.innerHTML = "";
    oUl.insertAdjacentHTML("beforeend", "<li class='increase'>+ 添加项目</li>");
    let oaa = document.querySelector(".increase");
    // 添加项目
    $(".increase").on("click", () => {
        increase({
            title: "添加项目信息",
            btn:'提交',
            success: function () {
                $("#myproject input").removeAttr("style");
                $("#myproject").css("paddingTop","0px");
                let form = document.getElementById("myproject");
                let oInp = form.querySelectorAll("#myproject input");
                for(let i = 0; i<oInp.length;i++){
                    oInp[i].value ='';
                }
                $("#proImg").css("display","none");
                $("#proImg").attr("src","#");
            },
            change: function (formdata) {
                createdata({
                    url: "https://licat.work/page_center/project",
                    data: formdata,
                })
            }
        })
    })
    // 遍历一级菜单
    for (let i = 0; i < data.length; i++) {
        let oLi = document.createElement("li");
        let oDv = document.createElement("div");
        oDv.innerText = data[i].name;
        // 添加二级菜单与按钮
        let dlE = createDl(data[i].id);
        oLi.insertAdjacentElement("beforeend", oDv);
        oLi.insertAdjacentElement("beforeend", dlE);
        // 导航栏的伸缩
        oDv.addEventListener("click", (event) => {
            // if (event.target != oLi) return;
            if (dlE.isShow) {
                dlE.style.height = "0px";
                dlE.isShow = 0;
                dlE.style.transition = "all .5s";
            } else {
                dlE.style.height = "100px";
                dlE.isShow = 1;
                dlE.style.transition = "all .5s";
            }
        })
        // 填充header信息
        oLi.addEventListener("click", () => {
            sign = i;
            rederToplist(data)
        })
        html.appendChild(oLi);
    }
    oUl.insertBefore(html, oaa);
};
// 刷新头部信息or修改项目
function rederToplist(data){
    if(!data[sign]){
        sign = 0;
        window.projectId = 1;
        window.projectName = "landingpage";
    }
    oPo.innerHTML = "";
    let oli1 = document.createElement("li");
    let oIm = document.createElement("img");
    let oSpan = document.createElement("span");
    oli1.insertAdjacentElement("beforeend", oIm);
    oli1.insertAdjacentElement("beforeend", oSpan);
    let oli2 = document.createElement("li");
    let oli3 = document.createElement("li");
    let oli4 = document.createElement("li");
    oli1.className = "app1";
    oli2.className = "app2";
    oli3.className = "app3";
    oli4.className = "app4";
    oli2.innerText = "简介";
    oIm.src = data[sign].gravatar;
    oSpan.innerText = data[sign].teacher;
    if (window.screen.width <= 750) {
        oli3.innerText = "护肤版块";
        oli4.innerText = "办公地点";
    } else {
        oli3.innerText = data[sign].keywords;
        oli4.innerText = "办公地点：" + data[sign].office;
    }
    oPo.insertAdjacentElement("beforeend", oli1);
    oPo.insertAdjacentElement("beforeend", oli2);
    oPo.insertAdjacentElement("beforeend", oli3);
    oPo.insertAdjacentElement("beforeend", oli4);
    // 修改项目
    $(".app1").on("click",() => {
        let result = data[sign]
        increase({
            title: "修改项目信息",
            btn: ['提交','删除项目'],
            num: result.id,
            success: function () {
                $("#myproject input").removeAttr("style");
                $("#myproject").css("paddingTop","20px");
                let oInp = document.querySelectorAll("#myproject input");
                for (let key in result) {
                    // 遍历输入框
                    for (let j = 0; j < oInp.length; j++) {
                        if (key === oInp[j].name) {
                            oInp[j].value = result[key];
                        }
                    }
                }
                $("#proImg").css("display","block");
                $("#proImg").attr("src",$("#pp5").val());
            },
            change: function (formdata) {
                console.log(result.id);
                console.log(window.projectId + "/" + window.projectName);
                changedata("https://licat.work/page_center/project/" + result.id, formdata)
            }
        }) 
    });
    // 头部点击事件
    $(".app2").on("click", function () {
        layer.tips(data[sign].description, $(".app2"), {
            tips: [1, '#2D3A4E'],
            time: 4000
        });
    });
    if ($(window).width() <= 750) {
        $(".app3").on("click", () => {
            layer.tips(data[sign].keywords, $(".app3"), {
                tips: [1, '#2D3A4E'],
                time: 2000
            })
        });
        $(".app4").on("click", () => {
            layer.tips(data[sign].office, $(".app4"), {
                tips: [1, '#2D3A4E'],
                time: 2000
            })
        });
    }
};

// 二级菜单（导航）
function createDl(i) {
    let dlE = document.createElement("dl");
    dlE.className = "ap";
    let ddE1 = document.createElement("dd");
    let aE1 = document.createElement("a");
    aE1.href = "javascript:;";
    aE1.className = "aa qq";
    aE1.id = "aa" + i;
    aE1.insertAdjacentHTML("beforeend", "落地页");
    // aE1.addEventListener("click", ddhandle.bind(aE1));
    ddE1.insertAdjacentElement("beforeend", aE1);
    dlE.insertAdjacentElement("beforeend", ddE1);

    let ddE2 = document.createElement("dd");
    let aE2 = document.createElement("a");
    aE2.className = "aa ww";
    aE2.id = "bb" + i;
    aE2.href = "javascript:;";
    aE2.insertAdjacentHTML("beforeend", "审核页");
    // aE2.addEventListener("click", ddhandle.bind(aE2));
    ddE2.insertAdjacentElement("beforeend", aE2);
    dlE.insertAdjacentElement("beforeend", ddE2);

    dlE.style.height = "0px";
    dlE.style.overflow = "hidden";
    if (i === window.projectId) {
        if (window.projectName === "landingpage") {
            aE1.classList.add("orange");
            dlE.style.height = "100px";
            dlE.isShow = 1;
        }
        else {
            aE2.classList.add("orange");
            dlE.style.height = "100px";
        }
    }

    // 二级菜单监听事件(i = data[i].id)
    dlE.firstChild.addEventListener("click", () => {
        donePage("GET", "https://licat.work/page_center/project/" + i + "/landingpage");
        window.projectName = "landingpage";
        window.projectId = i;
        $(".aa").removeClass("orange");
        $("#aa" + i).addClass("orange");
        closeMtc();
    });
    dlE.lastChild.addEventListener("click", () => {
        donePage("GET", "https://licat.work/page_center/project/" + i + "/auditpage");
        window.projectName = "auditpage";
        window.projectId = i;
        $(".aa").removeClass("orange");
        $("#bb" + i).addClass("orange");
        closeMtc();
    });
    return dlE;
};

// m端导航
(function () {
    // 移动端点击展开导航栏
    $("#btn").on("click", () => {
        if (window.screen.width <= 750) {
            $("#btn").attr("class", "hide");
            $("#wrap").removeClass("back");
            // $("#wrap").css("display","block");
            $("#wrap").css("transition","all .5s");
            $("#tc").removeClass("hide");
        }
    })
    // 点击阴影收起
    $("#tc").on("click", () => {
        closeMtc();
    })
})();

// 项目弹窗
function increase({ title,btn,num,success, change }) {
    let index = layer.open({
        type: 1,
        shade: 0.2,
        shadeClose:true,
        skin: 'mine exam gray',
        id: "pprroo",
        title: title, //不显示标题
        content: $('.bigger'),
        btn: btn,
        success: success,
        yes: function (index) {
            if ($("#pp1").val() === '') {
                $("#pp1").css("border-color","red");
                layer.tips('请填写项目名称', $("#pp1"), {
                    tips: [2, '#3595CC'],
                    time: 2000
                });
            } else if ($("#pp2").val() === '') {
                $("#pp2").css("border-color","red");
                layer.tips('请填写老师', $("#pp2"), {
                    tips: [2, '#3595CC'],
                    time: 2000
                });
            } else if ($("#pp3").val() === '') {
                $("#pp3").css("border-color","red");
                layer.tips('请填写项目描述', $("#pp3"), {
                    tips: [2, '#3595CC'],
                    time: 2000
                });
            } else if ($("#pp4").val() === '') {
                $("#pp4").css("border-color","red");
                layer.tips('请填写关键字', $("#pp4"), {
                    tips: [2, '#3595CC'],
                    time: 2000
                });
            } else if ($("#pp5").val() === '') {
                $("#pp5").css("border-color","red");
                layer.tips('请填写头像路径', $("#pp5"), {
                    tips: [2, '#3595CC'],
                    time: 2000
                });
            } else if ($("#pp6").val() === '') {
                $("#pp6").css("border-color","red");
                layer.tips('请填写办公地点', $("#pp6"), {
                    tips: [2, '#3595CC'],
                    time: 2000
                });
            } else {
                let form = document.getElementById("myproject");
                let formdata = new Object();
                let oInp = form.querySelectorAll("#myproject input");
                for (let i = 0; i < oInp.length; i++) {
                    if(oInp[i].name === 'photo'){
                        i = i+1;
                    }
                    let name = oInp[i].name;
                    let value = oInp[i].value;
                    formdata[name] = value;
                };
                layer.close(index);
                change(formdata);
            }
        },
        btn2:function(index){
            layer.confirm('您确定要删除吗？', {
                skin:'mine emd',
                btn: ['确认', '取消'] //按钮
            }, function () {
                deletedata("POST", "https://licat.work/page_center/project/" + num);
                layer.close(index);
            })
            return false
        },
    });
    $("#myproject input").focus(function(){
        $(this).removeAttr("style");
    })
    if(window.screen.width <= 750){
        layer.full(index);
    }
}


// 初始化界面
(function () {
    if (window.screen.width <= 750){
        $("#wrap").addClass("back");
    }
    var index = layer.load(1, {
        shade: [0.1, '#fff']
    });
    $.ajax({
        type: "GET",
        url: "https://licat.work/page_center/project",
        success: function (result) {
            rederMenulist(result.data)
            doneMenu();
            donePage("GET", "https://licat.work/page_center/project/" + result.data[0].id + "/landingpage");
            layer.close(index);
        },
        error: function (e) {
            console.log(e);
            layer.close(index);
        }
    });
})();

// 图片上传
function uploade(file) {
    if (!file.files || !file.files[0])
        return;
    // 限制图片大小
    if(file.files[0].size>(500*1024)){
        layer.alert('图片大小超过500K', {
            skin: 'mine' //样式类名
            , closeBtn: 0
        });
        return
    }
    let reader = new FileReader;
    var formData = new FormData();
    formData.append('photo', file.files[0]);
    reader.onload = function (evt) {
        // 限制图片分辨率
        let image = new Image();
        image.src = evt.target.result;
        image.onload = function(){
            if(this.width < 320 || this.height < 568){
                layer.alert('图片尺寸最小为 320*568', {
                    skin: 'mine' //样式类名 `
                    , closeBtn: 0
                });
            }else{
                if(punt === 1){
                    document.getElementById("preImg").src = evt.target.result;
                    document.getElementById("preImg").style.display = "block";
                }else{
                    document.getElementById("ppImg").src = evt.target.result;
                    document.getElementById("ppImg").style.display = "block";
                }
                var index = layer.load(1, {
                    shade: [0.1, '#fff']
                });
                $.ajax({
                    type: "POST",
                    url: "https://licat.work/page_center/uploadimg",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data.status === 1) {
                            layer.alert('上传成功', {
                                skin: 'mine' //样式类名
                                , closeBtn: 0
                            });
                            layer.close(index);
                            if(punt === 1){
                                $("#ss5").val(data.src);
                            }else{
                                $("#ll5").val(data.src)
                            }
                        } else {
                            layer.alert('上传失败', {
                                skin: 'mine' //样式类名
                                , closeBtn: 0
                            });
                        }
                    },
                    error: function (e) {
                        console.log(e);
                        layer.close(index);
                    }
                });
            }
        }
    }
    reader.readAsDataURL(file.files[0]);
};
// 头像上传
function headload(file){
    if (!file.files || !file.files[0])
        return;
    // 限制图片大小
    if(file.files[0].size>(100*1024)){
        layer.alert('头像大小超过100K', {
            skin: 'mine' //样式类名
            , closeBtn: 0
        });
        return
    }
    let reader = new FileReader;
    var formData = new FormData();
    formData.append('photo', file.files[0]);
    reader.onload = function (evt) {
        // 限制图片分辨率
        let image = new Image();
        image.src = evt.target.result;
        image.onload = function(){
            if(this.width > 120 || this.height > 120){
                layer.alert('头像尺寸最大为 120*120', {
                    skin: 'mine' //样式类名 `
                    , closeBtn: 0
                });
            }else{
                document.getElementById("proImg").src = evt.target.result;
                document.getElementById("proImg").style.display = "block";
                var index = layer.load(1, {
                    shade: [0.1, '#fff']
                });
                $.ajax({
                    type: "POST",
                    url: "https://licat.work/page_center/uploadimg",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data.status === 1) {
                            layer.alert('上传成功', {
                                skin: 'mine' //样式类名
                                , closeBtn: 0
                            });
                            layer.close(index);
                                $("#pp5").val(data.src)
                        } else {
                            layer.alert('上传失败', {
                                skin: 'mine' //样式类名
                                , closeBtn: 0
                            });
                        }
                    },
                    error: function (e) {
                        console.log(e);
                        layer.close(index);
                    }
                });
            }
        }
    }
    reader.readAsDataURL(file.files[0]);
};


// 卡片修改代码view
function choice(val){
    function disting(){
        if(window.screen.width <= 750){
            return 'auto';
        }else{
            return '1200px';
        }
    }
    function tittext(){
        if(window.projectName === "landingpage"){
            if($("#ss4").val()){
                return $("#ss4").val()
            }else{
                return "无标题"
            }
        }else if(window.projectName === "auditpage"){
            if($("#ll4").val()){
                return $("#ll4").val()
            }else{
                return "无标题"
            }
        }
    }
    let index = layer.open({
        type: 1,
        shade: 0.3,
        area: disting(),
        skin:"mine view",
        shade:0,
        shadeClose:false,
        maxmin:true,
        // scrollbar: false,
        title: tittext(), 
        btn:'保存',
        content: $('.develop'), 
        success:function(){
            $("#tet").val(val);
            if(window.screen.width <= 750){
                $("#vip").css("display","none");
            } else {
                $("#vip").attr("srcdoc",$("#tet").val());
            }
        },
        yes:function(index){
            if($(".ww").hasClass("orange")){
                $("#ll8").val($("#tet").val());
            }else{
                $("#ss8").val($("#tet").val());
            }
            layer.close(index);
        }
    });
    if(window.screen.width <= 750){
        layer.full(index);
    }
    // 代码监听
    if(window.screen.width > 750){
        $("#tet").bind("input propertychange",function(){
            $("#vip").attr("srcdoc",$("#tet").val());
        })
    }
    $("#tet").focus(() => {
        document.onkeydown = function(e){
            if(e.ctrlKey){
                if(e.key === "s"){
                    // 阻止浏览器默认事件
                    e.preventDefault();
                    if($(".ww").hasClass("orange")){
                        $("#ll8").val($("#tet").val());
                    }else{
                        $("#ss8").val($("#tet").val());
                    }
                    layer.msg('保存成功');
                }
    
            }
        }
    })
};

// M端遮罩层
function closeMtc(){
    if (window.screen.width < 750) {
        $("#btn").attr("class", "show");
        $("#wrap").addClass("back");
        $("#wrap").css("transition","all .5s");
        $("#tc").addClass("hide");
    }
};

