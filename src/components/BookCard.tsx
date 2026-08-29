import { BookGetPayload } from "@generated/prisma/models";
import {
  Briefcase,
  FileText,
  IndianRupee,
  Languages,
  RefreshCw,
} from "lucide-react";
import { Route } from "next";
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
import { Separator } from "./shadcnui/separator";

type BookCardProps = {
  book: BookGetPayload<{
    include: {
      author: true;
    };
  }>;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="w-sm bg-gray-950">
      <div className="grid place-items-center bg-gray-900">
        <Avatar className="size-64">
          <AvatarImage src={`/${book.image}`} />
          <AvatarFallback>{book.name}</AvatarFallback>
        </Avatar>
      </div>

      <CardHeader>
        <CardTitle className="text-center text-3xl">{book.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex place-items-center items-center justify-center text-lg">
        <div className="flex items-center gap-3 text-xl">
          {book.author.name}
        </div>
        <div className="">
          <Badge
            className="text-sm"
            variant="default">
            {book.author.subject}
          </Badge>
        </div>
        <Separator />

        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <p className="flex items-center gap-1 text-sm">
              <IndianRupee className="h-4 w-4 justify-center rounded-full bg-gray-500 p-1 text-white" />
              Price: {"\u20B9"}
              {book.price}
            </p>

            <p className="flex items-center gap-1 text-sm">
              <FileText className="h-4 w-4 justify-center rounded-full bg-gray-500 p-1 text-white" />
              Page: {book.pages}
            </p>
          </div>

          <div className="grid gap-2">
            <p className="flex items-center gap-1 text-sm">
              <Briefcase className="h-4 w-4 justify-center rounded-full bg-gray-500 p-1 text-white" />
              Published: {book.publishedYear}
            </p>

            <p className="flex items-center gap-1 text-sm">
              <Languages className="h-4 w-4 justify-center rounded-full bg-gray-500 p-1 text-white" />
              Language: {book.language}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-10">
        <DeleteBookButton
          bookId={book.id}
          bookImage={book.image}
        />
        <Link
          href={`/${book.id}` as Route}
          className={buttonVariants({ variant: "secondary" })}>
          <RefreshCw />
          Update
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
