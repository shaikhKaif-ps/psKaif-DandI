// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'myapp', // ← Yahan apne app ka naam daal do (jaise: dashboard, web, admin, etc.)
      script: 'node_modules/next/dist/bin/next', // Next.js ke liye
      args: 'start', // Next.js production start
      cwd: '/home/emergingfromthecave-di-web-dev/htdocs/di-web-dev.emergingfromthecave.net/D-I-Frontend-PS', // ← Yahan exact wahi path daal do jo tumne secrets.APP_DIR mein daala hai
      instances: 'max', // Ya 1 rakh sakte ho chhote VPS mein
      exec_mode: 'cluster', // max instances ke liye cluster mode chahiye
      env: {
        NODE_ENV: 'production',
        PORT: 3002, // Jo port use kar rahe ho
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      watch: false, // Production mein false hi rakhna
      autorestart: true,
      max_restarts: 10,
      out_file: '/home/ubuntu/.pm2/logs/myapp-out.log', // Log paths (optional but recommended)
      error_file: '/home/ubuntu/.pm2/logs/myapp-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      time: true,
    },
  ],
};
