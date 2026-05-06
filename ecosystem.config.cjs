/**
 * PM2: production Next.js
 *
 * Без папки `.next` `next start` падает — её нет в git, сборка только на сервере:
 *
 *   cd ~/ai-game-booster-main
 *   npm ci          # или npm install
 *   npm run build   # обязательно перед первым стартом и после смены кода
 *   pm2 restart ai-game-booster
 *
 * Первый запуск: `pm2 start ecosystem.config.cjs`
 *
 * Снаружи: http://SERVER_IP:3179 — порт меняется в `args` ниже.
 */
module.exports = {
  apps: [
    {
      name: "ai-game-booster",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3179",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
