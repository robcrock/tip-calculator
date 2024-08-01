// components/BillForm.tsx
import { UseFormReturn } from "react-hook-form";
import { ButtonGroup } from "@/components/button-group";
import { FormSchema } from "@/app/page";
import DollarSign from "@/components/icons/dollar-sign";
import Person from "@/components/icons/person";
import { FormField } from "./form-field";

type BillFormProps = {
  form: UseFormReturn<FormSchema>;
};

export const BillForm: React.FC<BillFormProps> = ({ form }) => (
  <section className="mb-[48px] ml-[48px] mr-2 mt-[45px] flex flex-col gap-10">
    <FormField
      form={form}
      name="bill"
      label="Bill"
      icon={DollarSign}
      placeholder="Bill Amount"
      step="0.01"
    />
    <ButtonGroup />
    <FormField
      form={form}
      name="number-of-people"
      label="Number of People"
      icon={Person}
      placeholder="People in Your Party"
    />
  </section>
);
