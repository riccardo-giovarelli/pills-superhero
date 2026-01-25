'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';


/**
 * Zod validation schema for Medication data.
 * Uses 'coerce' to transform FormData strings into appropriate numeric or date types.
 */
const MedicationSchema = z.object({
  tradeName: z.string().min(1, 'Il nome commerciale è obbligatorio'),
  moleculeId: z.string().min(1, 'Seleziona una molecola'),
  manufacturerId: z.string().min(1, 'Seleziona un produttore'),
  formId: z.string().min(1, 'Seleziona la forma farmaceutica'),
  unitId: z.string().min(1, "Seleziona l'unità di misura"),
  dosageValue: z.coerce.number().positive('Il dosaggio deve essere maggiore di zero'),
  packageQuantity: z.coerce.number().int().positive('La quantità deve essere un numero intero'),
  expiryDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
});

/**
 * Server Action to create a new medication record in the database.
 * * @param {FormData} formData - The raw form data from the client-side form.
 * @returns {Promise<{error: string} | {success: boolean}>} - Returns an error message or a success flag.
 */
export async function createMedication(formData: FormData): Promise<{ error: string } | { success: boolean }> {
  // Extract data from FormData into a plain object
  const rawData = Object.fromEntries(formData.entries());

  // Validate the object against the schema
  const result = MedicationSchema.safeParse(rawData);

  // If validation fails, return the first error message encountered
  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    return { error: errorMessage };
  }

  try {
    // Save to PostgreSQL via Prisma ORM
    await prisma.medication.create({
      data: {
        tradeName: result.data.tradeName,
        dosageValue: result.data.dosageValue,
        packageQuantity: result.data.packageQuantity,
        expiryDate: result.data.expiryDate,
        // Establish relations via foreign keys (IDs)
        moleculeId: result.data.moleculeId,
        manufacturerId: result.data.manufacturerId,
        formId: result.data.formId,
        unitId: result.data.unitId,
      },
    });

    // Purge the cache for the medications list page to reflect the new entry
    revalidatePath('/medications');

    return { success: true };
  } catch (error) {
    // Log error for internal debugging
    console.error('Database Error:', error);
    return { error: 'A database error occurred. Please try again later.' };
  }
}

/**
 * Fetches the complete list of medications from the database including all associated relations.
 *
 * @async
 * @function getMedications
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of Medication objects with their relations,
 * or an empty array if an error occurs.
 * @throws {Error} Logs the error to the console if the database query fails.
 */
export async function getMedications(): Promise<Array<object>> {
  try {
    const medicines = await prisma.medication.findMany({
      include: {
        molecule: true,
        manufacturer: true,
        form: true,
        unit: true,
      },
    });
    return medicines;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}
