import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

const Footer = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);

  if (!res.ok) {
    return <footer>© 2025 ONEBITE BOOKS</footer>;
  }

  const books: BookData[] = await res.json();
  const bookCount = books.length;

  return <footer>© 2025 ONEBITE BOOKS | {bookCount}권의 책</footer>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
