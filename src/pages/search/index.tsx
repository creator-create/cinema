import SearchableLayout from "@/components/SearchableLayout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Page() {
  const { q } = useRouter().query;

  return <h1>검색결과: {q}</h1>;
}

Page.getLayout = (page: ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
