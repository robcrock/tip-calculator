"use client";

import { Attribution } from "@/components/attribution";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

const formSchema = z.object({
  bill: z.string(),
  "tip-percent": z.string(),
  "number-of-people": z.string(),
});

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2, // Ensures that cents are always shown, even if zero
});

export default function Home() {
  const [bill, setBill] = useState(0);
  const [tipPercent, setTipPercent] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  console.log(bill);
  console.log(tipPercent);
  console.log(numberOfPeople);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bill: "0",
      "tip-percent": "0.5",
      "number-of-people": "1",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setBill(parseFloat(values.bill));
    setTipPercent(parseFloat(values["tip-percent"]));
    setNumberOfPeople(parseFloat(values["number-of-people"]));
    console.log(values);
  }

  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-between bg-light-grayish-cyan pb-8 pt-24">
      {/* - Card */}
      <Card className="h-[481px] w-[920px] rounded-[25px]">
        <CardContent className="h-full w-full p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid h-full w-full grid-cols-2"
            >
              <section className="mx-[48px] mb-[48px] mt-[45px] flex flex-col gap-10">
                {/* -- Bill Input -- */}
                <FormField
                  control={form.control}
                  name="bill"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Bill
                      </FormLabel>
                      <FormControl className="h-12">
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* -- Tip % Radio Group -- */}
                <FormField
                  control={form.control}
                  name="tip-percent"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-[16px] font-bold">
                        Select Tip %
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-2"
                        >
                          <FormItem className="flex h-12 min-w-[90px] max-w-[116px] items-center justify-center rounded-[5px] bg-very-dark-cyan text-white">
                            <FormControl className="rounded-[5px] bg-very-dark-cyan">
                              <RadioGroupItem value="0.05" id="five-percent" />
                            </FormControl>
                            <FormLabel className="text-2xl font-bold">
                              5%
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex h-12 min-w-[90px] max-w-[116px] items-center justify-center rounded-[5px] bg-very-dark-cyan text-white">
                            <FormControl className="rounded-[5px] bg-very-dark-cyan">
                              <RadioGroupItem value="0.1" id="ten-percent" />
                            </FormControl>
                            <FormLabel className="text-2xl font-bold">
                              10%
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex h-12 min-w-[90px] max-w-[116px] items-center justify-center rounded-[5px] bg-very-dark-cyan text-white">
                            <FormControl className="rounded-[5px] bg-very-dark-cyan">
                              <RadioGroupItem
                                value="0.15"
                                id="fifteen-percent"
                              />
                            </FormControl>
                            <FormLabel className="text-2xl font-bold">
                              15%
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex h-12 min-w-[90px] max-w-[116px] items-center justify-center rounded-[5px] bg-very-dark-cyan text-white">
                            <FormControl className="rounded-[5px] bg-very-dark-cyan">
                              <RadioGroupItem
                                value=".25"
                                id="twenty-five-percent"
                              />
                            </FormControl>
                            <FormLabel className="text-2xl font-bold">
                              25%
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex h-12 min-w-[90px] max-w-[116px] items-center justify-center rounded-[5px] bg-very-dark-cyan text-white">
                            <FormControl>
                              <RadioGroupItem value="0.5" id="fifty-percent" />
                            </FormControl>
                            <FormLabel className="text-2xl font-bold">
                              50%
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* -- Number of People Input -- */}
                <FormField
                  control={form.control}
                  name="number-of-people"
                  render={({ field }) => (
                    <FormItem className="h-12 space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Number of People
                      </FormLabel>
                      <FormControl className="h-12">
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <section className="p-8">
                <Card className="h-full w-full rounded-[15px] bg-very-dark-cyan">
                  <CardContent className="flex h-full flex-col justify-between p-10">
                    {/* -- Results */}
                    <div className="flex flex-col gap-10">
                      {/* tip per person */}
                      <div className="flex justify-between">
                        <div className="flex flex-col font-bold">
                          <div className="text-[16px] text-white">
                            Tip amount
                          </div>
                          <div className="text-[13px] text-grayish-cyan">
                            / per person
                          </div>
                        </div>
                        <div className="text-right text-5xl text-strong-cyan">
                          {formatter.format(
                            (bill * tipPercent) / numberOfPeople,
                          ) || formatter.format(0)}
                        </div>
                      </div>
                      {/* total per person */}
                      <div className="flex justify-between">
                        <div className="flex flex-col font-bold">
                          <div className="text-[16px] text-white">Total</div>
                          <div className="text-[13px] text-grayish-cyan">
                            / per person
                          </div>
                        </div>
                        <div className="text-right text-5xl text-strong-cyan">
                          {formatter.format(
                            (bill * tipPercent + bill) / numberOfPeople,
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="h-12 bg-strong-cyan text-xl font-bold uppercase text-very-dark-cyan"
                      type="submit"
                    >
                      reset
                    </Button>
                  </CardContent>
                </Card>
              </section>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Attribution
        name={"Robert Crocker"}
        link={"https://www.frontendmentor.io/profile/robcrock"}
      />
    </main>
  );
}
