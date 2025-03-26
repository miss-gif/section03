import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import React from "react";

const BookListSkeleton = ({ count }: { count: number }) => {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
};

export default BookListSkeleton;
