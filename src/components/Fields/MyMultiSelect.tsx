import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { SelectOptionType } from "@types";
import { useField } from "formik";
import { useState } from "react";
import { getOptionValues } from "@utils/getOptionValues";

interface MyMultiSelectProps {
  name: string;
  label: string;
  required?: boolean;
  handleDBSubmit: (id: string, value: string) => void;
  selectOptions: SelectOptionType[];
}

const MyMultiSelect = ({
  name,
  label,
  required = false,
  handleDBSubmit,
  selectOptions,
}: MyMultiSelectProps) => {
  const [{ value, onBlur }, { touched, error }, { setTouched, setValue }] =
    useField(name);

  const [fieldValues, setFieldValues] = useState<SelectOptionType[]>(
    getOptionValues(selectOptions, value)
  );

  const submitValues = () => {
    if (!touched || !error) {
      console.log("MyMultiSelect: submit to db");
      handleDBSubmit(name, value);
    }
  };

  function handleOnChange(
    _event: React.SyntheticEvent<Element, Event>,
    value: SelectOptionType[],
    reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<SelectOptionType> | undefined
  ) {
    setTouched(true);
    const newValue: number[] = value.map((v) => Number(v.value));

    setValue(newValue);
    setFieldValues(value);

    // deleting a Chip doesn't trigger an onBlur action
    if (!touched && reason === "removeOption") {
      submitValues();
    }
  }

  function handleOnBlur(
    event: React.FocusEvent<HTMLDivElement, Element>
  ): void {
    onBlur(event);
    submitValues();
  }

  return (
    <Autocomplete
      id={name}
      multiple
      value={fieldValues}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      options={selectOptions.sort((a, b) => -b.label.localeCompare(a.label))}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(o, v) => o.value === v.value}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          required={required}
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
    />
  );
};

export default MyMultiSelect;
