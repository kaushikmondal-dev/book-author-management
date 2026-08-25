"use client";

import { updateAvatar } from "@/server/updateAvatar";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";
import { toast } from "./shadcnui/toast";

type UpdateAvaterProps = {
  bookId: string;
  bookPrevImage: string;
};

const UpdateAvater = ({ bookId, bookPrevImage }: UpdateAvaterProps) => {
  const [isFile, setIsFile] = useState(false);

  const [isLoading, setIsLoding] = useState(false);

  const { refresh } = useRouter();

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

  const updateAvatarHandler = async () => {
    setIsLoding(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await updateAvatar(
      bookId,
      bookPrevImage,
      plainFiles[0],
    );

    if (isSuccess) {
      toast.add({ title: msg, type: "success" });

      refresh();
    } else {
      toast.add({ title: msg, type: "error" });
    }

    clear();

    setIsLoding(false);
  };

  return (
    <section className="grid gap-2">
      <CardContent className="">
        {!isFile && (
          <button
            type="button"
            onClick={openFilePicker}
            className="grid place-items-center">
            <Avatar className="size-64">
              <AvatarImage src={`/${bookPrevImage}`} />
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
      </CardContent>

      <CardFooter className="grid">
        <Button
          type="button"
          onClick={updateAvatarHandler}
          //   variant={"destructive"}
          disabled={isLoading || !isFile}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" />
              Updating Avater....
            </>
          : <>
              <UserPenIcon />
              Update
            </>
          }
        </Button>
      </CardFooter>
    </section>
  );
};

export default UpdateAvater;
