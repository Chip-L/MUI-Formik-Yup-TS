import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SelectOptionType } from "@types";
import { useField } from "formik";
import { useState } from "react";

interface MySelectProps {
  name: string;
  label: string;
  selectOptions: SelectOptionType[];
  required?: boolean;
  handleDBSubmit: (id: string, value: string) => void;
}

function getOptionValues(
  selectOptions: SelectOptionType[],
  fieldValue: string | number
): SelectOptionType | null {
  return selectOptions.filter((o) => o.value === fieldValue)[0] ?? null;
}

const MySelect = ({
  label,
  name,
  selectOptions,
  required = false,
  handleDBSubmit,
}: MySelectProps) => {
  const [field, meta, helper] = useField(name);
  const setFormValue = helper.setValue;

  const [value, setValue] = useState<SelectOptionType | null>(
    getOptionValues(selectOptions, field.value)
  );
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (_event: any, newValue: SelectOptionType | null) => {
    setFormValue(newValue?.value);
    setValue(newValue);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    field.onBlur(e);
    if (!meta.touched || !meta.error) {
      handleDBSubmit(field.name, field.value);
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id={name}
      options={selectOptions}
      isOptionEqualToValue={(o, v) => o.label === v.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};

export default MySelect;
