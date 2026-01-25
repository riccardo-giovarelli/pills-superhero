import { Manufacturer, Medication, MedicationForm, Molecule, Unit } from '@prisma/client';


export type MedicationWithRelations = Medication & {
  form: MedicationForm;
  unit: Unit;
  molecule: Molecule;
  manufacturer: Manufacturer;
};
