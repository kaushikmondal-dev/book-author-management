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
});

export type BookFormType = z.infer<typeof bookFormSchema>;

//  image: z.string().min(1, { error: "Image URL is required." }),
