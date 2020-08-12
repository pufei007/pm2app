const path = require("path");
// 雪碧图
const SpritesmithPlugin = require("webpack-spritesmith");

module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];
      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }
    // 添加雪碧图
    config.plugins.push(
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "assets/icons"),
          glob: "*.png"
        },
        target: {
          image: path.resolve(__dirname, "./sprite/icon.png"),
          css: [
            [
              path.resolve("./sprite/icon.css"),
              {
                format: "function_based_template"
              }
            ]
          ]
        },
        customTemplates: {
          function_based_template: path.resolve(
            __dirname,
            "./icon_handlebars_template.handlebars"
          )
        },
        apiOptions: {
          cssImageRef:
            "./icon.png?t=" +
            (process.env.NODE_ENV === "production" ? Date.now() : ""),
          handlebarsHelpers: {
            nameHandle(name) {
              let iconName = /^icon/gim.test(name) ? name : "icon__" + name;

              if (/_hover$/gim.test(iconName)) {
                iconName = iconName.replace(/_hover$/gim, ":hover");
              } else if (/_active$/gim.test(iconName)) {
                return ".active .ui-" + iconName.replace(/_active$/gim, "");
              }

              return ".ui-" + iconName;
            },
            zeroHandle(val) {
              val = parseInt(val);
              if (val === 0) {
                return 0;
              } else {
                return val + "px";
              }
            }
          }
        },
        spritesmithOptions: {
          algorithm: "binary-tree",
          padding: 2
        }
      })
    );

    return config;
  }
};
