import * as dotenv from 'dotenv'

dotenv.config();

function getEnv(key: string): string {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key] as string;
}

export const config = {
  app: {
    name: getEnv('APP_NAME'),
    host: getEnv('APP_HOST'),
    schema: getEnv('APP_SCHEMA'),
    port: parseInt(getEnv('APP_PORT')),
  },
  logging: {
    output: getEnv('LOGGING_OUTPUT')
  }
};
