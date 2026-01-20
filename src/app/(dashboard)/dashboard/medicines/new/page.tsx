import { getTranslations } from 'next-intl/server';

import MedicinesFormCustom from '@/components/medicines-components/MedicationFormCustom/MedicinesFormCustom';
import { prisma } from '@/lib/prisma';
import { Container, Typography } from '@mui/material';


export default async function AddMedicationPage() {
  const [units, forms, molecules, manufacturers] = await Promise.all([
    prisma.unit.findMany({ orderBy: { name: 'asc' } }),
    prisma.medicationForm.findMany({ orderBy: { name: 'asc' } }),
    prisma.molecule.findMany({ orderBy: { name: 'asc' } }),
    prisma.manufacturer.findMany({ orderBy: { name: 'asc' } }),
  ]);

  const t = await getTranslations('Medicines');

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 4, fontWeight: 'bold' }}>
        {t('title')}
      </Typography>

      <MedicinesFormCustom units={units} forms={forms} molecules={molecules} manufacturers={manufacturers} />
    </Container>
  );
}
