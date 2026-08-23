import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../shadcnui/button";

const Header = () => {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            Book Author Management
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={"/create"}
            className={buttonVariants({ variant: "default" })}>
            <PlusIcon />
            Book
          </Link>

          <Link
            href={"/create/author"}
            className={buttonVariants({ variant: "secondary" })}>
            <PlusIcon />
            Author
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
