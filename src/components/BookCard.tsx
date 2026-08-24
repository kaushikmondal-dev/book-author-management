import { Trash2Icon, UserPenIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./shadcnui/badge";
import { Button, buttonVariants } from "./shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcnui/card";

const BookCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Book Name</CardTitle>
      </CardHeader>
      <CardContent className="flex place-items-center items-center justify-center space-y-5 text-lg">
        <span>
          Author Name <Badge variant="secondary">Badge</Badge>
        </span>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-10">
        <Button variant={"destructive"}>
          <Trash2Icon />
          Delete
        </Button>
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
