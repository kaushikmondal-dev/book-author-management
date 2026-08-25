import { BookGetPayload } from "@generated/prisma/models";
import { UserPenIcon } from "lucide-react";
import Link from "next/link";
import DeleteBookButton from "./DeleteBookButton";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Badge } from "./shadcnui/badge";
import { buttonVariants } from "./shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcnui/card";

type BookCardProps = {
  book: BookGetPayload<{
    include: {
      author: true;
    };
  }>;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="w-sm">
      <div className="grid place-items-center">
        <Avatar className="size-64">
          <AvatarImage src={`/${book.image}`} />
          <AvatarFallback>{book.name}</AvatarFallback>
        </Avatar>
      </div>
      <CardHeader>
        <CardTitle className="text-center text-3xl">{book.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex place-items-center items-center justify-center text-lg">
        <span className="flex items-center gap-3">
          {book.author.name}
          <Badge
            className="text-xl"
            variant="default">
            {book.author.subject}
          </Badge>
        </span>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-10">
        <DeleteBookButton
          bookId={book.id}
          bookImage={book.image}
        />
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={"/"}>
          <UserPenIcon />
          Update
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
