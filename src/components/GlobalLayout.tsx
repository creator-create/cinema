import React, { ReactNode } from "react";
import style from "./GlobalLayout.module.css";
import Link from "next/link";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">ONEBITE CINEMA</Link>
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default GlobalLayout;
