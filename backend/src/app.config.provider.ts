export const configProvider = (): AppConfig => ({
  database: {
    driver: process.env.DATABASE_DRIVER || 'mongodb',
    url: process.env.DATABASE_URL || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 27017,
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || 'prac',
  },
  logger: process.env.LOGGER || 'dev',
});

export interface AppConfig {
  database: AppConfigDatabase;
  logger: string;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  port: number;
  username: string;
  password: string;
  name: string;
}
