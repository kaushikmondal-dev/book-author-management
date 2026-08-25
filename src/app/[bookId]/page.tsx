import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import UpdateAvater from "@/components/UpdateAvater";
import UpdateDetails from "@/components/UpdateDetails";
import prisma from "@/lib/dbClient/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Book Update | Book Author Relation File",
  description: "Book Update page of Book Author Relation File Application",
};

type UpdatePageProps = {
  params: Promise<{ bookId: string }>;
};

const page = async ({ params }: UpdatePageProps) => {
  const { bookId } = await params;

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      author: true,
    },
  });

  if (book === null) {
    return notFound();
  }

  const allAuthors = await prisma.author.findMany();

  return (
    <section className="grid h-dvh grid-cols-2 place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Update Avater</CardTitle>
        </CardHeader>
        <UpdateAvater
          bookId={book.id}
          bookPrevImage={book.image}
        />
      </Card>

      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Upadte Details</CardTitle>
        </CardHeader>
        <UpdateDetails
          book={book}
          authors={allAuthors}
        />
      </Card>
    </section>
  );
};

export default page;
