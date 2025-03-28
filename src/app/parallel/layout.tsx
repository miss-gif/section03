import Link from "next/link";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}) {
  return (
    <>
      <header className="flex gap-4 p-4 bg-gray-200">
        <Link href={"/parallel"}>paralled</Link>
        <Link href={"/parallel/setting"}>paralled/setting</Link>
      </header>
      <section>
        {sidebar}
        {feed}
        {children}
      </section>
    </>
  );
}
