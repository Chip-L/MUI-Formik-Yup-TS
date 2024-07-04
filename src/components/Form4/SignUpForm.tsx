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
    console.log("handleFormikSubmit", JSON.stringify(values, null, 2));
  };

  const handleChange = async (
    field: string,
    value: string | boolean | string[]
  ) => {
    /* handle Change from "src/components/CaseHeader/CaseHeader.tsx" */
    // if (
    //   typeof value != "object" &&
    //   value &&
    //   values[field as keyof typeof values] === value
    // )
    //   return;

    // await setFieldValue(field, value, true);
    // const validationErrors = await setTouched({ ...touched, [field]: true }, true);
    // if (
    //   (validationErrors && !Object.hasOwn(validationErrors, field)) ||
    //   !validationErrors
    // ) {

    //   updateCaseHeader(field, value); <== I think this is the only line still required here...

    // }

    console.log("handleChange: do submission", { field, value });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormikSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <MyTextInput
              label="First Name"
              name="firstName"
              required
              handleDBSubmit={handleChange}
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              required
              handleDBSubmit={handleChange}
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              required
              handleDBSubmit={handleChange}
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
