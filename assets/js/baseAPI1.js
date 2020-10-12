const url = "http://ajax.frontend.itheima.net";
//调用Ajax时候会先调用这个函数 options可以拿到所有的配置项 可以在这里进行url的拼接
$.ajaxPrefilter((options) => {
  options.url = `${url}${options.url}`;
  //   console.log(options.url);
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  options.complete = function (response) {
    // console.log(response);
    if (
      response.responseJSON.status !== 0 &&
      response.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "/D-login.html";
    }
  };
});
