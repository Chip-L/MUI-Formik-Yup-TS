import { ErrorMessage, useField } from "formik";

interface SelectOption {
  value: string | number;
  label: string;
}

interface MySelectProps {
  name: string;
  label: string;
  options: SelectOption[];
}

const MySelect = ({ label, name, options }: MySelectProps) => {
  const [field, meta] = useField(name);

  console.log({ field, meta });

  return (
    <div className="fieldContainer">
      <label htmlFor={name}>{label}</label>
      <select {...field} id={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage name={name} component="div" className="error" />
      {/* {meta.touched && meta.error && <div>{meta.error}</div>} */}
    </div>
  );
};

export default MySelect;
