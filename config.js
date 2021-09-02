'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  tableName: process.env.TABLE_NAME || 'reports',
  serviceType: process.env.SERVICE_TYPE || 'modern-slavery'
};
