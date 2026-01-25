'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { getColumns } from './MedicinesTable.lib';
import { MedicationWithRelations } from './MedicinesTable.type';


export default function MedicinesTable({ data }: { data: any[] }) {
  const t = useTranslations('Medicines');
  const columns = useMemo(() => getColumns(t), [t]);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid<MedicationWithRelations>
        rows={data}
        columns={columns}
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
