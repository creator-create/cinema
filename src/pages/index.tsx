import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";
import MovieItem from "@/components/MovieItem";
import style from "@/components/home.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetServerSidePropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-movies";

export const getServerSideProps = async () => {
  const [allMovies, randomMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      randomMovies,
    },
  };
};

export default function Home({
  allMovies,
  randomMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommendContainer}>
          {randomMovies?.map((m) => (
            <MovieItem key={m.id} {...m} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.allContainer}>
          {allMovies?.map((m) => (
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
