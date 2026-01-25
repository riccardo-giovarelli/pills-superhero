import { getTranslations } from 'next-intl/server';

import { getMedications } from '@/app/lib/medicines/action';
import MedicinesTableContainer from '@/components/medicines-components/MedicinesTableContainer/MedicinesTableContainer';
import { Container, Typography } from '@mui/material';


export default async function MedicinesPage() {
  const medicines = await getMedications();
  const t = await getTranslations('Medicines');

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        {t('drugInventory')}
      </Typography>
      <MedicinesTableContainer data={medicines} />
    </Container>
  );
}
