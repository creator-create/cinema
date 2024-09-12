import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";

export default function Home() {
  return <></>;
}

Home.getLayout = (page: ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
