"use server";

import { revalidateTag } from "next/cache";

const deleteReviewAction = async (_: unknown, formData: FormData) => {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "리뷰 ID를 입력해주세요.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidateTag(`review-${bookId}`);

    return { status: true, error: "" };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다. ${error}`,
    };
  }
};

export default deleteReviewAction;
