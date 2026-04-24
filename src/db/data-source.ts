import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  // Use the full connection string from your .env
  url: process.env.DATABASE_URL,

  // Necessary for Neon cloud connections
  ssl: {
    rejectUnauthorized: false,
  },

  // This helps handle the SSL warning you saw earlier
  extra: {
    sslmode: 'verify-full',
  },

  entities: ['dist/**/*entity.js'],
  migrations: ['dist/db/migrations/*.js'],

  // this ensures that the migration table is the source of truth
  synchronize: false,
});
