"use client";

import { Attribution } from "@/components/attribution";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "@/components/button-group";
import { zodResolver } from "@hookform/resolvers/zod";
import DollarSign from "@/components/icons/dollar-sign";
import Person from "@/components/icons/person";
import Logo from "@/components/icons/logo";

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
  // const [bill, setBill] = useState(0);
  // const [tipPercent, setTipPercent] = useState(0);
  // const [numberOfPeople, setNumberOfPeople] = useState(0);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bill: "0",
      "tip-percent": "0.05",
      "number-of-people": "1",
    },
  });

  const {
    bill,
    "tip-percent": tipPercent,
    "number-of-people": numberOfPeople,
  } = form.watch();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("fired");
    console.log(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // setBill(parseFloat(values.bill));
    // setTipPercent(parseFloat(values["tip-percent"]));
    // setNumberOfPeople(parseFloat(values["number-of-people"]));
    form.reset({});
    // setIsSubmitSuccessful(true);
  }

  return (
    <main className="flex h-full min-h-screen flex-col items-center bg-light-grayish-cyan pb-8">
      <div className="mb-[60px] mt-[104px]">
        <Logo />
      </div>
      {/* - Card */}
      <Card className="mb-6 h-[481px] w-[920px] rounded-[25px]">
        <CardContent className="h-full w-full p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid h-full w-full grid-cols-2"
            >
              <section className="mb-[48px] ml-[48px] mr-2 mt-[45px] flex flex-col gap-10">
                {/* -- Bill Input -- */}
                <FormField
                  control={form.control}
                  name="bill"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold text-dark-grayish-cyan">
                        Bill
                      </FormLabel>
                      <FormControl className="h-12 text-2xl font-bold">
                        <Input
                          className="pr-2"
                          type="number"
                          step="0.01"
                          startIcon={DollarSign}
                          placeholder="Bill Amount"
                          {...form.register("bill")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* -- Tip % Radio Group -- */}
                <ButtonGroup />
                {/* -- Number of People Input -- */}
                <FormField
                  control={form.control}
                  name="number-of-people"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold text-dark-grayish-cyan">
                        Number of People
                      </FormLabel>
                      <FormControl className="h-12 text-2xl font-bold">
                        <Input
                          className="pr-2"
                          type="number"
                          startIcon={Person}
                          placeholder="People in Your Party"
                          {...field}
                        />
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
                    <div className="flex flex-col gap-[25px]">
                      {/* tip per person */}
                      <div className="flex h-[71px] items-center justify-between">
                        <div className="flex flex-col font-bold">
                          <div className="text-[16px] text-white">
                            Tip Amount
                          </div>
                          <div className="text-[13px] text-grayish-cyan">
                            / person
                          </div>
                        </div>
                        <div className="text-right text-5xl font-bold text-strong-cyan">
                          {formatter.format(
                            (parseFloat(bill) * parseFloat(tipPercent)) /
                              parseFloat(numberOfPeople),
                          ) || formatter.format(0)}
                        </div>
                      </div>
                      {/* total per person */}
                      <div className="flex h-[71px] items-center justify-between">
                        <div className="flex flex-col font-bold">
                          <div className="text-[16px] text-white">Total</div>
                          <div className="text-[13px] text-grayish-cyan">
                            / person
                          </div>
                        </div>
                        <div className="text-right text-5xl font-bold text-strong-cyan">
                          {formatter.format(
                            (parseFloat(bill) * parseFloat(tipPercent) +
                              parseFloat(bill)) /
                              parseFloat(numberOfPeople),
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="h-12 bg-strong-cyan text-xl font-bold uppercase text-very-dark-cyan hover:bg-light-grayish-cyan hover:text-very-dark-cyan"
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
