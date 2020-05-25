import React, { useState } from "react";

// Components
import CookieItem from "./CookieItem";

// Data
import cookies from "../cookies";

// Styling
import { ListWrapper } from "../styles";

const CookieList = () => {
  const [_cookies, setCookies] = useState(cookies);

  const deleteCookie = cookieId => {
    const updatedCookies = _cookies.filter(cookie => cookie.id !== +cookieId);
    setCookies(updatedCookies);
  };

  const cookieList = _cookies.map(cookie => (
    <CookieItem cookie={cookie} key={cookie.id} deleteCookie={deleteCookie} />
  ));

  return <ListWrapper>{cookieList}</ListWrapper>;
};

export default CookieList;
