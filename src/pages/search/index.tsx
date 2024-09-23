import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/MovieItem";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import Head from "next/head";
import { useRouter } from "next/router";
import { MovieData } from "@/types";

// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const q = context.query.q as string;

//   const movies = await fetchMovies(q);

//   return {
//     props: {
//       movies,
//     },
//   };
// };

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearchMovies = async () => {
    const movies = await fetchMovies(q);
    setMovies(movies);
  };

  useEffect(() => {
    if (q) {
      fetchSearchMovies();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입 씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마 - 검색결과" />
        <meta
          property="og:description"
          content="영화 추천 사이트 한입 씨네마 입니다."
        />
      </Head>
      <h3>검색 결과</h3>
      <div className={style.searchContainer}>
        {movies.map((m) => (
          <MovieItem key={m.id} {...m} />
        ))}
      </div>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
