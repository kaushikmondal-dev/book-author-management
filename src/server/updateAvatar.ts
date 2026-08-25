"use server";

import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
import sharp from "sharp";

export const updateAvatar = async (
  bookId: string,
  bookPrevImage: string,
  imgFile: File,
) => {
  try {
    await rm(`./public/${bookPrevImage}`);

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

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Avatar Updated ✅",
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
      msg: "Server error: Updation failed 😒 !!",
    };
  }
};
