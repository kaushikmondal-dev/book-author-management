import BookCreateForm from "@/components/BookCreateForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Create | Book Author Relation File",
  description: "Book Create page of Book Author Relation File Application",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Book</CardTitle>
        </CardHeader>
        <BookCreateForm />
      </Card>
    </section>
  );
};

export default page;
