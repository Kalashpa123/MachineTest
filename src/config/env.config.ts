// src/config/env.config.ts
export default () => ({
    // Define default environment variables here
    databaseHost: process.env.DATABASE_HOST || 'localhost',
    databasePort: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    databaseName: process.env.DATABASE_NAME || 'task2',
    // Add more default settings as needed
  });
  