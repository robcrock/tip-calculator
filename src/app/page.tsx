// pages/index.tsx or app/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Logo from "@/components/icons/logo";
import { Attribution } from "@/components/attribution";
import { useParsedFormValues } from "@/hooks/useParsedFormValues";
import { BillForm } from "@/components/bill-form";
import { ResultsDisplay } from "@/components/result-display";
import { formSchema, FormSchema } from "@/types/form-schema";
import { INITIAL_FORM_VALUES } from "@/constants";

export default function Home() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: INITIAL_FORM_VALUES,
  });

  const parsedValues = useParsedFormValues(form);

  const onSubmit = () => form.reset(INITIAL_FORM_VALUES);

  return (
    <main className="flex h-full min-h-screen justify-center bg-light-grayish-cyan">
      <div>
        <Card className="relative mt-[304px] h-[481px] w-[920px] rounded-[25px]">
          <div className="-translate-y-1/2w-full trans form absolute -top-[135px] left-1/2 -translate-x-1/2">
            <Logo />
          </div>
          <CardContent className="h-full w-full p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid h-full w-full grid-cols-2"
              >
                <BillForm form={form} />
                <ResultsDisplay
                  parsedValues={parsedValues}
                  onReset={onSubmit}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Attribution
        name="Robert Crocker"
        link="https://www.frontendmentor.io/profile/robcrock"
      />
    </main>
  );
}
