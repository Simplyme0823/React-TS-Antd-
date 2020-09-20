/** @format */

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    /**
     * axiosbaseURL是devApi, 这里跨域解决的时候匹配到的devApi替换成target
     * /devaApi/login -> /login/
     * http://www.web-jshtml.cn/api/react/login/
     */
    createProxyMiddleware([process.env.REACT_APP_API], {
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/devApi": "",
        [`^${process.env.REACT_APP_API}`]: "",
      },
    }),
  );
  //   app.use(
  //     proxy("/manager/api", {
  //       target: "http://admintest.happymall.com:7000",
  //       changeOrigin: true,
  //     })
  //   );
};
