'use client';

import { useRef, useState } from 'react';

import { createMedication } from '@/app/lib/medications/action';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Autocomplete, Box, Button, Grid, MenuItem, Paper, TextField } from '@mui/material';


interface Props {
  units: any[];
  forms: any[];
  molecules: any[];
  manufacturers: any[];
}

export default function MedicationFormCustom({ units, forms, molecules, manufacturers }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ error?: string; success?: boolean }>({});

  // Funzione per gestire l'invio
  async function handleAction(formData: FormData) {
    setStatus({}); // Reset dello stato

    const result = await createMedication(formData);

    if (result.error) {
      setStatus({ error: result.error });
    } else {
      setStatus({ success: true });
      formRef.current?.reset(); // Svuota il form in caso di successo
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      {/* Messaggi di feedback */}
      {status.error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {status.error}
        </Alert>
      )}
      {status.success && (
        <Alert severity='success' sx={{ mb: 3 }}>
          Farmaco registrato con successo!
        </Alert>
      )}

      <Box component='form' action={handleAction} ref={formRef} noValidate autoComplete='off'>
        <Grid container spacing={3}>
          {/* Nome Commerciale */}
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth label='Nome del Farmaco' name='tradeName' required variant='outlined' />
          </Grid>

          {/* Molecola - Usiamo un input nascosto per passare l'ID al FormData */}
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
                  <TextField {...params} label='Molecola / Principio Attivo' required />
                </>
              )}
            />
          </Grid>

          {/* Casa Farmaceutica - Stessa logica dell'input nascosto */}
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
                  <TextField {...params} label='Casa Farmaceutica' required />
                </>
              )}
            />
          </Grid>

          {/* Tipo di farmaco */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField select fullWidth label='Tipo' name='formId' defaultValue=''>
              {forms.map((form) => (
                <MenuItem key={form.id} value={form.id}>
                  {form.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Dosaggio */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label='Dosaggio' name='dosageValue' type='number' required />
          </Grid>

          {/* Unità di misura */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField select fullWidth label='Unità' name='unitId' defaultValue=''>
              {units.map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  {unit.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Elementi nella scatola */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label='Quantità nella confezione' name='packageQuantity' type='number' required />
          </Grid>

          {/* Scadenza */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label='Scadenza' name='expiryDate' type='date' InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Button variant='contained' color='primary' fullWidth size='large' startIcon={<SaveIcon />} type='submit'>
              Salva Farmaco
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
