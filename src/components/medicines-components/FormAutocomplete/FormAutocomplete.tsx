import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { FormAutocompleteProps } from "@/components/medicines-components/FormAutocomplete/FormAutocomplete.type";

export default function FormAutocomplete({ name, label, options, required = false }: FormAutocompleteProps) {
  const [hiddenValue, setHiddenValue] = useState("");

  return (
    <>
      <input type="hidden" name={name} value={hiddenValue} />

      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === "object" && option !== null) return option.name;
          return option;
        }}
        onChange={(_, newValue) => {
          setHiddenValue(typeof newValue === "object" && newValue !== null ? newValue.id : newValue || "");
        }}
        onInputChange={(_, newInputValue) => {
          setHiddenValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label={label} required={required} variant="outlined" />}
      />
    </>
  );
}
