import TextField from "@mui/material/TextField";
import { useField } from "formik";

interface MyTextInputProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  handleDBSubmit: (id: string, value: string) => void;
}

const MyTextInput = ({
  label,
  name,
  type = "text",
  required = false,
  handleDBSubmit,
}: MyTextInputProps) => {
  const [field, meta] = useField(name);

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    field.onBlur(e);
    if (!meta.touched || !meta.error) {
      console.log("MyTextInput: submit to db");
      handleDBSubmit(field.name, field.value);
    }
  };

  return (
    <TextField
      id={name}
      label={label}
      type={type}
      value={field.value}
      onChange={field.onChange}
      onBlur={(event) => handleOnBlur(event)}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      required={required}
    />
  );
};

export default MyTextInput;
