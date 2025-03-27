"use client";

import createReviewAction from "@/actions/create-review-action";
import { useActionState, useEffect } from "react";

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-white"
    >
      <input name="bookId" value={bookId} hidden readOnly />
      <textarea
        required
        disabled={isPending}
        name="content"
        placeholder="리뷰 내용"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        disabled={isPending}
        name="author"
        placeholder="작성자"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isPending ? "작성중..." : "작성하기"}
      </button>
    </form>
  );
};

export default ReviewEditor;
