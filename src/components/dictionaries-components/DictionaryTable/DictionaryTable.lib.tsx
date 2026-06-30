import { GetColumnsParams } from "@/components/dictionaries-components/DictionaryTable/DictionaryTable.type";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { GridActionsCellItem, GridColDef, GridRowModes } from "@mui/x-data-grid";

export const getColumns = ({
  rowModesModel,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
  t,
}: GetColumnsParams): GridColDef[] => [
  {
    field: "name",
    headerName: t("name") || "Nome",
    flex: 1,
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: t("actions") || "Azioni",
    width: 150,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<SaveIcon />}
            label="Save"
            color="primary"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];
