import { GridRowId, GridRowModesModel } from "@mui/x-data-grid";

export interface DictionaryRow {
  id: string;
  name: string;
  isNew?: boolean;
}

export interface DictionaryTableProps {
  initialData: DictionaryRow[];
  onSave: (row: DictionaryRow) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export interface GetColumnsParams {
  rowModesModel: GridRowModesModel;
  handleSaveClick: (id: GridRowId) => () => void;
  handleCancelClick: (id: GridRowId) => () => void;
  handleEditClick: (id: GridRowId) => () => void;
  handleDeleteClick: (id: GridRowId) => () => Promise<void>;
  t: (key: string) => string; // Passiamo la funzione t per le traduzioni
}
