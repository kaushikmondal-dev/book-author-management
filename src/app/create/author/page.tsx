import AuthorCreateForm from "@/components/AuthorCreateForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Create | Book Author Relation File",
  description: "Author Create page of Book Author Relation File Application",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Author</CardTitle>
        </CardHeader>
        <AuthorCreateForm />
      </Card>
    </section>
  );
};

export default page;
