"use client";

import { bookFormSchema, BookFormType } from "@/lib/zodSchema";
import { createBook } from "@/server/createBook";
import { Author } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
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

type BookCreateFormProps = {
  authors: Author[];
};

const BookCreateForm = ({ authors }: BookCreateFormProps) => {
  const [isFile, setIsFile] = useState(false);

  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      name: "",

      authorId: "",
    },
    mode: "all",
  });

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
    validators: [
      new FileSizeValidator({ maxFileSize: 6 * 1024 * 1024 /* 5 MB */ }),
    ],
  });

  const createBookHandler = async (uDATA: BookFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const { isSuccess, msg } = await createBook(uDATA, plainFiles[0]);

    if (isSuccess) {
      toast.add({ title: msg, type: "success" });

      reset();
      clear();

      push("/");
    } else {
      toast.add({ title: msg, type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createBookHandler)}
      className="grid gap-4"
      noValidate>
      <CardContent className="grid gap-4">
        {/* Image */}
        {!isFile && (
          <button
            type="button"
            onClick={openFilePicker}
            className="grid place-items-center">
            <Avatar className="size-64">
              <AvatarImage src="https://placehold.co/256.jpeg" />
              <AvatarFallback>Select Image</AvatarFallback>
            </Avatar>
          </button>
        )}

        {filesContent.map(({ size, content, name }) => (
          <button
            key={size}
            type="button"
            onClick={openFilePicker}
            className="grid place-items-center">
            <Avatar className="size-64">
              <AvatarImage src={content} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          </button>
        ))}

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
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting || !isFile}>
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
