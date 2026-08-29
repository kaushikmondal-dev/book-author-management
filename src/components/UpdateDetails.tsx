"use client";

import { bookFormSchema, BookFormType } from "@/lib/zodSchema";
import { updateBookDetails } from "@/server/updateBookDetails";
import { Author, Book } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";
import { Field, FieldContent, FieldError, FieldLabel } from "./shadcnui/field";
import { Input } from "./shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcnui/select";
import { toast } from "./shadcnui/toast";

type UpdateDetailsProps = {
  book: Book;
  authors: Author[];
};

const UpdateDetails = ({ book, authors }: UpdateDetailsProps) => {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      name: book.name,
      authorId: book.authorId,
      language: book.language,
      pages: book.pages,
      price: book.price,
      publishedYear: book.publishedYear,
    },
    mode: "all",
  });

  const updateBookHandler = async (uDATA: BookFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await updateBookDetails(book.id, uDATA);

    if (isSuccess) {
      toast.add({ title: msg, type: "success" });

      reset();

      push("/");
    } else {
      toast.add({ title: msg, type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateBookHandler)}
      className="grid gap-4"
      noValidate>
      <CardContent className="grid gap-4">
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Enter Book Name"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Author */}

        <Controller
          name="authorId"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="responsive"
              data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Author</FieldLabel>
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="min-w-30">
                  {/*this part show author name instance of author id*/}

                  <SelectValue placeholder="Select an Author">
                    {(value: string) => {
                      const selectedAuthor = authors.find(
                        (author) => author.id === value,
                      );
                      return selectedAuthor ?
                          selectedAuthor.name
                        : "Select an Author";
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem
                      key={author.id}
                      value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Published Year */}
        <Controller
          name="publishedYear"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Published Year</FieldLabel>

              <Input
                id={field.name}
                type="number"
                min="1"
                placeholder="Enter published year"
                value={field.value as string | number | undefined}
                onChange={(e) => field.onChange(e.target.value)}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Pages */}
        <Controller
          name="pages"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Pages</FieldLabel>

              <Input
                id={field.name}
                type="number"
                min="1"
                placeholder="Enter Number of Pages"
                value={field.value as string | number | undefined}
                onChange={(e) => field.onChange(e.target.value)}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Price */}
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Price</FieldLabel>

              <Input
                id={field.name}
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter Price"
                value={field.value as string | number | undefined}
                onChange={(e) => field.onChange(e.target.value)}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Language */}
        <Controller
          name="language"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Language</FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Enter Book Language"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting || !isDirty}>
          {isSubmitting ?
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Updating Book...
            </>
          : <>
              <RefreshCw className="h-4 w-4" />
              Update
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default UpdateDetails;
