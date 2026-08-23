"use client";

import { bookFormSchema, BookFormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
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

const BookCreateForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      name: "",
      authorId: "",
    },
    mode: "all",
  });

  const createBookHandler = async (uDATA: BookFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(uDATA);
  };

  return (
    <form
      onSubmit={handleSubmit(createBookHandler)}
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
                placeholder="Enter Author Name"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Subject */}
        <Controller
          name="authorId"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="responsive"
              data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-rhf-select-language">
                  Author
                </FieldLabel>
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                  id="form-rhf-select-language"
                  aria-invalid={fieldState.invalid}
                  className="min-w-30">
                  <SelectValue placeholder="Select a Author" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ?
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Creating Book...
            </>
          : <>
              <UserPlusIcon className="mr-2 h-4 w-4" />
              Create Book
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default BookCreateForm;
