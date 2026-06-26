"use client";

import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";

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

      <Box sx={{ pt: 3 }}>
        {activeTab === 0 && (
          <div>
            <p>
              {t("table")} {t("formIdTab")}: {forms.length} elementi
            </p>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <p>
              {t("table")} {t("moleculeTab")}: {molecules.length} elementi
            </p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <p>
              {t("table")} {t("pharmaceuticalCompanyTab")}: {manufacturers.length} elementi
            </p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <p>
              {t("table")} {t("unitOfMeasurementTab")}: {units.length} elementi
            </p>
          </div>
        )}
      </Box>
    </Box>
  );
}
