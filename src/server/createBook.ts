"use server";

import prisma from "@/lib/dbClient/prisma";
import { BookFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const createBook = async (uDATA: BookFormType) => {
  try {
    await prisma.book.create({
      data: uDATA,
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Book Added✅",
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
