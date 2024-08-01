import { formSchema } from "@/app/page";
import { z } from "zod";

export type FormSchema = z.infer<typeof formSchema>;
