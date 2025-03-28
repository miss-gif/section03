import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  { searchParams }: { searchParams: { q?: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 현재 페이지 메타 데이터를 동적으로 생석하는 역할을 합니다.
  const { q } = searchParams;
  
  // 부모 메타데이터의 이미지를 가져옵니다.
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `한입 북스 - ${q}`,
    description: `한입 북스에 등록된 도서 중 "${q}" 검색 결과입니다.`,
    openGraph: {
      title: `한입 북스 - ${q}`,
      description: `한입 북스에 등록된 도서 중 "${q}" 검색 결과입니다.`,
      images: ["/thumbnail.png", ...previousImages],
    },
  };
}

// 수정된 페이지 컴포넌트 타입
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // searchParams를 await로 비동기 처리
  const resolvedSearchParams = await searchParams;
  
  return (
    <Suspense
      key={resolvedSearchParams.q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={resolvedSearchParams.q || ""} />
    </Suspense>
  );
}