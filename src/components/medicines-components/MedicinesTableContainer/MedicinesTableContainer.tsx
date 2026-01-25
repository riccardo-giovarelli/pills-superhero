'use client';

import dynamic from 'next/dynamic';

import { Box, Skeleton } from '@mui/material';


const MedicinesTable = dynamic(() => import('../MedicinesTable/MedicinesTable'), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: 600, width: '100%' }}>
      <Skeleton variant='rectangular' height={600} />
    </Box>
  ),
});

export default function MedicinesTableContainer({ data }: { data: any[] }) {
  return <MedicinesTable data={data} />;
}
