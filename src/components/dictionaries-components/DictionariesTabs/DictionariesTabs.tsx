"use client";

import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
// Immagina di avere un componente tabella generico o 4 tabelle separate
// import DictionaryTable from './DictionaryTable';

export default function DictionariesTabs({ units, forms, molecules, manufacturers }: any) {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Forme Farmaceutiche" />
          <Tab label="Molecole" />
          <Tab label="Produttori" />
          <Tab label="Unità di Misura" />
        </Tabs>
      </Box>

      <Box sx={{ pt: 3 }}>
        {activeTab === 0 && (
          <div>
            <p>Tabella Forme: {forms.length} elementi</p>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <p>Tabella Molecole: {molecules.length} elementi</p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <p>Tabella Produttori: {manufacturers.length} elementi</p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <p>Tabella Unità: {units.length} elementi</p>
          </div>
        )}
      </Box>
    </Box>
  );
}
