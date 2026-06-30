"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  deleteForm,
  deleteManufacturer,
  deleteMolecule,
  deleteUnit,
  saveForm,
  saveManufacturer,
  saveMolecule,
  saveUnit,
} from "@/app/lib/dictionaries/action";
import DictionaryTable from "@/components/dictionaries-components/DictionaryTable/DictionaryTable";

export default function DictionariesTabs({ units, forms, molecules, manufacturers }: any) {
  const t = useTranslations("Dictionaries");
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label={t("formIdTab")} />
          <Tab label={t("moleculeTab")} />
          <Tab label={t("pharmaceuticalCompanyTab")} />
          <Tab label={t("unitOfMeasurementTab")} />
        </Tabs>
      </Box>

      <Box sx={{ pt: 3, height: 600, width: "100%" }}>
        {activeTab === 0 && <DictionaryTable initialData={forms} onSave={saveForm} onDelete={deleteForm} />}
        {activeTab === 1 && <DictionaryTable initialData={molecules} onSave={saveMolecule} onDelete={deleteMolecule} />}
        {activeTab === 2 && (
          <DictionaryTable initialData={manufacturers} onSave={saveManufacturer} onDelete={deleteManufacturer} />
        )}
        {activeTab === 3 && <DictionaryTable initialData={units} onSave={saveUnit} onDelete={deleteUnit} />}
      </Box>
    </Box>
  );
}
