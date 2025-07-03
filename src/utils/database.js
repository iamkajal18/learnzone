import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

const result = await db.execute('select 1');
