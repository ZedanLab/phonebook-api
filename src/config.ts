import * as dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string): string {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key] as string;
}

export const config = {
  app: {
    env: process.env.NODE_ENV || 'development',
    name: getEnv('APP_NAME'),
    host: getEnv('APP_HOST'),
    schema: getEnv('APP_SCHEMA'),
    port: parseInt(getEnv('APP_PORT')),
    routePrefix: getEnv('APP_ROUTE_PREFIX'),
  },
  database: {
    type: getEnv('DB_TYPE'),
    host: getEnv('DB_HOST'),
    port: getEnv('DB_PORT'),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_DATABASE'),
    synchronize: getEnv('DB_SYNCHRONIZE'),
    logging: getEnv('DB_LOGGING'),
  },
  logging: {
    output: getEnv('LOGGING_OUTPUT'),
  },
};
