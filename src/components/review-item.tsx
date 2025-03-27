import { ReviewData } from "@/types";
import React from "react";

const ReviewItem = ({ content, author, createdAt }: ReviewData) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="text-lg font-semibold text-gray-800">{author}</div>
      <div className="mt-2 text-gray-600">{content}</div>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>{new Date(createdAt).toLocaleString()}</div>
        <button className="text-red-500 hover:underline">삭제하기</button>
      </div>
    </div>
  );
};

export default ReviewItem;
