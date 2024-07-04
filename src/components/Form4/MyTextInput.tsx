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

  // The above isn't used because Field and ErrorMessage are already tied into the context

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    console.log("handleOnBlur", field);
    field.onBlur(e);
    console.log("touched:", meta.touched);
    console.log("error:", meta.error);
    if (!meta.touched || !meta.error) {
      console.log("submit to db");
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
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      required={required}
    />
    // <div className="fieldContainer">
    //   <label htmlFor={name}>{label}</label>
    //   <Field name={name} type={type} placeholder={placeholder} />
    //   <ErrorMessage name={name} component="div" className="error" />
    //   {/* <input
    //     id={name}
    //     type={type ?? "text"}
    //     {...field}
    //     placeholder={placeholder}
    //     className={meta.touched && meta.error ? "error" : ""}
    //   /> */}
    //   {/* {meta.touched && meta.error && (
    //     <div className="error-message">{meta.error}</div>
    //   )} */}
    // </div>
  );
};

export default MyTextInput;
