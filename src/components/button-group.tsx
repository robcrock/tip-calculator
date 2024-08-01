import React, { useState } from "react";
import { Percent } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const TIP_PERCENTAGES = [
  { value: 0.05, label: "5%" },
  { value: 0.1, label: "10%" },
  { value: 0.15, label: "15%" },
  { value: 0.25, label: "25%" },
  { value: 0.5, label: "50%" },
];

export const ButtonGroup: React.FC = () => {
  const { control, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState<string>("");

  const handleButtonClick = (value: number) => {
    setValue("tip-percent", value, { shouldValidate: true });
    setInputValue(""); // Reset local input state
  };

  return (
    <Controller
      name="tip-percent"
      control={control}
      render={({ field }) => (
        <section className="flex flex-col gap-4">
          <div className="font-bold text-dark-grayish-cyan">Select Tip %</div>
          <div className="grid grid-cols-3 gap-[13px]">
            {TIP_PERCENTAGES.map(({ value, label }) => (
              <Button
                key={label}
                type="button"
                className={cn(
                  "h-12 bg-very-dark-cyan text-2xl font-bold",
                  field.value === value
                    ? "bg-strong-cyan text-very-dark-cyan hover:bg-strong-cyan hover:text-very-dark-cyan"
                    : "hover:bg-light-grayish-cyan hover:text-very-dark-cyan",
                )}
                onClick={() => handleButtonClick(value)}
              >
                {label}
              </Button>
            ))}
            <Input
              className="h-12 px-0 text-2xl font-bold"
              startIcon={inputValue !== "" ? Percent : null}
              type="number"
              placeholder="Custom"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                field.onChange(value ? parseFloat(value) / 100 : "");
              }}
            />
          </div>
        </section>
      )}
    />
  );
};
