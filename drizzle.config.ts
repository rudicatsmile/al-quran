import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load .env if available
dotenv.config({ path: '.env' });

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
