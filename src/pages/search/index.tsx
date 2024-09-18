import SearchableLayout from "@/components/SearchableLayout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import movie from "@/mock/movie.json";
import MovieItem from "@/components/MovieItem";
import style from "./index.module.css";

export default function Page() {
  const { q } = useRouter().query as { q: string };

  const searchMovies = (q: string) => {
    return movie.filter((m) => m.title.includes(q));
  };

  return (
    <div>
      <h3>검색 결과</h3>
      <div className={style.searchContainer}>
        {searchMovies(q).map((m) => (
          <MovieItem key={m.id} {...m} />
        ))}
      </div>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
