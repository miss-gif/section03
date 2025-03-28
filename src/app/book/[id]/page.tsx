import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";
import { BookData, ReviewData } from "@/types";
import { notFound } from "next/navigation";
import style from "./page.module.css";
import Image from "next/image";

export const dynamicParams = true; // 동적 라우팅을 사용할 경우 true로 설정

export const generateStaticParams = async () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
};

const BookDetail = async ({ bookId }: { bookId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    {
      next: {
        tags: [`review-${bookId}`],
      },
    }
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


  return (
    <div className={style.container}>
      <div className="sr-only">{id}</div>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`}/>
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

const ReviewList = async ({ bookId }: { bookId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`
  );

  if (!res.ok) {
    throw new Error(
      `리뷰 목록을 불러오는 중 오류가 발생했습니다. ${res.statusText}`
    );
  }

  const reviews: ReviewData[] = await res.json();


  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem key={`review-itme-${review.id}`} {...review} />
      ))}
    </div>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-10">
      <BookDetail bookId={(await Promise.resolve(params)).id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
