"use server";

import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

const createReviewAction = async (_: unknown, formData: FormData) => {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    await delay(3000);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/1`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
        headers: {
          "Content-Type": "application/json",
        },
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
      error: `리뷰 작성에 실패했습니다. ${error}`,
    };
  }
};

export default createReviewAction;
