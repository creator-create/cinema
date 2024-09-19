import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;

  const movieDetail = await fetchOneMovie(Number(id));

  return {
    props: { movieDetail },
  };
};

export default function Page({
  movieDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movieDetail) return <div>영화를 찾을 수 없습니다.</div>;

  const {
    title,
    genres,
    releaseDate,
    runtime,
    company,
    subTitle,
    description,
    posterImgUrl,
  } = movieDetail;

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
