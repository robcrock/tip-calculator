import { z } from "zod";

export const formSchema = z.object({
  bill: z.coerce.number().gte(0, { message: "Can't be negative" }),
  "tip-percent": z.coerce.number().gte(0, { message: "Can't be negative" }),
  "number-of-people": z.coerce
    .number()
    .int()
    .min(1, { message: "Can't be zero" }),
});

export type FormSchema = z.infer<typeof formSchema>;
