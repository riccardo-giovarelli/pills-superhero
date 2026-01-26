interface MedicineSpecifications {
  id: string;
  name: string;
}

export interface MedicinesFormCustomProps {
  units: MedicineSpecifications[];
  forms: MedicineSpecifications[];
  molecules: MedicineSpecifications[];
  manufacturers: MedicineSpecifications[];
}

export interface FormStatus {
  error?: string;
  success?: boolean;
}
