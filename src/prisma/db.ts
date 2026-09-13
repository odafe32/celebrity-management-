import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
import { dbLogger } from '@/lib/logger';

dbLogger.info({ hasUrl: !!process.env['DATABASE_URL'] }, "Initializing database connection");

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
export const db = new PrismaClient({ adapter });

dbLogger.info("Database connection established");
