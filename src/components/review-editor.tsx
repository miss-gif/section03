import createReviewAction from "@/actions/create-review-action";

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  return (
    <form
      action={createReviewAction}
      className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-white"
    >
      <input name="bookId" value={bookId} hidden readOnly />
      <textarea
        required
        name="content"
        placeholder="리뷰 내용"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        name="author"
        placeholder="작성자"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        작성하기
      </button>
    </form>
  );
};

export default ReviewEditor;
