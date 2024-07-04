# Formik + Yup + TS

This tutorial is learning Formik, Yup and MUI tools.

It is part 2 in exploring Formik and Yup. The first part dug into how to use Formik and Yup. That will be the first commit of the code here. I will then explore how to abstract out the field components while still using Formik Context or useFormik hook.

According to the [formik docs](https://formik.org/docs/examples/with-material-ui), it looks like we need to use the `useFormik` hook. I want to explore not using the hook, but using the context instead (`<Formik ...>{/* form */}</Formik>`) with the `useField()` hook.
