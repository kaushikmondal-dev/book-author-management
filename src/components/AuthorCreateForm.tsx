"use client";

import { authorFormSchema, AuthorFormType } from "@/lib/zodSchema";
import { createAuthor } from "@/server/createAuthor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";
import { Field, FieldError, FieldLabel } from "./shadcnui/field";
import { Input } from "./shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcnui/select";
import { toast } from "./shadcnui/toast";

const AuthorCreateForm = () => {
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(authorFormSchema),
    defaultValues: {
      name: "",
      subject: "",
    },
    mode: "all",
  });

  const createTeacherHander = async (uDATA: AuthorFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await createAuthor(uDATA);

    if (isSuccess) {
      toast.add({ title: msg, type: "success" });

      reset();

      push("/create");
    } else {
      toast.add({ title: msg, type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createTeacherHander)}
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
          name="subject"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Subject</FieldLabel>

              <Select
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Subject" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="C/C++">C/C++ Programming</SelectItem>

                  <SelectItem value="Python">Python Crash Course</SelectItem>

                  <SelectItem value="Java">Java Programming</SelectItem>

                  <SelectItem value="Cloud">Cloud Computing</SelectItem>
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
              Creating Author...
            </>
          : <>
              <UserPlusIcon className="mr-2 h-4 w-4" />
              Create Author
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default AuthorCreateForm;
