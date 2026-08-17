import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prepare to work nicely with Supabase connection pooling
export const client = postgres(connectionString, { prepare: false });
export const serverDb = drizzle(client, { schema });
