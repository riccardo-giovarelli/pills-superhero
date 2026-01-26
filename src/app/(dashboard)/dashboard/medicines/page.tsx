import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { getMedications } from '@/app/lib/medicines/action';
import MedicinesTableContainer from '@/components/medicines-components/MedicinesTableContainer/MedicinesTableContainer';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Typography } from '@mui/material';


export default async function MedicinesPage() {
  const medicines = await getMedications();
  const t = await getTranslations('Medicines');

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
        <Typography variant='h4' component='h1'>
          {t('drugInventory')}
        </Typography>

        <Link href='/dashboard/medicines/new' passHref style={{ textDecoration: 'none' }}>
          <Button variant='contained' color='primary' startIcon={<AddIcon />}>
            {t('addNewDrug')}
          </Button>
        </Link>
      </Box>

      <MedicinesTableContainer data={medicines} />
    </Container>
  );
}
