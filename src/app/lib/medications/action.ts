'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';


/**
 * Schema di validazione Zod definito internamente alla Action.
 * Coerce trasforma le stringhe provenienti dal FormData in numeri o date.
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

export async function createMedication(formData: FormData) {
  // Estrazione dei dati dal FormData
  const rawData = Object.fromEntries(formData.entries());

  // Validazione
  const result = MedicationSchema.safeParse(rawData);

  // Se la validazione fallisce, restituiamo il primo errore riscontrato
  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    return { error: errorMessage };
  }

  try {
    // Salvataggio su Postgres tramite Prisma
    await prisma.medication.create({
      data: {
        tradeName: result.data.tradeName,
        dosageValue: result.data.dosageValue,
        packageQuantity: result.data.packageQuantity,
        expiryDate: result.data.expiryDate,
        // Relazioni tramite ID
        moleculeId: result.data.moleculeId,
        manufacturerId: result.data.manufacturerId,
        formId: result.data.formId,
        unitId: result.data.unitId,
      },
    });

    // Forza il refresh della pagina per mostrare i nuovi dati
    revalidatePath('/medications');

    return { success: true };
  } catch (error) {
    console.error('Errore Database:', error);
    return { error: 'Si è verificato un errore nel salvataggio. Riprova più tardi.' };
  }
}
