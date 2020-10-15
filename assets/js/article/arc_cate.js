$(() => {
  const { layer, form } = layui;
  var indexAdd = null;
  var indexEdit = null;
  initArticleList();
  //获取文章列表
  function initArticleList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        // console.log(res);
        var strHtml = template("tmp", res);
        $("tbody").html(strHtml);
      },
    });
  }
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  //添加文章类别
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message || "获取文章列表失败");
        }
        initArticleList();
        layer.msg("新增分类成功！");
        layer.close(indexAdd);
      },
    });
  });
  //编辑文章列表
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    var id = $(this).attr("data-id");
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        // console.log(res);
        form.val("form-edit", res.data);
      },
    });
  });
  //更新文章列表
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新分类数据失败！");
        }
        layer.msg("更新分类数据成功！");
        layer.close(indexEdit);
        initArticleList();
      },
    });
  });
  //删除文章
  $("tbody").on("click", ".btn-delete", function () {
    var id = $(this).attr("data-id");
    // 提示用户是否要删除
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          console.log(res);
          if (res.status !== 0) {
            return layer.msg("删除分类失败！");
          }
          layer.msg("删除分类成功！");
          layer.close(index);
          initArticleList();
        },
      });
    });
  });
});
