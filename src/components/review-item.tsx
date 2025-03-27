import ReviewItemDeleteButton from "@/components/review-item-delete-button";
import { ReviewData } from "@/types";
import React from "react";

const ReviewItem = ({id, bookId, content, author, createdAt }: ReviewData) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="text-lg font-semibold text-gray-800">{author}</div>
      <div className="mt-2 text-gray-600">{content}</div>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div className="text-red-500 hover:underline">
          <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
