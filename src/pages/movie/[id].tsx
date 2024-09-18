import { useRouter } from "next/router";
import movie from "@/mock/movie.json";
import style from "./[id].module.css";

export default function Page() {
  const { id } = useRouter().query as { id: string };

  const movieDetail = movie.find((m) => m.id === Number(id));

  if (!movieDetail) return <div>영화를 찾을 수 없습니다.</div>;

  return (
    <div>
      <div
        className={style.container}
        style={{ backgroundImage: `url(${movieDetail.posterImgUrl})` }}
      >
        <img src={movieDetail.posterImgUrl} alt="영화 포스터" />
      </div>
      <div className={style.movieInfoContainer}>
        <p className={style.title}>{movieDetail.title}</p>
        <div className={style.infos}>
          <p>
            {movieDetail.releaseDate} /{" "}
            <span>{movieDetail.genres.join(", ")}</span> / {movieDetail.runtime}
            분
          </p>
          <p>{movieDetail.company}</p>
          <p className={style.subTitle}>{movieDetail.subTitle}</p>
          <p>{movieDetail.description}</p>
        </div>
      </div>
    </div>
  );
}
