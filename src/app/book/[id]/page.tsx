import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

export const dynamicParams = true; // 동적 라우팅을 사용할 경우 true로 설정

export const generateStaticParams = async () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
};

const BookDetail = async ({ bookId }: { bookId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }

  const book: BookData = await res.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  console.log(id);

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* <img src={coverImgUrl} /> */}
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
};

const ReviewEditor = () => {
  const createReviewAction = async (formData: FormData) => {
    "use server";
    console.log(formData);

    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    console.log(content, author);
  };

  return (
    <form action={createReviewAction}>
      <input type="text" name="content" placeholder="리뷰 내용" />
      <input type="text" name="author" placeholder="작성자" />
      <button type="submit">작성하기</button>
    </form>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-10">
      <BookDetail bookId={(await Promise.resolve(params)).id} />
      <ReviewEditor />
    </div>
  );
}
