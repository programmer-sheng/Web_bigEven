$(() => {
  const { layer } = layui;

  getUserInfo();
  //退出功能
  $("#quit").on("click", () => {
    layer.confirm("是否退出", { icon: 3, title: "提示" }, function (index) {
      //do something
      localStorage.removeItem("token");
      location.href = "/D-login.html";
      layer.close(index);
    });
  });
});
//获取用户信息
var getUserInfo = () => {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    //   headers: {
    //     Authorization: localStorage.getItem("token") || "",
    //   },
    success(res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      rangeUserImage(res.data);
    },
    //   complete: function (response) {
    //     // console.log(response);
    //     if (
    //       response.responseJSON.status !== 0 &&
    //       response.responseJSON.message === "身份认证失败！"
    //     ) {
    //       localStorage.removeItem("token");
    //       location.href = "/D-login.html";
    //     }
    //   },
  });
};
//渲染头像功能
var rangeUserImage = (user) => {
  var uname = user.nickname || user.username;
//   console.log(user.username);
  $("#welcome").html(`欢迎  ${uname}`);
  if (user.user_pic !== null) {
    $(".text-avatar").hide();
    $(".layui-nav-img").attr("src", user.user_pic).show();
  } else {
    let first = user.nickname[0].toUpperCase();
    $(".layui-nav-img").hide();
    $(".text-avatar").html(first).show();
  }
};
