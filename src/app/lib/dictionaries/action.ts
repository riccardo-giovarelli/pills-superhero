"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DictionaryInput = { id: string; name: string };

/**
 * Upserts a medication form in the database.
 * If the record with the given ID exists, it updates the name.
 * Otherwise, it creates a new record.
 *
 * @param {DictionaryInput} data - The medication form payload containing id and name.
 * @returns {Promise<void>}
 */
export async function saveForm(data: DictionaryInput): Promise<void> {
  await prisma.medicationForm.upsert({
    where: { id: data.id },
    update: { name: data.name },
    create: { id: data.id, name: data.name },
  });
  revalidatePath("/dashboard/dictionaries");
}

/**
 * Deletes a medication form from the database by its ID.
 *
 * @param {string} id - The unique identifier of the medication form to delete.
 * @returns {Promise<void>}
 */
export async function deleteForm(id: string): Promise<void> {
  await prisma.medicationForm.delete({ where: { id } });
  revalidatePath("/dashboard/dictionaries");
}

/**
 * Upserts a molecule in the database.
 * If the record with the given ID exists, it updates the name.
 * Otherwise, it creates a new record.
 *
 * @param {DictionaryInput} data - The molecule payload containing id and name.
 * @returns {Promise<void>}
 */
export async function saveMolecule(data: DictionaryInput): Promise<void> {
  await prisma.molecule.upsert({
    where: { id: data.id },
    update: { name: data.name },
    create: { id: data.id, name: data.name },
  });
  revalidatePath("/dashboard/dictionaries");
}

/**
 * Deletes a molecule from the database by its ID.
 *
 * @param {string} id - The unique identifier of the molecule to delete.
 * @returns {Promise<void>}
 */
export async function deleteMolecule(id: string): Promise<void> {
  await prisma.molecule.delete({ where: { id } });
  revalidatePath("/dashboard/dictionaries");
}

/**
 * Upserts a pharmaceutical manufacturer in the database.
 * If the record with the given ID exists, it updates the name.
 * Otherwise, it creates a new record.
 *
 * @param {DictionaryInput} data - The manufacturer payload containing id and name.
 * @returns {Promise<void>}
 */
export async function saveManufacturer(data: DictionaryInput): Promise<void> {
  await prisma.manufacturer.upsert({
    where: { id: data.id },
    update: { name: data.name },
    create: { id: data.id, name: data.name },
  });
  revalidatePath("/dashboard/dictionaries");
}

/**
 * Deletes a pharmaceutical manufacturer from the database by its ID.
 *
 * @param {string} id - The unique identifier of the manufacturer to delete.
 * @returns {Promise<void>}
 */
export async function deleteManufacturer(id: string): Promise<void> {
  await prisma.manufacturer.delete({ where: { id } });
  revalidatePath("/dashboard/dictionaries");
}

/**
 * Upserts a unit of measurement in the database.
 * If the record with the given ID exists, it updates the name.
 * Otherwise, it creates a new record.
 *
 * @param {DictionaryInput} data - The unit payload containing id and name.
 * @returns {Promise<void>}
 */
export async function saveUnit(data: DictionaryInput): Promise<void> {
  await prisma.unit.upsert({
    where: { id: data.id },
    update: { name: data.name },
    create: { id: data.id, name: data.name },
  });
  revalidatePath("/dashboard/dictionaries");
}

/**
 * Deletes a unit of measurement from the database by its ID.
 *
 * @param {string} id - The unique identifier of the unit to delete.
 * @returns {Promise<void>}
 */
export async function deleteUnit(id: string): Promise<void> {
  await prisma.unit.delete({ where: { id } });
  revalidatePath("/dashboard/dictionaries");
}
