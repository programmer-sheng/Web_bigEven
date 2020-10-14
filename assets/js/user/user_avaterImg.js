$(() => {
  const { layer } = layui;
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);
  $("#btnChooseImage").on("click", function () {
    $("#btnImg").click();
  });
  $("#btnImg").on("change", function (e) {
    var fileList = e.target.files;
    if (fileList.length === 0) {
      return layer.msg("请选择图片");
    }
    var file = fileList[0];
    var ImgUrl = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", ImgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $("#btnUpload").on("click", function () {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2. 调用接口，把头像上传到服务器
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("更换头像失败！");
        }
        layer.msg("更换头像成功！");
        // $("#image").attr("src", dataURL);
        window.parent.getUserInfo();
      },
    });
  });
});
