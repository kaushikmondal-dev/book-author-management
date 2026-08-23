import z from "zod";

export const authorFormSchema = z.object({
  name: z
    .string()
    .min(5, { error: "Author name must be at least 5 characters." })
    .max(50, { error: "Author name must not exceed 50 characters." }),

  subject: z.string().min(2, { error: "Please select a subject." }),
});

export type AuthorFormType = z.infer<typeof authorFormSchema>;
