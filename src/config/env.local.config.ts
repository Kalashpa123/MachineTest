// src/config/env.local.config.ts
export default () => ({
    // Local development settings override defaults
    apiUrl: process.env.LOCAL_API_URL || 'http://localhost:3000',
    debug: process.env.DEBUG === 'true' || false,
    // Add more local development settings as needed
  });
  