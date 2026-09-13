import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };
import { dbLogger } from '@/lib/logger';

dbLogger.info({ hasUrl: !!process.env['DATABASE_URL'] }, "Initializing database connection");

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

dbLogger.info("Database connection established");
