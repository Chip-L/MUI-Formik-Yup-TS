import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import { useMemo, useState } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface MySelectProps {
  name: string;
  label: string;
  selectOptions: SelectOption[];
  required?: boolean;
  handleDBSubmit: (id: string, value: string) => void;
}

const MySelect = ({
  label,
  name,
  selectOptions,
  required = false,
  handleDBSubmit,
}: MySelectProps) => {
  const [field, meta, { setValue }] = useField(name);
  const [inputValue, setInputValue] = useState("");
  const options = useMemo(
    () => selectOptions.map((option) => option.value),
    [selectOptions]
  );

  const handleOnChange = (_event: any, newValue: string | null) => {
    setValue(newValue);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    console.log("MySelect: handleOnBlur", field);
    field.onBlur(e);
    console.log("touched:", meta.touched);
    console.log("error:", meta.error);
    if (!meta.touched || !meta.error) {
      console.log("submit to db");
      handleDBSubmit(field.name, field.value);
    }
  };

  return (
    <Autocomplete
      value={field.value}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id={name}
      options={options}
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
