// components/FormField.tsx
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField as UIFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/types/form-schema";

type FormFieldProps = {
  form: UseFormReturn<FormSchema>;
  name: keyof FormSchema;
  label: string;
  icon: any;
  placeholder: string;
  step?: string;
};

export const FormField: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  icon,
  placeholder,
  step = "1",
}) => (
  <UIFormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-2">
        <div className="flex justify-between">
          <FormLabel className="text-[16px] font-bold text-dark-grayish-cyan">
            {label}
          </FormLabel>
          <FormMessage />
        </div>
        <FormControl className="h-12 text-2xl font-bold">
          <Input
            className="pr-2"
            type="number"
            step={step}
            startIcon={icon}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
);
