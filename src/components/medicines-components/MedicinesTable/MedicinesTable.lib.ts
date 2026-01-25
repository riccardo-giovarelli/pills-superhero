import {
    MedicationWithRelations
} from '@/components/medicines-components/MedicinesTable/MedicinesTable.type';
import { GridColDef } from '@mui/x-data-grid';


/**
 * Generates the column definitions for the Medications DataGrid.
 * * @function getColumns
 * @param {Function} t - The translation function provided by `useTranslations`.
 * @returns {GridColDef<MedicationWithRelations>[]} An array of MUI DataGrid column definitions.
 */
export const getColumns = (t: any): GridColDef<MedicationWithRelations>[] => [
  {
    field: 'tradeName',
    headerName: t('tradeName'),
    width: 200,
  },
  {
    field: 'molecule',
    headerName: t('molecule'),
    width: 150,
    valueGetter: (_value, row) => row.molecule?.name,
  },
  {
    field: 'dosage',
    headerName: t('dosageValue'),
    width: 130,
    renderCell: (params) => `${params.row.dosageValue} ${params.row.unit?.name}`,
  },
  {
    field: 'form',
    headerName: t('formId'),
    width: 150,
    valueGetter: (_value, row) => row.form?.name,
  },
  {
    field: 'manufacturer',
    headerName: t('pharmaceuticalCompany'),
    width: 180,
    valueGetter: (_value, row) => row.manufacturer?.name,
  },
  {
    field: 'expiryDate',
    headerName: t('expiryDate'),
    type: 'date',
    width: 150,
    valueGetter: (value) => (value ? new Date(value as string) : null),
  },
];
