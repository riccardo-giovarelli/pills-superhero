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

  /**
   * Seed for Medication Units (e.g., mg, ml, g)
   * Ensures the basic measurement units are available.
   */
  const units = ['mg', 'g', 'ml', 'UI'];
  for (const unitName of units) {
    await prisma.unit.upsert({
      where: { name: unitName },
      update: {},
      create: { name: unitName },
    });
  }
  console.log('Measurement units successfully seeded');

  /**
   * Seed for Medication Forms (e.g., Tablets, Drops)
   * Populates the database with common pharmaceutical forms.
   */
  const forms = ['Compresse', 'Gocce', 'Sciroppo', 'Capsule', 'Pomata'];
  for (const formName of forms) {
    await prisma.medicationForm.upsert({
      where: { name: formName },
      update: {},
      create: { name: formName },
    });
  }
  console.log('Medication forms successfully seeded');

  /**
   * Seed for common Molecules (Principles)
   * Pre-populates a few common active ingredients.
   */
  const molecules = ['Paracetamolo', 'Ibuprofene', 'Acido Acetilsalicilico'];
  for (const molName of molecules) {
    await prisma.molecule.upsert({
      where: { name: molName },
      update: {},
      create: { name: molName },
    });
  }
  console.log('Common molecules successfully seeded');

  /**
   * Seed for Manufacturers (Pharmaceutical Companies)
   * Populates the database with common manufacturers.
   */
  const manufacturers = ['Pfizer', 'GSK', 'Bayer', 'Novartis', 'Sanofi', 'Mylan'];

  for (const manufacturerName of manufacturers) {
    await prisma.manufacturer.upsert({
      where: { name: manufacturerName },
      update: {},
      create: { name: manufacturerName },
    });
  }
  console.log('Manufacturers successfully seeded');

  // Gracefully close connections.
  await prisma.$disconnect();
  await pool.end();
}

// Global error handler for the seeding process
main().catch((e) => {
  console.error('Error during database seeding:', e);
  process.exit(1);
});
