import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const buttonProps = [
  { value: 0.05, label: "5%" },
  { value: 0.1, label: "10%" },
  { value: 0.15, label: "15%" },
  { value: 0.25, label: "25%" },
  { value: 0.5, label: "50%" },
];

export const ButtonGroup = () => {
  const { register, setValue, getValues } = useFormContext(); // Using setValue from useFormContext
  const tipPercentRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Handler for button clicks
  const handleButtonClick = (value: number) => {
    setValue("tip-percent", value, { shouldValidate: true }); // Update the form state with the button's value
    setInputValue(""); // Reset local input state so it doesn't show old values
  };

  const handleInputClick = () => {
    tipPercentRef.current?.focus();
  };

  // Handler for changes in the input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(parseFloat(value))) {
      setValue("tip-percent", parseFloat(value), { shouldValidate: true }); // Only update with valid numbers
    }
    setInputValue(event.target.value);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="font-bold text-dark-grayish-cyan">Select Tip %</div>
      <div className="grid grid-cols-3 gap-[13px]">
        {buttonProps.map(({ value, label }) => (
          <Button
            className={cn(
              "h-12 bg-very-dark-cyan text-2xl font-bold",
              `${value === parseFloat(getValues()["tip-percent"]) ? "bg-strong-cyan text-very-dark-cyan hover:bg-strong-cyan hover:text-very-dark-cyan" : "hover:bg-light-grayish-cyan hover:text-very-dark-cyan"}`,
            )}
            {...register("tip-percent")} // Register input for react-hook-form
            key={label}
            type="button" // Ensure this is a button to prevent form submission
            onClick={() => handleButtonClick(value)}
          >
            {label}
          </Button>
        ))}
        <Input
          className="h-12 px-0 text-2xl font-bold"
          type="number"
          step="0.01"
          {...register("tip-percent")} // Register input for react-hook-form
          value={inputValue}
          onChange={handleInputChange} // Custom handler for input changes
          onClick={handleInputClick} // Custom handler for input changes
          placeholder="Custom"
          ref={tipPercentRef}
        />
      </div>
    </section>
  );
};
