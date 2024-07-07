import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";

function renderSignUpForm() {
  const user = userEvent.setup();
  render(<SignUpForm />);
  return { user };
}

describe("SignUpForm", () => {
  it("renders initial form fields", () => {
    renderSignUpForm();

    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Type/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Known Languages/)).not.toBeInTheDocument();
    expect(
      screen.getByLabelText(/I accept the terms and conditions/)
    ).toBeInTheDocument();
  });

  it("renders known languages field when job type is development", async () => {
    const { user } = renderSignUpForm();

    const jobTypeInput = screen.getByRole("combobox", { name: "Job Type" });
    await user.click(jobTypeInput);
    await user.click(screen.getByText("Developer"));

    expect(await screen.findByLabelText(/Known Languages/)).toBeInTheDocument();
  });

  describe("validates form text fields", () => {
    describe.each`
      fieldName          | invalidValue               | errorMessageOverLimit              | errorMessageBlank
      ${"First Name"}    | ${"John567890123456"}      | ${"Must be 15 characters or less"} | ${"Required"}
      ${"Last Name"}     | ${"Doe456789012345678901"} | ${"Must be 20 characters or less"} | ${"Required"}
      ${"Email Address"} | ${"invalid-email"}         | ${"Invalid email address"}         | ${"Required"}
    `(
      "$fieldName",
      ({
        fieldName,
        invalidValue,
        errorMessageOverLimit,
        errorMessageBlank,
      }) => {
        it(`is over limit of characters`, async () => {
          const { user } = renderSignUpForm();

          const inputField = screen.getByRole("textbox", { name: fieldName });

          // Fill in invalid values
          await user.type(inputField, invalidValue);
          await user.tab(); //this triggers the Formik touched state

          expect(
            await screen.findByText(errorMessageOverLimit)
          ).toBeInTheDocument();
        });

        it(`is blank`, async () => {
          const { user } = renderSignUpForm();

          const inputField = screen.getByRole("textbox", { name: fieldName });

          // Fill in invalid values
          await user.clear(inputField);
          await user.tab(); //this triggers the Formik touched state

          expect(
            await screen.findByText(errorMessageBlank)
          ).toBeInTheDocument();
        });
      }
    );
  });

  it("validate Job Type can't be empty", async () => {
    const { user } = renderSignUpForm();

    const jobTypeInput = screen.getByRole("combobox", { name: "Job Type" });

    await user.click(jobTypeInput); // open the dropdown
    await user.tab(); // close the dropdown
    await user.tab(); // execute blur so the Formik touched state is triggered

    expect(
      await screen.findByText("Please select a job type")
    ).toBeInTheDocument();
  });

  it("validate Known Languages can't be empty when job type is developer", async () => {
    const { user } = renderSignUpForm();

    const jobTypeInput = screen.getByRole("combobox", { name: "Job Type" });
    await user.click(jobTypeInput);
    await user.click(screen.getByText("Developer"));

    const languageInput = screen.getByRole("combobox", {
      name: "Known Languages",
    });
    await user.click(languageInput); // open the dropdown
    await user.tab(); // close the dropdown
    await user.tab(); // execute blur so the Formik touched state is triggered

    expect(
      await screen.findByText(
        "At least one language is required for developers"
      )
    ).toBeInTheDocument();
  });

  it("validate terms and conditions must be checked", async () => {
    const { user } = renderSignUpForm();

    const checkbox = screen.getByRole("checkbox", {
      name: "acceptedTerms",
    });

    await user.click(checkbox); // check the checkbox
    await user.click(checkbox); // uncheck the checkbox
    await user.tab(); // execute blur so the Formik touched state is triggered

    expect(
      await screen.findByText("You must accept the terms and conditions.")
    ).toBeInTheDocument();
  });

  // it.only("submits form with valid values on blur", async () => {
  //   const { user } = renderSignUpForm();

  //   // Fill in valid values
  //   await user.type(screen.getByRole("textbox", { name: "First Name" }), "John");
  //   await user.type(screen.getByRole("textbox", { name: "Last Name" }), "Doe");
  //   await user.type(
  //     screen.getByRole("textbox", { name: "Email Address" }),
  //     "john.doe@example.com"
  //   );
  //   fireEvent.change(screen.getByLabelText(/Job Type/), {
  //     target: { value: "development" },
  //   });
  //   fireEvent.click(screen.getByLabelText("JavaScript"));
  //   fireEvent.click(screen.getByLabelText(/I accept the terms and conditions/));

  //   // Check for successful submission
  //   expect(
  //     await screen.findByText("handleChange: do submission")
  //   ).toBeInTheDocument();
  // });
});
