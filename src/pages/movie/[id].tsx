import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movies";
import Head from "next/head";

export const getStaticPaths = async () => {
  const allMovies = await fetchMovies();

  const paths = allMovies.map((m) => ({
    params: { id: m.id.toString() },
  }));

  return {
    paths: [...paths],
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

  if (router.isFallback)
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
        <div>Loading...</div>
      </>
    );
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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
