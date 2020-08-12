const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = parseInt(process.env.PORT, 10) || 3000;
const isTest = process.env.TEST === "true";
const isPro = process.env.NODE_ENV === "production";
// 是否是部署环境（部署环境用内网ip）
const isSVR = process.env.SVR === "true";
const apiUrl = (function() {
  if (isSVR) {
    return isTest ? "http://10.139.165.126:9050" : "http://10.139.186.177:9050";
  } else {
    return isTest ? "http://test.api.yay.com.cn" : "http://api.yay.com.cn";
  }
})();
const app = next({
  dir: ".", // base directory where everything is, could move to src later
  dev: !isPro
});

if (isPro && !isTest) {
  // 设置cdn
  //   app.setAssetPrefix("http://cdn.com/myapp");
}

const proxy = {
  "/api": {
    target: apiUrl,
    // 添加 “/_” 重置掉请求路径
    pathRewrite: { "^/api/v/": "/" },
    changeOrigin: true
  }
};

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // Set up the proxy.
  if (proxy) {
    Object.keys(proxy).forEach(function(key) {
      server.use(key, createProxyMiddleware(proxy[key]));
    });
  }
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
