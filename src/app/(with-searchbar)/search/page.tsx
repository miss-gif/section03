import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Metadata } from "next";
import { Suspense } from "react";

const SearchResult = async ({ q }: { q: string }) => {
  await delay(2000);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q || ""}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const books: BookData[] = await res.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  // 현재 페이지 메타 데이터를 동적으로 생석하는 역할을 합니다.
  const { q } = searchParams;

  return {
    title: `한입 북스 - ${q}`,
    description: `한입 북스에 등록된 도서 중 "${q}" 검색 결과입니다.`,
    openGraph: {
      title: `한입 북스 - ${q}`,
      description: `한입 북스에 등록된 도서 중 "${q}" 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <Suspense
      key={searchParams.q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
