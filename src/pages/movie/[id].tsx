import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const movie = await fetchOneMovie(Number(id));

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return <div>로딩 중...</div>;
  if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

  const {
    title,
    genres,
    releaseDate,
    runtime,
    company,
    subTitle,
    description,
    posterImgUrl,
  } = movie;

  return (
    <div>
      <div
        className={style.container}
        style={{ backgroundImage: `url(${posterImgUrl})` }}
      >
        <img src={posterImgUrl} alt="영화 포스터" />
      </div>
      <div className={style.movieInfoContainer}>
        <p className={style.title}>{title}</p>
        <div className={style.infos}>
          <p>
            {releaseDate} / <span>{genres.join(", ")}</span> / {runtime}분
          </p>
          <p>{company}</p>
          <p className={style.subTitle}>{subTitle}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
