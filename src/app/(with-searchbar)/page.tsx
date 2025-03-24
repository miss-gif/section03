import ClientComponent from "@/components/ui/client-component";
import ServerComponent from "@/components/ui/server-component";

export default function Home() {
  return (
    <div>
      홈페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
