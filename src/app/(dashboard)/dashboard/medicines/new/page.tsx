import MedicationFormCustom from '@/components/medications-components/MedicationFormCustom/MedicationFormCustom';
import { prisma } from '@/lib/prisma';
import { Container, Typography } from '@mui/material';


export default async function AddMedicationPage() {
  const [units, forms, molecules, manufacturers] = await Promise.all([
    prisma.unit.findMany({ orderBy: { name: 'asc' } }),
    prisma.medicationForm.findMany({ orderBy: { name: 'asc' } }),
    prisma.molecule.findMany({ orderBy: { name: 'asc' } }),
    prisma.manufacturer.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 4, fontWeight: 'bold' }}>
        Aggiungi Nuovo Farmaco
      </Typography>

      <MedicationFormCustom units={units} forms={forms} molecules={molecules} manufacturers={manufacturers} />
    </Container>
  );
}
