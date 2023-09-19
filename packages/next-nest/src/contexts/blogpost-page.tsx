'use client'
import React, { createContext, useContext, useState } from "react"

// this context is for loading blog pagniation data when clicking blog btn in the header page
// 이 컨텍스트는 블로그 버튼 클릭시 봤던 페이지를 로딩하기 휘함이다.

const initialState = {
  page: 0,
  setPage: (page:number) => {}
}

const pageContext = createContext(initialState)

export function usePage() {
  return useContext(pageContext);
}

export default function PageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, _setPage] = useState<number>(0);

  // set page의 전역화 
  function setPage(page:number){
    _setPage(page)
  }

  return (
    <pageContext.Provider
      value={{page, setPage}}
    >
      {children}
    </pageContext.Provider>
  );
}