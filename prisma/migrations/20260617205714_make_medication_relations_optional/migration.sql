-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_formId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_moleculeId_fkey";

-- AlterTable
ALTER TABLE "Medication" ALTER COLUMN "formId" DROP NOT NULL,
ALTER COLUMN "moleculeId" DROP NOT NULL,
ALTER COLUMN "manufacturerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_formId_fkey" FOREIGN KEY ("formId") REFERENCES "MedicationForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_moleculeId_fkey" FOREIGN KEY ("moleculeId") REFERENCES "Molecule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
