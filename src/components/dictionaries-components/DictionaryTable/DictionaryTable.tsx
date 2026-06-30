"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Button, Toolbar } from "@mui/material";
import {
  DataGrid,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";

import {
  DictionaryRow,
  DictionaryTableProps,
} from "@/components/dictionaries-components/DictionaryTable/DictionaryTable.type";
import { getColumns } from "./DictionaryTable.lib";

export default function DictionaryTable({ initialData, onSave, onDelete }: DictionaryTableProps) {
  const t = useTranslations("Dictionaries");
  const [rows, setRows] = useState<DictionaryRow[]>(initialData);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // Prevent exiting edit mode when clicking outside the row
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // Switch a specific row to Edit mode
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // Switch a specific row to View mode (this triggers processRowUpdate)
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // Optimistically remove the row from local state, then call the DB action
  const handleDeleteClick = (id: GridRowId) => async () => {
    setRows(rows.filter((row) => row.id !== id));
    await onDelete(id as string);
  };

  // Revert changes or remove the row entirely if it was a newly added (unsaved) row
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  /**
   * Finalizes the row editing process.
   * Updates local state, removes the temporary 'isNew' flag, and triggers the save action.
   *
   * @param {GridRowModel} newRow - The updated row data from the DataGrid.
   * @returns {Promise<DictionaryRow>} The finalized row data.
   */
  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as DictionaryRow;

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    await onSave(updatedRow);

    return updatedRow;
  };

  // Generate columns configuration
  const columns = getColumns({
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick,
    t,
  });

  /**
   * Custom Toolbar component.
   */
  function EditToolbar() {
    const handleAddClick = () => {
      const id = crypto.randomUUID();

      setRows((oldRows) => [{ id, name: "", isNew: true }, ...oldRows]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <Toolbar sx={{ p: 1, display: "flex", gap: 1 }}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
          {t("addNew")}
        </Button>
      </Toolbar>
    );
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{ toolbar: EditToolbar }}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50]}
      disableRowSelectionOnClick
    />
  );
}
