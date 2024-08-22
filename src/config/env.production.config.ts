// src/config/env.production.config.ts
export default () => ({
    // Production settings override defaults and local settings
    apiUrl: process.env.PRODUCTION_API_URL || 'https://api.task2.com',
    redisHost: process.env.REDIS_HOST || 'redis.prod',
    // Add more production settings as needed
  });
  