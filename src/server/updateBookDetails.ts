"use server";

import prisma from "@/lib/dbClient/prisma";
import { BookFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const updateBookDetails = async (
  bookId: string,
  uDATA: BookFormType,
) => {
  try {
    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        name: uDATA.name,
        authorId: uDATA.authorId,
        language: uDATA.language,
        pages: uDATA.pages,
        price: uDATA.price,
        publishedYear: uDATA.publishedYear,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Book Updated✅",
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
      msg: "Server error: Uptade failed 😒 !!",
    };
  }
};
