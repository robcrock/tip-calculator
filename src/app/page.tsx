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
import { FormSchema } from "@/types/form-schema";
import { INITIAL_FORM_VALUES } from "@/constants";

export const formSchema = z.object({
  bill: z.coerce.number().gte(0, { message: "Can't be negative" }),
  "tip-percent": z.coerce.number().gte(0, { message: "Can't be negative" }),
  "number-of-people": z.coerce
    .number()
    .int()
    .min(1, { message: "Can't be zero" }),
});

export default function Home() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: INITIAL_FORM_VALUES,
  });

  const parsedValues = useParsedFormValues(form);

  const onSubmit = () => form.reset(INITIAL_FORM_VALUES);

  return (
    <main className="flex h-full min-h-screen flex-col items-center bg-light-grayish-cyan pb-8">
      <div className="mb-[60px] mt-[104px]">
        <Logo />
      </div>
      <Card className="mb-6 h-[481px] w-[920px] rounded-[25px]">
        <CardContent className="h-full w-full p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid h-full w-full grid-cols-2"
            >
              <BillForm form={form} />
              <ResultsDisplay parsedValues={parsedValues} onReset={onSubmit} />
            </form>
          </Form>
        </CardContent>
      </Card>
      <Attribution
        name="Robert Crocker"
        link="https://www.frontendmentor.io/profile/robcrock"
      />
    </main>
  );
}
