module.exports = {
  apps: [
    {
      name: "pm2app",
      script: "server/index.js",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "one two",
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "39.96.1.35",
      ref: "origin/master",
      repo: "git@github.com:pufei007/pm2app.git",
      path: "/app/node-server",
      "post-deploy":
        "yarn install && yarn build:pro && pm2 reload ecosystem.config.js --env production",
    },
  },
};
