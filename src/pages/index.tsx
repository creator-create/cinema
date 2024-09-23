import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";
import MovieItem from "@/components/MovieItem";
import style from "@/components/home.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovies, randomMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      randomMovies,
    },
    revalidate: 60,
  };
};

export default function Home({
  allMovies,
  randomMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>홈 | 영화 추천 사이트</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마" />
        <meta
          property="og:description"
          content="영화 추천 사이트 한입 씨네마 입니다."
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
