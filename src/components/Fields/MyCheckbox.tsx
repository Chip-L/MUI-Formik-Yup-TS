import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useField } from "formik";

interface MyCheckboxProps {
  name: string;
  label: string;
  required?: boolean;
  handleDBSubmit: (id: string, value: string) => void;
}

const MyCheckbox = ({
  label,
  name,
  required = false,
  handleDBSubmit,
}: MyCheckboxProps) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta, helper] = useField({ name, type: "checkbox" });

  const handleOnBlur = (e: React.FocusEvent<HTMLButtonElement, Element>) => {
    field.onBlur(e);

    if (!meta.touched || !meta.error) {
      console.log("MyCheckbox: submit to db");
      handleDBSubmit(field.name, field.value);
    }
  };

  return (
    <Stack>
      <FormControlLabel
        required={required}
        control={
          <Checkbox
            name={name}
            checked={field.checked}
            onChange={(_, checked) => helper.setValue(checked)}
            onBlur={handleOnBlur}
            inputProps={{ "aria-label": name }}
          />
        }
        label={label}
      />
      {meta.touched && meta.error ? (
        <Typography
          variant="errorMessage"
          sx={{ color: "error.main" }}
          className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required"
        >
          {meta.error}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default MyCheckbox;
