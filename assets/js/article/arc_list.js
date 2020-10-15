$(() => {
  var { form, layer, laypage } = layui;
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: "", // 文章分类的 Id
    state: "", // 文章的发布状态
  };
  initTable();

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败！");
        }
        // 使用模板引擎渲染页面的数据
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        randerPage(res.total);
      },
    });
  }
  template.defaults.imports.dataFormat = (data) => {
    const dt = new Date(data);
    let y = padZero(dt.getFullYear());
    let m = padZero(dt.getMonth() + 1);
    let d = padZero(dt.getDate());

    let hh = padZero(dt.getHours());
    let mm = padZero(dt.getMinutes());
    let ss = padZero(dt.getSeconds());
    return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`;
  };
  function padZero(n) {
    return n > 9 ? n : "0" + n;
  }
  initCate();

  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取分类数据失败！");
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        // 通过 layui 重新渲染表单区域的UI结构
        form.render();
      },
    });
  }
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    var cate_id = $('[name="cate_id"]').val();
    var state = $('[name="state"]').val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
  });
  function randerPage(total) {
    // console.log(total);
    laypage.render({
      elem: "testBox",
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      theme: "#c00",
      limits: [1, 2, 3, 4, 5],
      layout: ["count", "prev", "page", "next", "limit", "refresh", "skip"],
      jump: function (obj, first) {
        // 点击触发jump =>first=undefined
        // 通过randerPage()触发=>first=true
        // console.log(obj.curr);
        // console.log(obj.limit);
        // console.log(first);
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if (!first) {
          initTable();
        }
      },
    });
  }
  $("tbody").on("click", ".btn_delete", function () {
    var id = $(this).attr("data-id");
    var len = $(".btn_delete").length;
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) {
            layer.msg(res.message || "删除文章失败");
          }
          layer.msg("删除文章成功");
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          initTable();
        },
      });

      layer.close(index);
    });
  });
});
