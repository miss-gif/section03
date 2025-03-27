"use server";

import { revalidateTag } from "next/cache";

const createReviewAction = async (formData: FormData) => {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.status);

    revalidateTag(`review-${bookId}`);
  } catch (error) {
    console.error(error);
  }
};

export default createReviewAction;
