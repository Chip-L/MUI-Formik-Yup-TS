import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useField } from "formik";

interface RadioButtonOption {
  label: string;
  value: string;
}

interface MyRadioButtonProps {
  name: string;
  label: string;
  options: RadioButtonOption[];
  handleDBSubmit: (field: string, value: string) => void;
  errorMessage?: string;
}

const MyRadioButton = ({
  name,
  label,
  options,
  handleDBSubmit,
  errorMessage,
}: MyRadioButtonProps) => {
  const [{ value, onBlur, onChange }] = useField(name);

  function handleOnChange(
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void {
    onChange(_event);
    console.log("handleOnChange: do submission", {
      name,
      onChangeValue: value,
    });
    handleDBSubmit(name, value);
  }

  return (
    <FormControl>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
      <RadioGroup
        aria-labelledby={`${name}-label`}
        name={name}
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value ?? ""}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MyRadioButton;
