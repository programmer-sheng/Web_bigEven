$(() => {
  const { form, layer } = layui;
  form.verify({
    psw: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePsw: (value) => {
      if (value === $('[name="oldPwd"]').val()) {
        return "新密码和原始密码不能相同";
      }
    },
    rePsw(value) {
      if (value !== $('[name="newPwd"]').val()) {
        return "两次密码输入不一致";
      }
    },
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success(res) {
        //   console.log(res);
        if (res.status !== 0) {
          layer.msg(res.message || "更新密码失败!");
          return;
        }
        layer.msg(res.message || "更新密码成功!");
        $(".layui-form")[0].reset();
      },
    });
  });
});
