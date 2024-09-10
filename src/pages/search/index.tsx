import { useRouter } from "next/router";

export default function Page() {
  const { q } = useRouter().query;

  return <h1>검색결과: {q}</h1>;
}
