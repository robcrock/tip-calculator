import { FormSchema } from "@/types/form-schema";
import { useForm } from "react-hook-form";

export const useParsedFormValues = (
  form: ReturnType<typeof useForm<FormSchema>>,
) => {
  const values = form.watch();

  const parsedValues = {
    bill:
      typeof values.bill !== "number" ? parseFloat(values.bill) : values.bill,
    tipPercent:
      typeof values["tip-percent"] !== "number"
        ? parseFloat(values["tip-percent"])
        : values["tip-percent"],
    numberOfPeople:
      typeof values["number-of-people"] !== "number"
        ? parseFloat(values["number-of-people"])
        : values["number-of-people"],
  };

  return parsedValues;
};
