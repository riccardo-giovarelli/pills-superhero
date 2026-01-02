import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';


// Load environment variables from the .env file
dotenv.config();

/**
 * Core seeding function to populate the database with initial data.
 * This script uses the Prisma 7 Driver Adapter for PostgreSQL.
 */
async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  // Initialize a PostgreSQL connection pool.
  const pool = new Pool({
    connectionString,
    ssl: false,
  });

  // Prisma Driver Adapter with the pg pool
  const adapter = new PrismaPg(pool);

  // Prisma Client using the driver adapter.
  const prisma = new PrismaClient({ adapter });

  // Generating password hash
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('psh', saltRounds);

  /**
   * Performs an 'upsert' operation on the User model:
   * - If the email exists, it updates the password.
   * - If the email does not exist, it creates a new user record.
   */
  const user = await prisma.user.upsert({
    where: { email: 'fake.email@psh.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'fake.email@psh.com',
      name: 'Fake User',
      emailVerified: new Date(),
      password: hashedPassword,
    },
  });

  console.log('Main user successfully created/updated:', user.email);

  // Gracefully close connections.
  await prisma.$disconnect();
  await pool.end();
}

// Global error handler for the seeding process
main().catch((e) => {
  console.error('Error during database seeding:', e);
  process.exit(1);
});
