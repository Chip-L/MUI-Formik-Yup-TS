import { ErrorMessage, Field, useField } from "formik";

interface MyTextInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const MyTextInput = ({ label, name, type, placeholder }: MyTextInputProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  // const [field, meta] = useField(name);

  // The above isn't used because Field and ErrorMessage are already tied into the context

  return (
    <div className="fieldContainer">
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" className="error" />
      {/* <input
        id={name}
        type={type ?? "text"}
        {...field}
        placeholder={placeholder}
        className={meta.touched && meta.error ? "error" : ""}
      /> */}
      {/* {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )} */}
    </div>
  );
};

export default MyTextInput;
