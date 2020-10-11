$(() => {
  // alert('1')
    $(document).ajaxStart(() => {
        $('#loading').show();
    })
    $(document).ajaxStop(() => {
        $('#loading').hide();
    })
  $("#link_reg").on("click", () => {
    $(".login_box").hide();
    $(".reg_box").show();
    //   alert('1')
  });
  $("#link_login").on("click", () => {
    $(".reg_box").hide();
    $(".login_box").show();
  });
  //   const { form } = layui;
  //   const { layer } = layui;
  const { form, layer } = layui;
  form.verify({
    psw: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repsw: (value) => {
      let val = $(".reg_box [name=password]").val();
      if (val !== value) {
        return "两次输入的值不同";
      }
    },
  });
  //注册功能
  $("#form_reg").submit((e) => {
    e.preventDefault();
    $.ajax({
      method: "POST",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      url: "http://ajax.frontend.itheima.net/api/reguser",
      success: (res) => {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message || "注册失败");
        }
        layer.msg("注册成功,请登录");
        $("#link_login").click();
      },
    });
  });
  //登录功能
  $("#form_login").on("submit", (e) => {
    e.preventDefault();
    $.post(
      "http://ajax.frontend.itheima.net/api/login",
      $("#form_login").serialize(),
      (res) => {
        //   console.log(res);
        if (res.status !== 0) {
          layer.msg(res.message || "注册失败");
          return;
        }
        localStorage.setItem("token", res.token);
        layer.msg("登录成功");
        location.href = "/H-index.html";
      }
    );
  });
});
