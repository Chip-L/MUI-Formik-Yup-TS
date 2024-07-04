import { useField } from "formik";
import { PropsWithChildren } from "react";

interface MyCheckboxProps {
  name: string;
}

const MyCheckbox = ({ children, name }: PropsWithChildren<MyCheckboxProps>) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ name, type: "checkbox" });
  return (
    <div className="fieldContainer">
      <label className="checkbox-input">
        <input type="checkbox" {...field} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;
