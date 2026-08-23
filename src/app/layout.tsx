import Header from "@/components/Layout/Header";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { geistMono, geistSans, interHeading } from "@/lib/fonts";
import { LayoutProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import "./globals.css";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        interHeading.variable,
      )}
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem={false}>
          <Header />

          <main className="mx-auto max-w-7xl"> {children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
