import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";
import MovieItem from "@/components/MovieItem";
import style from "./index.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;

  const movie = await fetchMovies(q);

  return {
    props: {
      movie,
    },
  };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h3>검색 결과</h3>
      <div className={style.searchContainer}>
        {movie.map((m) => (
          <MovieItem key={m.id} {...m} />
        ))}
      </div>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
