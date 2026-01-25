'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { createMedication } from '@/app/lib/medicines/action';
import {
    MedicinesFormCustomProps
} from '@/components/medicines-components/MedicationFormCustom/MedicinesFormCustom.type';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Autocomplete, Box, Button, Grid, MenuItem, Paper, TextField } from '@mui/material';


export default function MedicinesFormCustom({ units, forms, molecules, manufacturers }: MedicinesFormCustomProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ error?: string; success?: boolean }>({});
  const t = useTranslations('Medicines');

  /**
   * Handles the submission of the medication form.
   *
   * @param {FormData} formData - The raw form data collected from the submission event.
   * @returns {Promise<void>} A promise that resolves when the creation process and state updates are complete.
   */
  async function handleAction(formData: FormData): Promise<void> {
    setStatus({});

    const result = await createMedication(formData);

    if (result.error) {
      setStatus({ error: result.error });
    } else {
      setStatus({ success: true });
      formRef.current?.reset();
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      {status.error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {status.error}
        </Alert>
      )}
      {status.success && (
        <Alert severity='success' sx={{ mb: 3 }}>
          {t('saveMedicineSuccess')}
        </Alert>
      )}

      <Box component='form' action={handleAction} ref={formRef} noValidate autoComplete='off'>
        <Grid container spacing={3}>
          {/* Trade Name */}
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth label={t('tradeName')} name='tradeName' required variant='outlined' />
          </Grid>

          {/* Molecule */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              options={molecules}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                const hiddenInput = document.getElementById('moleculeId') as HTMLInputElement;
                if (hiddenInput) hiddenInput.value = value?.id || '';
              }}
              renderInput={(params) => (
                <>
                  <input type='hidden' name='moleculeId' id='moleculeId' />
                  <TextField {...params} label={t('molecule')} required />
                </>
              )}
            />
          </Grid>

          {/* Pharmaceutical Company */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              options={manufacturers}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                const hiddenInput = document.getElementById('manufacturerId') as HTMLInputElement;
                if (hiddenInput) hiddenInput.value = value?.id || '';
              }}
              renderInput={(params) => (
                <>
                  <input type='hidden' name='manufacturerId' id='manufacturerId' />
                  <TextField {...params} label={t('pharmaceuticalCompany')} required />
                </>
              )}
            />
          </Grid>

          {/* Tipo di farmaco */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField select fullWidth label={t('formId')} name='formId' defaultValue=''>
              {forms.map((form) => (
                <MenuItem key={form.id} value={form.id}>
                  {form.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Dosaggio */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label={t('dosageValue')} name='dosageValue' type='number' required />
          </Grid>

          {/* Unità di misura */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField select fullWidth label={t('unitOfMeasurement')} name='unitId' defaultValue=''>
              {units.map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  {unit.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Elementi nella scatola */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label={t('packageQuantity')} name='packageQuantity' type='number' required />
          </Grid>

          {/* Scadenza */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label={t('expiryDate')}
              name='expiryDate'
              type='date'
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Button variant='contained' color='primary' fullWidth size='large' startIcon={<SaveIcon />} type='submit'>
              {t('saveMedicineButton')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
