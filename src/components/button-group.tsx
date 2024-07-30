import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";

const buttonProps = [
  { value: 0.05, label: "5%" },
  { value: 0.1, label: "10%" },
  { value: 0.15, label: "15%" },
  { value: 0.25, label: "25%" },
  { value: 0.5, label: "50%" },
];

export const ButtonGroup = () => {
  const { register, setValue } = useFormContext(); // Using setValue from useFormContext
  const tipPercentRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Handler for button clicks
  const handleButtonClick = (value: number) => {
    console.log("clicked");
    setValue("tip-percent", value, { shouldValidate: true }); // Update the form state with the button's value
    setInputValue(""); // Reset local input state so it doesn't show old values
  };

  const handleInputClick = () => {
    tipPercentRef.current?.focus();
  };

  // Handler for changes in the input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      console.log("changed");
      setValue("tip-percent", value, { shouldValidate: true }); // Only update with valid numbers
    }
    setInputValue(event.target.value);
  };

  return (
    <div className="grid grid-cols-3 gap-[13px]">
      {buttonProps.map(({ value, label }) => (
        <Button
          {...register("tip-percent")} // Register input for react-hook-form
          key={label}
          type="button" // Ensure this is a button to prevent form submission
          onClick={() => handleButtonClick(value)}
        >
          {label}
        </Button>
      ))}
      <Input
        type="number"
        step="0.01"
        {...register("tip-percent")} // Register input for react-hook-form
        value={inputValue}
        onChange={handleInputChange} // Custom handler for input changes
        onClick={handleInputClick} // Custom handler for input changes
        placeholder="CUSTOM"
        ref={tipPercentRef}
      />
    </div>
  );
};
