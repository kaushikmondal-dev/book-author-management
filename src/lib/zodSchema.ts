import z from "zod";

export const authorFormSchema = z.object({
  name: z
    .string()
    .min(5, { error: "Author name must be at least 5 characters." })
    .max(50, { error: "Author name must not exceed 50 characters." }),

  subject: z.string().min(2, { error: "Please select a subject." }),
});

export type AuthorFormType = z.infer<typeof authorFormSchema>;

export const bookFormSchema = z.object({
  name: z

    .string()
    .min(3, { error: "Book name must be at least 3 characters." }),

  authorId: z.string().min(5, { error: "Author is required." }),

  price: z.coerce
    .number({ error: "Price is required." })
    .min(0, { error: "Price cannot be negative." }),

  publishedYear: z.coerce
    .number({ error: "Published year is required." })
    .int({ error: "Published year must be a whole number." })
    .min(1, { error: "Published year must be at least 1." }),

  pages: z.coerce
    .number({ error: "Pages is required." })
    .int({ error: "Pages must be a whole number." })
    .min(1, { error: "Pages must be at least 1." }),

  language: z
    .string()
    .min(2, { error: "Language is required." })
    .max(30, { error: "Language must not exceed 30 characters." }),
});

export type BookFormType = z.infer<typeof bookFormSchema>;
