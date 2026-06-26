"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";

import { createMedication } from "@/app/lib/medicines/action";
import FormAutocomplete from "@/components/medicines-components/FormAutocomplete/FormAutocomplete";
import {
  FormStatus,
  MedicinesFormCustomProps,
} from "@/components/medicines-components/MedicationFormCustom/MedicinesFormCustom.type";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { Alert, Box, Button, Grid, Paper, TextField } from "@mui/material";

export default function MedicinesFormCustom({
  units,
  forms,
  molecules,
  manufacturers,
  tradeNames = [],
}: MedicinesFormCustomProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>({});
  const t = useTranslations("Medicines");

  /**
   * Handles the submission of the medication form.
   *
   * @param {FormData} formData - The raw form data collected from the submission event.
   * @returns {Promise<void>} A promise that resolves when the creation process and state updates are complete.
   */
  async function handleAction(formData: FormData): Promise<void> {
    setStatus({});

    const result = await createMedication(formData);

    if (result && "error" in result) {
      setStatus({ error: result.error as string });
    } else {
      setStatus({ success: true });
      formRef.current?.reset();
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      {status.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {status.error}
        </Alert>
      )}
      {status.success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {t("saveMedicineSuccess")}
        </Alert>
      )}

      <Box component="form" action={handleAction} ref={formRef} noValidate autoComplete="off">
        <Grid container spacing={3}>
          {/* Trade Name */}
          <Grid size={{ xs: 12 }}>
            <FormAutocomplete name="tradeName" label={t("tradeName")} options={tradeNames} required />
          </Grid>
          {/* Molecule */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormAutocomplete name="moleculeId" label={t("molecule")} options={molecules} />
          </Grid>
          {/* Pharmaceutical Company */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormAutocomplete name="manufacturerId" label={t("pharmaceuticalCompany")} options={manufacturers} />
          </Grid>
          {/* Pharmaceutical Form */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormAutocomplete name="formId" label={t("formId")} options={forms} />
          </Grid>
          {/* Dosage */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label={t("dosageValue")} name="dosageValue" type="number" required />
          </Grid>
          {/* Unit of Measurement */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormAutocomplete name="unitId" label={t("unitOfMeasurement")} options={units} required />
          </Grid>
          {/* Items per Package */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label={t("packageQuantity")} name="packageQuantity" type="number" required />
          </Grid>
          {/* Expiry Date */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label={t("expiryDate")}
              name="expiryDate"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/* Form Actions */}
          <Grid size={{ xs: 12 }} sx={{ mt: 2, display: "flex", gap: 2 }}>
            {/* Cancel Button */}
            <Link href="/dashboard/medicines" passHref style={{ flex: 1, textDecoration: "none" }}>
              <Button variant="outlined" color="secondary" fullWidth size="large" startIcon={<ArrowBackIcon />}>
                {t("cancelButton")}
              </Button>
            </Link>
            {/* Save Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ flex: 2 }}
              size="large"
              startIcon={<SaveIcon />}
              type="submit"
            >
              {t("saveMedicineButton")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
