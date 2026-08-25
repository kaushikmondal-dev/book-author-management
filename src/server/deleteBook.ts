"use server";

import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

export const deleteBook = async (bookId: string, bookImage: string) => {
  try {
    await rm(`./public/${bookImage}`);

    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Book Deleted✅",
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
      msg: "Server error: Delete failed 😒 !!",
    };
  }
};
