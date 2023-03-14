'use strict';

module.exports = {
  maxPayloadSize: process.env.MAX_PAYLOAD_SIZE || '100kb',
  migrationsRepo: process.env.MIGRATIONS_REPO || 'ms-schema',
  port: process.env.PORT || 3000,
  tableName: process.env.TABLE_NAME || 'reports',
  serviceType: process.env.SERVICE_TYPE || 'modern-slavery',
  additionalSchema: process.env.ADDITIONAL_SCHEMA || ''
};
