import { SelectOptionType } from "@types";

export function getOptionValues(
  selectOptions: SelectOptionType[],
  fieldValue: (string | number)[]
): SelectOptionType[] {
  let returnValue: SelectOptionType[] = [];
  fieldValue.forEach((fv) => {
    const rv = selectOptions.filter((o) => o.value === fv);
    if (rv) {
      returnValue = returnValue.concat(rv);
    }
  });
  return returnValue;
}

export function getOptionValue(
  selectOptions: SelectOptionType[],
  fieldValue: string | number
): SelectOptionType | null {
  return getOptions(selectOptions, fieldValue) ?? null;
}

function getOptions(
  selectOptions: SelectOptionType[],
  fieldValue: string | number
): SelectOptionType {
  return selectOptions.filter((o) => o.value === fieldValue)[0];
}
