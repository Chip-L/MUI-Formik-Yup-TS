import Stack from "@mui/material/Stack";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import MyCheckbox from "./MyCheckbox";
import MySelect from "./MySelect";
import MyTextInput from "./MyTextInput";
import Button from "@mui/material/Button";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  jobType: string;
  accepted: boolean;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  jobType: "",
  accepted: false,
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  // this email check is crap c@c is considered valid
  email: Yup.string().email("Invalid email address").required("Required"),
  jobType: Yup.string()
    .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required("Required"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});

const SignUpForm = () => {
  const handleFormikSubmit = (
    values: FormValues,
    _formikHelpers: FormikHelpers<FormValues>
  ) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormikSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {/* <label htmlFor="firstName">First Name</label>
          {/* <input
            id="firstName"
            // name="firstName"
            type="text"
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.firstName}
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null} */}
          {/*
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" /> */}
          <Stack spacing={2}>
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Jane"
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />

            <MySelect
              label="Job Type"
              name="jobType"
              options={[
                { value: "", label: "Select a job type" },
                { value: "designer", label: "Designer" },
                { value: "development", label: "Developer" },
                { value: "product", label: "Product Manager" },
                { value: "other", label: "Other" },
              ]}
            />

            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
