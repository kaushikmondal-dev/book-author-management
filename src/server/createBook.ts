"use server";

import prisma from "@/lib/dbClient/prisma";
import { BookFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const createBook = async (uDATA: BookFormType, imgFile: File) => {
  try {
    const imageName = `${crypto.randomUUID()}.jpeg`;

    const imageArrayBuffer = await imgFile.arrayBuffer();

    await sharp(imageArrayBuffer)
      .resize({
        width: 256,
        height: 256,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`./public/uploads/${imageName}`);

    const imageUrl = `uploads/${imageName}`;

    await prisma.book.create({
      data: {
        name: uDATA.name,
        image: imageUrl,
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
