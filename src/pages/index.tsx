import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";
import movie from "@/mock/movie.json";
import MovieItem from "@/components/MovieItem";
import style from "@/components/home.module.css";

export default function Home() {
  return (
    <div>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommendContainer}>
          {movie?.slice(0, 3).map((m) => (
            <MovieItem key={m.id} {...m} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.allContainer}>
          {movie?.map((m) => (
            <MovieItem key={m.id} {...m} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
