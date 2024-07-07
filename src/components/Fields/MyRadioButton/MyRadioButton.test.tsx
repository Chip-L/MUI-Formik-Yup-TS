import { render, screen, waitFor, within } from "@testing-library/react";
import MyRadioButton from "./MyRadioButton";
import { ComponentProps } from "react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";

const handleDBSubmitSpy = vi.fn();
type RadioButtonOption = ComponentProps<typeof MyRadioButton>["options"][0];
const RADIO_OPTIONS: RadioButtonOption[] = [
  { label: "Active", value: "Active" },
  { label: "Passive", value: "Passive" },
];

const renderMyRadioButton = (errorMessage?: string) => {
  const user = userEvent.setup();
  render(
    <Formik initialValues={{ pick: "" }} onSubmit={() => {}}>
      {() => (
        <MyRadioButton
          name="pick"
          label={"Radio Input"}
          options={RADIO_OPTIONS}
          handleDBSubmit={handleDBSubmitSpy}
          errorMessage={errorMessage}
        />
      )}
    </Formik>
  );

  return { user };
};

describe("MyRadioButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders", () => {
    renderMyRadioButton();

    expect(screen.getByText("Radio Input")).toHaveAttribute("id", "pick-label");

    const radioInput = screen.getByRole("radiogroup");
    expect(radioInput).toHaveAttribute("aria-labelledby", "pick-label");
    expect(within(radioInput).getAllByRole("radio")).toHaveLength(2);

    expect(screen.getByLabelText(RADIO_OPTIONS[0].label)).not.toBeChecked();
    expect(screen.getByLabelText(RADIO_OPTIONS[1].label)).not.toBeChecked();
  });

  it("selects a value", async () => {
    const { user } = renderMyRadioButton();

    const radioInput = screen.getByRole("radiogroup");
    const option1 = screen.getByText(RADIO_OPTIONS[0].label);
    await user.click(option1);

    waitFor(() => {
      expect(radioInput).toHaveValue(RADIO_OPTIONS[0].value);
    });
    expect(handleDBSubmitSpy).toHaveBeenCalledWith(
      "pick",
      RADIO_OPTIONS[0].value
    );
  });

  it.only("renders an error message if submitted when blank", () => {
    const errorMessage = "Error message";
    renderMyRadioButton(errorMessage);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
