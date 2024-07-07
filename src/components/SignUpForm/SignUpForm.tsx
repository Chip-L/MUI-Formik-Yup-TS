import {
  MyCheckbox,
  MyMultiSelect,
  MySelect,
  MyTextInput,
} from "@components/Fields";
import MyRadioButton from "@components/Fields/MyRadioButton";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import * as Yup from "yup";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

interface FormValues {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  jobType: string;
  languages?: number[];
  acceptedTerms: boolean;
  gender?: string;
  isHuman?: boolean | null;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  age: 20,
  email: "",
  jobType: "",
  languages: [],
  acceptedTerms: false,
  gender: "",
  isHuman: null,
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
    .required("Please select a job type"),
  languages: Yup.array()
    .of(Yup.number().required("Language selection is required"))
    .when("$jobType", (selectedJobType, schema) => {
      return selectedJobType[0] === "development"
        ? schema
            .min(1, "At least one language is required for developers")
            .required("Language selection is required for developers")
        : schema.notRequired();
    }),
  gender: Yup.string()
    .oneOf(
      GENDER_OPTIONS.map((g) => g.value),
      "Invalid gender"
    )
    .required("Please select a gender"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});

const SignUpForm = () => {
  const handleChange = async (
    field: string,
    value: string | boolean | number | number[]
  ) => {
    console.log("handleChange: do submission", { field, value });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, touched, errors }) => (
        <form>
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
              label="Age"
              name="age"
              type="number"
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
              required
              handleDBSubmit={handleChange}
              selectOptions={[
                { value: "designer", label: "Designer" },
                { value: "development", label: "Developer" },
                { value: "product", label: "Product Manager" },
                { value: "other", label: "Other" },
              ]}
            />

            {values.jobType === "development" && (
              <>
                <MyMultiSelect
                  label="Known Languages"
                  name="languages"
                  handleDBSubmit={handleChange}
                  required
                  selectOptions={[
                    { value: 0, label: "JavaScript" },
                    { value: 1, label: "Java" },
                    { value: 2, label: "C" },
                    { value: 3, label: "C++" },
                  ]}
                />
              </>
            )}

            <MyRadioButton
              label="Gender"
              name="gender"
              options={GENDER_OPTIONS}
              handleDBSubmit={handleChange}
              // if this is touched it won't generate an error, so do the error if it is passed
              errorMessage={
                touched.acceptedTerms && !!errors.gender ? errors.gender : ""
              }
            />

            <MyCheckbox
              name="acceptedTerms"
              label="I accept the terms and conditions"
              required
              handleDBSubmit={handleChange}
            />
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
