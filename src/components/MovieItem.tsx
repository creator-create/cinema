import { MovieData } from "@/types";
import Link from "next/link";
import React from "react";
import style from "./MovieItem.module.css";

const MovieItem = ({ id, posterImgUrl }: MovieData) => {
  return (
    <Link href={`movie/${id}`} className={style.container}>
      <img src={posterImgUrl} alt="영화 포스터" className={style.fillImage} />
    </Link>
  );
};

export default MovieItem;
