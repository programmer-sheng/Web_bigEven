$(function () {
  //   var form = layui.form;
  //   var layer = layui.layer;
  let { form, layer } = layui;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });
  //填充信息
  const initUserInfo = () => {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message || "更新失败");
          return;
        }
        // console.log(res);
        form.val("formUserInfo", res.data);
      },
    });
  };
  initUserInfo();
  //重置信息
  $("#btnReset").on("click", (e) => {
    e.preventDefault();
    initUserInfo();
    //   console.log(1);
  });
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success(res) {
        //   console.log(res);
        if (res.status !== 0) {
          layer.msg(res.message || "重置信息失败");
          return;
        }
        layer.msg(res.message || "更新信息成功");
        console.log(window.parent);
        window.parent.getUserInfo();
      },
    });
  });
});
