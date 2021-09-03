'use strict';

module.exports = {
  migrationsRepo: process.env.MIGRATIONS_REPO || 'ms-migrations',
  port: process.env.PORT || 3000,
  tableName: process.env.TABLE_NAME || 'reports',
  serviceType: process.env.SERVICE_TYPE || 'modern-slavery'
};
