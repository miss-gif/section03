interface PageProps {
  searchParams: Promise<{ q: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  console.log(searchParams);

  const { q } = await searchParams;

  return <div>서치Page {q}</div>;
};

export default Page;
