"use server";

import prisma from "@/lib/dbClient/prisma";
import { AuthorFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const createAuthor = async (uDATA: AuthorFormType) => {
  try {
    await prisma.author.create({
      data: uDATA,
    });

    revalidatePath("/");
    revalidatePath("/create");

    return {
      isSuccess: true,
      msg: "Teacher Added✅",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Somthing want to Worng, try later ❌!!",
      };
    }
    return {
      isSuccess: false,
      msg: "Server error: creation failed 😒 !!",
    };
  }
};
