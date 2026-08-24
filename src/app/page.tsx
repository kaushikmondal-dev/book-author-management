import BookCard from "@/components/BookCard";
import { Card, CardContent } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Book Author Relation File",
  description: "Home page of Book Author Relation File Application",
};

const page = async () => {
  const allBooks = await prisma.book.findMany();

  if (allBooks.length === 0) {
    return (
      <section className="grid h-dvh place-items-center">
        <Card className="w-sm">
          <CardContent className="text-xl">No Books Found 😒</CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-x-4 gap-y-10 pt-20 md:grid-cols-2 xl:grid-cols-3">
      {allBooks.map((book) => (
        <BookCard key={book.id} />
      ))}
    </section>
  );
};

export default page;
