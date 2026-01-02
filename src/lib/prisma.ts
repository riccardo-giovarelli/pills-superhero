import { Pool } from 'pg';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';


/**
 * Database connection string retrieved from environment variables.
 * Ensure DATABASE_URL is defined in your .env file.
 */
const connectionString = process.env.DATABASE_URL;

/**
 * PostgreSQL connection pool configuration.
 * Uses the 'pg' library to manage multiple concurrent database connections.
 * SSL is disabled for local development/Docker environments.
 */
const pool = new Pool({ connectionString, ssl: false });

/**
 * Prisma database driver adapter.
 * Allows Prisma to communicate with the database using the 'pg' driver
 * instead of the default Prisma engine binary.
 */
const adapter = new PrismaPg(pool);

/**
 * The singleton instance of the Prisma Client.
 * This object provides the primary interface for database queries.
 * @type {PrismaClient}
 */
export const prisma = new PrismaClient({ adapter });
