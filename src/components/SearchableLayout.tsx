import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import style from "./SearchableLayout.module.css";

const SearchableLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitSearch();
    }
  };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요.."
        />
        <button onClick={onSubmitSearch}>검색</button>
      </div>
      {children}
    </div>
  );
};

export default SearchableLayout;
