// components/ResultsDisplay.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/utils";

type ResultsDisplayProps = {
  parsedValues: {
    bill: number;
    tipPercent: number;
    numberOfPeople: number;
  };
  onReset: () => void;
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  parsedValues,
  onReset,
}) => {
  const { bill, tipPercent, numberOfPeople } = parsedValues;

  const calculateTipPerPerson = () =>
    numberOfPeople <= 0 ? 0 : (bill * tipPercent) / numberOfPeople;

  const calculateTotalPerPerson = () =>
    numberOfPeople <= 0 ? 0 : (bill * tipPercent + bill) / numberOfPeople;

  return (
    <section className="p-8">
      <Card className="h-full w-full rounded-[15px] bg-very-dark-cyan">
        <CardContent className="flex h-full flex-col justify-between p-10">
          <div className="flex flex-col gap-[25px]">
            {[
              { label: "Tip Amount", value: calculateTipPerPerson() },
              { label: "Total", value: calculateTotalPerPerson() },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex h-[71px] items-center justify-between"
              >
                <div className="flex flex-col font-bold">
                  <div className="text-[16px] text-white">{label}</div>
                  <div className="text-[13px] text-grayish-cyan">/ person</div>
                </div>
                <div className="text-right text-5xl font-bold text-strong-cyan">
                  {formatter.format(value)}
                </div>
              </div>
            ))}
          </div>
          <Button
            className="h-12 bg-strong-cyan text-xl font-bold uppercase text-very-dark-cyan hover:bg-light-grayish-cyan hover:text-very-dark-cyan"
            onClick={onReset}
          >
            reset
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
