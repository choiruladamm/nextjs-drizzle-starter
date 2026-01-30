import { sql } from 'drizzle-orm';
import { db } from '../db';

async function reset() {
  console.log('Dropping users table...');
  await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);
  console.log('Users table dropped.');
  process.exit(0);
}

reset();
